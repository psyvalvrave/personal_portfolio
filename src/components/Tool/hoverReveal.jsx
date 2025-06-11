//src/components/Tool/hoverReveal.jsx
'use client';

import React, { useRef } from "react";
import { gsap } from "gsap";

const HoverReveal = ({
    defaultContent,
    hoverContent,
    containerClassName = "relative",
    defaultContentClassName = "",
    hoverContentClassName = "absolute inset-0 flex items-center justify-center opacity-0",
    autoResetDelay = 3000,
    }) => {
    const defaultRef = useRef(null);
    const hoverRef = useRef(null);
    const resetTimer = useRef(null);
    
    const resetAnimation = () => {
        gsap.killTweensOf(hoverRef.current);
        gsap.killTweensOf(defaultRef.current);
        gsap.to(hoverRef.current, { duration: 0.5, opacity: 0, ease: "power1.out" });
        gsap.to(defaultRef.current, { duration: 0.5, opacity: 1, ease: "power1.out" });
    };

    const handleMouseEnter = () => {
        gsap.to(defaultRef.current, { duration: 0.5, opacity: 0, ease: "power1.out" });
        gsap.to(hoverRef.current, { duration: 0.5, opacity: 1, ease: "power1.out", delay: 0.1 });
        resetTimer.current = setTimeout(() => {
            gsap.to(hoverRef.current, { duration: 0.5, opacity: 0, ease: "power1.out" });
            gsap.to(defaultRef.current, { duration: 0.5, opacity: 1, ease: "power1.out", delay: 0.1 });
        }, autoResetDelay);
    };

    const handleMouseLeave = () => {
        if (resetTimer.current) {
            clearTimeout(resetTimer.current);
            resetTimer.current = null;
        }
        resetAnimation();
    };


    return (
        <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={containerClassName}
        >
            <div ref={defaultRef} className={defaultContentClassName}>
                {defaultContent}
            </div>
            <div ref={hoverRef} className={hoverContentClassName}>
                {hoverContent}
            </div>
        </div>
    );
};

export default HoverReveal;
