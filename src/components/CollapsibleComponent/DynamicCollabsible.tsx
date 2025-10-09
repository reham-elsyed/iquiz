'use client';
import dynamic from "next/dynamic";
export default dynamic(() => import("./CollapsibleSimple"), { ssr: false });