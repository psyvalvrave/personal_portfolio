"use client";    

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Timeline = ({ data }) => {
  const startRefs = useRef([]);
  const endRefs = useRef([]);
  const fillRefs = useRef([]);
  const containerRef = useRef(null);

  
  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      data.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: startRefs.current[i],
          start: "top-=20px top",
          endTrigger: endRefs.current[i],
          end: "top-=50px top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        });
      });


      data.forEach((_, i) => {
        const startEl = startRefs.current[i];
        const endEl   = endRefs.current[i];
        const fillEl  = fillRefs.current[i];
        const contRect = containerRef.current.getBoundingClientRect();
        const startRect = startEl.getBoundingClientRect();
        const endRect   = endEl.getBoundingClientRect();
        const startOffset = startRect.top + startRect.height/2 - contRect.top;
        const endOffset   = endRect.top   + endRect.height/2   - contRect.top;
        const spanHeight  = endOffset - startOffset;

        gsap.set(fillEl, { top: startOffset, height: 0, position: "absolute" });

        const triggerEl = i === 0
          ? startEl
          : endRefs.current[i - 1];
        const triggerStart = i === 0
          ? "top bottom"
          : "top top+=100px";

        gsap.to(fillEl, {
          height: spanHeight,
          ease:   "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: triggerStart,
            endTrigger: endEl,
            end: "top-=100px top",
            scrub: true,
          },
        });
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, [data]);


  return (
    <div className="relative w-full bg-transparent">
      <div
        ref={containerRef}
        className="relative max-w-3xl mx-auto py-10 space-y-16"
      >
        <div
          className="
            hidden md:block
            absolute left-[calc(11rem-0.675rem)]
            top-4 bottom-4 w-[4px]
            bg-[linear-gradient(to_bottom,transparent_0%,rgb(var(--tw-color-neutral-200))_10%,rgb(var(--tw-color-neutral-200))_90%,transparent_100%)]
            [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]
          "
        />

        {data.map((_, i) => (
          <div
            key={i}
            ref={el => (fillRefs.current[i] = el)}
            className="
              hidden md:block
              absolute left-[calc(11rem-0.675rem)] w-[4px]
              bg-gradient-to-t from-purple-500 via-blue-500 to-transparent
              rounded-full
            "
          />
        ))}

        {data.map((item, i) => (
          <div key={i} className="flex gap-6 items-stretch relative">
            <div className="hidden md:flex flex-col w-44 z-10">
              <div
                ref={el => (startRefs.current[i] = el)}
                className="flex justify-end items-center mb-6"
              >
                <p className="mr-2 text-sm text-neutral-500">
                  <span className="font-medium">{item.startDate}</span>
                </p>
                <span className="
                  h-4 w-4 rounded-full bg-white
                  border-2 border-neutral-300 
                " />
              </div>
              <div className="flex-1" />
              <div
                ref={el => (endRefs.current[i] = el)}
                className="flex justify-end items-center mt-6"
              >
                <p className="mr-2 text-sm text-neutral-500">
                  <span className="font-medium">{item.endDate}</span>
                </p>
                <span className="
                  h-4 w-4 rounded-full bg-white
                  border-2 border-neutral-300
                " />
              </div>
            </div>
            <div className="flex-1 pt-6 pb-6">
            <div className="mb-4 md:hidden">
                <p className="text-sm font-bold text-neutral-500">
                  {item.location}
                </p>
                <p className="text-sm text-neutral-500">
                  <span className="font-medium">{item.startDate}</span>
                  {" – "}
                  <span className="font-medium">{item.endDate}</span>
                </p>
              </div>
              <h3 className="text-xl font-bold text-neutral-200 mb-2">
                {item.title}
              </h3>
              <p className="hidden md:block text-sm font-bold text-neutral-500 mb-4">
                {item.location}
              </p>
              
              <div className="prose prose-sm max-w-none">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
