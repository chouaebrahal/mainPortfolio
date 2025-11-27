import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";

const Button = ({className,children,type,onClick}) => {
  const btnRef = useRef(null)
  useGSAP(()=>{
   const btn = btnRef.current;

    const handleMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power3.out",
      });
    };
    const handleClick = (e) => {
        const btn = btnRef.current;
        gsap.fromTo(btn,{
         scale:0.9
        },
        {
            scale:1,
            duration:0.7,
            yoyo:true
        })
    }

    const reset = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.3, ease: "power3.out" });
    };

    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("click", handleClick);
    btn.addEventListener("mouseleave", reset);

   
  })
  return (
    <button ref={btnRef} onClick={onClick} type={type} className={`bg-linear-to-r from-primary text-white to-third px-6 py-2 rounded-md font-bold text-sm cursor-pointer ${className ?? ''}`}>{children}</button>
  )
}

export default Button