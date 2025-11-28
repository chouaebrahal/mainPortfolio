import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SmoothScrollWrapper({ children, lenisRef }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 2,
      smoothTouch: true,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose lenis instance to parent
    if (lenisRef) {
      lenisRef.current = lenis;
    }
    // EXPOSE GLOBALLY 🔥🔥
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const images = scrollRef.current?.querySelectorAll("img") || [];
    const updateScroll = () => {
      ScrollTrigger.refresh();
    };

    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", updateScroll);
      }
    });

    setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
      images.forEach((img) => {
        img.removeEventListener("load", updateScroll);
      });
    };
  }, [lenisRef]);

  return <div ref={scrollRef}>{children}</div>;
}

export default SmoothScrollWrapper;
