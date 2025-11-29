import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SmoothScrollWrapper({ children, lenisRef }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Check if device is touch-enabled and screen is small
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768; // You can adjust this breakpoint as needed

    // Only initialize Lenis on non-touch devices or large screens
    if (isTouchDevice || isSmallScreen) {
      // On touch devices or small screens, don't initialize Lenis
      // Just expose a null lenis instance if needed by parent
      if (lenisRef) {
        lenisRef.current = null;
      }
      window.lenis = null;

      // Still set up ScrollTrigger for basic functionality without Lenis
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
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        window.removeEventListener("resize", handleResize);
        images.forEach((img) => {
          img.removeEventListener("load", updateScroll);
        });
      };
    }

    // Initialize Lenis for non-touch and large screens
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 2,
      smoothTouch: false,
      touchMultiplier: 4,
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
