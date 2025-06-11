//src/components/Tool/glow.jsx
import { motion } from "motion/react";

export default function Glow({ className = "" }) {
    return (
        <motion.div
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.5 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className={
            [
            "absolute top-0 left-1/2 -translate-x-1/2",
            "h-32 w-256 rounded-full bg-purple-500 blur-3xl",
            "opacity-50",
            className,
            ].join(" ")
        }
        />
    );
}
