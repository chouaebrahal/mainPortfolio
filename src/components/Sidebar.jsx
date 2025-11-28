import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  User,
  Folders,
  FileUser,
  Contact,
  House,
  X,
  CircleChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const navItems = [
  { id: "about", icon: House, label: "Home", link: "/" },
  { id: "projects", icon: Folders, label: "PROJECTS", link: "#projects" },
  { id: "contact", icon: Contact, label: "CONTACT", link: "#contact" },
];

const sidebar = ({ isOpen, setIsOpen }) => {
  const sidebarRef = useRef(null);
  const menuRef = useRef(null);
  const spanRef = useRef([]);
  const [menuClicked, setMenuClicked] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true); // track first load
  const navigate = useGSAP(
    () => {
      const sidebar = sidebarRef.current;

      gsap.fromTo(
        sidebar,
        {
          x:
            isOpen && menuClicked
              ? "-320px"
              : isOpen && !menuClicked
              ? "-100px"
              : firstLoad
              ? "-320px"
              : 0,
        },
        {
          x: isOpen ? 0 : menuClicked ? "-320px" : "-100px",

          duration: 0.8,
          ease: "power1.out",
          delay: 0.5,
        }
      );

      const tl2 = gsap.timeline();
      tl2.to(sidebar, {
        y: 30,
        yoyo: true,
        ease: "none",
        repeat: -1,
        duration: 1,
      });
      sidebar.addEventListener("mouseenter", () => {
        tl2.pause();
      });
      sidebar.addEventListener("mouseleave", () => {
        tl2.resume();
      });

      console.log(isOpen);
      if (firstLoad) setFirstLoad(false);
    },
    { scope: sidebarRef.current, dependencies: [isOpen] }
  );

  const toggleMenu = () => {
    const newState = !menuClicked;
    setMenuClicked(newState);
    gsap.to(spanRef.current, {
      opacity: newState ? 1 : 0,
      duration: 0.5,
      delay: newState ? 0.2 : 0,
      stagger: 0.05,
    });

    gsap.to(sidebarRef.current, {
      width: newState ? 150 : 60,
      delay: newState ? 0 : 0.2,
      duration: 0.5,
    });
  };
  const closeMenu = () => {
    const newState = false;
    setMenuClicked(newState);
    gsap.to(spanRef.current, {
      opacity: 0,
      stagger: 0.05,
    });

    gsap.to(sidebarRef.current, {
      delay: 0.1,
      width: 60,
      duration: 0.5,
    });
  };
  const handleClose = () => {
    closeMenu();
    setIsOpen((prev) => !prev);
  };
  const scrollTo = (link) => {
    window.lenis.scrollTo(link, {
      duration: 3,
      easing: (t) => t * t,
    });
  };

  return (
    <nav
      ref={sidebarRef}
      className="fixed top-[50%] text-white translate-y-[-50%] z-2000 left-10 h-80 w-15 py-10 px-5 bg-background shadow-[0_0_5px_0_var(--border-color)] rounded-lg cursor-pointer"
      aria-label="Main navigation"
    >
      <ul className="flex flex-col justify-between items-center h-full">
        <li
          ref={menuRef}
          onClick={handleClose}
          className="menu w-5 h-5 shrink-0 hover:text-primary hover:scale-115 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary rounded"
        >
          <button aria-label="Close navigation menu">
            <X />
          </button>
        </li>
        <li
          ref={menuRef}
          onClick={toggleMenu}
          className="menu w-5 h-5 shrink-0 hover:text-primary hover:scale-115 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary rounded"
        >
          <button aria-label={menuClicked ? "Collapse menu" : "Expand menu"}>
            <CircleChevronRight />
          </button>
        </li>
        {navItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <li
              onClick={() => scrollTo(item.link)}
              className="w-full hover:text-primary hover:bg-background/60 transition-all duration-300 hover:scale-110"
              key={item.id}
            >
              {item.link.startsWith('#') ? (
                <button
                  className="p-0 m-0 flex items-start gap-2 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  aria-label={`Scroll to ${item.label}`}
                  onClick={() => scrollTo(item.link)}
                >
                  <Icon className="w-5 h-5 shrink-0 hover:text-primary" />
                  <span
                    ref={(el) => (spanRef.current[i] = el)}
                    className="opacity-0"
                  >
                    {item.label}
                  </span>
                </button>
              ) : (
                <Link
                  className="p-0 m-0 flex items-start gap-2 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  to={item.link}
                  aria-label={`Go to ${item.label}`}
                >
                  <Icon className="w-5 h-5 shrink-0 hover:text-primary" />
                  <span
                    ref={(el) => (spanRef.current[i] = el)}
                    className="opacity-0"
                  >
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default sidebar;
