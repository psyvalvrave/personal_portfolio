//src/components/Project/index.jsx
import React, { useState, useLayoutEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectDisplay from '@/components/Tool/projectDisplay';
import CustomDropdown from '@/components/Tool/customDropdown';
import './project.css'

const projects = [
    {
        title: "Elvui_Freebie",
        imageSrc: "/images/projects/Elvui_Freebie.png",
        githubUrl: "https://github.com/psyvalvrave/Elvui_Freebie",
        keywords: ["Python", "Selenium", "PyQT5", "Nuitka"],
        downloadUrl: "https://github.com/psyvalvrave/Elvui_Freebie/actions/runs/14139417214/artifacts/2870783451",
    },
    {
        title: "Personal Portfolio",
        imageSrc: "/images/projects/Personal_Portfolio.png",
        githubUrl: "https://github.com/psyvalvrave/personal_portfolio",
        keywords: ["JavaScript", "React", "Tailwind CSS", "HTML"],
    },
    {
        title: "Find My Lease", 
        imageSrc: "/images/projects/FindMyLease.jpg",
        githubUrl: "https://github.com/psyvalvrave/FindMyLease",
        keywords: ["React-Native", "JavaScript", "Expo Go", "Firebase", "NoSql"],
    },
    {
        title: "Kill Dr.Lucky Game",
        imageSrc: "/images/projects/KillDrLucky.png",
        githubUrl: "https://github.com/psyvalvrave/KillDrLuckyJavaProject",
        keywords: ["Java", "Java Swing", "Junit", "MVC Design Pattern"],
    },
    {
        title: "Retro Web Shop",
        imageSrc: "/images/projects/Retro_Web_Shop_Demo.png",
        githubUrl: "https://github.com/psyvalvrave/Retro_Web_Shop_React_Demo",
        keywords: ["JavaScript", "React", "PostgreSQL", "Prisma", "Rest API"],
    },
    
];

export default function Index() {
    const t = useTranslations("project");
    const [selectedProject, setSelectedProject] = useState(0);
    const pinnedContainerRef = useRef(null);

    const isMobile = useSelector((state) => state.responsive.isMobile);

    useLayoutEffect( () => {
        gsap.registerPlugin(ScrollTrigger);

        if (isMobile) {
                return;
            }
        
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
            <div className="projects-content">
                <div className="projects-row">
                    <div className="projects-left" ref={pinnedContainerRef}>                   
                    <h1 className="projects-title">
                        <span className="gradient-text">{t("heading")}</span>
                    </h1>
                    <CustomDropdown
                        className="block md:hidden"
                        options={projects.map(p => p.title)}
                        selected={selectedProject}
                        onChange={setSelectedProject}
                        />
                    <ProjectDisplay 
                        title={projects[selectedProject].title}
                        imageSrc={projects[selectedProject].imageSrc}
                        githubUrl={projects[selectedProject].githubUrl}
                        keywords={projects[selectedProject].keywords}
                        downloadUrl={projects[selectedProject].downloadUrl}
                        description={t(`entries.${selectedProject}.description`)}
                    />
                    
                    </div>
                    <div className="projects-right">
                    <div className="projects-right-inner">
                        {projects.map((project, index) => (
                        <div 
                            key={index} 
                            onMouseEnter={() => setSelectedProject(index)}
                            className="project-link"
                        >
                            <h2 className="breath">{project.title}</h2>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
