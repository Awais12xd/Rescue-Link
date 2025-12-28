import React from "react";

/**
 * Hamburger (React + Tailwind)
 * Props:
 *  - isOpen: boolean
 *  - setIsOpen: () => void    <-- compatible with your original signature
 *  - onToggle: () => void     <-- alternative prop name (optional)
 *
 * The component will call setIsOpen() if provided, otherwise onToggle().
 */
export default function Hamburger({ isOpen = false, setIsOpen, onToggle }) {
  const handleClick = () => {
    if (typeof setIsOpen === "function") return setIsOpen();
    if (typeof onToggle === "function") return onToggle();
  };

  return (
    <button
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={handleClick}
      className="md:hidden z-500 relative w-10 h-10 flex flex-col items-end justify-center gap-0.5"
    >
      {/* top bar */}
      <span
        className={
          "block h-0.5 bg-[#64ffda] rounded transition-all duration-200 ease-in-out " +
          (isOpen
            ? "w-8 transform translate-y-1.5 rotate-45"
            : "w-9 transform translate-y-0 rotate-0")
        }
        aria-hidden="true"
      />

      {/* middle bar */}
      <span
        className={
          "block h-0.5 bg-[#64ffda] rounded mx-0 my-1 transition-all duration-150 ease-in-out " +
          (isOpen ? "opacity-0 w-6" : "opacity-100 w-7.5")
        }
        aria-hidden="true"
      />

      {/* bottom bar */}
      <span
        className={
          "block h-0.5 bg-[#64ffda] rounded transition-all duration-200 ease-in-out " +
          (isOpen
            ? "w-8 transform -translate-y-1.5 -rotate-45"
            : "w-6.25 transform translate-y-0 rotate-0")
        }
        aria-hidden="true"
      />
    </button>
  );
}
