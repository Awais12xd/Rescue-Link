// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-body border-t border-white/6 text-Slate">
      <div className="container mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          
            <div className="text-LightestSlate font-semibold">Report · Adopt · Learn</div>
          
        </div>

        <nav className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/report-injured-animals" className="hover:text-primary">Report</Link>
          <Link to="/faq" className="hover:text-primary">FAQ</Link>
        </nav>

        <div className="text-xs text-muted text-center md:text-right">
          © {year} RescueLink — Academic prototype
        </div>
      </div>
    </footer>
  );
}
