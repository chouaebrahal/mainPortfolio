import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedNumber({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    setTimeout(() => {
      gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: value,
        duration: 1.5,
        ease: "power1.out",
        snap: { innerText: 1 }, // round to integers
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
    }, 300);
  }, [value]);

  return <span ref={ref}>0</span>;
}

export default AnimatedNumber
