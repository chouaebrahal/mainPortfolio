import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useRef } from "react";


const SectionsHeader = ({ title, description }) => {
  const imgref = useRef([])
  useGSAP(()=>{
    gsap.to([imgref.current[0],imgref.current[1]],{
      y:"-10px",
      yoyo:true,
      repeat:-1,
      duration:0.7
    })
  })
  return (
    <div className="container px-5 mx-auto flex flex-col items-center justify-center my-40 italic relative">

      <div className="relative">
        <h1 className="text-6xl md:text-7xl lg:text-9xl text-primary heading-text-style mb-20 w-fit text-center">
        {title}
      </h1>
      <img ref={el => (imgref.current[0]= el)} className="hidden md:block absolute -top-20 lg:-top-30 -right-20 lg:-right-30 w-20  lg:w-30" src="Untitled_design-removebg-preview.png" alt="" />
      <img ref={el => (imgref.current[1] = el)} className="hidden md:block absolute bottom-0 -left-20 lg:-left-30 w-20 lg:w-30" src="Untitled_design-removebg-preview.png" alt="" />
      </div>
      <p className="text-xl md:text-2xl text-center">{description}</p>
      
    </div>
  );
};

export default SectionsHeader;
