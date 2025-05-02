import React, { useRef, useState } from 'react';

export function HoverHighlightInput({
    as: Tag = 'input',
    className,
    ...props
    }) {
    const wrapperRef = useRef(null);
    const [bg, setBg] = useState('none');
    const RADIUS = 120;                 
    const COLOR = 'rgba(139, 92, 246, 1)';

    const handleMouseMove = (e) => {
        const { left, top } = wrapperRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setBg(
        `radial-gradient(circle ${RADIUS}px at ${x}px ${y}px, ${COLOR}, transparent 80%)`
        );
    };

    const handleMouseEnter = () => {
        setBg(
        `radial-gradient(circle ${RADIUS}px at 0px 0px, ${COLOR}, transparent 80%)`
        );
    };

    const handleMouseLeave = () => setBg('none');

    return (
        <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ background: bg }}
        className="rounded-lg p-[2px] transition duration-300"
        >
        <Tag
            {...props}
            className={`
            block w-full rounded-md border-none
            bg-gray-900 text-white
            px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-[rgba(139,92,246,0.8)]
            ${className || ''}
            `}
        />
        </div>
    );
}
