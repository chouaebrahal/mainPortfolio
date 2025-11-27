import { useEffect, useRef, useState } from "react";
import { useModal } from "./ModalProvider";
import { client } from "../api/sanityClient";
import { urlFor } from "../api/sanityClient";
import { ExternalLink, Github, Scale, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function useSmoothScroll(isActive) {
  const scrollRef = useRef(null);
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    if (!isActive || !scrollRef.current) return;

    const container = scrollRef.current;
    const lerp = 0.08; // Smoother - lower = more smooth (try 0.05-0.15)

    // Easing function for smooth deceleration
    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const smoothScroll = () => {
      const diff = targetScroll.current - currentScroll.current;
      const delta = diff * lerp;

      // Apply easing
      currentScroll.current += delta;
      container.scrollTop = currentScroll.current;

      // Continue animation if still moving
      if (Math.abs(diff) > 0.5) {
        animationFrame.current = requestAnimationFrame(smoothScroll);
      } else {
        // Snap to final position
        currentScroll.current = targetScroll.current;
        container.scrollTop = targetScroll.current;
        animationFrame.current = null;
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();

      // Smooth acceleration
      const scrollSpeed = 1.2; // Adjust scroll sensitivity (0.5 = slower, 2 = faster)
      targetScroll.current += e.deltaY * scrollSpeed;

      // Clamp to boundaries
      const maxScroll = container.scrollHeight - container.clientHeight;
      targetScroll.current = Math.max(
        0,
        Math.min(targetScroll.current, maxScroll)
      );

      // Start animation if not already running
      if (!animationFrame.current) {
        currentScroll.current = container.scrollTop;
        animationFrame.current = requestAnimationFrame(smoothScroll);
      }
    };
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      console.log('touch start')
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      console.log('touch move')
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY; // same as wheel delta

      const scrollSpeed = 1.2;
      targetScroll.current += deltaY * scrollSpeed;

      const maxScroll = container.scrollHeight - container.clientHeight;
      targetScroll.current = Math.max(
        0,
        Math.min(targetScroll.current, maxScroll)
      );

      if (!animationFrame.current) {
        currentScroll.current = container.scrollTop;
        animationFrame.current = requestAnimationFrame(smoothScroll);
      }

      touchStartY = touchY; // update for next frame
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    currentScroll.current = container.scrollTop;
    targetScroll.current = container.scrollTop;

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isActive]);

  return scrollRef;
}

const Modal = () => {
  const { isModalOpen, closeProjectModal, selectedProjectId } = useModal();
  const scrollRef = useSmoothScroll(isModalOpen);
  const backdropRef = useRef(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    client
      .fetch('*[_type == "project" && _id == $id][0]', {
        id: selectedProjectId,
      })
      .then((res) => setProject(res));
  }, [selectedProjectId]);

  console.log(backdropRef.current);
  useEffect(() => {
    if (!backdropRef.current || !project) return;
    console.log(backdropRef.current);
    gsap.from(backdropRef.current, {
      scale: 0.4,
      duration: 0.6,
    });
    gsap.from(backdropRef.current.querySelector(".card"), {
      scale: 0.6,
      delay: 0.2,

      ease: "none",
      duration: 0.6,
    });
  }, [project]);

  if (!project) return;
  console.log(project.fullDescription[0].children[0].text);
  return (
    <div
      ref={backdropRef}
      className="fixed w-full h-full bg-white/10 backdrop-blur-lg z-1000 white flex items-center justify-center pointer-events-none "
    >
      <span
        onClick={closeProjectModal}
        className="absolute top-5 right-5 bg-primary p-2 rounded-full cursor-pointer"
      >
        <X />
      </span>
      <div
        ref={scrollRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          overscrollBehavior: "contain",
          touchAction: "none", // <-- IMPORTANT for mobile scrolling
        }}
        className="card w-[90%] md:w-[70%] h-fit md:h-200  bg-linear-to-bl from-background to-card rounded-2xl overflow-y-auto  scrollbar-none pointer-events-auto "
      >
        <div className="w-full h-100 lg:h-160  border-b border-border relative">
          <img
            className="relative z-500 w-full h-full -mt-20"
            src={urlFor(project.mainImage.asset._ref)}
            alt={project.title}
          />
          <div className="icon-container absolute top-25 z-1000 left-[50%] translate-x-[-50%] flex gap-4">
            <div className="relative group">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-3 rounded-full block hover:text-primary  hover:scale-1.05 transition-all duration-300"
              >
                <ExternalLink className="w-6 h-6 lg:w-7 lg:h-7" />
              </a>
              <div className="absolute top-1/2 -translate-y-1/2 -left-25 transform text-bold   opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-primary text-white text-xs py-1 px-3 rounded shadow-lg">
                Live Demo
              </div>
            </div>
            <div className="relative group">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-3 rounded-full block hover:text-primary  hover:scale-1.05  transition-all duration-300"
              >
                <Github className="w-6 h-6  lg:w-7 lg:h-7" />
              </a>
              <div className="absolute top-1/2 -translate-y-1/2 -right-25 transform text-bold opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-primary text-white text-xs py-1 px-3 rounded shadow-lg">
                Github Link
              </div>
            </div>
          </div>
          <h1 className="absolute z-1000 -bottom-8 lg:-bottom-12 left-1/2 -translate-x-1/2 mt-10 text-4xl md:text-5xl lg:text-7xl stroked-text-shadow p-0 text-center w-full">
            {project.title}
          </h1>
        </div>
        <div className="info px-5 lg:px-10 my-10 ">
          <div className="about mt-4">
            <h1 className="text-2xl lg:text-4xl font-bold mb-3 text-justify w-full max-w-120 ">
              Description
            </h1>
            <div>
              {project.fullDescription.map((e, index) => {
                return (
                  <p key={index} className="text-lg">
                    {e.children[0].text}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="technologies mt-5">
            <h1 className="text-2xl font-bold">Technologies</h1>
            <div className="w-full  overflow-x-auto scrollbar-none flex gap-4 my-3">
              {project.techStack.map((e, index) => {
                return (
                  <span
                    key={index}
                    className="px-4 py-1 bg-primary flex items-center justify-center text-sm font-bold w-fit text-center rounded-md flex-nowrap shrink-0"
                  >
                    {e}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="links flex flex-col gap-5 mt-5">
            <div>
              <div className="flex items-center gap-2 text-2xl ">
                <ExternalLink className="text-primary" />
                Website
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                className="text-third hover:text-third/80"
              >
                {project.liveUrl}
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 text-2xl ">
                <Github className="text-primary" />
                Github
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                className="text-third hover:text-third/80"
              >
                {project.githubUrl}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
