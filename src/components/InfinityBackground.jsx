import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const InfinityBackground = () => {
  const infinityRef = useRef(null);
  const containerRef = useRef(null);

  const colors = [
    "#f215bb", "#d414c4", "#b613cd", "#9812d6", "#7a11df",
    "#5c10e8", "#3e0ff1", "#200efa", "#220dff", "#440cff",
    "#660bff", "#880aff", "#aa09ff", "#cc08ff", "#ee07ff",
    "#ff06f7", "#ff05d5", "#ff04b3", "#ff0391", "#ff026f",
    "#ff014d", "#ff002b", "#ff0009", "#ff001f", "#ff003f",
    "#ff005f", "#ff007f", "#ff009f", "#ff00bf", "#ff00df",
    "#f215bb"
  ];

  useEffect(() => {
    const infinityPath = infinityRef.current;
    const container = containerRef.current;

    if (!infinityPath || !container) return;

    // Color animation
    gsap.to(infinityPath, {
      stroke: colors[0],
      duration: 0.1,
      repeat: -1,
      ease: "none",
      onRepeat: function() {
        const currentColor = this.targets()[0].style.stroke;
        const currentIndex = colors.indexOf(currentColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        gsap.set(this.targets()[0], { stroke: colors[nextIndex] });
      }
    });

    // 3D rotation animation
    gsap.to(container, {
      rotationY: 360,
      rotationX: 15,
      transformOrigin: "center center",
      duration: 10,
      repeat: -1,
      ease: "power2.inOut"
    });

  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center pointer-events-none transform-gpu z-0"
      style={{ perspective: '1000px' }}
    >
      <svg 
        className="w-full h-full max-w-4xl max-h-4xl opacity-60"
        viewBox="0 0 200 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={infinityRef}
          d="M 50,50 
             C 20,20 80,20 50,50 
             C 20,80 80,80 50,50 
             C 80,20 140,20 110,50 
             C 140,80 80,80 90,50 
             C 80,20 20,20 30,50 
             C 20,80 80,80 50,50 Z"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ 
            stroke: '#f215bb'
          }}
        />
      </svg>
    </div>
  );
};

export default InfinityBackground;