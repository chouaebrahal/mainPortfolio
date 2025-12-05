import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { urlFor } from "../api/sanityClient";
import { Link } from "react-router-dom";
import { ExternalLink, Github } from "lucide-react";
import { useModal } from "./ModalProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);
const Projects = ({ projects }) => {
  const cardRef = useRef([]);
  const ImgRef = useRef([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const isMobile = window.innerWidth < 768 || "ontouchstart" in window; 
  useEffect(() => {
    const handleResize = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsDesktop(!isTouchDevice && window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll animation effect
  useEffect(() => {
    if (!containerRef.current) return;

    // Animate each card with alternating direction
    cardRef.current.forEach((card, index) => {
      if (!card) return;

      // Odd index = from left, Even index = from right
      const fromLeft = (index / 2) <= 0.5;
      gsap.fromTo(
        card,
        {
          x: fromLeft ? -200 : 200, // Start position
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0, // End position
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // Start animation when card is 80% in viewport
            end: "top 20%",
            scrub: isMobile ? false : 1, // Reverted to scrub: 1 as per user request
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [projects]);

  console.log(projects);

  const handleMove = (e, index) => {
    if (!isDesktop) return;

    const card = ImgRef.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const half = rect.width / 2;
    const halfy = rect.height / 2;

    const rotateY = x < half ? -12 : 12;
    const rotateX = y < halfy ? 12 : -12;

    gsap.to(card, {
      scale: 1.15,
      rotateY,
      rotateX,
      duration: 1,
      ease: "power3.out",
    });
  };

  const handleLeave = (e, index) => {
    if (!isDesktop) return;
    gsap.to(ImgRef.current[index], {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: "power3.out",
    });
  };

  const handleCardClick = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div
      ref={containerRef}
      className="container mx-auto px-5 columns-1 sm:columns-2  gap-4 "
    >
      {projects.map((e, index) => {
        return (
          <div
            onClick={() => handleCardClick(e._id)}
            ref={(ele) => (cardRef.current[index] = ele)}
            key={e._id}
            className="group relative break-inside-avoid p-5 bg-linear-to-br from-background to-card overflow-hidden flex justify-center items-center mb-4 rounded-2xl perspective-distant cursor-pointer shadow-[0_0_5px_var(--border-color)] "
          >
            <img
              onMouseMove={(e) => handleMove(e, index)}
              onMouseLeave={(e) => handleLeave(e, index)}
              ref={(el) => (ImgRef.current[index] = el)}
              src={urlFor(e.mainImage.asset._ref)}
              alt={e.title}
              className="w-300  object-contain -translate-z-50 "
            />
            <h1 className="absolute bottom-2 lg:-bottom-30 lg:group-hover:bottom-5 text-2xl md:text-3xl lg:text-5xl w-full text-center text-primary text-shadow-[0_0_20px_var(--background-color)] transition-all duration-300">
              {e.title}
            </h1>
            <div className="icon-container absolute top-2 lg:-top-20 lg:group-hover:top-5 left-[50%] translate-x-[-50%] flex gap-4 transition-all duration-300">
              <div className="relative group/icon">
                <a
                  href={e.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-3 rounded-full block hover:text-primary  hover:scale-1.05 transition-all duration-300"
                >
                  <ExternalLink className="w-6 h-6 lg:w-7 lg:h-7" />
                </a>
                <div className="absolute top-1/2 -translate-y-1/2 -left-25 transform text-bold   opacity-0 group-hover/icon:opacity-100 transition duration-300 pointer-events-none bg-primary text-white text-xs py-1 px-3 rounded shadow-lg">
                  Live Demo
                </div>
              </div>
              <div className="relative group/icon">
                <a
                  href={e.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-3 rounded-full block hover:text-primary  hover:scale-1.05  transition-all duration-300"
                >
                  <Github className="w-6 h-6  lg:w-7 lg:h-7" />
                </a>
                <div className="absolute top-1/2 -translate-y-1/2 -right-25 transform text-bold opacity-0 group-hover/icon:opacity-100 transition duration-300 pointer-events-none bg-primary text-white text-xs py-1 px-3 rounded shadow-lg">
                  Github Link
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
