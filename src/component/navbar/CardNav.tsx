import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import "./CardNav.css";

/* -----------------------------
   NAV ITEM TYPES
------------------------------ */
type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

/* -----------------------------
   INSERTED ITEMS (YOUR DATA)
------------------------------ */
const items: CardNavItem[] = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Company", ariaLabel: "About Company", href: "/company" },
      { label: "Careers", ariaLabel: "About Careers", href: "/careers" },
    ],
  },
  {
    label: "Projects",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      {
        label: "Featured",
        ariaLabel: "Featured Projects",
        href: "/projects/featured",
      },
      {
        label: "Case Studies",
        ariaLabel: "Project Case Studies",
        href: "/projects/cases",
      },
    ],
  },
  {
    label: "Contact",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      {
        label: "Email",
        ariaLabel: "Email us",
        href: "mailto:example@example.com",
      },
      { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com" },
      {
        label: "LinkedIn",
        ariaLabel: "LinkedIn",
        href: "https://linkedin.com",
      },
    ],
  },
];

/* -----------------------------
   MAIN NAVBAR COMPONENT
------------------------------ */
const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "Logo",
  className = "",
  ease = "power3.out",
  baseColor = "#ffffff",
  menuColor,
  buttonBgColor = "#111",
  buttonTextColor = "#fff",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* -----------------------------
     CALCULATE HEIGHT
  ------------------------------ */
  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisibility = contentEl.style.visibility;
        const wasPointer = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;

        const height = topBar + contentEl.scrollHeight + padding;

        contentEl.style.visibility = wasVisibility;
        contentEl.style.pointerEvents = wasPointer;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return height;
      }
    }

    return 260;
  };

  /* -----------------------------
     CREATE TIMELINE
  ------------------------------ */
  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1"
    );

    return tl;
  };

  /* -----------------------------
     INITIALIZE TIMELINE
  ------------------------------ */
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease]);

  /* -----------------------------
     RESIZE RE-CALC
  ------------------------------ */
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  /* -----------------------------
     TOGGLE MENU
  ------------------------------ */
  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  /* -----------------------------
     SMART NAVBAR HIDE/SHOW
  ------------------------------ */
  useLayoutEffect(() => {
    const handleSmartNav = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current && currentScroll > 80) {
        setShowNav(false);
      } else if (currentScroll < lastScrollY.current - 10) {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
          setShowNav(true);
        }, 250);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleSmartNav);
    return () => window.removeEventListener("scroll", handleSmartNav);
  }, []);

  /* -----------------------------
     RENDER
  ------------------------------ */
  return (
    <div
      className={`
        card-nav-container fixed left-0 w-full z-50 
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          showNav
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-[120%] opacity-0 scale-95"
        }
        ${className}
      `}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""}`}
        style={{
          backgroundColor: baseColor + "CC",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* TOP BAR */}
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            style={{ color: menuColor || "#000" }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <img src={logo} alt={logoAlt} className="logo" />
          </div>

          <button
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Get Started
          </button>
        </div>

        {/* EXPAND CONTENT */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.map((item, idx) => (
            <div
              key={item.label}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
              }}
            >
              <div className="nav-card-label">{item.label}</div>

              <div className="nav-card-links">
                {item.links.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    className="nav-card-link"
                  >
                    <GoArrowUpRight className="nav-card-link-icon" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
