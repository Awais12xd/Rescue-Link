import React from "react";

/**
 * PawLoader — simple animated paw loader
 * Props:
 *  - size: number (px) default: 120
 *  - color: string CSS color default: '#64ffda'
 *  - label: string shown under the paw (optional)
 */
export default function AnimalLoader({ size = 120, color = "#64ffda", label = "Loading..." }) {
  const dim = size;

  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3">
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 100 100"
        className="paw-loader"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g className="paw-group" fill={color}>
          {/* toes */}
          <circle className="paw-toe paw-toe-1" cx="30" cy="38" r="6" />
          <circle className="paw-toe paw-toe-2" cx="46" cy="30" r="6" />
          <circle className="paw-toe paw-toe-3" cx="64" cy="38" r="6" />
          {/* main pad */}
          <ellipse className="paw-pad" cx="48" cy="62" rx="18" ry="20" />
        </g>
      </svg>

      {label && <span className="text-sm text-gray-300 select-none">{label}</span>}
    </div>
  );
}
