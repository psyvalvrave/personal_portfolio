"use client";

import { useEffect, useState, useMemo } from "react";  
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/store";
import { setIsMobile } from "@/store/responsiveSlice";
import { VerticalDock } from "@/components/Tool/verticalDock";
import Intro from "../components/Intro";
import Description from '../components/Description';
import Stack from '../components/Stack';
import Project from '../components/Project';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Footer from '../components/Footer';
import SketchModal from "@/components/Tool/sketchModal";
import ContactForm from "@/components/Tool/contactForm";
import {
  IconChevronsUp ,
  IconInfoCircle,
  IconCode,
  IconFileText,
  IconSchool,
  IconBriefcase,
  IconContract 
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
  const isMobile = useSelector((state) => state.responsive.isMobile);
  const [isContactOpen, setContactOpen] = useState(false);

  const dockItems = useMemo(
    () => [
      { title: "Top", icon: <IconChevronsUp />, href: "#intro", offsetY: 0 },
      { title: "Description", icon: <IconInfoCircle />, href: "#description", offsetY: isMobile ? -20 : -190 },
      { title: "Skill Set", icon: <IconCode />, href: "#stack", offsetY: isMobile ? 80 : 150 },
      { title: "Experience", icon: <IconBriefcase />, href: "#experience", offsetY: isMobile ? 0 : -100 },
      { title: "Project", icon: <IconFileText />, href: "#projects", offsetY: isMobile ? 70 : 0 },
      { title: "Education", icon: <IconSchool />, href: "#education", offsetY: isMobile ? 70 : -100 },
      { title: "Contact", icon: <IconContract />, onClick: () => setContactOpen(true) },
    ],
    [isMobile]
  );

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