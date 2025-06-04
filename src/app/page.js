"use client";

import { useEffect, useState } from "react";  
import { Provider, useDispatch } from "react-redux";
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

  return <>{children}</>;
}
export default function Home() { 
  const [isContactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  const dockItems = [
    { title: 'Top', icon: <IconChevronsUp />, href: '#intro' },
    { title: 'Description', icon: <IconInfoCircle />, href: '#description', offsetY: -200},
    { title: 'Skill Set', icon: <IconCode />, href: '#stack', offsetY: 150 },
    { title: 'Experience', icon: <IconBriefcase />, href: '#experience'},
    { title: 'Project', icon: <IconFileText />, href: '#projects' },
    { title: 'Education', icon: <IconSchool />, href: '#education' },
    { title: 'Contact', icon: <IconContract />, onClick: () => setContactOpen(true)},
  ];
  

  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const locomotiveScroll = new LocomotiveScroll();
    }
    )();
  }, []);

  return (
    <Provider store={store}>
      <ResponsiveListener>
        <>
        <VerticalDock items={dockItems} />
        <main className='flex flex-col'>
          <Intro />
          <Description  />
          <Stack  />
          <Experience  />
          <Project  />
          <Education  />
          <Footer />
        </main>
        {isContactOpen && (
            <SketchModal onClose={() => setContactOpen(false)}>
              <ContactForm onClose={() => setContactOpen(false)} />
            </SketchModal>
          )}
        </>
      </ResponsiveListener>
    </Provider>
  );
}