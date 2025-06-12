//src/app/[locale]/page.js
"use client";

import { useEffect, useState, useMemo } from "react";  
import { Provider, useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import { store } from "@/store";
import { setIsMobile } from "@/store/responsiveSlice";
import { VerticalDock } from "@/components/Tool/verticalDock";
import Intro from "@/components/Intro";
import Description from '@/components/Description';
import Stack from '@/components/Stack';
import Project from '@/components/Project';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import SketchModal from "@/components/Tool/sketchModal";
import ContactForm from "@/components/Tool/contactForm";
import {
  IconChevronsUp ,
  IconInfoCircle,
  IconCode,
  IconFileText,
  IconSchool,
  IconBriefcase,
  IconContract,
  IconLanguage  
} from '@tabler/icons-react';

function ResponsiveListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mql = window.matchMedia('(max-width: 767px)');
    dispatch(setIsMobile(mql.matches));
    
    const onChange = (e) => dispatch(setIsMobile(e.matches));
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, [dispatch]);

  return null;
}
function HomeContent() {
  const t = useTranslations("dock"); 
  const isMobile = useSelector((state) => state.responsive.isMobile);
  const [isContactOpen, setContactOpen] = useState(false);
  const router = useRouter();
  const { locale, ...restParams } = useParams();
  const tDock = useTranslations("dock");

  const locales = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" }
  ];

  const dockItems = useMemo(() => {
    const standard = [
      { key: "top", title: t("top"), icon: <IconChevronsUp />, href: "#intro", offsetY: 0 },
      { key: "description", title: t("description"), icon: <IconInfoCircle />, href: "#description", offsetY: isMobile ? -20 : -190 },
      { key:  "skillSet", title: t("skillSet"), icon: <IconCode />, href: "#stack", offsetY: isMobile ? 80 : 150 },
      { key:  "experience", title: t("experience"), icon: <IconBriefcase />, href: "#experience", offsetY: isMobile ? 0 : -100 },
      { key:  "project", title: t("project"), icon: <IconFileText />, href: "#projects", offsetY: isMobile ? 70 : 40 },
      { key:  "education", title: t("education"), icon: <IconSchool />, href: "#education", offsetY: isMobile ? 70 : 40 },
      { key:  "contact", title: t("contact"), icon: <IconContract />, onClick: () => setContactOpen(true) },
    ];
    const langItem = {
      key:       "language-switch",
      title:     t("languageSwitcher"),
      icon:      <IconLanguage  />,
      subItems:  locales.map(loc => ({
        key:    loc.code,
        title:  loc.label,
        icon:   <span className="font-mono">{loc.label}</span>,
        onClick: () => {
          const rest = window.location.pathname.slice(locale.length + 1);
          window.location.href = `/${loc.code}${rest}`;
        },
        disableTooltip: true
      }))
    };

    return [
        ...standard.slice(0, -1),  
        langItem,                 
        standard[standard.length - 1] 
      ];
  }, [locale, tDock, router]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll(); 
    })();
  }, []);

  return (
    <>
      <ResponsiveListener />
      <VerticalDock items={dockItems} />

      <main className="flex flex-col">
        <Intro />
        <Description />
        <Stack />
        <Experience />
        <Project />
        <Education />
        <Footer />
      </main>

      {isContactOpen && (
        <SketchModal onClose={() => setContactOpen(false)}>
          <ContactForm onClose={() => setContactOpen(false)} />
        </SketchModal>
      )}
    </>
  );
}

export default function Home() {
  return (
    <Provider store={store}>
      <HomeContent />
    </Provider>
  );
}