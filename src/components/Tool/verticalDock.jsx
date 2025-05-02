// components/VerticalDock.jsx
'use client';

import React, { useState, useRef } from 'react';
import {
    motion,
    useMotionValue,
    useTransform,
    useSpring,
    AnimatePresence,
} from 'motion/react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollToPlugin);

export function VerticalDock({ items }) {
    const mouseY = useMotionValue(Infinity);

    const scrollToSection = (target, offsetY = 0) => {
        gsap.to(window, {
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTo: { y: target, offsetY },
        });
    };

    return (
        <nav
        onMouseMove={e => mouseY.set(e.clientY)}
        onMouseLeave={() => mouseY.set(Infinity)}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-50"
        >
        {items.map((item, i) => {
            const handleClick = item.onClick || (() => scrollToSection(item.href, item.offsetY));
            return (
                <IconLink
                key={i}
                title={item.title}
                icon={item.icon}
                mouseY={mouseY}
                onClick={handleClick}
                />
            );
        })}
        </nav>
    );
    }

    function IconLink({ title, href, icon, mouseY, onClick }) {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    const distance = useTransform(mouseY, y => {
        if (!ref.current) {
            return 999;
        }
        const { top, height } = ref.current.getBoundingClientRect();
        const centerY = top + height / 2;
        return y === Infinity ? 999 : y - centerY;
    });

    const size = useSpring(
        useTransform(distance, [-150, 0, 150], [32, 64, 32]),
        { stiffness: 300, damping: 20 }
    );

    return (
        <motion.button
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ width: size, height: size }}
        className={cn(
            'relative flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer',
            'overflow-visible focus:outline-none'
        )}
        >
        <motion.div
        className="w-[60%] h-[60%] flex items-center justify-center"
        animate={hovered ? { scale: 1.25 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {React.cloneElement(icon, { className: 'w-full h-full text-white' })}
        </motion.div>

        <AnimatePresence>
            {hovered && (
                <motion.span
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    className="absolute left-full ml-2 top-1/2 whitespace-nowrap bg-transparent text-white text-xs rounded transform -translate-y-1/2"
                >
                    {title}
                </motion.span>
            )}
        </AnimatePresence>
        </motion.button>
    );
}
