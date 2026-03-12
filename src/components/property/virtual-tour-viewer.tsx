"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { AutorotatePlugin } from "@photo-sphere-viewer/autorotate-plugin";
import {
  VirtualTourPlugin,
  type VirtualTourNode,
} from "@photo-sphere-viewer/virtual-tour-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import {
  X,
  Maximize2,
  Minimize2,
  RotateCw,
  Loader2,
  Footprints,
} from "lucide-react";

interface PanoramaRoom {
  id: string;
  label: string;
  imageUrl: string;
  links?: {
    nodeId: string;
    position?: { yaw: string; pitch: string };
  }[];
}

interface VirtualTourViewerProps {
  panoramas: PanoramaRoom[];
  onClose?: () => void;
  isFullscreen?: boolean;
}

function buildTourNodes(panoramas: PanoramaRoom[]): VirtualTourNode[] {
  return panoramas.map((room, idx) => {
    let links = room.links;

    if (!links || links.length === 0) {
      links = [];
      const count = panoramas.length;
      if (count > 1) {
        const prevIdx = (idx - 1 + count) % count;
        const nextIdx = (idx + 1) % count;

        if (count === 2) {
          links.push({
            nodeId: panoramas[prevIdx === idx ? nextIdx : prevIdx].id,
            position: { yaw: "0deg", pitch: "-15deg" },
          });
          if (prevIdx !== nextIdx) {
            links.push({
              nodeId: panoramas[nextIdx].id,
              position: { yaw: "180deg", pitch: "-15deg" },
            });
          }
        } else {
          links.push({
            nodeId: panoramas[prevIdx].id,
            position: { yaw: "-120deg", pitch: "-15deg" },
          });
          links.push({
            nodeId: panoramas[nextIdx].id,
            position: { yaw: "120deg", pitch: "-15deg" },
          });
        }
      }
    }

    return {
      id: room.id,
      panorama: room.imageUrl,
      name: room.label,
      thumbnail: room.imageUrl,
      links: links.map((link) => ({
        nodeId: link.nodeId,
        position: link.position
          ? { yaw: link.position.yaw, pitch: link.position.pitch }
          : { yaw: "0deg", pitch: "-15deg" },
      })),
    };
  });
}

export default function VirtualTourViewer({
  panoramas,
  onClose,
  isFullscreen: initialFullscreen = false,
}: VirtualTourViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [currentRoom, setCurrentRoom] = useState(panoramas[0]?.label ?? "");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(initialFullscreen);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !panoramas.length) return;

    setLoading(true);

    const tourNodes = buildTourNodes(panoramas);

    const viewer = new Viewer({
      container: containerRef.current,
      defaultZoomLvl: 50,
      navbar: false,
      touchmoveTwoFingers: false,
      mousewheelCtrlKey: false,
      plugins: [
        [
          AutorotatePlugin,
          {
            autorotatePitch: "5deg",
            autorotateSpeed: "0.4rpm",
            autostartDelay: 2000,
            autostartOnIdle: true,
          },
        ],
        [
          VirtualTourPlugin,
          {
            dataMode: "client",
            positionMode: "manual",
            renderMode: "3d",
            nodes: tourNodes,
            startNodeId: tourNodes[0].id,
            preload: true,
            showLinkTooltip: true,
            transitionOptions: {
              showLoader: true,
              speed: "20rpm",
              effect: "fade",
              rotation: true,
            },
          },
        ],
      ],
    });

    viewer.addEventListener("ready", () => {
      setLoading(false);
    });

    const vtPlugin = viewer.getPlugin(VirtualTourPlugin);
    if (vtPlugin) {
      vtPlugin.addEventListener("node-changed", (e: any) => {
        const node = e.node as VirtualTourNode;
        setCurrentRoom(node.name ?? "");
        const newIdx = panoramas.findIndex((p) => p.id === node.id);
        if (newIdx !== -1) setCurrentIdx(newIdx);
      });
    }

    viewerRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panoramas]);

  useEffect(() => {
    if (!viewerRef.current) return;
    try {
      const autorotate = viewerRef.current.getPlugin(AutorotatePlugin) as
        | (AutorotatePlugin & { start?: () => void; stop?: () => void })
        | null;
      if (!autorotate || typeof autorotate.start !== "function") return;
      if (isAutoRotating) {
        autorotate.start?.();
      } else {
        autorotate.stop?.();
      }
    } catch {
      // viewer might be destroyed
    }
  }, [isAutoRotating]);

  const jumpToRoom = useCallback(
    (idx: number) => {
      if (!viewerRef.current || !panoramas[idx]) return;
      try {
        const vtPlugin = viewerRef.current.getPlugin(VirtualTourPlugin) as
          | (VirtualTourPlugin & { setCurrentNode?: (id: string) => void })
          | null;
        if (vtPlugin && typeof vtPlugin.setCurrentNode === "function") {
          vtPlugin.setCurrentNode(panoramas[idx].id);
        }
      } catch {
        // viewer might be destroyed
      }
    },
    [panoramas]
  );

  useEffect(() => {
    if (!isFullscreen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && onClose) onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, onClose]);

  if (!panoramas.length) return null;

  const wrapperClass = isFullscreen
    ? "fixed inset-0 z-[9999] bg-black"
    : "w-full rounded-xl overflow-hidden border border-black/10 relative";

  return (
    <div className={wrapperClass}>
      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="text-white animate-spin" />
            <p className="text-white/70 text-sm font-medium">
              Loading walkthrough...
            </p>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pointer-events-auto">
          {panoramas.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => jumpToRoom(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                idx === currentIdx
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              {room.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-2 rounded-full transition-all ${
              isAutoRotating
                ? "bg-white text-black shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            }`}
            title={isAutoRotating ? "Stop rotation" : "Auto-rotate"}
          >
            <RotateCw
              size={16}
              className={isAutoRotating ? "animate-spin" : ""}
              style={isAutoRotating ? { animationDuration: "3s" } : undefined}
            />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-red-500 backdrop-blur-sm transition-colors"
              title="Close (Esc)"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Viewer */}
      <div
        ref={containerRef}
        className={isFullscreen ? "w-full h-full" : "w-full h-[500px]"}
      />

      {/* Bottom room indicator + walk hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <div className="px-4 py-2 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm flex items-center gap-2">
          <Footprints size={14} className="text-white/70" />
          <span className="font-semibold">{currentRoom}</span>
          <span className="text-white/50">&mdash;</span>
          <span className="text-white/70">
            {currentIdx + 1} of {panoramas.length}
          </span>
        </div>
        {panoramas.length > 1 && (
          <p className="text-white/50 text-[10px] font-medium">
            Click the arrows on the floor to walk to the next room
          </p>
        )}
      </div>
    </div>
  );
}
