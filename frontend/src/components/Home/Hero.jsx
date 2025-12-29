// src/components/HomeHero.jsx
import React from "react";
import Button from "../Button";
import "./../../App.css"
import { useNavigate } from "react-router-dom";

/**
 * HomeHero — RescueLink hero section (React + Tailwind)
 *
 * Usage: place <HomeHero /> at the top of your HomePage.
 * Sections expected on the page (for the CTAs to work):
 *  - <section id="report"> ... </section>
 *  - <section id="centers"> ... </section>
 *
 * Requirements:
 *  - Tailwind CSS configured in the project
 *  - Uses only native browser APIs (no framer-motion)
 *
 * Accessibility & production notes included in code comments.
 */

export default function HomeHero() {
  const navigate = useNavigate();
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // focus the first focusable element in the target for a11y (if any)
      const focusable = el.querySelector("button, a, input, [tabindex]");
      if (focusable) focusable.focus({ preventScroll: true });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="min-h-screen relative flex items-center justify-center pt-32 bg-body ">
      <div className="absolute z-10 bg-[#0a192f9e] w-full h-full top-0"></div>
      <div className="z-20 mx-auto px- md:px-10 lg:px-20  w-[90%]">
        <div className=" gap-12 items-center">
          {/* Left column: copy */}
          <div className="">
            {/* small overline */}
            <p className="inline-flex items-center text-sm font-medium tracking-widest text-primary/95 text-primary">
              <span className="inline-block  h-2 bg-primary rounded-full " aria-hidden="true" />
              Report · Adopt · Learn
            </p>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-LightestSlate leading-tight md:w-[80%]  ">
              A simple way to report, help and adopt stray animals.
            </h1>

            <p className="mt-6 text-sm md:text-lg text-Slate max-w-2xl leading-relaxed font-Inter ">
              RescueLink is an academic prototype that connects people who find injured animals with nearby rescue centres and clear guidance fast, practical,
              and easy to use. Submit a short report with a photo and location, or quickly find rescue centres near you.
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex gap-3 sm:flex-row flex-col sm:gap-4 items-start sm:items-center">
              <Button
                link={"/report-injured-animals"}
                aria-label="Report an injured animal"
                text={"Report an Injured Animal"}
              />
              <Button
                link={"/adopt"}
                aria-label="Report an injured animal"
                text={"Adopt Strays"}
              />
            </div>

            {/* Supporting line and quick feature cards */}
            {/* <div className="mt-8 text-sm text-text-muted max-w-2xl">
              <p className="mb-4">
                <strong className="text-LightestSlate">Prototype note:</strong> This is a demonstration built for an expository documentary project — a proof of concept showing how a simple digital tool can reduce response time and improve coordination.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FeatureCard title="Quick Reporting" text="Upload a photo, describe the condition, and provide a location — fast and easy." />
                <FeatureCard title="Nearby Help" text="Curated list of rescue centres and clinics with contact info." />
                <FeatureCard title="Clear Guidance" text="Short do’s & don’ts for safely helping injured animals." />
              </div>
            </div> */}
          </div>

         
        </div>
      </div>
    </div>
  );
}

/* Small presentational component used above for the 3 quick features.
   Kept simple so the main file is self-contained and easy to copy/paste.
*/
function FeatureCard({ title, text }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-body/40 border border-white/4">
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {/* small icon: simple paw */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 14c-2 0-5 1.5-5 3.5S9 21 11 21s4-1.5 4-3.5S14 14 12 14z" fill="#64ffda" />
          <path d="M5.5 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM9.5 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18.5 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM15.5 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="#64ffda" />
        </svg>
      </div>
      <div>
        <div className="text-LightestSlate font-medium text-sm">{title}</div>
        <div className="text-Slate text-xs mt-1">{text}</div>
      </div>
    </div>
  );
}
