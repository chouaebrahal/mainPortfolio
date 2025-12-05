import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SmoothScrollWrapper({ children, lenisRef }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // responsive device detect

    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.5,     // smoother desktop, faster mobile
      smooth: true,
      smoothWheel: true,
      smoothTouch: true,                  // 🔥 important for mobile
      touchMultiplier: isMobile ? 1.2 : 1.6,
      wheelMultiplier: isMobile ? 1.1 : 1.5,
    });

    if (lenisRef) lenisRef.current = lenis;
    window.lenis = lenis;

    // --- GSAP + Lenis integration ---
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: document.body });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();

    ScrollTrigger.addEventListener("refresh", () => lenis.update()); // mobile fix 🔥
    window.addEventListener("resize", refresh);

    scrollRef.current
      ?.querySelectorAll("img")
      .forEach((img) => img.addEventListener("load", refresh));

    requestAnimationFrame(refresh);
    setTimeout(refresh, 350);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return <div ref={scrollRef}>{children}</div>;
}

export default SmoothScrollWrapper;
