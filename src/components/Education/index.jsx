//src/components/Education/index.jsx
import React, { useState, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EducationDisplay from '@/components/Tool/educationDisplay';
import CustomDropdown from '@/components/Tool/customDropdown';
import './education.css';

const educations = [
    {
    school: "Suffolk University",
    imageSrc: "/images/educations/Suffolk_University.png",
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
        const t = useTranslations("education");
        const [selectedEducation, setSelectedEducation] = useState(0);
        const [showCoursesBySchool, setShowCoursesBySchool] = useState({})
        const pinnedContainerRef = useRef(null);

        const isMobile = useSelector((state) => state.responsive.isMobile);

        const open = !!showCoursesBySchool[selectedEducation]
        const toggleCourses = () => {
        setShowCoursesBySchool(prev => ({
            ...prev,
            [selectedEducation]: !prev[selectedEducation]
        }))
        }

        useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (isMobile) {
            return;
        }
    
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
        }, [isMobile]);
    
        return (
        <section id="education">
            <div className="education-content">
            <div className="education-row">
                <div className="education-left">
                <div className="education-list">
                    {educations.map((edu, idx) => (
                    <div
                        key={idx}
                        onMouseEnter={() => setSelectedEducation(idx)}
                        className="education-item"
                    >
                        <h2 className="breath">
                        {edu.school}
                        </h2>
                    </div>
                    ))}
                </div>
                </div>
    
                <div className="education-right" ref={pinnedContainerRef}>
                <h1 className="education-title">
                    <span className="gradient-text">
                        {t("heading")}
                    </span>
                </h1>
                <CustomDropdown
                    className="block md:hidden"
                    options={educations.map(e => e.school)}
                    selected={selectedEducation}
                    onChange={setSelectedEducation}
                    />
                <div
                    className="gradient-bar"
                    />
                <EducationDisplay
                    imageSrc={educations[selectedEducation].imageSrc}
                    diploma={t(`diplomas.${selectedEducation}`)}
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