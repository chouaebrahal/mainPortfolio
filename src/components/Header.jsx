import { Linkedin, X, ExternalLink, Mail, Menu, House } from "lucide-react";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Header = ({ isOpen, setIsOpen }) => {
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.from(headerRef.current, { top: -80, duration: 1 });
  });

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-2000 max-w-full h-20 bg-background shadow-[0_0_3px_0px_var(--border-color)]"
      data-scroll-section
      aria-label="Main navigation and contact"
    >
      <div className="container mx-auto px-5 flex items-center justify-between h-full">
        <div className="hidden sm:flex items-center gap-2  " aria-hidden="true">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div
            className="w-3 h-3 bg-[#fee715] rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <nav aria-label="Main">
          <div className="flex gap-5 text-primary cursor-pointer">
            {isOpen ? (
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-5 h-5 hover:text-third duration-300 transition-all hover:scale-[1.06] focus:outline-none focus:ring-2 focus:ring-primary rounded"
                aria-label="Close navigation menu"
              >
                <X />
              </button>
            ) : (
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-5 h-5 hover:text-third duration-300 transition-all hover:scale-[1.06] focus:outline-none focus:ring-2 focus:ring-primary rounded"
                aria-label="Open navigation menu"
              >
                <Menu />
              </button>
            )}
            <Link to={`/`} className="focus:outline-none focus:ring-2 focus:ring-primary rounded" aria-label="Go to home page">
              <House className="w-5 h-5 hover:text-third duration-300 transition-all hover:scale-[1.06]" />{" "}
            </Link>
            <a
              href="https://www.linkedin.com/in/chouaeb-rahal/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label="Visit Chouaeb Rahal's LinkedIn profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin-icon lucide-linkedin w-5 h-5 hover:text-third duration-300 transition-all hover:scale-[1.06]"
              >
                <title>LinkedIn</title>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            <a
              href="https://github.com/chouaebrahal/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label="Visit Chouaeb Rahal's GitHub profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github-icon lucide-github w-5 h-5 hover:text-third duration-300 transition-all hover:scale-[1.06]"
              >
                <title>GitHub</title>
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>

            <button
              onClick={() => {
                if (window.lenis) {
                  window.lenis.scrollTo("#contact", {
                    duration: 3,
                    easing: (t) => t * t,
                  });
                } else {
                  // Fallback for when Lenis is disabled (touch/small screens)
                  document.querySelector("#contact")?.scrollIntoView({
                    behavior: "smooth"
                  });
                }
              }}
              className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label="Scroll to contact section"
            >
              <Mail className="w-5 h-5 hover:text-third duration-300 transition-all hover:scale-[1.06]" />
            </button>
          </div>
        </nav>
        <Button
          onClick={() => {
            if (window.lenis) {
              window.lenis.scrollTo("#contact", {
                duration: 3,
                easing: (t) => t * t,
              });
            } else {
              // Fallback for when Lenis is disabled (touch/small screens)
              document.querySelector("#contact")?.scrollIntoView({
                behavior: "smooth"
              });
            }
          }}
          type={"button"}
          className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
        >
          Contact Me
        </Button>
      </div>
    </header>
  );
};

export default Header;
