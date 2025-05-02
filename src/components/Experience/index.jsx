import React from 'react'
import { Timeline } from '../Tool/timeline';
import { Notebook } from '../Tool/notebook';


const experiences = [
    {
        startDate: "February 2021",
        endDate:   "May 2021",
        title:     "Full-Stack Development Intern",
        location: "Xixi Food Company -- Hainan, China",
        content:   <Notebook items={["1. Designed and implemented a front-end web page to streamline inventory management.", 
                "2. Developed and integrated a MySQL database for efficient storage and retrieval of product inventory data."]} 
                />
        },
    {
        startDate: "October 2022",
        endDate:   "February 2023",
        title:     "Software Developer Intern",
        location: "Dell Technologies -- Shanghai, China",
        content:   <Notebook items={["1. Improved machine learning models by modifying training data and adjusting data types using PyTorch, TensorFlow, and Keras.", 
                    "2. Tested and debugged an embedded system on a Raspberry Pi integrated with R/C cars, leveraging Linux command-line utilities to validate real-time performance.", 
                    "3. Leveraging Python, Django, and REST APIs to develop a dynamic website that lets users remotely control a car from various locations has been an exhilarating and innovative experience."]} 
                    />,
            }
];

export default function Index() {
    return (
        <section id="experience">
            <div className="relative text-white h-full pt-40 px-4 md:mx-auto flex flex-col [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">      

            <h1 className="text-3xl mx-auto font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-400">
                Experience
                </span>
            </h1>          

                <Timeline data={experiences} />

            </div>
        </section>
    )
}
