//src/components/Tool/iconsOnRing.jsx
import React from 'react';
import Image from 'next/image';
import HoverReveal from './hoverReveal';

const IconsOnRing = ({ icons, ringSize, iconSize}) => {
    const center = ringSize / 2;
    const placementRadius = center;

    return (
        <>
        {icons.map((icon, index) => {
            const radian = (icon.angle * Math.PI) / 180;
            const x = center + placementRadius * Math.cos(radian) - iconSize/2;
            const y = center + placementRadius * Math.sin(radian) - iconSize/2;
            return (
            <div
                key={index}
                className="absolute pointer-events-auto"
                style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${iconSize}px`,
                height: `${iconSize}px`
                }}
            >
                <HoverReveal
                defaultContent={
                    <div className="relative" style={{ width: `${iconSize}px`, height: `${iconSize}px` }}>
                        <Image
                            src={icon.src}
                            alt={icon.alt}
                            fill
                            priority
                            className="object-cover object-center"
                            sizes={`${iconSize}px`}
                        />
                    </div>
                }
                hoverContent={
                    <span className="text-white font-bold max-md:text-base text-xl text-center">
                    {icon.alt}
                    </span>
                }
                />
            </div>
            );
        })}
        </>
    );
};

export default IconsOnRing;
