//src/components/Tool/verticalDock.jsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    motion,
    useMotionValue,
    useTransform,
    useSpring,
    AnimatePresence,
} from 'motion/react';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollToPlugin);

export function VerticalDock({ items }) {
    const mouseY = useMotionValue(Infinity);
    const mouseX = useMotionValue(Infinity);
    const [openKey, setOpenKey] = useState(null);
    const isMobile = useSelector(state => state.responsive.isMobile);
    const isHorizontal = isMobile;
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
        {items.map(item => (
            <div key={item.key} className="relative">
            <IconLink
                title={item.title}
                icon={item.icon}
                mouseX={mouseX}
                mouseY={mouseY}
                onClick={() => {
                if (item.subItems) {
                    setOpenKey(openKey === item.key ? null : item.key);
                } else if (item.href) {
                    scrollToSection(item.href, item.offsetY);
                } else {
                    item.onClick?.();
                }
                }}
                isHorizontal={isHorizontal}
                disableTooltip={item.disableTooltip}
            />

            <AnimatePresence>
                {openKey === item.key && item.subItems && (
                <motion.div
                    key="submenu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                    isHorizontal
                        ? 'absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col space-y-4'
                        : 'absolute left-full top-1/2 -translate-y-1/2 ml-2 flex space-x-4'
                    )}
                >
                    {item.subItems.map(sub => (
                    <IconLink
                        key={sub.key}
                        title={sub.title}
                        icon={sub.icon}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        onClick={() => {
                        sub.onClick();
                        setOpenKey(null);
                        }}
                        disableTooltip={sub.disableTooltip}
                        isHorizontal={isHorizontal}
                    />
                    ))}
                </motion.div>
                )}
            </AnimatePresence>
            </div>
        ))}
            </nav>
        );
    }

    function IconLink({ title, icon, mouseY, mouseX, onClick, disableTooltip }) {
        const ref = useRef(null);
        const [hovered, setHovered] = useState(false);

        const isMobile = useSelector(state => state.responsive.isMobile);
        const isHorizontal = isMobile;

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
                animate={
                    hovered
                    ? { scale: isMobile ? 1.05 : 1.25 }
                    : { scale: 1 }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                <div className="w-full h-full flex items-center justify-center text-white">
                    {icon}
                </div>
            </motion.div>

                {!disableTooltip && hovered && (
                    <motion.span
                    initial={{
                        opacity: 0,
                        ...(isMobile ? { y: 4 } : { x: 4 }),
                    }}
                    animate={{
                        opacity: 1,
                        ...(isMobile ? { y: 0 } : { x: 0 }),
                    }}
                    exit={{
                        opacity: 0,
                        ...(isMobile ? { y: 4 } : { x: 4 }),
                    }}
                    className={cn(
                        'absolute whitespace-nowrap bg-transparent text-white text-xs rounded',
                        isMobile
                        ? 'top-full left-1/2 -translate-x-1/2 mt-2'
                        : 'left-full ml-2 top-1/2 -translate-y-1/2'
                    )}
                    >
                    {title}
                    </motion.span>
                )}
            </motion.button>
        );
    }
