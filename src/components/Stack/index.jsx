import React, { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Image from 'next/image';
import HoverReveal from '../Tool/hoverReveal';
import IconsOnRing from '../Tool/iconsOnRing';

export default function Index() {
    gsap.registerPlugin(ScrollTrigger);

    const centerRef = useRef(null);
    const ringOneRef = useRef(null);
    const ringTwoRef = useRef(null);
    const ringThreeRef = useRef(null);
    const ringFourRef = useRef(null);

    const computeAngles = (icons) => {
        const count = icons.length;
        const increment = 360 / count;
        const randomStart = Math.floor(Math.random() * 360);
        return icons.map((icon, index) => ({
        ...icon,
          angle: (randomStart + index * increment) % 360,
        }));
    };

    const iconsFirstRing = [
        { src: '/images/icons/JavaScript.png', alt: 'JAVASCRIPT', angle: 288}, 
        { src: '/images/icons/Java.png', alt: 'JAVA', angle: 216 }, 
        { src: '/images/icons/Python.png', alt: 'PYTHON', angle: 0 }, 
        { src: '/images/icons/CSharp.png', alt: 'C#', angle: 144 },
        { src: '/images/icons/TypeScript.png', alt: 'TYPESCRIPT', angle: 72 }
    ];
    
    const iconsSecondRing = [
        { src: '/images/icons/MySQL.png', alt: 'MYSQL', angle: 23}, 
        { src: '/images/icons/MongoDB.png', alt: 'MONGODB', angle: 95}, 
        { src: '/images/icons/PostgresSQL.png', alt: 'POSTGRESQL', angle: 167}, 
        { src: '/images/icons/Redis.png', alt: 'REDIS', angle: 239},
        { src: '/images/icons/SQLite.png', alt: 'SQLITE', angle: 311}
    ];

    const iconsThirdRing = [
        { src: '/images/icons/React.png', alt: 'REACT', angle: 20}, 
        { src: '/images/icons/Next.js.png', alt: 'NEXT.JS', angle: 80}, 
        { src: '/images/icons/Node.js.png', alt: 'NODE.JS', angle: 140}, 
        { src: '/images/icons/Express.png', alt: 'EXPRESS.JS', angle: 200}, 
        { src: '/images/icons/Django.png', alt: 'DJANGO', angle: 260}, 
        { src: '/images/icons/Spring.png', alt: 'SPRING', angle: 320}, 
        { src: '/images/icons/GraphQL.png', alt: 'GRAPHQL', angle: 320}, 
    ];

    const iconsFourthRing = [
        { src: '/images/icons/Tailwind CSS.png', alt: 'TAILWIND CSS', angle: 20}, 
        { src: '/images/icons/Windows11.png', alt: 'WINDOWS', angle: 80}, 
        { src: '/images/icons/AWS.png', alt: 'AWS', angle: 140}, 
        { src: '/images/icons/Keras.png', alt: 'KERAS', angle: 200}, 
        { src: '/images/icons/MATLAB.png', alt: 'MATLAB', angle: 260}, 
        { src: '/images/icons/TensorFlow.png', alt: 'TENSORFLOW', angle: 320}, 
        { src: '/images/icons/Pandas.png', alt: 'PANDAS', angle: 320}, 
        { src: '/images/icons/OpenCV.png', alt: 'OPENCV', angle: 320}, 
        { src: '/images/icons/scikit-learn.png', alt: 'SCIKIT-LEARN', angle: 320}, 
        { src: '/images/icons/Docker.png', alt: 'DOCKER', angle: 320}, 
        { src: '/images/icons/Kubernetes.png', alt: 'KUBERNETES', angle: 320}, 
    ];

    const computedIconsFirstRing = computeAngles(iconsFirstRing);
    const computedIconsSecondRing = computeAngles(iconsSecondRing);
    const computedIconsThirdRing = computeAngles(iconsThirdRing);
    const computedIconsFourthRing = computeAngles(iconsFourthRing);

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: centerRef.current,
            start: "top bottom", 
            end: "bottom center",
            scrub: true,
            markers: false, 
            }
        });
        
        tl.from(centerRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "power2.out",
        });
    
        tl.from(ringOneRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "power2.out",
        }, "-=0.2"); 
    
        tl.from(ringTwoRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "power2.out",
        }, "-=0.2");
    
        tl.from(ringThreeRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "power2.out",
        }, "-=0.2");

        tl.from(ringFourRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "power2.out",
        }, "-=0.2");
    
        return () => {
            tl.kill();
        };
        }, []);
    
        return (
            <section id="stack">
                <div className="relative h-screen mt-10 pb-20 flex flex-col items-center justify-center bg-[radial-gradient(circle_400px_at_50%_500px,#e8b3f536,#15012b)]">
                    <div className="fixed inset-0 z-[-1]" />
                    <div 
                        ref={centerRef}
                        className="absolute top-1/2 left-1/2 z-10 w-32 h-32 rounded-full border-4 border-white text-black flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                    >
                    <HoverReveal
                        hoverContent={
                            <div className="relative w-24 h-24">
                                <Image                           
                                    src={'/images/Skills.png'}
                                    alt="skill_set icon"
                                    fill={true} 
                                    priority={true}
                                    className="object-cover object-center"
                                    sizes="96px"
                                />
                            </div>
                            }
                            defaultContent={<span className="text-white font-bold text-xl">SKILL SET</span>}
                        containerClassName="relative w-24 h-24"
                        defaultContentClassName="absolute inset-0 flex items-center justify-center"
                        />
                    </div>
            
                    <div
                    ref={ringOneRef}
                    className="absolute w-[300px] h-[300px] flex items-center justify-center border border-blue-400 rounded-full mt-16 pointer-events-none"
                    >
                        <IconsOnRing icons={computedIconsFirstRing} ringSize={300} />
                    </div>
            
                    <div
                    ref={ringTwoRef}
                    className="absolute w-[450px] h-[450px] flex items-center justify-center border border-blue-600 rounded-full mt-16 pointer-events-none"
                    >
                        <IconsOnRing icons={computedIconsSecondRing} ringSize={450} />
                    </div>
            
                    <div
                    ref={ringThreeRef}
                    className="absolute w-[600px] h-[600px] flex items-center justify-center border border-blue-800 rounded-full mt-16 pointer-events-none"
                    >
                        <IconsOnRing icons={computedIconsThirdRing} ringSize={600} />
                    </div>

                    <div
                    ref={ringFourRef}
                    className="absolute w-[750px] h-[750px] flex items-center justify-center border border-blue-900 rounded-full mt-16 pointer-events-none"
                    >
                        <IconsOnRing icons={computedIconsFourthRing} ringSize={750} />
                    </div>
                </div>
            </section>
        );
    }