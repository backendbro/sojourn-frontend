"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import React from "react";

interface ClientMDXProps extends MDXRemoteProps {}

export default function ClientMDX(props: ClientMDXProps) {
  return <MDXRemote {...props} />;
}
