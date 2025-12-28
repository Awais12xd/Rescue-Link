// src/pages/AdoptStrayAnimalsPage.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AnimalLoader from "../AnimalLoader.jsx";
import Button from "../Button.jsx";

/**
 * AdoptStrayAnimalsPage
 * - GET listings from `${VITE_BACKEND_URL}/adopt/listings`
 * - POST new listing to `${VITE_BACKEND_URL}/adopt/create-listing` (multipart/form-data)
 *
 * Notes:
 * - Styling intentionally different from the report page: grid cards, warm accent for badges.
 * - All links & routing left to parent app (use absolute routes if linking out).
 */

export default function AdoptStrayAnimalsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal (create listing)
  const [openCreate, setOpenCreate] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // form fields
  const [animalType, setAnimalType] = useState("Dog");
  const [ageApprox, setAgeApprox] = useState("");
  const [gender, setGender] = useState("Unknown");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // contact preview modal
  const [contactModal, setContactModal] = useState({ open: false, listing: null });

  // fetch listings on mount
  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchListings() {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/adopt/get-all-listings`);
      // support both shapes: { data: [...] } or [...]
      const list = res?.data?.data ?? res?.data ?? [];
      setListings(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("fetchListings:", err);
      alert("Failed to load listings. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  // Image handling
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    // basic validation: image type and size < 5 MB each
    const valid = files.filter((f) => {
      if (!f.type.startsWith("image/")) {
        alert(`${f.name} is not an image and was skipped.`);
        return false;
      }
      if (f.size > 5 * 1024 * 1024) {
        alert(`${f.name} is larger than 5MB and was skipped.`);
        return false;
      }
      return true;
    });
    setImages((prev) => [...prev, ...valid].slice(0, 6)); // limit to 6 images
    // reset input value so same file can be reselected if removed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearForm = () => {
    setAnimalType("Dog");
    setAgeApprox("");
    setGender("Unknown");
    setDescription("");
    setLocationText("");
    setContactName("");
    setContactPhone("");
    setContactEmail("");
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // create listing
  const handleCreate = async (e) => {
    e?.preventDefault();
    // minimal validation
    if (!description.trim() || !locationText.trim() || !contactName.trim() || !contactPhone.trim()) {
      alert("Please provide description, location, contact name and phone.");
      return;
    }

    setSubmitting(true);
    try {
      const form = new FormData();
      form.append("animalType", animalType);
      if (ageApprox) form.append("ageApprox", ageApprox);
      form.append("gender", gender);
      form.append("description", description.trim());
      form.append("locationText", locationText.trim());
      form.append("contactName", contactName.trim());
      form.append("contactPhone", contactPhone.trim());
      images.forEach((img) => form.append("images", img));

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/adopt/create-listing`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const created = res?.data?.data ?? res?.data ?? res;
      const listingObj = created && created._id ? created : created?.data ?? created;

      // optimistic update
      setListings((prev) => (listingObj ? [listingObj, ...prev] : prev));
      clearForm();
      setOpenCreate(false);
      alert("Listing created. Interested people will contact you directly via the details you provided.");
    } catch (err) {
      console.error("create listing error", err);
      alert(err?.response?.data?.message ?? "Failed to create listing");
    } finally {
      setSubmitting(false);
    }
  };

  // contact action: show contact modal
  const openContact = (listing) => {
    setContactModal({ open: true, listing });
  };

  // helper: resolve image URL (backend may return relative path)
  const resolveImageUrl = (url) => {
    if (!url) return null;
    const base = import.meta.env.VITE_BACKEND_URL ?? "";
    return (base.endsWith("/") ? base.slice(0, -1) : base) + url;
  };

  // small presentational changes vs report page:
  // - grid card layout
  // - badge for status (Available / Adopted)
  // - warm accent for badges (use amber-ish class; fallback to bg-primary if token not present)

  return (
    <main className="container mx-auto px-6 md:px-10 py-12 pt-25">
      <header className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-LightestSlate">Adopt / Offer a home</h1>
          <p className="text-Slate mt-1 max-w-lg">Browse available stray animals, or post a listing so others can adopt them. Rescue centres and individuals can add listings.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpenCreate(true)}
            className="inline-flex items-center gap-2 rounded-md border border-primary px-4 py-2 text-sm text-primary hover:bg-primary/5 transition"
            aria-label="Create a listing"
          >
            <span className="hidden sm:inline">Create listing</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary" aria-hidden>
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      <section>
        {loading ? (
          <div className="py-12 flex justify-center">
            <AnimalLoader size={96} />
          </div>
        ) : listings.length === 0 ? (
          <div className="py-12 text-center text-Slate">No listings yet — be the first to add a stray for adoption.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item) => {
              const img = item.images && item.images.length ? resolveImageUrl(item.images[0]) : null;
              const status = (item.status || "available").toLowerCase();
              return (
                <article key={item._id ?? item.id} className="bg-LightNavy rounded-lg border border-white/6 overflow-hidden shadow-sm">
                  <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                    {img ? (
                      <img src={item?.images[0]?.url} alt={`${item.animalType} thumbnail`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-LightestSlate">No image</div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-LightestSlate font-semibold truncate">{item.animalType ?? "Animal"}</div>
                        <div className="text-Slate text-sm truncate mt-1">{item.locationText ?? "Location not specified"}</div>
                      </div>

                      <div className={`text-xs font-medium px-2 py-1 rounded ${status === "adopted" ? "bg-green-600/10 text-green-300 border border-green-700/20" : "bg-amber-500/10 text-amber-400 border border-amber-600/20"}`}>
                        {status === "adopted" ? "Adopted" : "Available"}
                      </div>
                    </div>

                    <p className="text-Slate text-sm mt-3 line-clamp-4">{item.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-Slate">Age: {item.ageApprox ? `${item.ageApprox}` : "Age unknown"}</div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openContact(item)}
                          className="text-sm text-primary hover:underline"
                        >
                          Contact
                        </button>
                        <a
                          href={item.contactPhone ? `tel:${item.contactPhone}` : "#"}
                          onClick={(e) => !item.contactPhone && e.preventDefault()}
                          className="text-sm text-Slate"
                        >
                          Call
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Create listing modal */}
      {openCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-3xl bg-[#112240] rounded-lg shadow-lg overflow-auto max-h-[90vh]">
            <div className="p-5 border-b border-white/6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-LightestSlate">Create adoption listing</h2>
              <button onClick={() => setOpenCreate(false)} className="text-Slate">Close</button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <div className="text-sm text-LightestSlate mb-1">Animal type</div>
                  <select  value={animalType} onChange={(e) => setAnimalType(e.target.value)} className="input text-Slate">
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="block">
                  <div className="text-sm text-LightestSlate mb-1">Approx. age</div>
                  <input value={ageApprox} onChange={(e) => setAgeApprox(e.target.value)} className="input text-Slate" placeholder="e.g., ~2 years, juvenile" />
                </label>

                <label className="block">
                  <div className="text-sm text-LightestSlate mb-1">Gender</div>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="input text-Slate">
                    <option>Unknown</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>

                <label className="block">
                  <div className="text-sm text-LightestSlate mb-1">Location (city/landmark)</div>
                  <input value={locationText} onChange={(e) => setLocationText(e.target.value)} className="input text-Slate" placeholder="e.g., Gulberg Park, Lahore" />
                </label>
              </div>

              <label className="block">
                <div className="text-sm text-LightestSlate mb-1">Short description (health / behaviour)</div>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="input text-Slate" placeholder="e.g., friendly, slightly limping on right leg..." />
              </label>

              <div>
                <div className="text-sm text-LightestSlate mb-1">Contact name</div>
                <input value={contactName} onChange={(e) => setContactName(e.target.value)} className="input text-Slate" placeholder="Your name or clinic name" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-LightestSlate mb-1">Contact phone</div>
                  <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="input text-Slate" placeholder="e.g., 03XXXXXXXXX" />
                  <div className="text-xs text-Slate mt-1">Publicly visible to interested adopters</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-LightestSlate mb-1">Images</div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFiles} multiple className="hidden" id="adopt-upload" />
                <div className="flex items-center gap-3 flex-wrap">
                  <label htmlFor="adopt-upload" className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-white/6 rounded text-sm text-LightestSlate hover:bg-white/2">
                    Add images
                  </label>

                  {images.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {images.map((im, idx) => (
                        <div key={idx} className="relative group">
                          <img src={URL.createObjectURL(im)} alt="preview" className="w-24 h-24 object-cover rounded" />
                          <button type="button" onClick={() => removeImage(idx)} className="absolute -top-1 -right-1 bg-black/60 p-1 rounded hidden group-hover:block">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button text={submitting ? "Submitting..." : "Create listing"} className={`px-4 py-2 ${submitting ? "opacity-60 cursor-not-allowed" : ""}`} />
                <button type="button" onClick={() => { clearForm(); setOpenCreate(false); }} className="text-Slate hover:underline text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact modal */}
      {contactModal.open && contactModal.listing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md bg-[#112240] rounded-lg p-5 shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-LightestSlate">Contact about {contactModal.listing.animalType}</h3>
                <div className="text-Slate text-sm mt-1">{contactModal.listing.locationText}</div>
              </div>
              <button onClick={() => setContactModal({ open: false, listing: null })} className="text-Slate">Close</button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-xs text-LightestSlate">Contact name</div>
                <div className="font-medium text-Slate">{contactModal.listing.contactName ?? "Not provided"}</div>
              </div>

              <div>
                <div className="text-xs text-LightestSlate">Phone</div>
                {contactModal.listing.contactPhone ? (
                  <a className="text-primary" href={`tel:${contactModal.listing.contactPhone}`}>{contactModal.listing.contactPhone}</a>
                ) : (
                  <div className="text-Slate">Not provided</div>
                )}
              </div>

              <div>
                <div className="text-xs text-LightestSlate">Email</div>
                {contactModal.listing.contactEmail ? (
                  <a className="text-primary" href={`mailto:${contactModal.listing.contactEmail}`}>{contactModal.listing.contactEmail}</a>
                ) : (
                  <div className="text-Slate">Not provided</div>
                )}
              </div>

              <div className="text-sm text-Slate">
                Please contact the owner or clinic to arrange adoption; RescueLink is a listing platform and does not mediate the adoption.
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
