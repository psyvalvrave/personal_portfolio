//src/component/intro/index.jsx
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import Image from 'next/image';
import gsap from 'gsap';
import { useTranslations } from "next-intl";
import { TextGenerateEffect } from '@/components/Tool/text-generate-effect';
import styles from './intro.module.css';

export default function Index() {
    const t = useTranslations("intro");
    const isMobile = useSelector(state => state.responsive.isMobile);

    const backgroundRef = useRef(null);
    const homeHeaderRef = useRef(null);
    const introImageRef = useRef(null);

    useEffect(() => {
        let ctx;
        (async () => {
            const [{ default: gsap }, { ScrollTrigger }, { default: ScrollToPlugin }] =
            await Promise.all([
                import('gsap'),
                import('gsap/ScrollTrigger'),
                import('gsap/dist/ScrollToPlugin'),
            ]);

            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
            const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: true,
                start: 'top',
                end: '+=300px',
            },
            });
            tl.from(backgroundRef.current, { clipPath: 'inset(15%)' })
            .to(introImageRef.current, { width: '200px', height: '200px' }, 0);
            ctx = tl;
        })();

        return () => ctx?.kill && ctx.kill();
        }, []);


    const scrollToDescription = () => {
        gsap.to(window, {
            duration: 1.5,             
            ease: 'power2.inOut',
            scrollTo: {
                y: '#description',       
                offsetY: isMobile ? 0 : -200,        
            },
        });
    };

return (
    <section id="intro">
        <div ref={homeHeaderRef} className="relative w-full flex justify-center">     
            <div
            ref={backgroundRef}
            className="w-full h-[100vh] absolute filter brightness-[0.6] [backgroundRef:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
            >
                <div className={styles.stars} />
                <div className={styles.stars2} />
                <div className={styles.stars3} />
            </div>       
            <div className="flex justify-center relative mt-[35vh]">
                <div ref={introImageRef} data-scroll data-scroll-speed="0.3" className="absolute w-full max-w-[768px] aspect-[3/2] filter brightness-[0.7]">
                    <Image                           
                        src={'/images/Intro.png'}
                        alt={t("imageAlt")}
                        fill={true} 
                        priority={true}
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover object-center"
                    />
                </div>
                <div data-scroll data-scroll-speed="0.7" className="flex flex-col items-center text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <TextGenerateEffect
                            words={t("greeting")}
                            className="text-white text-4xl font-extrabold
                                    md:text-5xl lg:text-6xl"
                            filter={true}
                            duration={1}
                            highlightWord={t("highlight")}
                        />
                    </div>
                    <button 
                    onClick={scrollToDescription} 
                    className="group relative mt-4 h-16 w-40 overflow-hidden border-2 border-white text-white shadow-2xl transition-all duration-200 rounded-lg before:absolute before:inset-0 before:m-auto before:h-0 before:w-0 before:rounded-lg before:bg-indigo-800 before:opacity-0 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80 cursor-pointer">
                        <span className="relative z-10 font-bold text-xl transition-opacity duration-200 group-hover:opacity-0">
                            {t("button")}
                        </span>

                        <span className="absolute inset-0 flex text-2xl font-extrabold items-center justify-center text-white opacity-0 transform -translate-y-full transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                            ↓
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </section>
    )
}


