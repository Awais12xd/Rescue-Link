import React, { useEffect, useRef, useState } from "react";
import ReportCard from "./ReportCard.jsx";
import AnimalLoader from "../AnimalLoader.jsx";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Navbar from "../Header/Navbar.jsx";
import Button from "../Button.jsx";

/**
 * ReportPage
 * - Form to submit injured-animal reports (multipart/form-data)
 * - Shows recent reports as cards
 *
 * Notes:
 * - Defensive about API response shapes (works if API returns { data: [...] } or just [...])
 * - Resets file input after submit using a ref
 */
export default function ReportInjuredAnimals() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [animalType, setAnimalType] = useState("Dog");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState("");
  const [images, setImages] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    //Tode Check File Size
    setImages((prev) => (images?.length > 0 ? [...prev, ...files] : files));
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchReports() {
    setLoading(true);
    try {
      const payload = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/report/get-all-reports`
      );
      // support both shapes: { data: [...], meta } OR [...]
      const list = payload?.data?.data ?? payload?.data ?? payload ?? [];
      setReports(Array.isArray(list) ? list : list.data ?? list ?? []);
    } catch (err) {
      console.error("fetchReports:", err);
      alert("Failed to load reports. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  // Geo helper - attempts to fill lat/lng using browser geolocation
  //   const useGeolocation = () => {
  //     if (!navigator.geolocation) {
  //       alert("Geolocation is not supported by your browser.");
  //       return;
  //     }
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         setLat(pos.coords.latitude.toFixed(6));
  //         setLng(pos.coords.longitude.toFixed(6));
  //       },
  //       (err) => {
  //         console.warn("geolocation error", err);
  //         alert("Could not get location. Allow location access or enter manually.");
  //       },
  //       { timeout: 8000 }
  //     );
  //   };

  const clearForm = () => {
    setAnimalType("Dog");
    setDescription("");
    setLocationText("");
    setImages(null);
  };

  const resolveApiReport = (payload) => {
    // if server returns { data: report } or report directly
    return payload?.data ?? payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple client-side validation
    if (!animalType || !description.trim() || !locationText.trim()) {
      alert(
        "Please fill required fields: animal type, description and location."
      );
      return;
    }

    setSubmitting(true);
    try {
      const form = new FormData();
      form.append("animalType", animalType);
      form.append("description", description.trim());
      form.append("locationText", locationText.trim());
      form.append("reporterContact", number);
      form.append("reporterName", name);
      images.forEach((image) => {
        form.append("images", image);
      });
      console.log(form, images);

      const payload = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/report/create-report`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const created = resolveApiReport(payload);
      // created may be the created report or { data: report }
      const reportObj =
        created && created._id ? created : created?.data ?? created;

      // optimistic add to top
      setReports((prev) => (reportObj ? [reportObj, ...prev] : prev));
      clearForm();
      setOpen(false);
      alert("Report submitted. Thank you.");
    } catch (err) {
      console.error("submit error:", err);
      const message =
        err?.response?.message ?? err?.message ?? "Submission failed";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="container mx-auto px-6 md:px-10 pt-30 md:pl-12">
        <section className="flex md:flex-col flex-col justify-between gap-4">
          <h1 className="text-2xl font-semibold text-LightestSlate md:pr-0 pr-2">
            Report an injured animal
          </h1>
          <div className="flex justify-end">
            <div
              className={` hover:opacity-85 px-3 h-11.25 w-max flex justify-center items-center`}
              onClick={() => setOpen(true)}
            >
               <Button className="cursor-pointer" text="Create a report" size="medium"  />
            </div>
          </div>
        </section>

        {open && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000069] z-100 flex items-center justify-center ">
            <div className="w-[90%] md:w-[50%] h-[80vh] bg-[#112240] rounded-md shadow p-4 relative   overflow-y-scroll">
              <div className="absolute top-4 right-4 cursor-pointer z-10 ">
                <RxCross1
                  size={25}
                  className="text-primary"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h5 className="text-3xl font-semibold text-s mt-9 md:mt-3 mb-2 text-center text-LightestSlate ">
                Create Animal Report
              </h5>
              <form onSubmit={handleSubmit}>
                <br />
                <div className="">
                  <label className="pb-2 text-LightestSlate">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-2 appearance-none block h-9 border text-slate-300 border-primary rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-primary sm:text-sm focus:border-primary px-3"
                    placeholder="Enter your name..."
                  />
                </div>
                <br />
                <div className="">
                  <label className="pb-2 text-LightestSlate">
                    Your Contact Number <span className="text-primary">*</span>
                  </label>
                  <input
                    type="number"
                    name="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full mt-2 appearance-none block h-9 border text-slate-300 border-primary rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-primary sm:text-sm focus:border-primary px-3"
                    placeholder="e.g03271384738"
                  />
                </div>
                <br />
                <label className="block">
                  <div className="text-sm text-LightestSlate mb-1">
                    Animal type <span className="text-primary">*</span>
                  </div>
                  <select
                    value={animalType}
                    onChange={(e) => setAnimalType(e.target.value)}
                    className="input border border-primary text-Slate px-5 py-2"
                    aria-required="true"
                  >
                    <option className="bg-[#0a192f]">Dog</option>
                    <option className="bg-[#0a192f]">Cat</option>
                    <option className="bg-[#0a192f]">Other</option>
                  </select>
                </label>
                <br />
                <div className="">
                  <label className="pb-2 text-LightestSlate">Describe condition</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-2 appearance-none block h-9 border text-slate-300 border-primary rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-primary sm:text-sm focus:border-primary px-3"
                    placeholder="Wounds, bleeding, mobility, behavior, location details..."
                    aria-required="true"
                  />
                </div>
                <br />
                <div className="">
                  <label className="pb-2 text-LightestSlate">Location (address / landmark) </label>
                  <input
                    type="text"
                    name="address"
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                    className="w-full mt-2 appearance-none block h-9 border text-slate-300 border-primary rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-primary sm:text-sm focus:border-primary px-3"
                    placeholder="e.g., Park near X, Street name, Market"
                    aria-required="true"
                  />
                </div>
                <br />
                <div className="">
                  <label className="pb-2 text-LightestSlate">
                    Upload Images <span className="text-primary">*</span>
                  </label>
                  <input
                    type="file"
                    name="upload"
                    id="upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                  <div className="flex w-full items-center flex-wrap gap-3 mt-2">
                    <label htmlFor="upload" className="cursor-pointer">
                      <AiOutlinePlusCircle
                        size={30}
                        className="m-3 text-primary"
                      />
                    </label>
                    {images?.length > 0 &&
                      images.map((image, index) => (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Product"
                          key={index}
                          className="w-28 h-28 object-cover rounded-md  "
                        />
                      ))}
                  </div>
                </div>
                <br />
                <button
                  disabled={submitting}
                  type="submit"
                  className="w-full text-primary disabled:opacity-50 disabled:cursor-no-drop mt-2 appearance-none block h-12 border border-primary rounded-[3px] placeholder:text-gray-500 outline-none  focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 cursor-pointer"
                >
                  {submitting ? "Submitting..." : "Submit Report"}
                </button>
              </form>
            </div>
          </div>
        )}

        <hr className="my-10 border-white/6" />

        <section aria-live="polite" className="pb-20">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-semibold text-LightestSlate">
              Recent reports
            </h3>
            <div className="text-sm text-Slate">
              {loading ? "Loading…" : `${reports.length} total`}
            </div>
          </div>

          {loading ? (
            <div className="py-10 flex justify-center">
              <AnimalLoader size={80} />
            </div>
          ) : reports.length === 0 ? (
            <div className="py-10 text-Slate">No reports yet.</div>
          ) : (
            <div className="flex flex-col w-full gap-y-20">
              {reports.map((r, index) => (
                <ReportCard key={r._id ?? r.id} index={index} report={r} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

