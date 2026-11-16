// Comprehensive dataset for Curiosity Trails across multiple students and disciplines
export const trailsData = {
  // ---------------------------------------------------------------------------
  // TRAIL 1: Alex Morgan - Sustainable Fashion Unit Economics (Featured)
  // ---------------------------------------------------------------------------
  "sustainable-fashion": {
    id: "sustainable-fashion",
    shortLabel: "Sustainable Fashion",
    studentId: "alex-morgan",
    studentName: "Alex Morgan",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    studentRole: "Business & Sustainable Enterprise, UC Berkeley",
    title: "Why do some sustainable fashion brands grow faster than others?",
    subtitle: "An investigation into unit economics, aesthetic framing, and the margin trap in modern ethical apparel.",
    status: "Synthesized & Published",
    startedDate: "Oct 2024",
    completedDate: "March 2025",
    readTime: "7 min explore",
    tags: ["Retail Economics", "Supply Chain", "Consumer Psychology", "Brand Strategy"],
    curiosityRating: "Top 2% Trail on Platform",
    
    whyCurious: `In September 2024, I saved up $140 to buy an organic cotton hoodie from a heavily advertised sustainable fashion startup. After two gentle washes, the neckline warped and the seams twisted. Around that exact same week, I read that two venture-backed eco-apparel darlings (one of which raised $30M) entered quiet liquidation, while Patagonia reported its highest revenue year in company history.
    
    The paradox struck me: why were some mission-driven apparel brands scaling into resilient cultural juggernauts, while other well-funded ethical competitors suffocated under their own values? Was it a pricing problem, a greenwashing fatigue issue, or a fatal flaw in the unit economics of sustainable sourcing? I spent 5 months digging into customs manifests, founder interviews, and margin teardowns to find out.`,

    relatedQuestions: [
      {
        q: "Does the consumer 'Green Premium' actually exist at checkout?",
        insight: "Surveys report 74% of Gen Z want sustainable fashion, but cart abandonment spikes 42% whenever ethical garments exceed a 12% price differential over fast-fashion peers."
      },
      {
        q: "How do fabric Minimum Order Quantities (MOQs) distort early working capital?",
        insight: "Certified organic dyeing mills demand 1,500m per colorway vs. 300m for virgin polyester, forcing cash-strapped startups into extreme inventory overhang."
      },
      {
        q: "Why do consumers forgive synthetic blends in performance wear but penalize basics?",
        insight: "Aesthetic durability and tactile hand-feel drive repurchase. If a 100% natural fiber garment pills after 3 cycles, 'sustainability' feels like a penalty rather than a benefit."
      },
      {
        q: "Can EU Digital Product Passports (DPPs) transform repair into a profitable retention moat?",
        insight: "Early pilots reveal brands monetizing circular care services achieve 2.4x higher customer lifetime value (LTV) within 18 months."
      }
    ],

    nodes: [
      {
        id: "node-1",
        stepNumber: "01",
        phase: "Spark & Observation",
        title: "The $140 Hoodie Disillusionment & The Market Paradox",
        date: "Oct 2024",
        summary: "Identified a sharp contradiction between consumer stated preferences and startup bankruptcy filings in sustainable apparel.",
        body: `I began by aggregating SEC filings, retail insolvencies, and press releases across 28 DTC brands launched between 2018 and 2023. Over 40% had either shuttered, restructured, or been acquired for pennies on the dollar. Yet the global 'ethical fashion' market was projected to expand at 8.3% CAGR.
        
        This proved the problem wasn't consumer demand—it was business model fragility. I set out to isolate the operational variables separating durable winners from casualties.`,
        keyTakeaway: "Sustainability is never a substitute for product quality or cash-flow discipline; it is an amplifier of both.",
        quote: "Consumers don't buy your supply chain audit; they buy how they feel when they look in the mirror.",
        evidenceType: "Market Analysis",
        readiness: "Complete"
      },
      {
        id: "node-2",
        stepNumber: "02",
        phase: "Hypothesis Formulation",
        title: "Three Working Hypotheses on the Growth Divergence",
        date: "Nov 2024",
        summary: "Drafted testable hypotheses centered on Aesthetic Framing, Working Capital Mechanics, and Secondary Value Loops.",
        body: `Before speaking with operators, I formalized three hypotheses:
        
        1. Hypothesis A (Framing): Fast-growing sustainable brands position ethics as an 'inevitable byproduct' of superior engineering rather than their core sales pitch.
        2. Hypothesis B (Sourcing Trap): Failed brands succumbed to the 'Fabric MOQ death spiral'—ordering custom ethical fabrics that locked up 70%+ of operating cash.
        3. Hypothesis C (Longevity Loop): Winning brands decouple margin from volume by offering in-house repair, resale, or modular replacement components.`,
        keyTakeaway: "Framing ethics as 'sacrifice' kills growth. Framing ethics as 'superior tactile performance' creates fanatic retention.",
        evidenceType: "Hypothesis Matrix",
        readiness: "Validated"
      },
      {
        id: "node-3",
        stepNumber: "03",
        phase: "Field Research",
        title: "14 In-Depth Founder & Supply Chain Interviews",
        date: "Dec 2024",
        summary: "Conducted field calls with 8 DTC apparel founders, 3 textile mill operators in North Carolina and Portugal, and 3 sustainable sourcing directors.",
        body: `I visited two garment manufacturing workshops in Los Angeles and conducted 14 confidential 45-minute interviews with brand operators. 
        
        The standout insight came from a sourcing director who explained that 'recycled cotton' fibers have shorter staple lengths, leading to fabric breakage unless blended with long-staple virgin cotton or micro-elastane. Brands advertising '100% circular recycled cotton' frequently experienced return rates 3x higher due to premature pilling.`,
        keyTakeaway: "Purity can be the enemy of longevity. Engineering for real-world garment life often requires thoughtful hybrid blends over dogmatic marketing claims.",
        quote: "If a recycled shirt wears out in 6 months, its lifecycle footprint is worse than a polyester shirt worn 200 times.",
        evidenceType: "Qualitative Fieldwork",
        readiness: "Complete"
      },
      {
        id: "node-4",
        stepNumber: "04",
        phase: "Data & Financial Archaeology",
        title: "Scraped DTC Margins & Unit Economics Teardown",
        date: "Jan 2025",
        summary: "Modeled contribution margins, customer acquisition costs (CAC), and inventory turnover across 12 comparable apparel ventures.",
        body: `I built a custom unit economics model comparing standard fast-fashion, conventional premium DTC, and sustainable DTC. 
        
        The findings were startling:
        - Ethical raw material COGS are 38% to 54% higher.
        - Return shipping on ill-fitting apparel wipes out 82% of net operating profit per order.
        - Outlier brands (like Kowtow, Nudie Jeans, and Asket) succeeded because they kept SKUs under 40 units, completely avoiding dead inventory discounting.`,
        keyTakeaway: "Curated minimalism is the only defense against sustainable COGS inflation. High SKU counts are fatal to green brands.",
        evidenceType: "Financial Model",
        readiness: "Complete"
      },
      {
        id: "node-5",
        stepNumber: "05",
        phase: "Synthesis & Project",
        title: "Publishing 'The Green Premium Teardown' Whitepaper",
        date: "Feb 2025",
        summary: "Distilled 5 months of findings into an actionable 18-page industry teardown and interactive pricing sensitivity spreadsheet.",
        body: `I open-sourced a dynamic sensitivity model allowing early-stage fashion founders to calculate their 'True Break-Even MOQ' when sourcing certified GOTS organic or Lenzing TENCEL™ yarns.
        
        The teardown was shared across 4 industry newsletters, downloaded 340+ times, and led to an invitation to present my findings to the Bay Area Sustainable Business Alliance.`,
        keyTakeaway: "A project isn't finished when you write it; it's finished when practitioners test your insights against reality.",
        evidenceType: "Project Artifact",
        readiness: "Published"
      },
      {
        id: "node-6",
        stepNumber: "06",
        phase: "Reflection & Next Step",
        title: "What Remains Uncertain & The Next Horizon",
        date: "March 2025",
        summary: "Critically evaluated limitations in my dataset and formulated the next systemic inquiry into EU digital product passports.",
        body: `Intellectual honesty demands acknowledging the blind spots. My teardowns focused primarily on North American and European direct-to-consumer models. I have not yet evaluated how Asian decentralized manufacturing networks (like Shein's agile on-demand supply chain) could be adapted to run purely regenerative organic fibers.
        
        Furthermore, if public shareholders continue demanding quarterly volume growth, can any publicly listed apparel conglomerate ever truly scale circular repair over new product shipments?`,
        keyTakeaway: "The best answer to a great question is an even more precise next question.",
        evidenceType: "Reflective Synthesis",
        readiness: "Active Inquiry"
      }
    ],

    discoveries: [
      {
        title: "The Framing Inversion (Efficacy > Ethics)",
        desc: "Fastest-growing brands lead with superior tactile hand-feel, fit consistency, and durability. Sustainability is positioned as the quiet reason why the garment feels so well-made, not as moral charity."
      },
      {
        title: "The SKU Conservation Law",
        desc: "Brands with under 35 evergreen SKUs sustained gross margins of 61-68% despite higher material costs, while high-SKU seasonal brands bled out on end-of-season clearance markdowns."
      },
      {
        title: "The Post-Purchase Margin Loop",
        desc: "Providing lifetime repair and trade-in credits turned customer acquisition from a single transaction into a continuous relationship, cutting secondary CAC by 58%."
      },
      {
        title: "The Fiber Blend Pragmatism",
        desc: "100% purity often sacrifices durability. Leading durable brands optimize for 'functional longevity' over dogmatic single-fiber marketing claims."
      }
    ],

    sources: [
      {
        title: "The State of Fashion 2025: Circularity & Reality Check",
        author: "McKinsey & Business of Fashion",
        type: "Industry Benchmark",
        quote: "Only 12% of surveyed consumers consistently pay a 15%+ price premium for verifiably circular apparel at checkout.",
        annotation: "Crucial benchmark establishing the ceiling for ethical price elasticity in mass-premium segments."
      },
      {
        title: "Confidential Interview: VP of Sourcing",
        author: "Sustainable Outerwear DTC ($45M ARR)",
        type: "Field Interview",
        quote: "Our best decision was buying 50% fewer yarn varieties and guaranteeing our mill 12-month rolling commitments.",
        annotation: "Revealed how supplier trust and volume smoothing eliminates the standard 30% small-batch surcharge."
      },
      {
        title: "Textile Exchange: Materials Market Report 2024",
        author: "Textile Exchange Global",
        type: "Primary Data",
        quote: "Preferred fiber market share rose to 27%, but post-consumer textile-to-textile recycling remains stuck below 1%.",
        annotation: "Validated that mechanical fiber recycling bottlenecks are physical, not merely behavioral."
      },
      {
        title: "Let My People Go Surfing: The Education of a Reluctant Businessman",
        author: "Yvon Chouinard (Patagonia)",
        type: "Core Philosophy",
        quote: "The cure for depression is action. The cure for bad manufacturing is making products that never have to be replaced.",
        annotation: "Fundamental reference on product longevity as the premier ecological strategy."
      }
    ],

    miniProject: {
      title: "The Green Premium Teardown: Unit Economics of 12 Sustainable DTC Apparel Brands",
      type: "Financial Model & 18-Page Industry Report",
      badge: "Featured Portfolio Artifact",
      metric1: "12 Brands Analyzed",
      metric2: "340+ Whitepaper Downloads",
      metric3: "3 Scalable Growth Archetypes Identified",
      description: "A comprehensive unit economics teardown analyzing COGS, inventory cycles, and gross margins across 12 direct-to-consumer apparel ventures. Features an interactive sensitivity model in Google Sheets / Excel that calculates the exact volume threshold needed to absorb certified sustainable fiber costs without diluting margin.",
      outcomes: [
        "Derived the 'SKU Conservation Formula' adopted by 2 student-run campus ventures",
        "Invited to present teardown at the UC Berkeley Haas Sustainable Business Symposium",
        "Highlighted by an apparel industry newsletter with 14,000 retail executive subscribers"
      ]
    },

    lessonsLearned: [
      {
        number: "01",
        title: "Quality is the precondition for impact",
        text: "If a sustainable garment does not outlast and outshine its conventional competitor, its total lifecycle emissions will still be higher. Eco-design must mean better design."
      },
      {
        number: "02",
        title: "Working capital kills more green brands than lack of demand",
        text: "Ethical supply chains require longer lead times and higher minimum order commitments. Cash conversion cycle discipline is the true secret weapon of enduring eco-founders."
      },
      {
        number: "03",
        title: "Customer trust is asymmetric",
        text: "It takes five years to build a reputation for ethical stewardship, but one ambiguous greenwashed marketing campaign destroys brand equity overnight."
      }
    ],

    uncertainties: [
      {
        title: "Can second-hand resale ever become accretive to top-line margins?",
        detail: "Most brand resale portals (Worn Wear, Archive, Trove) operate near break-even after taking inspection, steam-cleaning, and reverse-logistics handling fees into account."
      },
      {
        title: "Will mandatory EU Digital Product Passports level the playing field or entrench giants?",
        detail: "Compliance software and RFID thread integrations may cost over $150K upfront, potentially squeezing out agile grassroots innovators in favor of legacy conglomerates."
      },
      {
        title: "The microplastic paradox in recycled ocean plastics",
        detail: "Garments crafted from recycled PET water bottles still shed microplastics in everyday domestic washing machines. Is bottle-to-cloth really a closed loop or just delayed pollution?"
      }
    ],

    nextQuestion: {
      question: "If circularity requires repairability and longevity, can public fashion companies ever decouple shareholder returns from volume growth?",
      explorationStatus: "Queueing for Fall 2025 Independent Research",
      hypothesisPreview: "Public companies may need to transition from selling discrete garments to selling 'Wardrobe-as-a-Service' with guaranteed buybacks and maintenance warranties."
    }
  },

  // ---------------------------------------------------------------------------
  // TRAIL 2: Alex Morgan - Reverse Logistics & Return Economics
  // ---------------------------------------------------------------------------
  "reverse-logistics": {
    id: "reverse-logistics",
    shortLabel: "Reverse Logistics",
    studentId: "alex-morgan",
    studentName: "Alex Morgan",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    studentRole: "Business & Sustainable Enterprise, UC Berkeley",
    title: "Can reverse-logistics startups survive the unit economics of free returns?",
    subtitle: "Mapping return processing bottlenecks, freight consolidation, and secondary liquidation recovery rates.",
    status: "Active Field Research",
    startedDate: "Jan 2025",
    completedDate: "In Progress",
    readTime: "5 min explore",
    tags: ["Logistics", "Unit Economics", "Supply Chain", "Reverse Commerce"],
    curiosityRating: "Top 5% Trail on Platform",
    
    whyCurious: `In December 2024, I read that over $240 billion worth of merchandise was returned following the holiday shopping season in the US alone. Astonishingly, nearly 25% of returned apparel is incinerated or landfilled simply because manual inspection and repackaging costs exceed the net resale value.
    
    Startups like Happy Returns, Loop, and Two Boxes emerged promising seamless reverse logistics. But as parcel carrier rates (UPS, FedEx) rose 5.9% annually, I wanted to understand: can a third-party return network ever achieve positive unit margins without charging the end consumer?`,

    relatedQuestions: [
      {
        q: "What is the true cost of 'inspecting' a returned garment?",
        insight: "Labor costs for unpackaging, barcode scanning, odor/lint check, and refolding average $4.85 to $6.20 per unit."
      },
      {
        q: "Why do consolidation drop-off bars (like Whole Foods / Amazon) work while standalone hubs struggle?",
        insight: "Co-locating return counters inside high-foot-traffic grocery retail offsets 78% of retail lease costs through shared overhead."
      },
      {
        q: "What percentage of returned goods actually make it back to prime inventory?",
        insight: "Only 48% of apparel returns are restocked at full price; the remaining 52% are diverted to B2B liquidation pallets at 80% markdowns."
      }
    ],

    nodes: [
      {
        id: "node-rl-1",
        stepNumber: "01",
        phase: "Problem Definition",
        title: "The $240B Return Avalanche & Landfill Redirection",
        date: "Jan 2025",
        summary: "Audited reverse freight rates and discovered the devastating math of single-item return parcels.",
        body: `When a customer ships back a $60 sweater via USPS, shipping and handling alone costs the retailer $11.40. Add a $5.00 inspection fee, and the retailer has lost 27% of gross merchandise value before even evaluating item condition.`,
        keyTakeaway: "Single-item parcel returns are structurally unprofitable. Consolidation is the only viable path to solvency.",
        evidenceType: "Freight Cost Audit",
        readiness: "Complete"
      },
      {
        id: "node-rl-2",
        stepNumber: "02",
        phase: "Field Work",
        title: "East Bay Logistics Warehouse Walkthrough",
        date: "Feb 2025",
        summary: "Toured a 40,000 sq ft 3PL reverse sorting facility in Hayward, CA, tracking return triage times.",
        body: `I timed warehouse operators across 80 inbound return packages. The biggest operational drag was adhesive removal and re-bagging into clear poly mailers. Automated visual AI grading reduced triage time from 140 seconds to 38 seconds per item.`,
        keyTakeaway: "Computer vision grading will separate the surviving return hubs from legacy manual warehouses.",
        quote: "Our biggest cost isn't freight; it's the 90 seconds a worker spends looking for makeup smudges on a white collar.",
        evidenceType: "Field Time-Study",
        readiness: "Complete"
      },
      {
        id: "node-rl-3",
        stepNumber: "03",
        phase: "Financial Modeling",
        title: "Bay Area Micro-Hub Logistics Matrix",
        date: "Feb 2025",
        summary: "Built a geospatial simulation comparing centralized vs decentralized return sorting within 25 miles of San Francisco.",
        body: `Local micro-hubs aggregate returns daily, sort them by regional brand warehouse, and ship palletized batches twice weekly. This reduced per-garment return transit cost from $7.80 to $2.95.`,
        keyTakeaway: "Batch freight transforms reverse economics from a guaranteed loss into an operational buffer.",
        evidenceType: "Geospatial Model",
        readiness: "Validated"
      },
      {
        id: "node-rl-4",
        stepNumber: "04",
        phase: "Next Steps",
        title: "Consumer Restocking Fee Sensitivity Testing",
        date: "Mar 2025",
        summary: "Surveyed 240 collegiate shoppers on tolerance for $4 flat return fees when presented with carbon savings data.",
        body: `62% of respondents accepted a $4 return deduction when framed as an environmental processing contribution, proving that transparent framing can stem return abuse without poisoning brand affinity.`,
        keyTakeaway: "The era of 100% frictionless free returns is closing; transparent cost-sharing is coming.",
        evidenceType: "Consumer Survey",
        readiness: "In Progress"
      }
    ],

    discoveries: [
      {
        title: "The Consolidation Threshold",
        desc: "A return hub must process a minimum of 4,000 units per week within a 15-mile radius to break even on facility lease and labor overhead."
      },
      {
        title: "The Resale Depreciation Clock",
        desc: "Every day an item sits in return transit, its expected recovery price drops 0.8% due to seasonal transition and stock obsolescence."
      }
    ],

    sources: [
      {
        title: "National Retail Federation: 2024 Consumer Returns in the Retail Industry",
        author: "NRF & Appriss Retail",
        type: "Industry Benchmark",
        quote: "Total returns accounted for 14.5% of all retail sales in 2023, totaling $743 billion.",
        annotation: "Shows the sheer macro scale of the reverse-commerce crisis."
      },
      {
        title: "Confidential Interview: Head of Operations",
        author: "Regional 3PL Fulfillment Provider",
        type: "Field Interview",
        quote: "Retailers who ban return bracketing (ordering 3 sizes to keep 1) see return rates drop by 35% overnight.",
        annotation: "Highlights that behavioral nudges are cheaper than logistical fixes."
      }
    ],

    miniProject: {
      title: "Bay Area Micro-Hub Reverse Logistics Financial Simulator",
      type: "Python & Excel Model",
      badge: "Logistics Optimization Model",
      metric1: "62% Freight Savings",
      metric2: "3 Micro-Hub Locations Mapped",
      metric3: "4.8 Day Turnaround",
      description: "A dynamic route and batching model proving that hyperlocal neighborhood return collection drops transit emissions by 41% and restores restock velocity.",
      outcomes: [
        "Presented at UC Berkeley Haas Supply Chain Roundtable",
        "Adopted as reference scenario for campus sustainability logistics"
      ]
    },

    lessonsLearned: [
      {
        number: "01",
        title: "Batching is destiny in reverse logistics",
        text: "Individual parcel handling is inherently unprofitable. Success belongs to players who aggregate volume at dense physical access points."
      },
      {
        number: "02",
        title: "Consumer transparency beats hidden shipping subsidies",
        text: "Customers respect honesty when retailers explain the environmental and economic cost of frivolous returns."
      }
    ],

    uncertainties: [
      {
        title: "Will luxury brands ever allow third-party drop-off aggregation?",
        detail: "High-end luxury brands fear brand dilution if their items are handled in casual convenience-store drop-off lockers."
      }
    ],

    nextQuestion: {
      question: "Could peer-to-peer neighborhood return exchanges bypass central warehouses entirely?",
      explorationStatus: "Planning Field Experiment",
      hypothesisPreview: "If Customer A returns a size M jacket, matching them with Customer B in the same zip code who wants a size M could eliminate 100% of warehouse handling costs."
    }
  },

  // ---------------------------------------------------------------------------
  // TRAIL 3: Alex Morgan - Scope 3 Carbon Accounting
  // ---------------------------------------------------------------------------
  "carbon-accounting": {
    id: "carbon-accounting",
    shortLabel: "Scope 3 Carbon",
    studentId: "alex-morgan",
    studentName: "Alex Morgan",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    studentRole: "Business & Sustainable Enterprise, UC Berkeley",
    title: "How do carbon-accounting platforms verify Scope 3 emissions without supplier fatigue?",
    subtitle: "Analyzing why tier-2 and tier-3 manufacturing suppliers abandon manual ESG questionnaires, and how automated ERP pipelines can replace audit friction.",
    status: "Problem Discovery & Modeling",
    startedDate: "Feb 2025",
    completedDate: "In Progress",
    readTime: "6 min explore",
    tags: ["B2B SaaS", "Climate Tech", "Data Auditing", "Enterprise Software"],
    curiosityRating: "Top 8% Trail on Platform",
    
    whyCurious: `In January 2025, I spoke with a mid-sized automotive parts supplier in Ohio. The founder showed me 14 different carbon disclosure questionnaires sent by enterprise buyers (Watershed, Persefoni, EcoVadis, and direct Excel templates). Each tool asked for the same energy consumption metrics in slightly incompatible formats.
    
    He spent $60,000 on outside consultants just to fill out compliance surveys. The irony was palpable: companies were spending more time and capital measuring emissions than actually abating them. I wanted to understand how automated software could pull direct utility and ERP data without burdening upstream manufacturers.`,

    relatedQuestions: [
      {
        q: "Why do suppliers submit estimated spend-based data instead of primary emissions data?",
        insight: "Spend-based emission factors take 5 minutes to compute via invoices, whereas primary kWh allocation per component requires sub-metered factory lines."
      },
      {
        q: "Can cryptographic zero-knowledge proofs enable suppliers to verify emissions without revealing trade secret recipes?",
        insight: "Suppliers fiercely guard bill-of-materials proportions because enterprise buyers frequently use component breakdowns to negotiate price cuts."
      }
    ],

    nodes: [
      {
        id: "node-ca-1",
        stepNumber: "01",
        phase: "Field Inquiries",
        title: "The 14-Questionnaire Survey Nightmare",
        date: "Feb 2025",
        summary: "Audited reporting friction across 6 Tier-2 metal stamping and plastic injection molding facilities.",
        body: `Every supplier surveyed reported questionnaire fatigue. 100% used industry-average spend estimates rather than real factory meter readings, meaning billions of dollars in reported enterprise ESG progress is based on synthetic averages.`,
        keyTakeaway: "If data collection isn't automated at the utility meter, Scope 3 reporting is mostly creative accounting.",
        evidenceType: "Supplier Interviews",
        readiness: "Complete"
      },
      {
        id: "node-ca-2",
        stepNumber: "02",
        phase: "Technical Modeling",
        title: "Automated ERP & Bill-of-Materials Carbon Ingestion",
        date: "Mar 2025",
        summary: "Prototyped a Python parser connecting open EPA GHG emission factors to standard SAP/Netsuite purchase orders.",
        body: `By automating raw material weights directly from shipment invoices, we eliminated 90% of manual survey entry while producing auditable primary carbon footprints.`,
        keyTakeaway: "Software must integrate into procurement workflows, not exist as an isolated annual survey portal.",
        evidenceType: "Software Prototype",
        readiness: "Active"
      }
    ],

    discoveries: [
      {
        title: "The Procurement Incentive Alignment",
        desc: "Suppliers only provide high-fidelity primary emissions data when buyers tie it to favorable payment terms (e.g., net-15 instead of net-60)."
      }
    ],

    sources: [
      {
        title: "Greenhouse Gas Protocol: Corporate Value Chain (Scope 3) Standard",
        author: "WRI & WBCSD",
        type: "Standard Specification",
        quote: "Scope 3 emissions frequently account for over 80% of a company's total climate footprint.",
        annotation: "Establishes why upstream data capture is mandatory for genuine decarbonization."
      }
    ],

    miniProject: {
      title: "Automated Bill-of-Materials Carbon Parser",
      type: "Python CLI & Data Architecture",
      badge: "Climate Tech Prototype",
      metric1: "90% Less Manual Entry",
      metric2: "EPA Emission API Integration",
      metric3: "Open Source Schema",
      description: "A lightweight script mapping raw manufacturing bills of materials to regional grid carbon intensities without manual survey forms.",
      outcomes: [
        "Tested against 3 sample manufacturing ERP exports",
        "Presented at Berkeley Climate Data Hackathon"
      ]
    },

    lessonsLearned: [
      {
        number: "01",
        title: "Measurement is not reduction",
        text: "Compliance platforms that focus exclusively on tracking create reporting overhead without reducing a single ton of CO2."
      }
    ],

    uncertainties: [
      {
        title: "How will SEC climate disclosure rule delays impact SaaS adoption?",
        detail: "Without immediate regulatory penalties, enterprise procurement teams often deprioritize Scope 3 supplier integration."
      }
    ],

    nextQuestion: {
      question: "Could utility-backed smart meter APIs eliminate supplier carbon questionnaires entirely?",
      explorationStatus: "Queueing for Research",
      hypothesisPreview: "Direct green-button utility data transfers could authenticate factory power consumption without human data entry."
    }
  },

  // ---------------------------------------------------------------------------
  // TRAIL 4: Priya Chen - ICU Alarm Fatigue & Ambient AI UX
  // ---------------------------------------------------------------------------
  "icu-alarm-fatigue": {
    id: "icu-alarm-fatigue",
    shortLabel: "ICU Alarm Fatigue",
    studentId: "priya-chen",
    studentName: "Priya Chen",
    studentAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    studentRole: "Cognitive Science & Human-AI Systems, Carnegie Mellon",
    title: "How can ambient AI interfaces reduce sensory alarm fatigue in high-stress ICU nursing?",
    subtitle: "Investigating why 87% of telemetry monitor alarms are clinically non-actionable, and prototyping peripheral visual HUDs that protect cognitive bandwidth.",
    status: "Prototype Tested",
    startedDate: "Aug 2024",
    completedDate: "Jan 2025",
    readTime: "7 min explore",
    tags: ["Healthcare UX", "Cognitive Load", "Ambient AI", "Human-Centered Design"],
    curiosityRating: "Top 1% Trail on Platform",
    
    whyCurious: `In July 2024, my aunt spent 10 days in an intensive care unit following cardiac surgery. What shocked me wasn't the medical complexity, but the ceaseless cacophony of beeping medical monitors: ventilator chirps, pulse oximeter alerts, IV drip alarms.
    
    Every 90 seconds, a machine shrieked. The nurses seemed visibly drained, frequently silencing alarms without breaking their stride. I asked a veteran trauma nurse about it, and she told me: 'After 4 hours, your brain stops hearing specific tones. It all just turns into static stress.' As a cognitive science student, I realized this wasn't a nursing failure—it was a catastrophic failure of audio interface design.`,

    relatedQuestions: [
      {
        q: "Why do medical device makers default to piercing high-frequency acoustic alarms?",
        insight: "FDA 60601-1-8 standards prescribe strict auditory thresholds designed in the 1980s, prioritizing device defensibility over overall room cognitive load."
      },
      {
        q: "How does persistent auditory stress degrade diagnostic memory?",
        insight: "Continuous 75dB noise levels elevate salivary cortisol by 28% and cut short-term medication recall by 19% in simulated clinical shifts."
      },
      {
        q: "Can peripheral visual cues convey physiological urgency with lower stress?",
        insight: "Human peripheral vision has high motion and luminance sensitivity; ambient color temperature shifts trigger attention without triggering fight-or-flight acoustic spikes."
      }
    ],

    nodes: [
      {
        id: "node-icu-1",
        stepNumber: "01",
        phase: "Field Observation",
        title: "36 Hours of ICU Clinical Shadowing",
        date: "Aug 2024",
        summary: "Observed bedside telemetry monitors across 12 patient rooms at a regional medical center.",
        body: `Over 36 hours of shift shadowing, I logged 1,240 discrete audible alarm events. 1,079 (87%) required zero medical intervention (transient sensor slip, patient rolling over, minor cough). Nurses were bombarded with alarms while administering complex medication titrations.`,
        keyTakeaway: "When everything is loud, nothing is urgent. Sensory desensitization is an inevitable defense mechanism.",
        quote: "You have to mute your own hearing just to keep your hands steady while drawing meds.",
        evidenceType: "Clinical Observation",
        readiness: "Complete"
      },
      {
        id: "node-icu-2",
        stepNumber: "02",
        phase: "Cognitive Load Mapping",
        title: "NASA-TLX Workload Benchmarking",
        date: "Oct 2024",
        summary: "Administered NASA-TLX cognitive workload evaluations to 18 critical care nurses.",
        body: `Mental demand and frustration scored in the 92nd percentile. Audio alarms contributed 4x more to perceived fatigue than physical patient transfers or charting tasks.`,
        keyTakeaway: "Auditory alarm overload is the leading driver of nurse burnout in telemetry units.",
        evidenceType: "Quantitative Usability",
        readiness: "Complete"
      },
      {
        id: "node-icu-3",
        stepNumber: "03",
        phase: "Hardware Prototype",
        title: "NurseGlow: Ambient Peripheral Light Beacon",
        date: "Nov 2024",
        summary: "Built an ESP32-powered wearable desk beacon that translates vitals trendlines into gentle breathing color fields.",
        body: `Instead of beeping on instantaneous dips, NurseGlow calculates moving rate-of-change. If SpO2 drops rapidly, the desk halo transitions from calm sage to warm amber. In simulation trials, nurses recognized true deterioration 14 seconds faster with 31% lower cortisol elevation.`,
        keyTakeaway: "Calm technology communicates state through peripheral awareness rather than focal interruption.",
        evidenceType: "Functional Prototype",
        readiness: "Tested"
      },
      {
        id: "node-icu-4",
        stepNumber: "04",
        phase: "Synthesis",
        title: "ACM CHI Student Research Competition Paper",
        date: "Jan 2025",
        summary: "Authored paper on 'Designing Calm Bedside Alert Systems' accepted for presentation.",
        body: `Outlined design guidelines for multi-modal medical interfaces, proposing dynamic urgency scaling based on ambient room noise and clinician proximity.`,
        keyTakeaway: "Good healthcare UX directly saves lives by preserving clinician cognitive bandwidth.",
        evidenceType: "Academic Publication",
        readiness: "Published"
      }
    ],

    discoveries: [
      {
        title: "Rate-of-Change Trumps Instantaneous Thresholds",
        desc: "Monitoring the velocity of physiological decline eliminates 73% of nuisance alarms caused by momentary sensor artifacts."
      },
      {
        title: "Peripheral Lighting Preserves Focus",
        desc: "Subtle lighting gradients in the room's periphery inform clinicians of patient status without interrupting delicate needle procedures."
      }
    ],

    sources: [
      {
        title: "The Joint Commission Sentinel Event Alert: Medical Device Alarm Safety in Hospitals",
        author: "The Joint Commission",
        type: "Safety Directive",
        quote: "Between 85% and 99% of hospital alarm signals do not require clinical intervention.",
        annotation: "Definitive regulatory finding validating that alarm fatigue is a systemic patient safety hazard."
      },
      {
        title: "Designing Calm Technology",
        author: "Mark Weiser & John Seely Brown (Xerox PARC)",
        type: "Design Philosophy",
        quote: "Calm technology engages both the center and the periphery of our attention, and moves fluidly between them.",
        annotation: "Theoretical foundation for moving critical hospital information to peripheral sight."
      }
    ],

    miniProject: {
      title: "NurseGlow: A Non-Intrusive Peripheral Alert Prototype for Critical Care",
      type: "Hardware & Firmware Prototype",
      badge: "ACM CHI Semi-Finalist",
      metric1: "31% Lower Cortisol",
      metric2: "14s Faster Triage Recognition",
      metric3: "87% Fewer Nuisance Beeps",
      description: "An open-source ESP32 hardware beacon and BLE pulse-oximetry stream that communicates telemetry trends using peripheral ambient lighting gradients.",
      outcomes: [
        "Tested in CMU Clinical Simulation Lab with 18 healthcare practitioners",
        "Presented at ACM CHI 2025 Student Research Competition",
        "Requested by 2 nursing schools for bedside simulation kits"
      ]
    },

    lessonsLearned: [
      {
        number: "01",
        title: "Default settings are safety liabilities",
        text: "Leaving medical monitors on factory alarm thresholds creates an environment so chaotic that nurses are forced to tune out the entire system."
      },
      {
        number: "02",
        title: "The periphery is powerful",
        text: "Interfaces should respect human attention by whispering status until true action is required."
      }
    ],

    uncertainties: [
      {
        title: "How do color-vision deficient clinicians perceive ambient lighting shifts?",
        detail: "Interface palettes must incorporate luminance contrast and micro-haptic backup to prevent accessibility oversights."
      }
    ],

    nextQuestion: {
      question: "Can tactile micro-haptics replace acoustic tones in sterile surgical environments?",
      explorationStatus: "Prototyping Wristband Array",
      hypothesisPreview: "Vibration frequencies mapped to bone conduction could signal heart rate anomalies directly to surgeons without competing with noisy bone saws."
    }
  },

  // ---------------------------------------------------------------------------
  // TRAIL 4b: Priya Chen - Ambient AI Scribing & Patient Trust
  // ---------------------------------------------------------------------------
  "ambient-audio-scribing": {
    id: "ambient-audio-scribing",
    shortLabel: "Clinical Scribing",
    studentId: "priya-chen",
    studentName: "Priya Chen",
    studentAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    studentRole: "Cognitive Science & Human-AI, Carnegie Mellon",
    title: "When does ambient AI audio documentation compromise patient trust during consultations?",
    subtitle: "Investigating why patients alter their symptom narratives when an always-on ambient recorder sits between them and the clinician.",
    status: "Active Field Inquiry",
    startedDate: "Nov 2024",
    completedDate: "In Progress",
    readTime: "5 min explore",
    tags: ["Patient Trust", "Speech AI", "Clinical Ethics", "Healthcare UX"],
    curiosityRating: "Top 15% Trail on Platform",

    whyCurious: `After shadowing a geriatric clinic, I noticed consultations quietly change shape the moment an ambient scribing microphone is positioned on the table. The patients who gave the richest histories in the first three minutes began giving shorter, more guarded answers — and the ones who were least tech-comfortable stopped asking questions at all. Nobody had flagged this. Consent forms cover recording; they do not cover the social mechanics of being recorded.`,

    relatedQuestions: [
      {
        q: "Does the physical position of a recording device matter more than the consent disclaimer?",
        insight: "Devices placed off-axis from both speaker and listener dropped self-reported discomfort by a third in a small observational test."
      },
      {
        q: "Do marginalized patients edit their symptom narratives more under ambient listening?",
        insight: "Narratives shortened roughly 22% on average, with the largest effects among patients who reported lower baseline trust in medical institutions."
      }
    ],

    nodes: [
      {
        id: "node-as-1",
        stepNumber: "01",
        phase: "Field Observation",
        title: "The Tabletop Microphone Effect",
        date: "Nov 2024",
        summary: "Observed 40 ambient-scribing consultations across two clinics and logged where and when patient narrative depth changed.",
        body: `I coded each consultation for when the ambient recorder first became the focal object of the room. In most of them the conversation did not just continue — it reorganized. Patients began addressing the clinician more formally, and several stopped sharing context that had felt safe moments before.`,
        keyTakeaway: "Trust is not a one-time consent checkbox; it is a live social property of the room.",
        evidenceType: "Clinical Observation",
        readiness: "Complete"
      },
      {
        id: "node-as-2",
        stepNumber: "02",
        phase: "Device Positioning Test",
        title: "Where the Microphone Sits Matters",
        date: "Dec 2024",
        summary: "Compared three physical placements of the scribing device and measured self-reported discomfort and narrative length.",
        body: `Off-axis placement — where the device sits to the side rather than between patient and clinician — produced measurably more complete narratives. The physical choreography of who faces whom, and what object occupies the middle, does the social work that no disclaimer performs.`,
        keyTakeaway: "The object's position in the room is a design decision with ethical consequences.",
        evidenceType: "Comparative Field Test",
        readiness: "Complete"
      },
      {
        id: "node-as-3",
        stepNumber: "03",
        phase: "Guideline Drafting",
        title: "Trust-Preserving Scribing Guidelines",
        date: "Jan 2025",
        summary: "Turned the findings into a short positioning and practice guideline for clinics that deploy ambient documentation.",
        body: `The guideline covers device placement, who controls the recording, how transcripts are reviewed with the patient, and when ambient capture should be off entirely. It is deliberately a practice note rather than a policy, so clinics can adopt it without waiting on institutional sign-off.`,
        keyTakeaway: "Consent and comfort are separate problems; good practice addresses both.",
        evidenceType: "Guideline Draft",
        readiness: "Active"
      }
    ],

    discoveries: [
      {
        title: "Position beats disclaimer",
        desc: "Where the recorder physically sits in the consultation room correlates more strongly with patient comfort than the consent language used."
      }
    ],

    sources: [
      {
        title: "Clinician field notes, geriatric consultations",
        author: "Priya Chen",
        type: "Primary Observation",
        quote: "Patients started giving shorter, more guarded answers the moment the recorder became the room's focus.",
        annotation: "The raw observation that seeded the whole inquiry."
      }
    ],

    miniProject: {
      title: "Trust-Preserving Clinical Scribing Guidelines",
      type: "Practice Guideline",
      badge: "Field Practice Note",
      metric1: "3 Clinic Sites",
      metric2: "40 Consultations",
      metric3: "1 Positioning Rule",
      description: "A short, adoptable set of placement and practice rules for ambient documentation that keeps patients narrating freely.",
      outcomes: [
        "Drafted and circulated to two clinics for pilot",
        "Positioning rule reduced self-reported discomfort in the small test"
      ]
    },

    lessonsLearned: [
      {
        number: "01",
        title: "Consent is necessary, not sufficient",
        text: "Signing a form and feeling safe to speak are different things, and the second is where the trust actually lives."
      }
    ],

    uncertainties: [
      {
        title: "Effect size across populations",
        detail: "The positioning effect was strong in the test but is still too small and too homogeneous to generalize confidently."
      }
    ],

    nextQuestion: {
      question: "Can tactile micro-haptics replace acoustic tones in sterile surgical environments?",
      explorationStatus: "Prototyping Wristband Array",
      hypothesisPreview: "Vibration frequencies mapped to bone conduction could signal heart rate anomalies directly to surgeons without competing with noisy bone saws."
    }
  },

  // ---------------------------------------------------------------------------
  // TRAIL 4c: Priya Chen - Voice Agent Latency Perception
  // ---------------------------------------------------------------------------
  "multi-modal-latency": {
    id: "multi-modal-latency",
    shortLabel: "Voice Latency",
    studentId: "priya-chen",
    studentName: "Priya Chen",
    studentAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    studentRole: "Cognitive Science & Human-AI, Carnegie Mellon",
    title: "What is the acceptable latency threshold before users lose conversational flow with voice agents?",
    subtitle: "Measuring pupil dilation and speech hesitation across response delays of 200ms to 900ms in controlled speech-to-speech trials.",
    status: "Laboratory Testing",
    startedDate: "Jan 2025",
    completedDate: "In Progress",
    readTime: "5 min explore",
    tags: ["Voice UX", "Latency", "Psychophysics", "Human-AI"],
    curiosityRating: "Top 18% Trail on Platform",

    whyCurious: `Voice agents are sold on the promise of conversation, but conversation has a rhythm, and latency is where that rhythm breaks. I wanted a number — not a feel — for where the floor actually is: the delay at which a person starts to feel like they are talking to a machine rather than a partner. Pupil dilation and hesitation give you that number without asking.`,

    relatedQuestions: [
      {
        q: "Do conversational fillers mask latency?",
        insight: "Natural-sounding filler acoustics ('um', 'let me check that') bought up to roughly 450ms of perceived lag without degrading trust."
      },
      {
        q: "At what delay does conversational flow measurably break?",
        insight: "Speech hesitation rose sharply past about 600ms of response delay, which is where 'conversation' started to feel like 'turn-taking with a delay'."
      }
    ],

    nodes: [
      {
        id: "node-ml-1",
        stepNumber: "01",
        phase: "Experimental Design",
        title: "Latency Ladder, 200ms to 900ms",
        date: "Jan 2025",
        summary: "Designed a controlled ladder of response delays and chose pupil dilation and hesitation as the two behavioral readouts.",
        body: `I set up a speech-to-speech harness that could inject a controlled delay between the participant's utterance and the agent's reply, stepping it in 100ms increments. Two signals track conversational flow well: how long participants hesitate before their next turn, and their resting pupil dilation under cognitive load.`,
        keyTakeaway: "You need an objective physiological readout; self-reported 'did it feel slow' is not precise enough.",
        evidenceType: "Experimental Design",
        readiness: "Complete"
      },
      {
        id: "node-ml-2",
        stepNumber: "02",
        phase: "Latency Perception Curve",
        title: "Where the Flow Breaks",
        date: "Feb 2025",
        summary: "Ran the ladder across participants and plotted hesitation and dilation against injected delay to find the inflection.",
        body: `Hesitation stayed flat up to around 400ms, then climbed steeply. Filler acoustics flattened the curve — the same 600ms of silence felt tolerable when the agent was 'thinking out loud' but not when it just sat there. The perceived-lag ceiling is not a property of the delay alone; it is a property of how the agent spends that delay.`,
        keyTakeaway: "How a system spends its latency is as important as how long it takes.",
        evidenceType: "Controlled Trial",
        readiness: "Complete"
      },
      {
        id: "node-ml-3",
        stepNumber: "03",
        phase: "Threshold Synthesis",
        title: "The 600ms Flow Break",
        date: "Mar 2025",
        summary: "Synthesized a working threshold: below ~400ms conversation feels live; ~400–600ms depends on filler behavior; past ~600ms flow breaks.",
        body: `The practical reading is that a voice agent has a budget of a few hundred milliseconds to feel conversational, and filler acoustics effectively extend that budget. The 'acceptable latency' is not a single number but a region of the curve, and the design lever is how the system fills the gap, not just the raw speed.`,
        keyTakeaway: "Latency is a design variable, not just an engineering one — how you fill the gap matters as much as how fast it is.",
        evidenceType: "Threshold Model",
        readiness: "Active"
      },
      {
        id: "node-ml-4",
        stepNumber: "04",
        phase: "Next Experiments",
        title: "Trust Under Sustained Delay",
        date: "Apr 2025",
        summary: "Planning follow-up trials that hold a delay constant across a longer conversation to see where trust — not just flow — degrades.",
        body: `Flow and trust separate over longer interactions. A single late reply is forgivable; a consistently late partner changes how people weight what the agent says. The next experiment holds delay steady across many turns and tracks whether participants discount the agent's claims.`,
        keyTakeaway: "Perceived competence is built across a conversation, not on a single response time.",
        evidenceType: "Planned Study",
        readiness: "In Planning"
      }
    ],

    discoveries: [
      {
        title: "Fillers are a latency tool",
        desc: "Conversational filler acoustics extend the perceived-lag budget by up to ~450ms without degrading trust."
      }
    ],

    sources: [
      {
        title: "Controlled latency-ladder trial data",
        author: "Priya Chen",
        type: "Primary Experiment",
        quote: "Hesitation stayed flat to ~400ms, then climbed steeply; fillers flattened the curve.",
        annotation: "The core behavioral finding of the trail."
      }
    ],

    miniProject: {
      title: "Voice Interaction Latency Perception Curve",
      type: "Experimental Benchmark",
      badge: "Psychophysics Curve",
      metric1: "5 Delay Steps",
      metric2: "2 Physio Readouts",
      metric3: "~450ms Buffer",
      description: "A measured latency-perception curve with the filler-acoustic finding, usable as a design budget for voice agents.",
      outcomes: [
        "Produced a latency design budget for voice agents",
        "Quantified the filler-acoustic buffering effect"
      ]
    },

    lessonsLearned: [
      {
        number: "01",
        title: "Design the gap, not just the speed",
        text: "How a system spends its latency — with fillers, progress, silence — shapes the experience as much as the raw delay does."
      }
    ],

    uncertainties: [
      {
        title: "Trust vs. flow separation",
        detail: "The trust-over-time effect is hypothesized but not yet measured; the flow-break threshold is solid, the trust-break threshold is not."
      }
    ],

    nextQuestion: {
      question: "How do voice agents affect memory retention during high-velocity crisis response?",
      explorationStatus: "Simulation Design",
      hypothesisPreview: "First responders relying on conversational AI may show memory degradation unless the system actively reinforces recall."
    }
  },

  // ---------------------------------------------------------------------------
  // TRAIL 5: Marcus Vance - Mycelium Packaging & Bio-Foams
  // ---------------------------------------------------------------------------
  "mycelium-cold-chain": {
    id: "mycelium-cold-chain",
    shortLabel: "Mycelium Cold-Chain",
    studentId: "marcus-vance",
    studentName: "Marcus Vance",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    studentRole: "Materials Science & Ag Engineering, Georgia Tech",
    title: "Can fungal mycelium composites replace expanded polystyrene in cold-chain vaccine shipping?",
    subtitle: "Benchmarking peanut-hull fungal bio-composites against ASTM thermal dissipation and drop shock standards for perishable biopharmaceuticals.",
    status: "Lab Validated",
    startedDate: "Sept 2024",
    completedDate: "Feb 2025",
    readTime: "8 min explore",
    tags: ["Biomaterials", "Cold Chain", "Packaging", "Circular Materials", "Hardware R&D"],
    curiosityRating: "Top 3% Trail on Platform",
    
    whyCurious: `In August 2024, I visited a county health clinic in South Georgia. Outside behind the loading dock were three dumpsters overflowing with white expanded polystyrene (Styrofoam) coolers. The nurse told me they discard dozens of coolers each week from routine temperature-sensitive insulin and vaccine shipments.
    
    Styrofoam takes over 500 years to degrade, fractures into toxic microplastics, and emits toxic styrene vapors during manufacture. In Georgia, we produce over 1.4 million tons of peanut hulls and cotton gin waste each year that gets burned or tilled under. I asked myself: could we inoculate regional peanut waste with fungal mycelium to grow high-performance, fully biodegradable thermal coolers that match Styrofoam's insulation performance?`,

    relatedQuestions: [
      {
        q: "What R-value (thermal resistance) is required to sustain 2°C to 8°C cold-chain for 48 hours?",
        insight: "Standard cold-chain shipping profiles demand an R-value of 3.8 to 4.2 per inch of insulation thickness under 35°C ambient summer testing."
      },
      {
        q: "How does humidity condensation affect raw mycelium structural integrity?",
        insight: "Moisture from melting ice packs weakens untreated mycelium wall bonds by up to 45% within 18 hours unless treated with a natural hydrophobic skin."
      },
      {
        q: "Can heat compression bake a waterproof barrier directly into the mycelium surface?",
        insight: "Applying 180°C hot-plate compression for 240 seconds caramelizes surface chitin and lignocellulose, yielding a smooth water-shedding shell without synthetic coatings."
      }
    ],

    nodes: [
      {
        id: "node-myc-1",
        stepNumber: "01",
        phase: "Substrate Sourcing & Culture",
        title: "Peanut Hull Inoculation & Growth Kinetics",
        date: "Sept 2024",
        summary: "Sourced 100 lbs of agricultural peanut hulls from a regional processor and inoculated with Pleurotus ostreatus (oyster mushroom) spawn.",
        body: `I formulated 5 substrate recipes varying bran supplements and moisture ratios. Peanut hulls supplemented with 8% spent brewer's grain achieved 100% full colonization within 9 days, forming dense white hyphal networks with compressive strength comparable to balsa wood.`,
        keyTakeaway: "Agricultural peanut shells provide ideal structural porosity and natural lignin for high-density mycelium growth.",
        evidenceType: "Biological Growth Assay",
        readiness: "Complete"
      },
      {
        id: "node-myc-2",
        stepNumber: "02",
        phase: "Thermal Benchmarking",
        title: "Guarded Hot-Plate Thermal Conductivity Testing",
        date: "Nov 2024",
        summary: "Constructed a calibrated thermal chamber measuring heat flux across mycelium panels versus EPS Styrofoam.",
        body: `Tested at steady-state 38°C differential. Mycelium bio-foam achieved an thermal conductivity (k) of 0.038 W/m·K, virtually matching expanded polystyrene's 0.035 W/m·K. A 1.5-inch mycelium wall kept internal payload temperatures below 8°C for 52 continuous hours with phase-change cold packs.`,
        keyTakeaway: "Fungal mycelium is a true thermodynamic peer to petrochemical Styrofoam for pharmaceutical shipping.",
        quote: "Nature solved insulation millions of years ago through cellular trapped-air matrices.",
        evidenceType: "Thermodynamic Benchmarking",
        readiness: "Complete"
      },
      {
        id: "node-myc-3",
        stepNumber: "03",
        phase: "Drop Testing & Shock",
        title: "ASTM D3575 Drop Shock Trials",
        date: "Dec 2024",
        summary: "Subjected 12 full cooler prototypes to 1.2-meter drop tests onto solid concrete.",
        body: `Monitored with a 3-axis accelerometer inside a 5-lb glass vial dummy payload. Mycelium exhibited superior energy dissipation to rigid Styrofoam, with 22% lower peak G-force impact due to fibrous micro-deformation without catastrophic fracturing.`,
        keyTakeaway: "Fibrous hyphae cushion shock better than brittle expanded polystyrene beads.",
        evidenceType: "Physical Drop Trials",
        readiness: "Complete"
      },
      {
        id: "node-myc-4",
        stepNumber: "04",
        phase: "Full Clamshell Prototype",
        title: "Fabricating 'MycoShip' Modular Cold Shipper",
        date: "Jan 2025",
        summary: "Produced 10 finished cooler prototypes in 3D-printed modular molds with heat-pressed hydrophobic chitin rims.",
        body: `Prototypes buried in garden compost degraded 100% into organic soil within 58 days, completely chemical-free. Won 1st Place at Southeast Cleantech Collegiate Innovation Challenge.`,
        keyTakeaway: "A cooler that protects modern medicine in transit should nourish the soil after delivery.",
        evidenceType: "Functional Product Prototype",
        readiness: "Validated"
      }
    ],

    discoveries: [
      {
        title: "The Chitin Thermal Skin Effect",
        desc: "High-heat surface pressing forms a dense, impervious outer shell while leaving the core porous and airy, optimizing both insulation and moisture resistance."
      },
      {
        title: "Peanut Shell Porosity Advantage",
        desc: "Peanut hulls have microscopic cellular pockets that trap stationary air, providing 18% better thermal resistance than wood shavings or straw."
      }
    ],

    sources: [
      {
        title: "ASTM D3575: Standard Test Methods for Flexible Cellular Materials Made from Olefin Polymers",
        author: "ASTM International",
        type: "Engineering Standard",
        quote: "Drop test deceleration curves must not exceed 60G for fragile biologic glass vials.",
        annotation: "Mandatory qualification benchmark for pharmaceutical logistics."
      },
      {
        title: "Life-Cycle Assessment of Mycelium Bio-Composites",
        author: "Journal of Cleaner Production (2023)",
        type: "Peer-Reviewed LCA",
        quote: "Mycelium composite manufacturing consumes 85% less embodied energy than petrochemical EPS production.",
        annotation: "Confirms net ecological benefit across cradle-to-grave lifecycle."
      }
    ],

    miniProject: {
      title: "MycoShip: Modular Mycelium Cold-Chain Shipper for Temperature-Sensitive Biologics",
      type: "Physical Hardware Prototype & ASTM Test Report",
      badge: "Southeast Cleantech Trophy Winner",
      metric1: "52 Hours at 2-8°C",
      metric2: "58-Day Soil Biodegradation",
      metric3: "Zero Chemical Additives",
      description: "A fully compostable insulated cooler grown from local Georgia peanut waste that replaces toxic Styrofoam in regional biopharmaceutical shipping.",
      outcomes: [
        "1st Place, Southeast Cleantech Collegiate Challenge ($5,000 grant)",
        "Tested in Georgia Tech Materials Testing Laboratory",
        "Open-source mold CAD files downloaded by 180+ biomaterials researchers"
      ]
    },

    lessonsLearned: [
      {
        number: "01",
        title: "Materials must be regional to be green",
        text: "Shipping agricultural waste across continents to make bio-plastics defeats the purpose. True circularity uses what is grown within a 100-mile radius."
      },
      {
        number: "02",
        title: "Standards speak louder than slogans",
        text: "Pharmaceutical shippers will not adopt bio-materials because they are green; they will adopt them only if they pass rigorous ASTM thermal and drop tests."
      }
    ],

    uncertainties: [
      {
        title: "Can mycelium growth scale into continuous automated conveyor lines?",
        detail: "Current 9-day biological incubation cycles require significant warehouse footprint compared to instantaneous injection-molded plastics."
      }
    ],

    nextQuestion: {
      question: "Can carbonized agricultural char be incorporated into mycelium to yield electromagnetic ESD shielding?",
      explorationStatus: "Queueing for Laboratory Trials",
      hypothesisPreview: "Adding 10% bio-char could create anti-static packaging for sensitive silicon chips without carbon-black petrochemical coatings."
    }
  },

  // ---------------------------------------------------------------------------
  // TRAIL 5b: Marcus Vance - Ag-Waste Substrate Compressive Index
  // ---------------------------------------------------------------------------
  "cotton-trash-substrate": {
    id: "cotton-trash-substrate",
    shortLabel: "Ag-Waste Bricks",
    studentId: "marcus-vance",
    studentName: "Marcus Vance",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    studentRole: "Materials Science & Ag Engineering, Georgia Tech",
    title: "What regional agricultural waste yields the highest compressive strength for bio-brick structural cores?",
    subtitle: "Benchmarking peanut shells, bagasse, and cotton gin trash inoculated with Pleurotus ostreatus under calibrated hydraulic compression.",
    status: "Active Testing",
    startedDate: "Nov 2024",
    completedDate: "In Progress",
    readTime: "6 min explore",
    tags: ["Ag Waste", "Structural Testing", "Circular Materials", "Biomaterials"],
    curiosityRating: "Top 12% Trail on Platform",

    whyCurious: `The mycelium cooler proved that fungal composites can hold a 2–8°C payload for days, but the substrate question I was handed — 'use peanut hulls' — was never actually tested against the other regional wastes. Georgia alone generates cotton gin trash, peanut shells, and sugarcane bagasse in enormous, cheap volumes. I wanted to know which one actually makes the strongest bio-brick, not which one just happens to be on hand.`,

    relatedQuestions: [
      {
        q: "Which regional waste has the highest lignin content for compressive strength?",
        insight: "Peanut-hull lignin content is the highest of the three, which tracks directly into roughly 34% higher compressive resistance than wheat-straw reference material."
      },
      {
        q: "Does mixing substrates beat any single one?",
        insight: "A peanut-shell-dominant blend with a bagasse binder outperformed 100% peanut hull on crash damping while keeping most of the compressive edge."
      }
    ],

    nodes: [
      {
        id: "node-ct-1",
        stepNumber: "01",
        phase: "Substrate Sourcing",
        title: "Gathering the Regional Waste Stream",
        date: "Nov 2024",
        summary: "Secured peanut shells, sugarcane bagasse, and cotton gin trash from three regional suppliers at roughly zero cost.",
        body: `The real discovery was logistics: every 'waste' stream has a season and a price that is not actually zero once it is bagged. Bagasse arrives wet and must be dried; cotton gin trash is a dust that must be baled. The substrate is only as strong as the supply chain that can keep it consistent.`,
        keyTakeaway: "A biomaterials project is a supply-chain project first.",
        evidenceType: "Sourcing",
        readiness: "Complete"
      },
      {
        id: "node-ct-2",
        stepNumber: "02",
        phase: "Inoculation & Cultivation",
        title: "Growing the Bio-Bricks",
        date: "Dec 2024",
        summary: "Inoculated each substrate batch with Pleurotus ostreatus under a fixed 9-day, temperature-controlled protocol.",
        body: `I held moisture, temperature, and mold constant across the three substrates so that any strength difference could be attributed to the substrate itself rather than to the growing conditions. That control is what makes the compressive index actually comparable across materials.`,
        keyTakeaway: "You cannot compare substrates unless the biology is held identical.",
        evidenceType: "Culture Protocol",
        readiness: "Complete"
      },
      {
        id: "node-ct-3",
        stepNumber: "03",
        phase: "Compression Testing",
        title: "Calibrated Hydraulic Compression",
        date: "Jan 2025",
        summary: "Ran 24 samples through a calibrated hydraulic rig and recorded peak stress and energy-absorption curves.",
        body: `The compressive index is peak stress per unit, plus a crash-damping readout (area under the curve). Peanut hull led on both; bagasse was the crash-impact damper. I logged all raw curves so the index can be re-derived if the protocol changes.`,
        keyTakeaway: "Strength and damping are separate properties, and the best substrate depends on which one your product needs.",
        evidenceType: "Compressive Test",
        readiness: "Complete"
      },
      {
        id: "node-ct-4",
        stepNumber: "04",
        phase: "Blend Formulation",
        title: "Peanut-Dominant Hybrid Blend",
        date: "Feb 2025",
        summary: "Formulated a peanut-shell-dominant blend with a bagasse binder and tested it against the single-substrate results.",
        body: `The hybrid keeps most of the peanut compressive edge while borrowing the bagasse crash damping. It is the configuration I would actually recommend for a structural core that sees both steady load and a single hard impact.`,
        keyTakeaway: "Blends let you trade one substrate's strength for another's damping.",
        evidenceType: "Blend Trial",
        readiness: "Active"
      }
    ],

    discoveries: [
      {
        title: "Lignin is the strength currency",
        desc: "Peanut-hull lignin content provides roughly 34% higher compressive resistance compared to a wheat-straw baseline."
      }
    ],

    sources: [
      {
        title: "Hydraulic compression test log, 24 samples",
        author: "Marcus Vance",
        type: "Primary Experiment",
        quote: "Peanut hull led on both peak stress and crash damping; bagasse was the impact damper.",
        annotation: "The raw dataset behind the Compressive Index."
      }
    ],

    miniProject: {
      title: "Ag-Waste Substrate Compressive Index",
      type: "Materials Benchmark",
      badge: "Open Benchmark",
      metric1: "24 Samples",
      metric2: "3 Substrates",
      metric3: "34% Higher Peak",
      description: "A re-derivable compressive index across regional agricultural wastes, with the raw curves published.",
      outcomes: [
        "Ranked three regional wastes for structural bio-brick cores",
        "Validated a peanut-dominant blend for crash damping"
      ]
    },

    lessonsLearned: [
      {
        number: "01",
        title: "Separate strength from damping",
        text: "The substrate that holds the most steady load is not always the one that survives the hardest impact; design for both, deliberately."
      }
    ],

    uncertainties: [
      {
        title: "Season-to-season substrate variance",
        detail: "The index was built from one growing season; harvest-year moisture could shift the ranking."
      }
    ],

    nextQuestion: {
      question: "How can continuous conveyor baking replace batch autoclaving for industrial mycelium desiccation?",
      explorationStatus: "Benchtop Chamber",
      hypothesisPreview: "Infra-red continuous drying could cut desiccation energy by up to 40% versus batch ovens."
    }
  },

  // ---------------------------------------------------------------------------
  // TRAIL 5c: Marcus Vance - Bio-Foam Waterproofing & Mold Resistance
  // ---------------------------------------------------------------------------
  "bio-foam-waterproofing": {
    id: "bio-foam-waterproofing",
    shortLabel: "Wax Waterproofing",
    studentId: "marcus-vance",
    studentName: "Marcus Vance",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    studentRole: "Materials Science & Ag Engineering, Georgia Tech",
    title: "Can plant-based candelilla wax coatings prevent fungal bio-composites from mold growth in tropical shipping?",
    subtitle: "Subjecting wax-dipped mycelium bricks to 90% relative-humidity chambers to quantify water-vapor transmission and mold onset.",
    status: "Field Trials",
    startedDate: "Jan 2025",
    completedDate: "In Progress",
    readTime: "6 min explore",
    tags: ["Surface Chemistry", "Moisture Barrier", "Packaging", "Circular Materials"],
    curiosityRating: "Top 20% Trail on Platform",

    whyCurious: `A bio-composite that cannot survive a humid week in transit is not a packaging material. The mycelium cooler held temperature beautifully, but tropical cold-chain shipping is all condensation and mold. I wanted to know whether a food-safe plant wax could push the mold-onset and water-vapor-transmission numbers close enough to a plastic liner that the plastic becomes optional.`,

    relatedQuestions: [
      {
        q: "How far can a plant wax match a synthetic polyethylene moisture barrier?",
        insight: "A 5% beeswax–candelilla emulsion matched polyethylene moisture protection for up to about 96 hours in the chamber."
      },
      {
        q: "Does a wax film kill mold growth or just slow it?",
        insight: "The coating slows vapor ingress enough that mold onset is delayed by several days; it is a moisture barrier, not an antifungal."
      }
    ],

    nodes: [
      {
        id: "node-bf-1",
        stepNumber: "01",
        phase: "Coating Formulation",
        title: "Designing the Plant-Wax Barrier",
        date: "Jan 2025",
        summary: "Formulated a 5% beeswax–candelilla emulsion and compared it against an uncoated control and a polyethylene reference.",
        body: `The formulation had to be food-safe and fully biodegradable, so synthetic hydrophobic coatings were out. I tuned the emulsion so the wax spread into a thin, continuous film without pooling, which is where most first attempts failed.`,
        keyTakeaway: "A hydrophobic barrier only works if it is a continuous film; patchy coating is worse than none.",
        evidenceType: "Formulation",
        readiness: "Complete"
      },
      {
        id: "node-bf-2",
        stepNumber: "02",
        phase: "Water-Vapor Transmission",
        title: "90% Humidity Chamber Trials",
        date: "Feb 2025",
        summary: "Ran coated and control bricks in 90% relative-humidity chambers and measured water-vapor transmission rate (WVTR) over 96 hours.",
        body: `The uncoated control absorbed moisture fast enough that mold onset followed within a few days. The 5% emulsion cut the WVTR close to the polyethylene reference for the first 96 hours, then slowly degraded — the wax film is real but finite.`,
        keyTakeaway: "A plant wax matches plastic for a useful window, then gives way; that window is the shipping target.",
        evidenceType: "WVTR Test",
        readiness: "Complete"
      },
      {
        id: "node-bf-3",
        stepNumber: "03",
        phase: "Mold Onset",
        title: "When the Wax Gives Way",
        date: "Mar 2025",
        summary: "Logged mold onset on coated versus control samples to pin down the practical shelf life of the barrier.",
        body: `Coated samples delayed mold onset by several days relative to controls. That delay lines up with the WVTR window. The honest read is that the wax extends the usable transit time but does not make the composite infinitely shelf-stable.`,
        keyTakeaway: "The coating buys transit time; it does not remove the need for a dry last mile.",
        evidenceType: "Mold Trial",
        readiness: "Active"
      }
    ],

    discoveries: [
      {
        title: "The 96-hour match",
        desc: "A 5% beeswax–candelilla emulsion matches synthetic polyethylene moisture protection for up to about 96 hours under 90% humidity."
      }
    ],

    sources: [
      {
        title: "Humidity-chamber WVTR and mold-onset log",
        author: "Marcus Vance",
        type: "Primary Experiment",
        quote: "The 5% emulsion matched polyethylene for 96 hours, then slowly degraded.",
        annotation: "The moisture-barrier result behind the waterproofing claim."
      }
    ],

    miniProject: {
      title: "All-Natural Hydrophobic Barrier Formulations",
      type: "Coating Formulation",
      badge: "Barrier Spec",
      metric1: "5% Emulsion",
      metric2: "96h Match to PE",
      metric3: "0 Synthetic",
      description: "A food-safe plant-wax barrier that extends the usable transit window of fungal bio-composites.",
      outcomes: [
        "Matched a synthetic plastic's moisture barrier for 96 hours",
        "Quantified mold-onset delay to size the shipping target"
      ]
    },

    lessonsLearned: [
      {
        number: "01",
        title: "A barrier is a window, not a wall",
        text: "Natural coatings hold their performance for a bounded period; you design the shipping plan around that window."
      }
    ],

    uncertainties: [
      {
        title: "Outdoor, variable-humidity behavior",
        detail: "All data are from a controlled 90% chamber; real transit humidity swings are not yet measured."
      }
    ],

    nextQuestion: {
      question: "How can continuous conveyor baking replace batch autoclaving for industrial mycelium desiccation?",
      explorationStatus: "Benchtop Chamber",
      hypothesisPreview: "Infra-red continuous drying could cut desiccation energy by up to 40% versus batch ovens."
    }
  }
};

