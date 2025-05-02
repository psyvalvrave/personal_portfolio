import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

const EducationDisplay = ({
    imageSrc,
    diploma,
    courses = [],
    open,
    onToggle 
    }) => {
    
    return (
        <div className="flex flex-col items-center w-full max-w-md bg-transparent p-6 rounded-lg shadow-lg">
        <div className="relative w-32 h-32 mb-4">
            <Image 
            src={imageSrc} 
            alt={diploma} 
            sizes="(max-width: 600px) 100vw, 750px"
            fill 
            className="object-contain" 
            priority
            />
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
            {diploma}
        </h2>
        <button
            onClick={onToggle}
            className="
                group
                inline-flex 
                items-center 
                justify-start                      
                mb-4
                text-white
                font-extrabold
                relative
                h-[50px] w-40
                overflow-hidden
                border border-indigo-700
                bg-transparent
                px-3
                shadow-3xl
                transition-all
                cursor-pointer
                before:absolute
                before:inset-y-0
                before:left-0
                before:w-0
                before:bg-gradient-to-r
                before:from-indigo-700
                before:to-violet-400
                before:transition-all
                before:duration-500
                hover:text-white
                hover:shadow-violet-700
                hover:before:w-full
            "
            >
                <span
                    className="
                    text-xl
                    font-extrabold
                    relative
                    w-6 h-6
                    mr-2
                    z-10
                    inline-block
                    opacity-0
                    scale-0
                    transform
                    transition-all
                    duration-300
                    leading-none
                    group-hover:opacity-100
                    group-hover:scale-100
                    group-hover:rotate-360
                    "
                >
                    {open ? "–" : "+"}  
                </span>
                <span className="relative z-10 leading-none">Courses</span>
            </button>
            <div className="flex flex-wrap gap-2 justify-center">
                <AnimatePresence>
                {open && courses.map((course, idx) => {
                    const reverseIdx = courses.length - idx - 1;
                    return (
                    <motion.span
                    key={idx}
                    className="bg-violet-900 text-white text-sm font-bold px-2 py-1 rounded"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.4 }}
                    exit={{ opacity: 0, y: 10,
                    transition: { delay: reverseIdx * 0.15, duration: 0.4 } 
                    }}
                    >  
                    {course}   
                    </motion.span>       
                    );   
                })}
                </AnimatePresence>
            </div>        
        </div>
    );
};

export default EducationDisplay;
