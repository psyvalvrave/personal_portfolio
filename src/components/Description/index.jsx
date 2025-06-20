//src/components/Description/index.jsx
import React, { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslations, useMessages } from "next-intl";


export default function Index() {
    const t = useTranslations("description");
    const messages = useMessages();
    const phraseObj = messages.description.phrases;
    const keys = Object.keys(phraseObj);
    return (
        <section id="description">
            <div className="relative mt-10 mb-20">
                <div className="fixed inset-0 z-[-1] brightness-[0.6] bg-[radial-gradient(125%_125%_at_50%_10%,_#000_40%,_#63e_100%)]" />
                    <div className="mb-4
                        font-extrabold
                        leading-none
                        tracking-tight
                        text-white   
                        text-2xl     
                        md:text-4xl
                        lg:text-5xl
                        mt-[30vw]
                        ml-[5vw]">
                            <h1 className="mb-4 text-xl sm:text-2xl md:sm:text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-violet-400">{t("heading")}</span>
                            </h1>
                            {keys.map((key) => (
                            <div key={key} className="mb-6 last:mb-0">
                            <AnimatedText>&#8226; {t(`phrases.${key}`)}</AnimatedText>
                            </div>
                        ))}
                    <AnimatedIcons />
                    
                    </div>
            </div>
        </section>
    )
}

function AnimatedText({ children }) {
    const text = useRef(null);
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(text.current, {
            scrollTrigger: {
                trigger: text.current,
                scrub: true,
                start: "0px bottom",
                end: "bottom+=400px bottom",
                markers: false,
            },
            opacity: 0,
            left: "-200px",
            ease: "power3.out",
        })     
    }, []);

    return <p ref={text}>{children}</p>
}

function AnimatedIcons() {
    const t = useTranslations("description");
    const iconsRef = useRef(null);
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(iconsRef.current, {
        scrollTrigger: {
            trigger: iconsRef.current,
            scrub: true,
            start: "top bottom",    
            end: "top center",       
            markers: false,           
            },
            opacity: 0,
            y: 50,                   
            ease: "power3.out",
        });
    }, []);
    return (
        <div ref={iconsRef} className="flex space-x-8 md:space-x-16 mt-5 md:mt-10">
            <a 
                href="https://github.com/psyvalvrave" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={t("links.githubAriaLabel")}
            >
            <FaGithub className="text-white text-3xl md:text-6xl transition-transform duration-300 transform hover:scale-[1.5]" />
        </a>
        <a 
            href="https://www.linkedin.com/in/zhecheng-li-0923b4190/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={t("links.linkedinAriaLabel")}
        >
            <FaLinkedin className="text-white text-3xl md:text-6xl transition-transform duration-300 transform hover:scale-[1.5]" />
        </a>
        </div>
    );
}