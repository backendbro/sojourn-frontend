"use client";

import { MDXRemote } from "next-mdx-remote";
import React from "react";

export default function ClientMDX({ mdxSource }: { mdxSource: any }) {
  const components = {
    MyButton: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button
        style={{ padding: "8px", background: "blue", color: "white" }}
        {...props}
      >
        Click me!
      </button>
    ),
    // add more client-side MDX components here
  };

  return <MDXRemote {...mdxSource} components={components} />;
}
