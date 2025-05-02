import React, { useState } from 'react';
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconPhone } from '@tabler/icons-react';
import { HoverGradientButton } from '../Tool/hoverGradientButton';
import ContactForm from '../Tool/contactForm';
import SketchModal from '../Tool/sketchModal';

export default function Footer() {
    const [isOpen, setOpen] = useState(false);
    return (
        <section id="footer">
            <footer className="bg-black text-white py-4">
                <div className="container mx-auto px-4 flex flex-col items-center space-y-6">
                    <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
                        <div className="flex space-x-4">
                            <HoverGradientButton
                                className="cursor-pointer"
                                onClick={() => setOpen(true)}
                            >
                                Contact Me
                            </HoverGradientButton>
                            <HoverGradientButton
                                href="/files/Zhecheng_Li_Resume.pdf"
                                as="a"
                                download
                            >
                                Download Resume
                            </HoverGradientButton>
                        </div>
                        <div className="hidden md:block self-stretch w-px bg-gray-600" />
                        <div className="block md:hidden w-full h-px bg-gray-600" />
                        <div className="flex space-x-6">
                            {[
                                {
                                href: "https://github.com/psyvalvrave",
                                label: "GitHub",
                                Icon: IconBrandGithub,
                                },
                                {
                                href: "https://www.linkedin.com/in/zhecheng-li-0923b4190/",
                                label: "LinkedIn",
                                Icon: IconBrandLinkedin,
                                },
                                {
                                    href: 'mailto:lizhecheng97@gmail.com',
                                    label: 'Email',
                                    Icon: IconMail
                                },
                                {
                                href: 'tel:+16728666948',
                                label: 'Phone',
                                Icon: IconPhone
                                }
                            ].map(({ href, label, Icon }) => (
                                <div key={label} className="relative inline-block group">
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                    inline-block text-white
                                    transform transition duration-200
                                    group-hover:text-gray-400
                                    group-hover:scale-x-[-1]
                                    "
                                >
                                    <Icon className="w-6 h-6" />
                                </a>
                                <span
                                    className="
                                    pointer-events-none
                                    absolute bottom-full left-1/2 mb-2
                                    transform -translate-x-1/2
                                    whitespace-nowrap rounded bg-gray-800 px-2 py-1
                                    text-xs text-white
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-200
                                    z-10
                                    "
                                >
                                    {label}
                                </span>
                                </div>
                            ))}
                            </div>
                    </div>
                    <p className="text-xs">
                        Zhecheng Li © 2025
                    </p>
                </div>
                {isOpen && (
                <SketchModal onClose={() => setOpen(false)}>
                    <ContactForm onClose={() => setOpen(false)} />
                </SketchModal>
                )}
            </footer>
        </section>
    );
}
