import React, { useEffect, useState } from "react";
import Button from "../Button.jsx";
import Hamburger from "./Hamburger.jsx";
import { Link, useNavigate } from "react-router-dom";

/**
 * Header component (React + Tailwind)
 *
 * Important: target sections IDs in your page should be:
 *  - home (top)
 *  - report (Injured Animal Report page/section)
 *  - centers (Find Rescue Centers)
 *  - faq (FAQ)
 *
 * Example usage in page markup:
 * <section id="home">...</section>
 * <section id="report">...</section>
 * <section id="centers">...</section>
 * <section id="faq">...</section>
 */
export default function Navbar() {
  const menu = [
    { title: "Home", link: "/" },
    { title: "Report Injured Animal", link: "/report-injured-animals" },
    { title: "Adopt Strays", link: "/adopt" },
    { title: "FAQ", link: "/faq" }
  ];

  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // show/hide header on scroll
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((s) => !s);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`transform fixed top-0 left-0 w-full transition-transform duration-300 ease-in-out z-50 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        role="banner"
        aria-label="RescueLink main navigation"
      >
        <div
          className={`backdrop-blur-sm  bg-black/20 px-6 md:px-16 relative ${
            lastScrollY > 10 ? "py-3 shadow-xl" : "py-4"
          }`}
        >
          <div className=" mx-auto flex items-center justify-between gap-6 ">
            {/* Logo */}
            <Link
              className="flex   justify-center cursor-pointer"
              to={"/"}
            >
              <div className="logo-box shadow border-2 border-[#64ffda] text-[#64ffda] flex justify-center items-center text-xl font-semibold">
                {/* Use RescueLink initial or icon */}
                R
              </div>
              {/* <div className="hidden md:block">
                <div className="text-base font-semibold text-[#e6f7ff]">RescueLink</div>
                
              </div> */}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-5">
              {menu.map((item, idx) => (
                <Link
                  key={item.link}
                  to={item.link}
                  className="flex items-center gap-2 text-sm whitespace-nowrap text-gray-200 hover:text-[#64ffda] transition-colors duration-150 cursor-pointer"
                >
                  <span className="text-[#64ffda] text-xs pt-0.5">0{idx + 1}.</span>
                  <span>{item.title}</span>
                </Link>
              ))}

              {/* Buttons: primary CTA and an optional outline */}
              <div className="flex items-center ml-3 ">
                <Button className="cursor-pointer" text="Adopt Strays" size="medium" link={"/adopt"} />
                
              </div>
            </nav>

            {/* Mobile hamburger */}
            <div className="md:hidden  flex items-center gap-3">
              <div className="hidden md:block" />
              <Hamburger isOpen={isOpen} onToggle={toggleMenu} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-200 z-20 ${isOpen ? "opacity-100 block" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Mobile slide-over */}
      <aside
        className={`fixed top-0 right-0 h-full w-62.5 bg-[#112240] z-50 transform transition-transform duration-300  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden p-6 flex flex-col justify-center items-center`}
        aria-hidden={!isOpen}
      >
      <div className="md:hidden absolute z-100 top-8 right-6 flex items-center gap-3 ">
              <div className="hidden md:block" />
              <Hamburger isOpen={isOpen} onToggle={toggleMenu} />
            </div>
        <nav className="flex flex-col items-center gap-4 ">
          {menu.map((item, idx) => (
            <Link
              key={item.link}
              to={item.link}
              className="text-left text-gray-200 text-sm hover:text-[#64ffda] transition-colors duration-150"
            >
              <span className="text-[#64ffda] mr-2 text-sm">0{idx + 1}.</span>
              {item.title}
            </Link>
          ))}
          <div className="mt-3">
            <Button  text="Report Injured Animal" size="medium" onClick={() => { scrollToId("report"); setIsOpen(false); }} />
          </div>
        </nav>

        
      </aside>
    </>
  );
}
