// Student datasets for Curiosity Passport
//
// The first three are the pre-authored cohort. The final "you" record is the
// player's own passport — a fresh explorer who starts at CQ 0 and grows as
// they play. Its static fields are placeholders; PassportView overrides the
// live ones (CQ, collected stamps, field notes, your next questions) from the
// persistent field log, so it never shows stale numbers.
export const youSeedInquiry =
  'What would I investigate first — and how would I prove it mattered?';

export const students = [
  {
    id: "alex-morgan",
    name: "Alex Morgan",
    discipline: "Business Administration & Sustainable Enterprise",
    university: "UC Berkeley (Haas School of Business)",
    gradYear: "Class of 2025",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    coverTag: "Strategy • Circular Economy • Data Modeling",
    shortlisted: false,
    invited: false,
    badge: "Verified Explorer",
    statusText: "Open to Strategy, Operations & Climate Tech Roles",
    
    // Bio
    intro: "I'm fascinated by the intersection of commercial viability, supply chain transparency, and circular systems. I don't wait for course syllabi to explore how modern enterprises can decouple from resource extraction. Over the past 18 months, I've conducted 20+ field interviews with manufacturing operators and built open unit-economics models for sustainable retail.",
    
    // Aspirations & Interests
    careerAspirations: "Seeking an early-to-growth stage operations, product strategy, or founder's associate role at a venture building resilient circular physical products or supply-chain intelligence infrastructure.",
    interests: [
      "Circular Economics",
      "Reverse Logistics",
      "Consumer Psychology",
      "Data Analytics & SQL",
      "Regenerative Materials",
      "B2B Climate Tech"
    ],
    
    // Stats
    stats: {
      trailsActive: 3,
      projectsBuilt: 2,
      fieldNotes: 14,
      milestoneStamps: 6,
      cqIndex: "94/100"
    },

    // Three Curiosity Trails
    trails: [
      {
        id: "sustainable-fashion",
        question: "Why do some sustainable fashion brands grow faster than others?",
        isFeatured: true,
        tags: ["Retail Economics", "Brand Strategy", "Consumer Psychology"],
        status: "Synthesized & Published",
        milestoneCount: 6,
        fieldNotesCount: 14,
        dateSpan: "Oct 2024 — Mar 2025",
        summary: "An intensive 5-month investigation dissecting the unit economics, inventory MOQ traps, and aesthetic positioning separating durable winners like Patagonia from venture-backed casualties.",
        resultingProjectTitle: "The Green Premium Teardown",
        keyInsight: "Curated minimalism with sub-40 evergreen SKUs is the only operational defense against ethical raw material cost inflation."
      },
      {
        id: "reverse-logistics",
        question: "Can reverse-logistics startups survive the unit economics of free returns?",
        isFeatured: false,
        tags: ["Logistics", "Unit Economics", "Supply Chain"],
        status: "Active Field Research",
        milestoneCount: 4,
        fieldNotesCount: 9,
        dateSpan: "Jan 2025 — Present",
        summary: "Evaluating whether third-party return aggregation hubs (like Happy Returns) can survive when return shipping absorbs upwards of 60% of apparel resale value.",
        resultingProjectTitle: "Bay Area Micro-Hub Logistics Matrix",
        keyInsight: "Hyperlocal sorting within 15 miles of consumer clusters reduces freight handling emissions by 41% and speeds restock turnover."
      },
      {
        id: "carbon-accounting",
        question: "How do carbon-accounting platforms verify Scope 3 emissions without supplier fatigue?",
        isFeatured: false,
        tags: ["B2B SaaS", "Climate Tech", "Data Auditing"],
        status: "Problem Discovery & Modeling",
        milestoneCount: 2,
        fieldNotesCount: 7,
        dateSpan: "Feb 2025 — Present",
        summary: "Analyzing why tier-2 and tier-3 manufacturing suppliers abandon carbon reporting forms, and whether ERP data ingestion can replace manual questionnaire fatigue.",
        resultingProjectTitle: "Automated Bill-of-Materials Carbon Parser",
        keyInsight: "Suppliers need financial or procurement advantages (like preferred invoice terms) to justify the friction of primary emissions data sharing."
      }
    ],

    // Two Independent Projects
    projects: [
      {
        id: "proj-1",
        title: "The Green Premium Teardown: Unit Economics of 12 Sustainable DTC Brands",
        category: "Financial Modeling & Whitepaper",
        date: "Feb 2025",
        timeInvested: "140 hours self-directed research",
        problemStatement: "Most sustainable direct-to-consumer brands stall out before reaching $15M ARR because ethical materials inflate COGS by 38-54%, while consumers exhibit sharp price elasticity at checkout.",
        methodology: "Scraped reported margin data from 10-K filings, customs import manifests via ImportYeti, and conducted 14 confidential interviews with brand sourcing directors.",
        keyArtifacts: [
          "Interactive Google Sheets Financial Model with dynamic MOQ threshold calculators",
          "18-page whitepaper teardown detailing 3 viable margin defense architectures",
          "Comparative matrix of certified organic vs. regenerative vs. recycled fiber pricing"
        ],
        outcomes: [
          "Downloaded by 340+ retail founders and university researchers",
          "Invited to present teardown at UC Berkeley Haas Sustainable Business Symposium",
          "Adopted as a case study reference in an undergraduate sustainable entrepreneurship seminar"
        ],
        githubOrLink: "https://curiositypassport.internal/artifacts/green-premium-teardown.pdf"
      },
      {
        id: "proj-2",
        title: "Campus Circular Hub: Zero-Waste Move-Out Exchange",
        category: "Operational Experiment & Campus Logistics",
        date: "May 2024 — Dec 2024",
        timeInvested: "90 hours field execution",
        problemStatement: "Every May during university graduation week, an estimated 14 tons of usable furniture, mini-fridges, and desk lamps are dumped directly into municipal landfill compactors.",
        methodology: "Negotiated 2,000 sq ft of idle summer basement storage with campus facilities. Built an SMS-based booking intake for departing seniors to donate goods, and organized a fall move-in sale for incoming first-generation students.",
        keyArtifacts: [
          "Two-sided Airtable intake and redistribution catalog",
          "Logistics volunteer handbook & quality inspection rubric",
          "Campus waste diversion audit report presented to University Sustainability Council"
        ],
        outcomes: [
          "Diverted 4.8 tons of usable furniture and electronics from landfills in pilot run",
          "Saved 85 incoming low-income freshmen over $22,400 in essential dorm outfitting expenses",
          "Project generated $3,100 in operating reserves and was institutionalized by campus facilities for 2025"
        ],
        githubOrLink: "https://curiositypassport.internal/artifacts/campus-circular-hub-report"
      }
    ],

    // Learning Milestones (Passport Stamps)
    milestones: [
      {
        id: "m-1",
        date: "June 2024",
        title: "Self-Directed SQL & Cohort Retention Mastery",
        stampCode: "CAL-SQL-089",
        category: "Data Fluency",
        desc: "Completed 200 hours of independent analysis using open ecommerce transaction datasets to model customer churn and repurchase intervals."
      },
      {
        id: "m-2",
        date: "Sept 2024",
        title: "LA Garment District Supply Chain Residency",
        stampCode: "LAX-MFG-412",
        category: "Field Research",
        desc: "Shadowed cut-and-sew facility managers across 4 factories to map bottleneck tolerances and fabric waste generation firsthand."
      },
      {
        id: "m-3",
        date: "Nov 2024",
        title: "Authored Textile Recycling Infrastructure Teardown",
        stampCode: "BERK-TEX-701",
        category: "Publication",
        desc: "Synthesized mechanical fiber separation constraints and chemical polymer recovery methods in an 8-page briefing."
      },
      {
        id: "m-4",
        date: "Jan 2025",
        title: "Dean's Independent Research Grant Recipient",
        stampCode: "HAAS-RES-503",
        category: "Honor",
        desc: "Awarded non-dilutive campus exploration grant to expand circular unit economics models to European retail benchmarks."
      },
      {
        id: "m-5",
        date: "Mar 2025",
        title: "Industry Presentation to Bay Area Sustainable Business Alliance",
        stampCode: "SFO-ALL-220",
        category: "Showcase",
        desc: "Delivered keynote on 'The SKU Conservation Law in Ethical Retail' to 60+ retail founders and venture investors."
      }
    ],

    // What I Want to Explore Next
    exploreNext: [
      {
        question: "How will mandatory EU Digital Product Passports (DPP) disrupt North American supply chains by 2027?",
        whyInterested: "The European Union will soon mandate granular tracing on every garment sold. I want to map whether this software compliance cost will favor agile digital natives or entrench legacy conglomerates.",
        targetMethod: "Interviews with traceability software founders (Eon, Fairly Made) and customs compliance officers."
      },
      {
        question: "Could industrial composting cooperatives scale into profitable municipal utility models?",
        whyInterested: "Commercial compostable packaging frequently ends up in standard landfills because municipal facilities lack high-heat digesters. I want to test localized collection economics.",
        targetMethod: "Financial sensitivity model for mid-sized urban municipal composting facilities."
      },
      {
        question: "What is the true carbon payback duration of second-life EV batteries in decentralized storage?",
        whyInterested: "Before retired automotive battery packs can balance renewable grid swings, their testing, refurbishing, and shipping footprint must be proven lower than newly minted LFP cells.",
        targetMethod: "Open-source lifecycle assessment (LCA) comparison using NREL battery performance datasets."
      }
    ]
  },

  {
    id: "priya-chen",
    name: "Priya Chen",
    discipline: "Cognitive Science & Human-AI Systems",
    university: "Carnegie Mellon University",
    gradYear: "Class of 2026",
    location: "Pittsburgh, PA",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    coverTag: "Human-AI Interaction • Healthcare UX • Cognitive Ergonomics",
    shortlisted: false,
    invited: false,
    badge: "Verified Explorer",
    statusText: "Open to AI Interaction Design & Research Internships",
    
    intro: "I study how people maintain agency and cognitive bandwidth when surrounded by autonomous decision support tools. My focus is clinical environments: nurses and trauma physicians are inundated with false alarms and bloated electronic health record interfaces. I build prototype interfaces that whisper relevant context rather than screaming notifications.",
    
    careerAspirations: "Aspiring to join an AI research lab or health-tech venture designing calm, context-aware user interfaces for mission-critical operators.",
    interests: [
      "Human-AI Interaction",
      "Cognitive Ergonomics",
      "Alarm Fatigue in Healthcare",
      "Voice UX & Ambient Computing",
      "Eye-Tracking Experiments",
      "Assistive Tech Accessibility"
    ],
    
    stats: {
      trailsActive: 3,
      projectsBuilt: 2,
      fieldNotes: 18,
      milestoneStamps: 5,
      cqIndex: "96/100"
    },

    trails: [
      {
        id: "icu-alarm-fatigue",
        question: "How can ambient AI interfaces reduce sensory alarm fatigue in high-stress ICU nursing?",
        isFeatured: false,
        tags: ["Healthcare UX", "Cognitive Load", "Ambient AI"],
        status: "Prototype Tested",
        milestoneCount: 4,
        fieldNotesCount: 18,
        dateSpan: "Aug 2024 — Jan 2025",
        summary: "Shadowed 36 hours of nursing shifts at a regional medical center. Discovered 87% of telemetry beeps require no clinical intervention, contributing to severe desensitization.",
        resultingProjectTitle: "NurseGlow: Contextual Heads-Up Alert HUD",
        keyInsight: "Visual peripheral cues (soft lighting shifts) communicate urgency with 4x less cortisol elevation than acoustic beeps."
      },
      {
        id: "ambient-audio-scribing",
        question: "When does ambient AI audio documentation compromise patient trust during consultations?",
        isFeatured: false,
        tags: ["Patient Trust", "Speech AI", "Clinical Ethics"],
        status: "Active Field Inquiry",
        milestoneCount: 3,
        fieldNotesCount: 11,
        dateSpan: "Nov 2024 — Present",
        summary: "Investigating why elderly and marginalized patients alter symptom descriptions when an ambient smartphone microphone is positioned between them and the clinician.",
        resultingProjectTitle: "Trust-Preserving Clinical Scribing Guidelines",
        keyInsight: "Physical positioning of the recording device matters more to patient comfort than digital consent disclaimers."
      },
      {
        id: "multi-modal-latency",
        question: "What is the acceptable latency threshold before users lose conversational flow with voice agents?",
        isFeatured: false,
        tags: ["Voice UX", "Latency", "Psychophysics"],
        status: "Laboratory Testing",
        milestoneCount: 4,
        fieldNotesCount: 12,
        dateSpan: "Jan 2025 — Present",
        summary: "Measuring pupil dilation and speech hesitation when speech-to-speech models exhibit response delays between 200ms and 900ms.",
        resultingProjectTitle: "Voice Interaction Latency Perception Curve",
        keyInsight: "Filler acoustics ('um', 'let me check that') buffer perceived lag by up to 450ms without degrading user trust."
      }
    ],

    projects: [
      {
        id: "proj-pc-1",
        title: "NurseGlow: A Non-Intrusive Peripheral Alert Prototype for Critical Care",
        category: "Hardware & Software Prototype",
        date: "Dec 2024",
        timeInvested: "160 hours design and testing",
        problemStatement: "ICU nurses experience up to 350 auditory alarms per bed per day, causing severe cognitive burnout and delayed triage response times.",
        methodology: "Built an ESP32-powered wearable badge and ambient desk beacon communicating via BLE with a synthetic vitals simulator.",
        keyArtifacts: [
          "Figma design system for peripheral ambient color gradients",
          "Open-source Arduino firmware for pulse-oximetry trend visualization",
          "Cognitive workload test report evaluated with NASA-TLX benchmark"
        ],
        outcomes: [
          "Demonstrated a 31% reduction in self-reported stress levels in simulation trials",
          "Presented at ACM CHI Student Research Competition semi-finals",
          "Requested by 2 nursing instructors for simulation lab integration"
        ],
        githubOrLink: "https://curiositypassport.internal/artifacts/nurse-glow-study"
      },
      {
        id: "proj-pc-2",
        title: "Cognitive Load Mapping in Telehealth Interfaces",
        category: "Experimental Usability Benchmark",
        date: "Aug 2024",
        timeInvested: "80 hours research",
        problemStatement: "Split-screen telehealth consultations cause doctors to look away from patients 45% of the total call duration.",
        methodology: "Conducted eye-tracking experiments with 22 medical residents using Tobii eye-trackers during simulated patient intakes.",
        keyArtifacts: [
          "Heatmap analysis and gaze-path video recordings",
          "Redesigned single-focal-plane telemedicine interface layout"
        ],
        outcomes: [
          "Increased eye-contact duration with patients by 62%",
          "Published article on clinical UX receiving 4,500+ reads"
        ],
        githubOrLink: "https://curiositypassport.internal/artifacts/telehealth-eye-tracking"
      }
    ],

    milestones: [
      {
        id: "mp-1",
        date: "July 2024",
        title: "Completed CMU HCI Human Factors Certification",
        stampCode: "CMU-HCI-301",
        category: "Academic",
        desc: "Mastered cognitive walkthrough methodologies and quantitative task-completion analytics."
      },
      {
        id: "mp-2",
        date: "Oct 2024",
        title: "Clinical ICU Observational Residency",
        stampCode: "PGH-MED-912",
        category: "Field Research",
        desc: "Observed nursing triage and physiological monitor alarms across 5 intensive care units."
      },
      {
        id: "mp-3",
        date: "Dec 2024",
        title: "NurseGlow Prototype Hardware Deployment",
        stampCode: "LAB-IOT-104",
        category: "Prototyping",
        desc: "Fabricated 6 functional wearable beacons using rapid SLA 3D printing and custom PCB shields."
      }
    ],

    exploreNext: [
      {
        question: "Can tactile micro-haptics replace acoustic tones in sterile surgical environments?",
        whyInterested: "Surgeons already use auditory feedback, but high ambient noise during bone drilling masks vital patient alerts.",
        targetMethod: "Prototyping haptic wristband arrays with adjustable vibration frequencies."
      },
      {
        question: "How do voice agents affect memory retention during high-velocity crisis response?",
        whyInterested: "First responders relying on conversational AI might suffer memory degradation if the system does not reinforce cognitive recall.",
        targetMethod: "Simulated emergency triage exercises comparing audio transcripts vs interactive prompts."
      }
    ]
  },

  {
    id: "marcus-vance",
    name: "Marcus Vance",
    discipline: "Materials Science & Agricultural Engineering",
    university: "Georgia Institute of Technology",
    gradYear: "Class of 2025",
    location: "Atlanta, GA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    coverTag: "Biopolymers • Cold-Chain Packaging • Life-Cycle Analysis",
    shortlisted: false,
    invited: false,
    badge: "Verified Explorer",
    statusText: "Open to Materials R&D & Hardware Sustainability Roles",
    
    intro: "I develop low-carbon biomaterials using agricultural waste streams like peanut hulls and cotton gin trash. My current obsession is eliminating expanded polystyrene (Styrofoam) from refrigerated vaccine and pharmaceutical distribution. I run thermal insulation trials in my dorm workspace and document open test protocols for bio-composite degradation.",
    
    careerAspirations: "Looking to join an advanced materials lab, sustainable packaging enterprise, or industrial climate hardware startup scaling bio-based manufacturing.",
    interests: [
      "Mycelium Composites",
      "Agricultural Byproduct Upcycling",
      "Thermal Insulation Testing",
      "ASTM Drop & Compressive Standards",
      "Life-Cycle Assessment (LCA)",
      "Open-Source Hardware Tooling"
    ],
    
    stats: {
      trailsActive: 3,
      projectsBuilt: 2,
      fieldNotes: 21,
      milestoneStamps: 5,
      cqIndex: "91/100"
    },

    trails: [
      {
        id: "mycelium-cold-chain",
        question: "Can fungal mycelium composites replace expanded polystyrene in cold-chain vaccine shipping?",
        isFeatured: false,
        tags: ["Biomaterials", "Cold Chain", "Packaging"],
        status: "Lab Validated",
        milestoneCount: 4,
        fieldNotesCount: 21,
        dateSpan: "Sept 2024 — Feb 2025",
        summary: "Grew 40 mycelium insulation blocks using local Georgia peanut hull substrate. Tested R-value retention across 72 hours under 2°C to 8°C cold-chain shipping profiles.",
        resultingProjectTitle: "MycoShip: Insulated Bio-Cooler Prototype",
        keyInsight: "Compressing mycelium blocks at 180°C for 4 minutes forms a hydrophobic chitin skin that resists condensation breakdown without plastic liners."
      },
      {
        id: "cotton-trash-substrate",
        question: "What regional agricultural waste yields the highest compressive strength for bio-brick structural cores?",
        isFeatured: false,
        tags: ["Ag Waste", "Structural Testing", "Circular Materials"],
        status: "Active Testing",
        milestoneCount: 4,
        fieldNotesCount: 15,
        dateSpan: "Nov 2024 — Present",
        summary: "Benchmarking peanut shells vs bagasse vs cotton gin trash inoculated with Pleurotus ostreatus fungi under calibrated hydraulic compression.",
        resultingProjectTitle: "Ag-Waste Substrate Compressive Index",
        keyInsight: "Peanut hull lignin content provides 34% higher compressive resistance compared to wheat straw."
      },
      {
        id: "bio-foam-waterproofing",
        question: "Can plant-based candelilla wax coatings prevent fungal bio-composites from mold growth in tropical shipping?",
        isFeatured: false,
        tags: ["Surface Chemistry", "Moisture Barrier", "Packaging"],
        status: "Field Trials",
        milestoneCount: 3,
        fieldNotesCount: 8,
        dateSpan: "Jan 2025 — Present",
        summary: "Subjecting wax-dipped mycelium insulation bricks to 90% relative humidity chambers to quantify water vapor transmission rates (WVTR).",
        resultingProjectTitle: "All-Natural Hydrophobic Barrier Formulations",
        keyInsight: "A 5% beeswax-candelilla emulsion matches synthetic polyethylene moisture protection for up to 96 hours."
      }
    ],

    projects: [
      {
        id: "proj-mv-1",
        title: "MycoShip: Modular Mycelium Cold-Chain Shipper for Temperature-Sensitive Biologics",
        category: "Hardware Prototype & ASTM Thermal Testing",
        date: "Jan 2025",
        timeInvested: "175 hours bio-fabrication and testing",
        problemStatement: "Over 80 million pounds of toxic Styrofoam packaging are discarded annually from clinical trials and biopharmaceutical cold-chain deliveries.",
        methodology: "Engineered reusable interlocking mycelium clamshells grown in 3D-printed PETG molds over 9-day incubation cycles.",
        keyArtifacts: [
          "Open-source 3D CAD files for modular interlocking corner buffers",
          "Thermal dissipation logger graphs generated with Arduino DHT22 sensors",
          "Full comparative Life-Cycle Assessment (LCA) vs EPS Styrofoam"
        ],
        outcomes: [
          "Maintained 2°C-8°C payload temperature for 52 continuous hours in testing",
          "Demonstrated 100% soil biodegradation within 60 days without chemical residues",
          "Won 1st Place at the Southeast Cleantech Collegiate Innovation Challenge"
        ],
        githubOrLink: "https://curiositypassport.internal/artifacts/mycoship-cooler-spec"
      },
      {
        id: "proj-mv-2",
        title: "DIY Thermal Conductivity Bench for Biomaterial Testing",
        category: "Open-Source Laboratory Instrument",
        date: "Oct 2024",
        timeInvested: "65 hours design",
        problemStatement: "Commercial steady-state heat flow meters cost upwards of $15,000, preventing undergraduate researchers from testing custom bio-composites.",
        methodology: "Built a calibrated guarded hot-plate apparatus utilizing thermal resistance pads and PID temperature controllers for under $180.",
        keyArtifacts: [
          "Wiring schematics and bill of materials under $200",
          "Python calibration script achieving ±4% accuracy relative to NIST standards"
        ],
        outcomes: [
          "Built by 3 university makerspaces to benchmark local bio-materials",
          "Repository starred by 180+ biomaterial hobbyists and students"
        ],
        githubOrLink: "https://curiositypassport.internal/artifacts/diy-hot-plate-apparatus"
      }
    ],

    milestones: [
      {
        id: "mm-1",
        date: "Aug 2024",
        title: "Inoculation & Sterile Culture Protocol Certification",
        stampCode: "GT-BIO-108",
        category: "Laboratory",
        desc: "Certified in aseptic fungal culture propagation and substrate pasteurization techniques."
      },
      {
        id: "mm-2",
        date: "Nov 2024",
        title: "Completed ASTM D3575 Drop & Compression Testing",
        stampCode: "MAT-ENG-442",
        category: "Testing",
        desc: "Subjected 24 bio-composite samples to standard 1.2-meter drop shocks and recorded peak deceleration curves."
      },
      {
        id: "mm-3",
        date: "Jan 2025",
        title: "Southeast Cleantech Innovation Winner",
        stampCode: "SEC-INN-001",
        category: "Award",
        desc: "Awarded top collegiate cleantech trophy and $5,000 prototyping grant for MycoShip."
      }
    ],

    exploreNext: [
      {
        question: "Can carbonized agricultural char be incorporated into mycelium to yield electromagnetic shielding?",
        whyInterested: "Electronics shipping requires both impact protection and ESD/EMI shielding. Bio-char could provide conductivity organically.",
        targetMethod: "Synthesizing bio-char composite test bars and measuring surface resistivity."
      },
      {
        question: "How can continuous conveyor baking replace batch autoclaving for industrial mycelium desiccation?",
        whyInterested: "Baking is the biggest thermal energy cost in bio-composite production. Infra-red continuous drying could cut energy consumption by 40%.",
        targetMethod: "Building a benchtop IR drying chamber to measure internal moisture evaporation curves."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // THE PLAYER'S OWN PASSPORT (4th cohort member)
  // PassportView renders this record live from the field log: CQ, collected
  // stamps, field notes, meeting attendance, and the player's own inquiries.
  // ---------------------------------------------------------------------------
  {
    id: "you",
    name: "You",
    discipline: "Independent Explorer (You)",
    university: "The Curiosity Passport Cohort",
    gradYear: "Fresh Explorer",
    location: "This Session",
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Ccircle cx='48' cy='48' r='46' fill='%230F2118'/%3E%3Ccircle cx='48' cy='48' r='38' fill='none' stroke='%23C59837' stroke-width='2'/%3E%3Ctext x='48' y='64' font-family='Georgia,serif' font-size='42' fill='%23FCFAF7' text-anchor='middle'%3EY%3C/text%3E%3C/svg%3E",
    coverTag: "Self-Direction · Your Own Inquiry · Open Question",
    shortlisted: false,
    invited: false,
    badge: "Fresh Explorer",
    statusText: "Fielding your first curiosity inquiry",

    intro: "This is the passport you are writing right now. It starts empty — no trails, no artifacts, no stamps. Every trail you open, stage you trace, meeting you attend, and field note you files is recorded here as evidence of how you think when the question is your own.",

    careerAspirations: "To build a working record of curiosity: open questions, tested hypotheses, and artifacts that survive a stranger's scrutiny.",
    interests: [
      "Open Questions",
      "First-Principles Thinking",
      "Fieldwork",
      "Self-Directed Learning"
    ],

    stats: {
      trailsActive: 0,
      projectsBuilt: 0,
      fieldNotes: 0,
      milestoneStamps: 0,
      cqIndex: "0/100"
    },

    trails: [],
    projects: [],
    milestones: [],

    exploreNext: [
      {
        question: youSeedInquiry,
        whyInterested: "Your opening line. Answer it in the field log below — every question you write becomes part of this portfolio.",
        targetMethod: "Use the 'Write your next question' card on this passport. It files to your record."
      }
    ]
  }
];

// Helper to get students merged with the live field log (profile, authored trails, projects)
export function getMergedStudents(fieldLog) {
  if (!fieldLog) return students;
  return students.map((s) => {
    if (s.id !== 'you') return s;
    const prof = fieldLog.profile || {};
    const createdTrails = fieldLog.createdTrails || [];
    const projects = createdTrails
      .filter((t) => t.resultingProjectTitle)
      .map((t, idx) => ({
        id: `you-proj-${idx + 1}`,
        title: t.resultingProjectTitle,
        category: t.tags?.[0] || 'Original Research',
        dateSpan: t.completedDate || '2025',
        summary: t.resultingProjectSummary || t.subtitle || 'Tangible inquiry artifact built during field research.',
        deliverableType: 'Interactive Artifact & Prototype',
        liveUrl: t.resultingProjectLink || null,
        metrics: `${t.nodes?.length || 1} research stages completed`,
      }));

    const mappedTrails = createdTrails.map((t) => ({
      id: t.id,
      question: t.title,
      isFeatured: true,
      tags: t.tags || ['Original Research'],
      status: t.status || 'Synthesized & Published',
      milestoneCount: t.nodes?.length || 1,
      fieldNotesCount: t.nodes?.length || 1,
      dateSpan: `${t.startedDate || '2024'} — ${t.completedDate || '2025'}`,
      summary: t.subtitle || t.whyCurious?.slice(0, 150) || '',
      resultingProjectTitle: t.resultingProjectTitle || null,
      keyInsight: t.keyInsight || t.nodes?.[t.nodes.length - 1]?.keyTakeaway || '',
    }));

    const yourInquiries = (fieldLog.inquiries || []).map((q) => ({
      question: q.text,
      whyInterested: 'Your own question, filed to this passport from the Field Office.',
      targetMethod: 'Open inquiry trace',
    }));

    return {
      ...s,
      name: prof.name || s.name,
      discipline: prof.discipline || s.discipline,
      university: prof.university || s.university,
      gradYear: prof.gradYear || s.gradYear,
      location: prof.location || s.location,
      coverTag: prof.coverTag || s.coverTag,
      intro: prof.intro || s.intro,
      careerAspirations: prof.careerAspirations || s.careerAspirations,
      interests: prof.interests?.length ? prof.interests : s.interests,
      trails: mappedTrails,
      projects: projects,
      exploreNext: yourInquiries.length ? yourInquiries : s.exploreNext,
      stats: {
        trailsActive: mappedTrails.length,
        projectsBuilt: projects.length,
        fieldNotes: fieldLog.fieldNotes?.length || 0,
        milestoneStamps: fieldLog.earnedStamps?.length || 0,
        cqIndex: `${fieldLog.cq}/100`,
      },
    };
  });
}

export function getStudentById(studentId, fieldLog) {
  const all = getMergedStudents(fieldLog);
  return all.find((s) => s.id === studentId) || all[0];
}
