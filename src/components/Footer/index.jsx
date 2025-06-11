//src/components/Footer/index.jsx
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconPhone } from '@tabler/icons-react';
import { HoverGradientButton } from '@/components/Tool/hoverGradientButton';
import ContactForm from '@/components/Tool/contactForm';
import SketchModal from '@/components/Tool/sketchModal';

export default function Footer() {
    const t = useTranslations("footer");
    const [isOpen, setOpen] = useState(false);

    const socialLinks = [
        {
        key: "github",
        href: "https://github.com/psyvalvrave",
        Icon: IconBrandGithub
        },
        {
        key: "linkedin",
        href: "https://www.linkedin.com/in/zhecheng-li-0923b4190/",
        Icon: IconBrandLinkedin
        },
        {
        key: "email",
        href: "mailto:lizhecheng97@gmail.com",
        Icon: IconMail
        },
        {
        key: "phone",
        href: "tel:+16728666948",
        Icon: IconPhone
        }
    ];
    
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
                                {t("buttons.contact")}
                            </HoverGradientButton>
                            <HoverGradientButton
                                href="/files/Zhecheng_Li_Resume.pdf"
                                as="a"
                                download
                            >
                                {t("buttons.download")}
                            </HoverGradientButton>
                        </div>
                        <div className="hidden md:block self-stretch w-px bg-gray-600" />
                        <div className="block md:hidden w-full h-px bg-gray-600" />
                        <div className="flex space-x-6">
                            {socialLinks.map(({ key, href, Icon }) => {
                                const label = t(`social.${key}`);
                                return (
                                <div key={key} className="relative inline-block group">
                                    <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
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
                                );
                            })}
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
