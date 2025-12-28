// src/components/HomeSections.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * HomeSections
 * - Two responsive sections for the RescueLink home page:
 *   1) Problem context
 *   2) How this platform helps (with feature cards + CTAs)
 *
 * Styling expects your theme tokens:
 *  - bg-body, text-LightestSlate, text-Slate, text-primary, panel, btn-primary, btn-outline
 *
 * Links: absolute paths to avoid relative-route merging issues.
 */
export default function HomeContent() {
  return (
    <div className="w-full">
      {/* ---------- Problem Context ---------- */}
      <section className="container mx-auto px-4 md:px-10 py-12 mt-10">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          {/* Right: text */}
          <div className="">
            <div className="font-semibold flex items-center gap-2 mb-6">
              <p className="md:text-xl text-sm text-primary shrink-0 ">
                01.
              </p>
              <h1 className="md:text-3xl text-lg font-semibold text-LightestSlate ">
                The problem : why stray animals suffer
              </h1>
            </div>

            <p className="mt-4 text-sm md:text-base text-Slate max-w-xl">
              Stray animals face a range of avoidable problems: injuries left
              untreated, delayed help because people don’t know whom to contact,
              and scattered resources that prevent coordinated rescue.
              RescueLink connects everyday people with practical actions and
              local help.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="flex gap-3 items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary shrink-0">
                  ⚠️
                </span>
                <div>
                  <div className="font-medium text-LightestSlate">
                    Undetected injuries
                  </div>
                  <div className="text-Slate">
                    Animals injured in streets often go unnoticed until it’s too
                    late.
                  </div>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary shrink-0">
                  ⏳
                </span>
                <div>
                  <div className="font-medium text-LightestSlate">
                    Slow response
                  </div>
                  <div className="text-Slate">
                    No single, easy channel means help arrives late or not at
                    all.
                  </div>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary shrink-0">
                  🔍
                </span>
                <div>
                  <div className="font-medium text-LightestSlate">
                    Scattered resources
                  </div>
                  <div className="text-Slate">
                    Contact details for clinics, shelters and volunteers are
                    fragmented.
                  </div>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary shrink-0">
                  ⚖️
                </span>
                <div>
                  <div className="font-medium text-LightestSlate">
                    Lack of guidance
                  </div>
                  <div className="text-Slate">
                    Well-intentioned people sometimes make harmful choices for
                    animals without proper guidance.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- How this platform helps ---------- */}
      <section className="bg-body/6 py-12 mt-8">
        <div className="container mx-auto px-2 md:px-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-LightestSlate text-center">
              How RescueLink helps
            </h2>

            <p className="mt-3 text-center text-Slate max-w-2xl mx-auto">
              We focus on immediate impact: faster reporting, clearer guidance,
              and a simple adoption/upload flow so clinics and rescues can list
              animals for adoption.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="panel p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center">
                    📸
                  </div>
                  <h3 className="text-lg font-semibold text-LightestSlate">
                    Quick Reporting
                  </h3>
                </div>
                <p className="text-Slate text-sm">
                  Submit a photo, short description and location — responders
                  get the facts they need to act quickly.
                </p>
                <div className="mt-auto">
                  <Link
                    to="/report-injured-animals"
                    className="text-sm text-primary hover:underline"
                  >
                    Start a report →
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="panel p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center">
                    🏥
                  </div>
                  <h3 className="text-lg font-semibold text-LightestSlate">
                    Adopt & Rescue Listings
                  </h3>
                </div>
                <p className="text-Slate text-sm">
                  Rescue centres and individuals can list stray animals for
                  adoption — interested people can contact the listed owner or
                  clinic directly.
                </p>
                <div className="mt-auto">
                  <Link
                    to="/adopt"
                    className="text-sm text-primary hover:underline"
                  >
                    View / Add listings →
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="panel p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center">
                    📚
                  </div>
                  <h3 className="text-lg font-semibold text-LightestSlate">
                    Guidance & Education
                  </h3>
                </div>
                <p className="text-Slate text-sm">
                  Short do’s and don’ts, first-aid steps, and FAQ content to
                  help people act safely and effectively.
                </p>
                <div className="mt-auto">
                  <Link
                    to="/faq"
                    className="text-sm text-primary hover:underline"
                  >
                    Read FAQ →
                  </Link>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </section>
    </div>
  );
}
