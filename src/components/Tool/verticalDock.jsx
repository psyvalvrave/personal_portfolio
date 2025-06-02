'use client';

import React, { useState, useRef, useEffect } from 'react';
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
    const mouseX = useMotionValue(Infinity);
    const scrollToSection = (target, offsetY = 0) => {
        gsap.to(window, {
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTo: { y: target, offsetY },
        });
    };

    return (
        <nav
        aria-label="Page sections navigation"
        onMouseMove={e => {
            mouseY.set(e.clientY); 
            mouseX.set(e.clientX)}}
        onMouseLeave={() => {mouseY.set(Infinity); mouseX.set(Infinity)}}
        className={cn(
        "fixed top-2 left-0 w-full flex flex-row justify-center space-x-4 py-2 bg-black/50 backdrop-blur-md",
        "sm:left-4 sm:top-1/2 sm:w-auto sm:flex-col sm:space-x-0 sm:space-y-4 sm:py-0 sm:bg-transparent sm:backdrop-blur-none sm:transform sm:-translate-y-1/2",
        "z-50"
        )}
        >
        {items.map((item, i) => {
            const handleClick = item.onClick || (() => scrollToSection(item.href, item.offsetY));
            return (
                <IconLink
                key={i}
                title={item.title}
                icon={item.icon}
                mouseX={mouseX}
                mouseY={mouseY}
                onClick={handleClick}
                />
            );
        })}
        </nav>
    );
    }

    function IconLink({ title, href, icon, mouseY, mouseX, onClick }) {
        const ref = useRef(null);
        const [hovered, setHovered] = useState(false);

        const [isHorizontal, setIsHorizontal] = useState(false);
        useEffect(() => {
            const mq = window.matchMedia('(max-width: 639px)');
            setIsHorizontal(mq.matches);
            const handler = e => setIsHorizontal(e.matches);
            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
            }, []);

        const distance = useTransform(
            isHorizontal ? mouseX : mouseY,
            v => {
            if (!ref.current) {
                return 999;
            }
            const rect = ref.current.getBoundingClientRect();
            const center = isHorizontal
                ? rect.left + rect.width/2
                : rect.top  + rect.height/2;
            return v === Infinity ? 999 : v - center;
            }
        );

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
            aria-label={title}
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
                        initial={{
                            opacity: 0,
                            ...(isHorizontal ? { y: 4 } : { x: 4 }),
                            }}
                        animate={{
                            opacity: 1,
                            ...(isHorizontal ? { y: 0 } : { x: 0 }),
                            }}
                        exit={{
                            opacity: 0,
                            ...(isHorizontal ? { y: 4 } : { x: 4 }),
                            }}
                        className={cn(
                            'absolute whitespace-nowrap bg-transparent text-white text-xs rounded',
                            isHorizontal
                                ? 'top-full left-1/2 -translate-x-1/2 mt-2'
                                : 'left-full ml-2 top-1/2 -translate-y-1/2'
                            )}
                    >
                        {title}
                    </motion.span>
                )}
            </AnimatePresence>
            </motion.button>
        );
    }
