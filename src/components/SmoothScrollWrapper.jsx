import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SmoothScrollWrapper({ children, lenisRef }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 1.5,
    });

    if (lenisRef) lenisRef.current = lenis;

    window.lenis = lenis;

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

    gsap.ticker.add((t) => {
      lenis.raf(t * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);

    scrollRef.current
      ?.querySelectorAll("img")
      .forEach((img) => img.addEventListener("load", refresh));

    requestAnimationFrame(refresh);
    setTimeout(refresh, 400);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return <div ref={scrollRef}>{children}</div>;
}

export default SmoothScrollWrapper;
