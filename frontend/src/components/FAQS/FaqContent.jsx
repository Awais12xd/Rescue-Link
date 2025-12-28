// src/pages/FAQPage.jsx
import React, { useState, useCallback } from "react";
import faqData from "../../data/faqData.js";

/**
 * FAQPage
 * - Uses the toggle UI pattern provided by the user
 * - Renders categories (headings) and maps questions to accessible toggle buttons
 * - Single-open behavior globally (open one question at a time). Change logic if you prefer multiple-open.
 *
 * Accessibility:
 * - Buttons are keyboard-focusable and handle Enter/Space automatically.
 * - aria-expanded and aria-controls included.
 */

export default function FaqContent() {
  // activeId holds the id of the currently open FAQ question (string) or null
  const [activeId, setActiveId] = useState(null);

  const toggleTab = useCallback(
    (id) => {
      setActiveId((current) => (current === id ? null : id));
      // scroll the opened item into view slightly if needed:
      // const el = document.getElementById(`faq-${id}`); if(el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    [setActiveId]
  );

  return (
    <main className="container mx-auto px-4 md:px-10 py-12">
      <header className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-xl md:text-4xl font-bold text-LightestSlate">FAQ / Care & Awareness for Stray Animals</h1>
        <p className="mt-3 text-sm md:text-base text-Slate max-w-2xl mx-auto">
          Practical answers for people who find injured or distressed animals and for communities working to reduce stray suffering.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        {faqData.map((category) => (
          <section key={category.id} aria-labelledby={category.id}>
            <h2 id={category.id} className="text-base md:text-xl font-semibold text-LightestSlate mb-4">
              {category.title}
            </h2>

            <div className="bg-body/5 rounded-lg border border-white/6 divide-y divide-white/6 overflow-hidden">
              {category.faqs.map((item) => {
                const open = activeId === item.id;
                return (
                  <div className="border-b border-white/6 pb-4 last:border-b-0" key={item.id} id={`faq-${item.id}`}>
                    <button
                      className="flex items-center justify-between w-full py-4 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                      onClick={() => toggleTab(item.id)}
                      aria-expanded={open}
                      aria-controls={`panel-${item.id}`}
                    >
                      <span className="text-sm md:text-lg font-medium text-LightestSlate text-left">{item.q}</span>

                      <span className="ml-4 shrink-0">
                        {open ? (
                          <svg className="h-6 w-6 text-gray-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <svg className="h-6 w-6 text-gray-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </span>
                    </button>

                    <div
                      id={`panel-${item.id}`}
                      role="region"
                      aria-labelledby={item.id}
                      className={`px-4 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${open ? "opacity-100" : "opacity-0"}`}
                      style={{ maxHeight: open ? 400 : 0 }}
                    >
                      <div className="mt-4 pb-4">
                        <p className="text-sm md:text-base text-Slate">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
