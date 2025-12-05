import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedNumber({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    // Add a small delay to ensure element is rendered
    setTimeout(() => {
      if (el) {
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
      }
    }, 300);

    // Clean up animation
    return () => {
      if (el) {
        const trigger = ScrollTrigger.getScrollTrigger && ScrollTrigger.getScrollTrigger(el);
        if (trigger) trigger.kill();
      }
    };
  }, [value]);

  return <span ref={ref}>0</span>;
}

export default AnimatedNumber
