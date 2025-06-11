//src/components/Tool/hoverGradientButton.jsx
import React from "react";
import { cn } from "@/lib/utils";

export function HoverGradientButton({ as: Tag = "button", children, className, ...props }) {
  return (
    <Tag
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full p-[2px] bg-black overflow-hidden", 
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "group-hover:animate-spin-slow",
          "filter blur-lg"
        )}
      />

      <span
        className="relative block rounded-full bg-black px-6 py-2 text-white transition-colors duration-300 
                  group-hover:bg-black group-hover:text-white"
      >
        {children}
      </span>
    </Tag>
  );
}
