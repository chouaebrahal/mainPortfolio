import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionsHeader from "./SectionsHeader";
import { useGSAP } from "@gsap/react";
import AnimatedNumber from "./AnimatedNumber";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const skills = [
    {
      name: "Html",
      icon: "./html5.png",
      color: "#f16529",
      description:
        "Semantic and accessible markup, clean structure, SEO-friendly page layouts, reusable components, and building responsive sections from scratch.",
      level: 90,
    },
    {
      name: "CSS",
      icon: "./css.png",
      color: "#264ee4",
      description:
        "Skilled in creating responsive layouts, flex and grid systems, animations, hover effects, transitions, custom components, and pixel-perfect UI designs.",
      level: 85,
    },
    {
      name: "JavaScript",
      icon: "./javascript.png",
      color: "#f7df1d",
      description:
        "DOM manipulation, API integration, event handling, modular code, and building interactive UI features",
      level: 80,
    },
    {
      name: "React",
      icon: "react.png",
      color: "#5ed3f3 ",
      description:
        "Reusable components, hooks, state management, controlled/uncontrolled forms, fetching data, routing, performance optimization",
      level: 80,
    },
    {
      name: "TypeScript",
      icon: "typescript.png",
      color: "#007acc",
      description:
        "Using TypeScript to write safer and more predictable front-end code. Able to define interfaces, types, and props for React components, reduce bugs, improve code readability, and make the overall project structure more maintainable and professional",
      level: 80,
    },
    {
      name: "Next.js",
      icon: "nextjs.png",
      color: "#000000",
      description:
        "React production framework Building fast, responsive, and modern front-end interfaces using the App Router, file-based routing, dynamic UI with client components, optimized images, metadata for SEO, smooth navigation, and clean component structure.",
      level: 75,
    },
    {
      name: "Tailwind CSS",
      icon: "tailwind.png",
      color: "#00b9d8",
      description:
        "Experienced in building fast, scalable, and consistent interfaces using utility-first classes. Able to create complex layouts, animations, and reusable design systems efficiently.",
      level: 92,
    },
  ];

  useGSAP(() => {
    const containers = gsap.utils.toArray(".wrapper");
    setTimeout(() => {
      containers.forEach((container, index) => {
        const progressDiv = container.querySelector(".inside-progress");
        const levelText = container.querySelector(".level");
        const tl = gsap.timeline();
        tl.fromTo(
          progressDiv,
          {
            width: 0,
          },
          {
            width: `${progressDiv.getAttribute("data-level")}%`,

            scrollTrigger: {
              trigger: container,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
        tl.from(container, {
          opacity: 0,
          scale: 0.7,
          x: index % 2 === 0 ? "-200px" : "200px",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
        });

      });
    }, 300);
    // ScrollTrigger.refresh();
  });
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <SectionsHeader
        title={"Skills & Technologies"}
        description={
          "A collection of the tools and technologies I work with to build fast, modern, and scalable web experiences."
        }
        headingLevel="h2"
      />
      <div className="container mx-auto " role="list">
        {skills.map((skill, index) => {
          return (
            <div
              key={skill.name}
              className={`wrapper flex w-[80%] mx-auto ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
              role="listitem"
            >
              <div
                className="flex flex-col items-start w-130 bg-linear-to-br from-background to-card rounded-2xl py-10 px-5 mb-5"
                style={{
                  borderColor: skill.color,
                  borderWidth: "1px",
                  boxShadow: `0 0 10px ${skill.color} `,
                }}
                aria-labelledby={`skill-${index}-name`}
              >
                <div
                  className={`flex gap-5  items-center justify-center w-full `}
                >
                  <img
                    className="w-15"
                    src={skill.icon}
                    alt={`${skill.name} logo`}
                    width="60"
                    height="60"
                  />
                  <h3 id={`skill-${index}-name`} className="text-4xl lg:text-5xl text-white font-bold hover:text-primary italic">
                    {skill.name}
                  </h3>
                </div>
                <p className="text-xl mt-10 text-center w-full">
                  {skill.description}
                </p>
                <div className="progress-container flex gap-5 items-center w-full mt-10">
                  <div className="level" aria-label={`${skill.level}% proficiency`}>
                    <AnimatedNumber value={skill.level} />
                    <span className="sr-only">Proficiency level: {skill.level}%</span>
                  </div>
                  <div className="w-full h-5 bg-black/10 overflow-hidden rounded-full" role="progressbar" aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100" aria-label={`${skill.name} proficiency`}>
                    <div
                      className="inside-progress  h-full"
                      style={{ backgroundColor: `${skill.color}` }}
                      data-level={skill.level}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;
