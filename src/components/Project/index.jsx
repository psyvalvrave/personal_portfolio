import React, { useState, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectDisplay from '../Tool/projectDisplay';

const projects = [
    {
        title: "Elvui_Freebie",
        imageSrc: "/images/projects/Elvui_Freebie.png",
        githubUrl: "https://github.com/psyvalvrave/Elvui_Freebie",
        keywords: ["Python", "Selenium", "PyQT5", "Nuitka"],
        description: "A Python application for automating the process of downloading and installing Elvui Addon for World of Warcraft.",
        downloadUrl: "https://github.com/psyvalvrave/Elvui_Freebie/actions/runs/14139417214/artifacts/2870783451",
    },
    {
        title: "Personal Portfolio",
        imageSrc: "/images/projects/Personal_Portfolio.png",
        githubUrl: "https://github.com/psyvalvrave/personal_portfolio",
        keywords: ["JavaScript", "React", "Tailwind CSS", "HTML"],
        description: "A personal portfolio website built with React and Tailwind CSS, showcasing my projects and skills.",
    },
    {
        title: "Find My Lease", 
        imageSrc: "/images/projects/FindMyLease.jpg",
        githubUrl: "https://github.com/psyvalvrave/FindMyLease",
        keywords: ["React-Native", "JavaScript", "Expo Go", "Firebase", "NoSql"],
        description: "A mobile application build with React-Native application for finding and managing lease agreements on both Android and IOS system.",
    },
    {
        title: "Kill Dr.Lucky Game",
        imageSrc: "/images/projects/KillDrLucky.png",
        githubUrl: "https://github.com/psyvalvrave/KillDrLuckyJavaProject",
        keywords: ["Java", "Java Swing", "Junit", "MVC Design Pattern"],
        description: "A Java application for playing a board game of Kill Dr. Lucky with basic interface and game logic.",
    },
    {
        title: "Retro Web Shop",
        imageSrc: "/images/projects/Retro_Web_Shop_Demo.png",
        description: "A full-stack web application for managing a retro shop to demonstrate CRUD and Rest API, built with React and PostgreSQL.",
        githubUrl: "https://github.com/psyvalvrave/Retro_Web_Shop_React_Demo",
        keywords: ["JavaScript", "React", "PostgreSQL", "Prisma", "Rest API"],
    },
    
];

export default function Index() {

    const [selectedProject, setSelectedProject] = useState(0);
    const pinnedContainerRef = useRef(null);

    useLayoutEffect( () => {
        gsap.registerPlugin(ScrollTrigger);
        
        const triggerEl = pinnedContainerRef.current;
        const containerEl = triggerEl.parentElement;

        ScrollTrigger.create({
            trigger: triggerEl,
            pin: true,
            start: "top-=100px top",
            end:   () => {
                const scrollable = containerEl.offsetHeight - window.innerHeight;
                return `${ scrollable * 3 }px`; 
            },
            pinSpacing: false,
            markers: false,
        })
    }, [])

    return (
        <section id="projects">
            <div className="relative text-white h-[150vh] p-[5%] [background:radial-gradient(125%_125%_at_50%_90%,#000_40%,#63e_100%)]">
                <div className="flex flex-row justify-between gap-4">
                    <div className="w-11/16" ref={pinnedContainerRef}>
                    
                    <h1 className="mb-4 text-3xl font-extrabold md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-400">Project</span>
                    </h1>
                    <ProjectDisplay 
                        title={projects[selectedProject].title}
                        imageSrc={projects[selectedProject].imageSrc}
                        githubUrl={projects[selectedProject].githubUrl}
                        keywords={projects[selectedProject].keywords}
                        downloadUrl={projects[selectedProject].downloadUrl}
                        description={projects[selectedProject].description}
                    />
                    
                    </div>
                    <div className="w-4/16">
                    <div className="flex flex-col relative mt-[50vh]">
                        {projects.map((project, index) => (
                        <div 
                            key={index} 
                            onMouseEnter={() => setSelectedProject(index)}
                            className="w-full text-white uppercase text-[2vw] border-b border-white flex justify-end"
                        >
                            <h2 className="m-0 mt-[40px] mb-[20px] font-bold breath cursor-default">{project.title}</h2>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
