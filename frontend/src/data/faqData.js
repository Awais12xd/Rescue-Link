// src/data/faqData.js
// Static FAQ data for RescueLink (care & awareness of stray animals)
// Each category has a title and an array of faqs { id, q, a }
// Keep ids unique across the dataset.

const faqData = [
  {
    id: "immediate-actions",
    title: "What to do: Immediate actions (Do's)",
    faqs: [
      {
        id: "do-1",
        q: "I found an injured animal , what should I do first?",
        a:
          "Stop and assess from a safe distance. Check whether the animal is conscious and breathing. If the animal is dangerously close to traffic, try to secure the scene (e.g., slow traffic, place a warning) without putting yourself at risk. Call a local vet, animal rescue group, or animal control and report the exact location. If unsure, take a photo and use RescueLink’s report form so responders have details."
      },
      {
        id: "do-2",
        q: "Can I give food or water to an injured animal?",
        a:
          "Offering small amounts of water is usually fine if the animal is alert and can swallow — use a shallow dish and do not force-feed. Avoid giving large amounts of food, human food, or milk, which can harm some animals. If the animal is unconscious, avoid oral intake and wait for professionals."
      },
      {
        id: "do-3",
        q: "How can I safely stop bleeding?",
        a:
          "If bleeding is severe and accessible, apply clean pressure using a cloth or bandage to the wound — press firmly but gently until help arrives. Wear gloves or use a barrier if available, and avoid direct contact with blood. If you are unsure, prioritize calling a vet or rescue and keep the animal warm and calm."
      },
      {
        id: "do-4",
        q: "Should I move the injured animal to a vet?",
        a:
          "Only move the animal if it is in immediate danger (traffic, fire) and you can do so safely. Moving a seriously injured animal without training can worsen injuries. If you must move it, support the animal’s body (use a board or blanket) and minimize twisting. Notify a vet or rescue before transport."
      }
    ]
  },

  {
    id: "what-not-to-do",
    title: "What NOT to do",
    faqs: [
      {
        id: "dont-1",
        q: "Should I try to catch a stray animal immediately?",
        a:
          "Do not chase or corner a frightened animal — this causes stress and may provoke defensive behavior. Approach slowly, speak softly, and avoid fast movements. Use food or a calm voice to gain trust, but if the animal is aggressive or terrified, wait for professionals."
      },
      {
        id: "dont-2",
        q: "Is it okay to give painkillers or human medicine?",
        a:
          "Never give human medications to animals. Many drugs that are safe for people are toxic to animals. Only a veterinarian should administer pain medication after a proper examination."
      },
      {
        id: "dont-3",
        q: "Should I leave a serious injury to 'fix itself'?",
        a:
          "No. Serious wounds, bleeding, infected bites, or signs of shock require veterinary attention. Leaving them untreated increases the risk of infection and death."
      }
    ]
  },

  {
    id: "health-safety",
    title: "Health & Safety (for humans and animals)",
    faqs: [
      {
        id: "hs-1",
        q: "Can I get sick from touching a stray animal?",
        a:
          "Some zoonotic diseases exist, but the risk is low with basic precautions. Avoid direct contact with blood, open wounds, or saliva. Wash hands thoroughly after contact, use gloves if possible, and seek medical advice if you have a bite or scratch that breaks the skin."
      },
      {
        id: "hs-2",
        q: "What protective steps should I take when helping an animal?",
        a:
          "Wear disposable gloves or use a towel/blanket to reduce direct contact. Keep your face away from the animal’s head. If transporting, secure the animal in a crate or well-ventilated container. Clean any clothing or surfaces that contact blood or fluids and wash hands."
      },
      {
        id: "hs-3",
        q: "When is rabies a concern?",
        a:
          "Rabies is a serious but region-specific disease. If an animal shows unusual aggression, paralysis, or disorientation, or if you are bitten, seek medical attention immediately and inform local health or veterinary authorities. Local public-health guidance will advise on testing and post-exposure treatment."
      }
    ]
  },

  {
    id: "reporting-legal",
    title: "Reporting & Legal",
    faqs: [
      {
        id: "rl-1",
        q: "Who should I contact for an injured stray?",
        a:
          "Start with local animal welfare NGOs, municipal animal control, or nearby veterinarians. Use RescueLink to report the incident (photo + exact location) so organizations can be notified. If it is an emergency, call the nearest veterinary clinic or emergency animal service."
      },
      {
        id: "rl-2",
        q: "Are there laws about cruelty or abandonment?",
        a:
          "Most regions have laws against animal cruelty and abandonment, but specifics vary. If you suspect intentional abuse, document the situation (photos, time, location) and report it to local authorities or animal welfare organizations. Avoid confronting suspects directly — let authorities handle it."
      },
      {
        id: "rl-3",
        q: "Can I post an injured animal on social media to ask for help?",
        a:
          "Yes — social media can mobilize help quickly. Include clear photos, exact location, and a brief description. Avoid sharing sensitive personal contact info; instead link to RescueLink or provide a trusted NGO contact. Be factual and avoid showing graphic injuries publicly if they could distress viewers."
      }
    ]
  },

  {
    id: "prevention-community",
    title: "Prevention & Community Action",
    faqs: [
      {
        id: "pc-1",
        q: "How can communities reduce stray animal suffering?",
        a:
          "Community-level actions are effective: organized sterilization (TNR for cats, spay/neuter for dogs), vaccination drives, responsible pet ownership (no abandonment), and public education campaigns. Municipal waste management also reduces food sources that encourage uncontrolled populations."
      },
      {
        id: "pc-2",
        q: "What is TNR and why is it used?",
        a:
          "TNR stands for Trap–Neuter–Return. It is a humane program used mostly for community cats: animals are trapped, sterilized and vaccinated, then returned to their territory. TNR reduces population growth and improves health without mass removal."
      },
      {
        id: "pc-3",
        q: "How can I help without adopting?",
        a:
          "Volunteer with local rescues, donate to clinics, participate in sterilization campaigns, feed responsibly (fixed times and locations), and report injured animals. Educate friends and neighbors about responsible pet ownership."
      }
    ]
  },

  {
    id: "first-aid-guidance",
    title: "Basic First Aid Guidance",
    faqs: [
      {
        id: "fa-1",
        q: "How do I safely handle a bleeding wound?",
        a:
          "Apply direct pressure with a clean cloth or bandage until bleeding slows. Elevate the injured area if possible. Avoid tourniquets unless trained; seek veterinary help quickly. Wear gloves and wash hands afterward."
      },
      {
        id: "fa-2",
        q: "What should I do if the animal is unconscious?",
        a:
          "Check for breathing and obvious injuries from a safe distance. If breathing, keep the airway clear and keep the animal warm and still. Do not attempt complex medical procedures — transport to a vet if safe to do so and call ahead."
      },
      {
        id: "fa-3",
        q: "Can I clean a wound on the spot?",
        a:
          "You may flush a minor wound with clean water to remove dirt, but do not use strong antiseptics or harsh soaps directly on deep wounds. Clean, cover lightly if possible, and seek veterinary care for any puncture wounds, deep cuts, or signs of infection."
      }
    ]
  }
];

export default faqData;