// Safe helper to get trail by id with custom trails and fallback
export function getTrailById(id, customTrails = []) {
  if (!id) return trailsData["sustainable-fashion"];
  if (Array.isArray(customTrails)) {
    const custom = customTrails.find((t) => t.id === id);
    if (custom) return custom;
  }
  return trailsData[id] || trailsData["sustainable-fashion"];
}

// Get all trails including custom-authored ones
export function getAllTrails(customTrails = []) {
  const customMap = Array.isArray(customTrails)
    ? Object.fromEntries(customTrails.map((t) => [t.id, t]))
    : {};
  return { ...trailsData, ...customMap };
}

// Get switcher list including custom-authored ones
export function getAvailableTrails(customTrails = []) {
  const customList = Array.isArray(customTrails)
    ? customTrails.map((t) => ({
        id: t.id,
        label: t.shortLabel || t.title,
        author: t.studentName || 'You',
        tag: t.tags?.[0] || 'Authored',
      }))
    : [];
  return [...availableTrails, ...customList];
}

// Derived switcher list — the single source of truth for "which trails
// exist", in file order. The trail view's quick switcher renders this
// instead of a hand-maintained array, so adding a trail below is enough.
export const availableTrails = Object.values(trailsData).map((t) => ({
  id: t.id,
  label: t.shortLabel || t.title,
  author: t.studentName,
  tag: t.tags?.[0] || '',
}));

// Backwards compatibility export
export const featuredTrailData = trailsData["sustainable-fashion"];
