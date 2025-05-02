import React, { useState } from 'react';
import Image from 'next/image';
import ImageModal from './imageModal';
import Glow from './glow';


const ProjectDisplay = ({ title, imageSrc, githubUrl, keywords, description, downloadUrl}) => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className="flex flex-col w-full max-w-full h-[60vh] gap-4 bg-[radial-gradient(circle_200px_at_50%_500px,#e8b3f536,#15012b)] p-6 rounded-lg shadow-lg">       
            <div className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer transform transition duration-200 ease-out hover:scale-105" 
            onClick={() => setModalOpen(true)}
            >
                <Glow />           
                <Image 
                    src={imageSrc} 
                    alt={title} 
                    fill 
                    className="object-contain" 
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                />                         
            </div>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex gap-4">
                    {githubUrl && (
                        <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-block group w-max text-lg font-medium text-white"
                        >
                        <span className="relative z-10 px-1 group-hover:text-purple-950">
                            Learn More
                        </span>
                        <span
                            className="absolute left-0 bottom-0 w-full h-0.5 bg-red-500 z-0 
                                    transition-all duration-300 ease-out 
                                    group-hover:h-full"
                        />
                        </a>
                    )}
                    {downloadUrl && (
                        <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-block group w-max text-lg font-medium text-white"
                        >
                        <span className="relative z-10 px-1 group-hover:text-purple-950">
                            Download
                        </span>
                        <span
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-red-500 z-0 
                                transition-all duration-300 ease-out 
                                group-hover:h-full"
                        />
                        </a>
                    )}                   
                </div>                         
            </div>
            {description && (
                <p className="mt-2 text-white">
                    {description}
                </p>
            )}
            <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                    <span 
                    key={index} 
                    className="bg-violet-900 text-white text-sm px-2 py-1 rounded"
                    >
                        {keyword}
                    </span>
                ))}
            </div>        
        <ImageModal 
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            imageSrc={imageSrc}
        />
        </div>
    );
};

export default ProjectDisplay;
