import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const info = {
  name: "Rahal Chouaeb",
  job: "Junior Front-End Developer",
  aboutMe:
    "Hi, I'm a Junior Front-End Developer. I build responsive and interactive websites using React, Tailwind CSS, and modern web technologies, turning design ideas into smooth, user-friendly experiences.",
};

const Hero = () => {
  const infoRef = useRef(null);
  const chevronDownRef = useRef(null);
  const main = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const image = imageRef.current;

    const tlHover = gsap.timeline({ paused: true });

    tlHover.to(image, {
      scale: 1.3,
      rotation: 2,
      duration: 1.2,
      ease: "power2.out",
    });

    const handleMouseEnter = () => tlHover.play();
    const handleMouseLeave = () => tlHover.reverse();

    image.addEventListener("mouseenter", handleMouseEnter);
    image.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      image.removeEventListener("mouseenter", handleMouseEnter);
      image.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useGSAP(
    () => {
      const infoTl = gsap.timeline({
        onComplete: () => {
          // Enable scroll when all animations complete
          if (window.lenis) {
            window.lenis.start();
          }
        },
      });

      infoTl
        .from(infoRef.current.querySelector(".img-container"), {
          opacity: 0,
          y: -100,
          duration: 0.8,
        })
        .from(infoRef.current.querySelectorAll(".text-info > *"), {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.2,
        })
        .from(chevronDownRef.current, {
          opacity: 0,
        });
    },
    { scope: infoRef.current }
  );

  return (
    <div ref={main} className="w-full h-screen overflow-hidden relative">
      <div
        ref={infoRef}
        className="info flex flex-col items-center justify-center h-full"
      >
        <div className="img-container -mt-20 info p-[3px] rounded-full bg-linear-to-r from-[#f215bb] to-[#9333ea] w-fit relative cursor-pointer grow-0">
          <div className="lg:w-80 lg:h-80 md:w-65 md:h-65 w-50 h-50 border-2 border-transparent rounded-full overflow-hidden hover:shadow-[0_0_30px_#f215bb,0_0_20px_#9333ea,0_0_40px_#f215bb] transition-shadow duration-300">
            <img
              ref={imageRef}
              src={"./chouaebrahal.png"}
              alt={"chouaeb rahal Image"}
              className="w-full object-contain relative -top-10"
              loading="lazy"
            />
          </div>
        </div>
        <div className="text-info flex flex-col info items-center justify-center mt-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {info.name}
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl mt-5">
            {info.job}
          </h2>
          <p className="text-lg max-w-3xl mx-auto w-full px-5 text-center flex flex-wrap mt-10 justify-center">
            {info.aboutMe}
          </p>
        </div>
        <div className="absolute bottom-10" ref={chevronDownRef}>
          <ChevronDown className="w-8 h-8 animate-bounce text-primary " />
        </div>
      </div>
    </div>
  );
};

export default Hero;