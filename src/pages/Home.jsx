import SkillsSection from "../components/SkillsSection";
import Contact from "../components/Contact";
import  Sidebar  from "../components/Sidebar";
import Hero from '../components/Hero';
import { useState } from "react";
import Projects from "../components/Projects";


const Home = ({lenisRef}) => {
     // Initialize sidebar open state based on window width
  
  return (
     <div className="w-full overflow-hidden text-foreground  bg-linear-to-br from-background to-card relative">
      
      
     
      
      
        
      <Hero lenisRef={lenisRef} />
     
      
      <SkillsSection />

      <Projects/>

      <Contact />

     
   
    </div>
  )
}

export default Home