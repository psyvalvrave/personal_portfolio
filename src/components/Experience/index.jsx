//src/components/Experience/index.jsx
import React from 'react'
import { useTranslations, useMessages } from "next-intl";
import { Timeline } from '@/components/Tool/timeline';
import { Notebook } from '@/components/Tool/notebook';
import './experience.css'


const locations = [
    "Xixi Food Company -- Hainan, China",
    "Dell Technologies -- Shanghai, China"
];

export default function Index() {
    const t = useTranslations("experience");
    const messages = useMessages();                  
    const {entries} = messages.experience;      
    const keys = Object.keys(entries);               

    const data = keys.map((key, idx) => {
        const entry = entries[key];
        const contentKeys = Object.keys(entry.content);

        return {
        startDate: t(`entries.${key}.startDate`),
        endDate:   t(`entries.${key}.endDate`),
        title:     t(`entries.${key}.title`),
        location:  locations[idx],                   
        content:   <Notebook items={contentKeys.map(i => t(`entries.${key}.content.${i}`))} />
        };
    });
    return (
        <section id="experience" >
            <div className="experience-content">      
            <h1 className="experience-title">
                <span className="gradient-text">
                {t("heading")}
                </span>
            </h1>          
            <Timeline data={data} />
            </div>
        </section>
    )
}
