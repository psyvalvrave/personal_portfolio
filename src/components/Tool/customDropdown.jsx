import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { cn } from "@/lib/utils";

export default function CustomDropdown({
    options,
    selected,
    onChange,
    className = ''
    }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false)
        }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    return (
        <div
        ref={ref}
        className={cn(
            'relative w-full mb-4', 
            className               
        )}
        >
        <div
            className={cn(
            'flex justify-between items-center',
            'px-4 py-2',
            'bg-[radial-gradient(125%_125%_at_50%_90%,#000_40%,#63e_100%)]',
            'border border-white rounded-md',
            'text-white cursor-pointer'
            )}
            onClick={() => setOpen(o => !o)}
        >
            {options[selected]}
            <span
            className={cn(
                'block w-0 h-0',
                'border-l-[0.4rem] border-l-transparent',
                'border-r-[0.4rem] border-r-transparent',
                'border-t-[0.5rem] border-t-white',
                'transition-transform',
                open && 'rotate-180'
            )}
            />
        </div>

        {open && (
            <ul
            className={cn(
                'absolute left-0 right-0 mt-1',
                'bg-[radial-gradient(125%_125%_at_50%_90%,#000_40%,#63e_100%)]',
                'border border-white rounded-md',
                'max-h-60 overflow-y-auto z-10'
            )}
            >
            {options.map((opt, idx) => (
                <li
                key={idx}
                className={cn(
                    'px-4 py-2 text-white cursor-pointer hover:bg-white/10',
                    idx === selected && 'bg-white/10'
                )}
                onClick={() => {
                    onChange(idx)
                    setOpen(false)
                }}
                >
                {opt}
                </li>
            ))}
            </ul>
        )}
        </div>
    )
    }

CustomDropdown.propTypes = {
    options:  PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
}
