import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EducationDisplay from '../Tool/educationDisplay';

const educations = [
    {
    school: "Suffolk University",
    imageSrc: "/images/educations/Suffolk_University.png",
    diploma: "Bachelor of Computer Science",
    courses: [
        "Introduction to Computer Science",
        "Computer Networks",
        "Object Oriented Programming",
        "Data Structures and Algorithms",
        "Data Science Concept",
        "Operating Systems",
        "Architecture of Computer Systems",
        "Database Concepts",
    ],
    },
    {
    school: "Northeastern University",
    imageSrc: "/images/educations/Northeastern_University.png",
    diploma: "Master of Computer Science",
    courses: [
        "Programming Design Paradigm",
        "Foundations of Artificial Intelligence",
        "Database Management Systems",
        "Pattern Recognition and Computer Vision",
        "Mobile Application Development",
        "Web Development",
        "Algorithms",
        "Research Capstone",
    ],
    },
    ];

    export default function Index() {
            const [selectedEducation, setSelectedEducation] = useState(0);
            const [showCoursesBySchool, setShowCoursesBySchool] = useState({})
            const pinnedContainerRef = useRef(null);

            const open = !!showCoursesBySchool[selectedEducation]
            const toggleCourses = () => {
            setShowCoursesBySchool(prev => ({
                ...prev,
                [selectedEducation]: !prev[selectedEducation]
            }))
            }

            useLayoutEffect(() => {
            gsap.registerPlugin(ScrollTrigger);
        
            const triggerEl = pinnedContainerRef.current;
            const containerEl = triggerEl.parentElement;
            
        
            const st = ScrollTrigger.create({
                trigger: triggerEl,
                pin: true,
                start: "top-=100px top",
                end: () => {
                    const scrollable = containerEl.offsetHeight - window.innerHeight;
                    return `${ -scrollable }px`; 
                },
                markers: false,
                pinSpacing: false,
            });
        

            return () => st.kill();
            }, []);
        
            return (
            <section id="education">
                <div className="relative text-white h-[150vh] p-[5%] [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
                <div className="flex flex-row justify-between gap-4">
                    <div className="w-6/16">
                    <div className="flex flex-col relative mt-[50vh]">
                        {educations.map((edu, idx) => (
                        <div
                            key={idx}
                            onMouseEnter={() => setSelectedEducation(idx)}
                            className="w-full text-white uppercase text-[2vw] border-b border-white flex justify-start cursor-default"
                        >
                            <h2 className="m-0 mt-[40px] mb-[20px] font-bold breath">
                            {edu.school}
                            </h2>
                        </div>
                        ))}
                    </div>
                    </div>
        
                    <div className="w-9/16 flex flex-col items-end space-y-4" ref={pinnedContainerRef}>
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-400">
                        Education
                        </span>
                    </h1>
                    <div
                        className={`
                            w-[70%]
                            h-2         
                            bg-gradient-to-r from-indigo-700 via-purple-500 to-violet-400
                            bg-[length:200%_100%]        
                            animate-[gradient-slide_3s_linear_infinite_alternate]
                        `}
                        />
                    <EducationDisplay
                        imageSrc={educations[selectedEducation].imageSrc}
                        diploma={educations[selectedEducation].diploma}
                        courses={educations[selectedEducation].courses}
                        open={open}            
                        onToggle={toggleCourses} 
                    />
                    </div>
                </div>
                </div>
            </section>
            );
        }