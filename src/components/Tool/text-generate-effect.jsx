//src/components/Tool/text-generate-effect.jsx
import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5,
    highlightWord = ""
    }) => {
    const [scope, animate] = useAnimate();
    const lines = words.split("\n");

    useEffect(() => {
        animate(
        "span",
        {
            opacity: 1,
            filter: filter ? "blur(0px)" : "none",
        },
        {
            duration,
            delay: stagger(0.2),
        }
        );
    }, [scope.current]);

    return (
        <motion.div
        ref={scope}
        className={cn("space-y-2 font-bold leading-snug tracking-wide", className)}
        >
            {lines.map((line, li) => (
            <div key={li} className="flex flex-wrap justify-center">
            {line.split(" ").map((rawWord, wi) => {
                const bare = rawWord.replace(/[.,!?]/g, "");
                const isHighlight = bare === highlightWord;

                return (
                <motion.span
                    key={`${li}-${wi}`}
                    className={cn(
                    "opacity-0 inline-block mr-2",
                    isHighlight
                        ? "text-red-500 px-1 rounded"
                        : "text-white"
                    )}
                    style={{ filter: filter ? "blur(10px)" : "none" }}
                >
                    {rawWord}
                </motion.span>
                );
            })}
            </div>
        ))}
        </motion.div>
    );
};