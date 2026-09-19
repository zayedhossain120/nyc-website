import type { FaqItem } from "@/data/service-details";

/**
 * New York–specific SEO and on-page copy for every service page.
 *
 * Kept separate from service-details.ts so all the locally targeted wording
 * (titles, meta descriptions, H1s, "why NYC" blocks, FAQs) can be reviewed and
 * edited in one place. service-details.ts merges this in at load time and
 * throws if a service is missing an entry.
 *
 * Length targets: seoTitle <= 60 chars (it is used as an absolute title, brand
 * included), seoDescription 140–160 chars.
 */

export interface NycContentBlock {
  title: string;
  body: string;
  points: string[];
}

export interface ServiceLocalContent {
  /** Keyword-bearing <h1>; the short `title` on the service stays as its label. */
  h1: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  nyc: NycContentBlock;
  /** Used only when the service has no FAQs of its own. */
  faqs?: FaqItem[];
}

export const SERVICE_LOCAL_CONTENT: Record<string, ServiceLocalContent> = {
  // ---------------------------------------------------------------- software
  "nextjs-apps": {
    h1: "Next.js Web Application Development in New York City",
    seoTitle: "Next.js Development Company NYC | NYC Digital Agency",
    seoDescription:
      "Custom Next.js and React web apps for New York businesses: fast, accessible and SEO-ready. Fixed-price builds by a senior NYC team. Get a quote.",
    keywords: [
      "Next.js development company NYC",
      "React developers New York",
      "custom web application development New York",
      "Next.js agency Manhattan",
      "web app development Brooklyn",
    ],
    nyc: {
      title: "Built for how New York actually uses the web",
      body:
        "New York customers browse on phones, on the subway and on patchy signal, and they leave quickly when a page stalls. We build Next.js applications that render on the server, cache at the edge and stay usable on a weak connection, then connect them to the systems you already run. Our team works from 45 Broad Street, so kickoff workshops and launch reviews can happen in person, not only over video.",
      points: [
        "Performance tuned for mobile visitors on transit connections",
        "WCAG 2.2 AA accessibility by default, which matters in a city where web-accessibility claims are common",
        "Security practices aligned with the New York SHIELD Act for customer data",
      ],
    },
    faqs: [
      {
        question: "How much does Next.js development cost in New York City?",
        answer:
          "Enterprise Next.js applications start at $9,500 on a fixed price and scale with features such as authentication, payments and integrations. You get a written scope and price before any work begins, so there are no hourly surprises.",
      },
      {
        question: "Why choose Next.js over WordPress for a NYC business website?",
        answer:
          "Next.js gives you faster pages, tighter security and full control over SEO, which helps in New York's competitive search results. WordPress is fine for simple brochure sites, but plugin-heavy builds tend to slow down and need constant patching.",
      },
      {
        question: "Will my Next.js site be accessible and ADA compliant?",
        answer:
          "We build to WCAG 2.2 AA from the first component and test with screen readers and keyboard navigation before launch. No site can be guaranteed immune from a claim, but accessible code sharply reduces your exposure.",
      },
      {
        question: "Can we meet in person in Manhattan during the project?",
        answer:
          "Yes. Our office is at 45 Broad Street in the Financial District, and we run discovery workshops and milestone reviews in person or over video, whichever suits your team.",
      },
    ],
  },

  "landing-pages": {
    h1: "High-Converting Landing Page Design & Development in NYC",
    seoTitle: "NYC Landing Page Design & Development | NYC Digital Agency",
    seoDescription:
      "Landing pages for New York businesses that turn ad clicks and search traffic into leads. Fast Next.js builds with A/B testing. Fixed price from $3,200.",
    keywords: [
      "landing page design NYC",
      "landing page developer New York",
      "conversion rate optimization New York",
      "high converting landing pages Manhattan",
    ],
    nyc: {
      title: "Landing pages for an expensive market",
      body:
        "Clicks in New York cost more than in most cities, so a landing page that leaks visitors burns real money. We design each page around one offer, one action and one audience, and build it to load fast on mobile. A/B testing is part of the architecture, so you learn what converts your New York buyers instead of guessing.",
      points: [
        "Pages that pair with your Google and Meta campaigns for better Quality Score",
        "Borough- or neighborhood-specific variants when your offer is local",
        "Click-to-call and calendar booking built for mobile visitors",
      ],
    },
    faqs: [
      {
        question: "How much does a landing page cost in New York City?",
        answer:
          "Our landing pages start at $3,200 fixed price with a two-week turnaround on most builds. Price depends on the number of sections, custom illustration or animation, and integrations such as CRM or booking tools.",
      },
      {
        question: "How long does it take to build a landing page?",
        answer:
          "Most landing pages ship in about two weeks: a few days for strategy and design approval, then build, QA and launch. Rush timelines are possible when the copy and assets are ready.",
      },
      {
        question: "Do you write the copy, or do we supply it?",
        answer:
          "Either. We can write conversion-focused copy from a short discovery call, or build around copy you already have. We recommend at least reviewing the headline and call to action together.",
      },
      {
        question: "Can you build landing pages for different NYC neighborhoods or boroughs?",
        answer:
          "Yes. Location-specific pages work well for local services when each page carries genuinely different content, such as local proof, service details and directions, and not the same text with a swapped place name.",
      },
    ],
  },

  "design-systems": {
    h1: "Custom Design System & Component Library Development in NYC",
    seoTitle: "Design System Development NYC | NYC Digital Agency",
    seoDescription:
      "Accessible, token-based design systems and React component libraries for New York product teams. Figma-to-code sync and full documentation. From $4,200.",
    keywords: [
      "design system agency New York",
      "React component library NYC",
      "Figma design system development",
      "design tokens Tailwind New York",
    ],
    nyc: {
      title: "One system across every New York product surface",
      body:
        "New York teams often ship across a marketing site, a product, an internal tool and a mobile app, sometimes with several agencies involved. A shared design system keeps those surfaces consistent and stops your designers and developers from rebuilding the same button. We deliver the Figma library, the coded components and the documentation together, so the system survives staff changes.",
      points: [
        "Figma tokens synced to Tailwind so design and code never drift apart",
        "Accessible components (WAI-ARIA, keyboard support, contrast) built in",
        "Documentation your in-house team can maintain without us",
      ],
    },
    faqs: [
      {
        question: "What is a design system and does my company need one?",
        answer:
          "A design system is a shared library of design rules and coded components that keeps every product looking and behaving consistently. If you maintain more than one site or app, or more than a handful of designers and developers touch the UI, you will save time with one.",
      },
      {
        question: "How much does a design system cost in New York?",
        answer:
          "Our design systems start at $4,200 fixed price and include full component documentation. Cost grows with the number of components, themes and platforms covered.",
      },
      {
        question: "Will the design system work with our existing codebase?",
        answer:
          "Usually, yes. We audit your current UI, then introduce the system gradually so existing screens migrate one at a time rather than in a risky big-bang rewrite.",
      },
      {
        question: "Do you build design systems in React and Tailwind?",
        answer:
          "Yes. Our default is React with Tailwind CSS v4 and a token pipeline from Figma, and we can adapt to your existing stack when needed.",
      },
    ],
  },

  "ui-ux-design": {
    h1: "UI/UX Design & Prototyping Agency in New York City",
    seoTitle: "UI/UX Design Agency NYC | NYC Digital Agency",
    seoDescription:
      "User research, wireframes and interactive Figma prototypes for New York startups and businesses. Usability-tested before development. Starting at $2,800.",
    keywords: [
      "UI UX design agency NYC",
      "product design New York",
      "Figma prototyping New York",
      "usability testing NYC",
      "app design agency Manhattan",
    ],
    nyc: {
      title: "Design grounded in real New York users",
      body:
        "New York audiences are diverse, time-poor and quick to abandon anything confusing. We start with research and journey mapping, prototype in Figma, and test with real people before a line of code is written, so expensive mistakes are caught on the design board. We can run sessions in person in Lower Manhattan or remotely.",
      points: [
        "Interactive prototypes you can click through and show to stakeholders or investors",
        "Usability testing round included in the base engagement",
        "Accessible design decisions made from the start, not patched in later",
      ],
    },
    faqs: [
      {
        question: "How much does UI/UX design cost in NYC?",
        answer:
          "Our UI/UX engagements start at $2,800 fixed price and include an interactive Figma prototype and a usability testing round. Larger products with many flows and user types cost more and are scoped in writing first.",
      },
      {
        question: "What is the difference between UI and UX design?",
        answer:
          "UX design decides how a product works: the flows, structure and how easy tasks are to complete. UI design decides how it looks: layout, typography, color and components. You need both, and we deliver them together.",
      },
      {
        question: "Do you test designs with real users before development?",
        answer:
          "Yes. Each engagement includes a usability testing round on the prototype, so problems are fixed in Figma, which is far cheaper than fixing them in code.",
      },
      {
        question: "Can you hand designs to our in-house developers?",
        answer:
          "Yes. We deliver organized Figma files with components and specs, and can build the front end ourselves if you would rather not manage a handoff.",
      },
    ],
  },

  "speed-tuning": {
    h1: "Website Speed Optimization & Core Web Vitals in New York City",
    seoTitle: "Website Speed Optimization NYC | NYC Digital Agency",
    seoDescription:
      "Core Web Vitals audits and fixes for New York websites. We target a 90+ Lighthouse score, faster load times and better rankings. Audit plus fixes from $1,900.",
    keywords: [
      "website speed optimization NYC",
      "Core Web Vitals New York",
      "page speed audit Manhattan",
      "Lighthouse performance optimization",
      "site speed agency New York",
    ],
    nyc: {
      title: "Speed matters more where competition is this dense",
      body:
        "In New York's crowded search results, slow pages lose both rankings and customers. Google uses Core Web Vitals as a ranking signal, and mobile visitors on the move have little patience. We audit real-world performance data, fix the causes (heavy images, render-blocking scripts, oversized bundles) and report the before and after.",
      points: [
        "Field data reviewed, not just a one-off lab score",
        "Fixes implemented by us, not just handed over as a list",
        "Before-and-after performance report you can share with stakeholders",
      ],
    },
    faqs: [
      {
        question: "What are Core Web Vitals and why do they matter for SEO?",
        answer:
          "Core Web Vitals are Google's measures of loading speed (LCP), responsiveness (INP) and visual stability (CLS). They are a ranking factor and they also affect conversion, so a slow site loses both search visibility and customers.",
      },
      {
        question: "How much does website speed optimization cost?",
        answer:
          "Our audit and implementation package starts at $1,900 fixed price. Sites with heavy custom code or complex third-party scripts may need a larger scope, which we confirm after the audit.",
      },
      {
        question: "Can you really guarantee a 90+ Lighthouse score?",
        answer:
          "For the pages in scope, yes, that is the target we commit to. Scores depend on content and third-party tools you add later, so we document what is in scope and what could reduce the score.",
      },
      {
        question: "Will speed optimization change how my site looks?",
        answer:
          "No. The goal is the same design, delivered faster. We optimize images, code and loading behavior without redesigning your pages.",
      },
    ],
  },

  "cms-cloud": {
    h1: "Database, API & Cloud Architecture Services in New York City",
    seoTitle: "Backend, API & Cloud Development NYC | NYC Digital Agency",
    seoDescription:
      "Scalable database, API and cloud architecture for New York companies: PostgreSQL, MongoDB, NestJS, Docker and CI/CD. Fixed-price builds from $6,500.",
    keywords: [
      "backend development company NYC",
      "API development New York",
      "cloud architecture agency New York",
      "NestJS developers NYC",
      "PostgreSQL MongoDB consulting New York",
    ],
    nyc: {
      title: "Backends built for regulated, high-stakes New York businesses",
      body:
        "Many New York companies handle financial, health or client data, which raises the bar for security and auditability. We design schemas, APIs and cloud infrastructure with access control, encryption and logging in mind from the start, so growth or a compliance review does not force a rebuild.",
      points: [
        "Designed with the New York SHIELD Act and, for financial clients, NYDFS 23 NYCRR 500 in mind",
        "Automated CI/CD, backups and monitoring",
        "Architecture documented so your next engineer can pick it up",
      ],
    },
    faqs: [
      {
        question: "How much does custom backend and API development cost?",
        answer:
          "Backend and API projects start at $6,500 fixed price, including schema design and CI/CD setup. Cost scales with the number of entities, integrations and security requirements.",
      },
      {
        question: "Which databases and frameworks do you work with?",
        answer:
          "Mainly PostgreSQL and MongoDB with NestJS or Node.js, exposing REST or GraphQL APIs, deployed with Docker and CI/CD to Vercel or your own cloud. We choose based on your data, not habit.",
      },
      {
        question: "Can you help us if we handle sensitive or regulated data?",
        answer:
          "Yes. We build with encryption, role-based access and audit logging, and align with the New York SHIELD Act. For financial-services clients we design with NYDFS cybersecurity requirements in mind. We are engineers, not your legal counsel, so compliance sign-off stays with your advisers.",
      },
      {
        question: "Will the architecture scale as we grow?",
        answer:
          "That is the design goal. We plan for roughly ten times your current load, use managed services where they make sense, and document the scaling path so you know what comes next.",
      },
    ],
  },

  // ------------------------------------------------------------ AI automation
  "ai-chatbots": {
    h1: "Custom AI Chatbot Development in New York City",
    seoTitle: "AI Chatbot Development NYC | NYC Digital Agency",
    seoDescription:
      "Custom AI chatbots and support agents for New York businesses, trained on your own knowledge base with human handoff. Fixed-price builds from $4,500.",
    keywords: [
      "AI chatbot development NYC",
      "custom chatbot company New York",
      "AI customer support agent New York",
      "LLM chatbot Manhattan",
      "conversational AI agency NYC",
    ],
    nyc: {
      title: "Support that keeps up with a 24/7 city",
      body:
        "New York customers expect an answer at 11 p.m. as much as at 11 a.m., and many businesses here serve several languages and time zones. Our chatbots are trained on your own documents and policies, answer routine questions instantly and hand off to a person when a case needs judgment, so your team spends time on the work that matters.",
      points: [
        "Trained on your knowledge base, not a generic prompt",
        "Clean handoff to a human with the full conversation attached",
        "Multilingual options for New York's diverse customer base",
      ],
    },
    faqs: [
      {
        question: "How much does a custom AI chatbot cost in New York?",
        answer:
          "Custom AI chatbots start at $4,500 fixed price, with an optional monthly retainer for ongoing tuning. Price depends on the size of your knowledge base, the channels (web, WhatsApp, email) and the systems it connects to.",
      },
      {
        question: "How is a custom chatbot different from ChatGPT?",
        answer:
          "A general assistant does not know your prices, policies or customers. A custom chatbot is grounded in your own content, follows your rules and can take actions in your systems, which makes its answers accurate and on-brand.",
      },
      {
        question: "What happens when the chatbot cannot answer?",
        answer:
          "It hands the conversation to your team with the full context, so the customer never has to repeat themselves. We also review unanswered questions and use them to improve the bot.",
      },
      {
        question: "Is customer data safe with an AI chatbot?",
        answer:
          "We limit what data the bot can access, keep sensitive fields out of prompts where possible, and configure providers so your data is not used to train public models. We design with the New York SHIELD Act in mind.",
      },
    ],
  },

  "crm-automation": {
    h1: "Lead & CRM Automation Services in New York City",
    seoTitle: "CRM Automation & Lead Workflows NYC | NYC Digital Agency",
    seoDescription:
      "Automate lead capture, scoring and follow-up in HubSpot, Salesforce or GoHighLevel. CRM automation for New York teams from $3,800 per integration.",
    keywords: [
      "CRM automation NYC",
      "HubSpot consultant New York",
      "Salesforce automation New York",
      "lead follow-up automation Manhattan",
      "GoHighLevel agency NYC",
    ],
    nyc: {
      title: "In New York, the fastest reply usually wins",
      body:
        "New York buyers contact several vendors at once and tend to work with whoever responds first. We connect your forms, ads, calls and inbox to your CRM so every lead is captured, scored, routed and followed up in minutes, with no spreadsheet copying and no lead left waiting over a weekend.",
      points: [
        "Instant routing to the right salesperson or borough team",
        "Automated follow-up sequences that stop when a lead replies",
        "Reporting that shows which sources actually produce revenue",
      ],
    },
    faqs: [
      {
        question: "What does CRM automation actually do?",
        answer:
          "It moves data and tasks between your tools automatically: a form submission becomes a CRM contact, gets scored, is assigned to a rep and receives a follow-up email, without anyone typing. The result is faster response times and fewer lost leads.",
      },
      {
        question: "Which CRMs do you integrate with?",
        answer:
          "We work with HubSpot, Salesforce and GoHighLevel, plus tools such as Zapier and Make when they fit. If you use something else, ask and we will tell you honestly whether it is a good fit.",
      },
      {
        question: "How much does CRM automation cost?",
        answer:
          "Projects start at $3,800 fixed price per connected CRM or ad platform. The final price depends on how many workflows, lead sources and scoring rules you need.",
      },
      {
        question: "Can you clean up and migrate our existing CRM data?",
        answer:
          "Yes. We can de-duplicate contacts, standardize fields and migrate from a spreadsheet or another CRM as part of the project, so automation starts from clean data.",
      },
    ],
  },

  "llm-integration": {
    h1: "Custom LLM & RAG Integration Services in New York City",
    seoTitle: "LLM & RAG Integration Services NYC | NYC Digital Agency",
    seoDescription:
      "Integrate large language models into your product with RAG, vector databases and evaluation. Custom LLM integration for New York companies from $6,800.",
    keywords: [
      "LLM integration NYC",
      "RAG development New York",
      "AI development company New York",
      "vector database Pinecone consulting",
      "OpenAI Claude integration NYC",
    ],
    nyc: {
      title: "AI that works on your data, under your controls",
      body:
        "Financial, legal, healthcare and media teams in New York hold valuable proprietary data and cannot afford answers that are made up. We build retrieval-augmented generation (RAG) systems that ground the model in your documents, cite their sources and are evaluated against real test questions before launch.",
      points: [
        "Answers grounded in your own data, with sources shown",
        "Model choice guided by cost, quality and data-handling needs",
        "Testing and evaluation before it reaches your users",
      ],
    },
    faqs: [
      {
        question: "What is RAG and why use it instead of fine-tuning?",
        answer:
          "Retrieval-augmented generation looks up relevant passages from your own data at question time and gives them to the model, so answers stay current and traceable. It is usually cheaper and easier to update than fine-tuning, which we recommend only when it is clearly needed.",
      },
      {
        question: "How much does LLM integration cost?",
        answer:
          "Projects start at $6,800 fixed price, depending on model, data volume and how many systems the integration touches. We scope after a short discovery so the price is set before work starts.",
      },
      {
        question: "How do you keep the AI from giving wrong answers?",
        answer:
          "We ground responses in your documents, require citations, test against a set of real questions and add guardrails for topics it should not answer. No system is perfect, so we also build a way for users to flag bad answers.",
      },
      {
        question: "What about New York rules on AI in hiring?",
        answer:
          "New York City Local Law 144 requires a bias audit and notices when automated tools are used to make employment decisions. If your AI touches hiring or promotion, we flag it early and design with those requirements in mind, but you should confirm compliance with your own counsel.",
      },
    ],
  },

  "process-automation": {
    h1: "Business Process Automation with AI in New York City",
    seoTitle: "Business Process Automation NYC | NYC Digital Agency",
    seoDescription:
      "Automate document processing, reporting and cross-system workflows with AI. Business process automation for New York teams, from $3,200 per workflow.",
    keywords: [
      "business process automation NYC",
      "workflow automation New York",
      "document processing AI New York",
      "back office automation Manhattan",
      "AI operations automation NYC",
    ],
    nyc: {
      title: "Give your New York team its hours back",
      body:
        "Rent, payroll and talent are expensive in New York, so every hour spent re-keying data or building the weekly report is costly. We map how the work really flows, then automate the repetitive steps end to end (document parsing, data entry, reports, approvals) and leave people in charge of exceptions.",
      points: [
        "Document parsing for invoices, contracts, forms and emails",
        "Automated reports delivered to the right people on schedule",
        "Hours saved tracked so you can see the payback",
      ],
    },
    faqs: [
      {
        question: "What kinds of processes can be automated?",
        answer:
          "Anything repetitive and rule-based: invoice and document intake, data entry between systems, report generation, approvals, onboarding steps and customer notifications. If a person does the same steps every week, it is a candidate.",
      },
      {
        question: "How much does process automation cost?",
        answer:
          "Projects start at $3,200 fixed price per automated workflow. Complex workflows with several systems or document types cost more, and we quote them after a short process review.",
      },
      {
        question: "How do you measure the return on automation?",
        answer:
          "We baseline the time and errors before we start, then track hours saved and error rates afterward, so the result is a number on a report instead of an opinion.",
      },
      {
        question: "Do we need to replace our existing software?",
        answer:
          "Usually not. We connect to the tools you already use through their APIs or integrations, so the change is mostly invisible to your team apart from less manual work.",
      },
    ],
  },

  // ---------------------------------------------------------------- marketing
  "local-seo-nyc": {
    h1: "Local SEO & Google Business Profile Services in New York City",
    seoTitle: "Local SEO Agency NYC | NYC Digital Agency",
    seoDescription:
      "Rank in Google Maps and local search across Manhattan, Brooklyn, Queens, the Bronx and Staten Island. Local SEO for NYC businesses from $900 per month.",
    keywords: [
      "local SEO NYC",
      "Google Business Profile optimization New York",
      "local SEO agency Manhattan",
      "Brooklyn local SEO",
      "Google Maps ranking New York",
    ],
    nyc: {
      title: "Win the neighborhood, not just the city",
      body:
        "New Yorkers search by neighborhood: the plumber in Astoria, the dentist near Midtown, the caterer in Park Slope. Google shows different Maps results a few blocks apart, so a single citywide page is not enough. We optimize your Google Business Profile, build consistent listings and create genuinely local pages for the areas you serve.",
      points: [
        "Borough- and neighborhood-level keyword targeting",
        "Consistent name, address and phone across every directory",
        "Review requests and replies that build a steady stream of fresh reviews",
      ],
    },
  },

  "aeo-geo": {
    h1: "AEO & GEO: AI Search Optimization in New York City",
    seoTitle: "AEO & GEO Agency in New York | NYC Digital Agency",
    seoDescription:
      "Get your New York business cited by ChatGPT, Perplexity, Gemini and Google AI Overviews. Answer engine and generative engine optimization from $1,200 per month.",
    keywords: [
      "AEO agency New York",
      "GEO generative engine optimization NYC",
      "AI search optimization New York",
      "ChatGPT SEO NYC",
      "AI Overviews optimization Manhattan",
    ],
    nyc: {
      title: "Be the answer when New Yorkers ask AI",
      body:
        "More people now ask ChatGPT, Perplexity or Google's AI Overviews for a recommendation, such as the best software agency in New York. Those tools quote clear, well-structured, trustworthy sources. We restructure your content into answer-first pages, add the right structured data and strengthen the signals that make you a source worth citing.",
      points: [
        "Answer-first page structure that AI systems can quote",
        "Schema.org markup for your business, services and FAQs",
        "Tracking of when and where AI tools mention your brand",
      ],
    },
    faqs: [
      {
        question: "What is the difference between AEO, GEO and SEO?",
        answer:
          "SEO aims to rank your pages in a list of search results. AEO (answer engine optimization) aims to be the direct answer, and GEO (generative engine optimization) aims to be cited inside AI-generated responses. They overlap and work best together.",
      },
      {
        question: "Can you guarantee that ChatGPT will recommend us?",
        answer:
          "No, and be wary of anyone who does. AI systems choose their sources on their own. We improve the things within your control (clear content, structured data, authority, consistent business information) and measure citations over time.",
      },
      {
        question: "How much does AEO and GEO cost?",
        answer:
          "Engagements start at $1,200 per month and include quarterly schema and citation audits. Scope grows with the number of services, locations and pages involved.",
      },
      {
        question: "How is AI citation performance measured?",
        answer:
          "We run a fixed set of real customer questions across the main AI tools on a regular schedule and record whether and how your brand is mentioned, then report the trend alongside your normal search data.",
      },
    ],
  },

  "google-ads": {
    h1: "Google Ads & PPC Management in New York City",
    seoTitle: "Google Ads Agency NYC | NYC Digital Agency",
    seoDescription:
      "Google Ads and PPC management for New York businesses, run against real ROAS targets with weekly reporting. Management from $1,500 per month.",
    keywords: [
      "Google Ads agency NYC",
      "PPC management New York",
      "Google Ads Manhattan",
      "paid search agency New York",
      "Brooklyn PPC company",
    ],
    nyc: {
      title: "Paid search in the most expensive market in the country",
      body:
        "Clicks in New York are competitive, especially in legal, real estate, finance and home services, so wasted spend adds up fast. We set up conversion tracking first, structure campaigns by intent and location, and tighten targeting every week, so your budget goes to searches that turn into calls and customers.",
      points: [
        "Location targeting by borough, neighborhood or ZIP code",
        "Call and form tracking tied to real revenue",
        "Weekly reporting on cost per lead and ROAS",
      ],
    },
  },

  "facebook-ads": {
    h1: "Meta & Instagram Ads Management in New York City",
    seoTitle: "Meta & Instagram Ads Agency NYC | NYC Digital Agency",
    seoDescription:
      "Facebook and Instagram ad campaigns for New York brands, built on Conversions API tracking and tested creative. Management from $1,400 per month.",
    keywords: [
      "Facebook ads agency NYC",
      "Instagram ads New York",
      "Meta advertising Manhattan",
      "social media advertising Brooklyn",
      "Conversions API setup New York",
    ],
    nyc: {
      title: "Reach New York audiences before they search",
      body:
        "Search catches people who already know what they want. Meta ads reach the rest: restaurant-goers in Williamsburg, shoppers in SoHo, professionals across Midtown. We build campaigns on server-side Conversions API data so tracking survives privacy changes, then test creative continuously to find what stops the scroll.",
      points: [
        "Hyper-local audiences by borough, neighborhood or radius",
        "Conversions API setup for reliable attribution",
        "Regular creative testing with clear winners and losers",
      ],
    },
    faqs: [
      {
        question: "Do Facebook and Instagram ads work for New York businesses?",
        answer:
          "Yes, particularly for retail, hospitality, real estate, events and consumer services, where you can target people by neighborhood and interest. Results depend on the offer and creative, which is why we test rather than assume.",
      },
      {
        question: "How much does Meta ads management cost?",
        answer:
          "Management starts at $1,400 per month. Your ad spend is billed separately, directly to Meta, so you always control and can see the budget.",
      },
      {
        question: "What is the Conversions API and why does it matter?",
        answer:
          "It sends conversion events from your server to Meta, instead of relying only on browser tracking that privacy tools often block. That gives Meta better data to optimize with and gives you more reliable reporting.",
      },
      {
        question: "Who creates the ad creative?",
        answer:
          "We can produce static and video creative, or work with assets you supply. Either way we test several variations at once and keep only what performs.",
      },
    ],
  },

  "technical-seo": {
    h1: "Technical & Organic SEO Services in New York City",
    seoTitle: "Technical SEO Services NYC | NYC Digital Agency",
    seoDescription:
      "Technical SEO audits, on-page optimization and editorial link building for New York businesses. Organic-first growth from $1,100 per month, with clear reporting.",
    keywords: [
      "technical SEO NYC",
      "SEO agency New York",
      "SEO audit Manhattan",
      "organic SEO Brooklyn",
      "link building New York",
    ],
    nyc: {
      title: "Organic growth where paid clicks cost the most",
      body:
        "Because paid search is so expensive in New York, organic traffic is one of the best long-term investments you can make. We fix crawl and indexing problems, improve on-page relevance and earn editorial links from real publications and local organizations, so rankings hold up without a bidding war.",
      points: [
        "Crawl, indexing and Core Web Vitals issues found and fixed",
        "Search-intent content mapped to your services and neighborhoods",
        "Editorial link building, with no link schemes or spam",
      ],
    },
  },

  "content-smm": {
    h1: "Content Marketing & Social Media Management in New York City",
    seoTitle: "Content Marketing & Social Media NYC | NYC Digital Agency",
    seoDescription:
      "SEO blog content and social media management for New York brands: four pillar articles a month plus a full social calendar. From $1,000 per month.",
    keywords: [
      "content marketing agency NYC",
      "social media management New York",
      "SEO content writing New York",
      "blog writing service Manhattan",
      "social media agency Brooklyn",
    ],
    nyc: {
      title: "A voice that sounds like it belongs in New York",
      body:
        "New York audiences are quick to spot generic content. We write SEO-driven articles grounded in real questions your customers ask, in your brand's voice, and pair them with a social calendar so your presence stays consistent without becoming another job for your team.",
      points: [
        "Topics chosen from search demand and customer questions",
        "Four pillar articles plus a social calendar each month",
        "Content structured so search engines and AI tools can quote it",
      ],
    },
    faqs: [
      {
        question: "How does content marketing help my New York business rank?",
        answer:
          "Useful, well-structured content targets the questions your customers search, earns links and builds authority over time. It supports both traditional search results and the answers AI tools generate.",
      },
      {
        question: "How much does content and social media management cost?",
        answer:
          "Plans start at $1,000 per month and include four pillar articles and a social media calendar. Higher volumes, video or more platforms are scoped separately.",
      },
      {
        question: "Do you write in our brand voice?",
        answer:
          "Yes. We start with a voice and audience workshop, share a style guide for approval, and revise until the tone is right before publishing at pace.",
      },
      {
        question: "Which social platforms do you manage?",
        answer:
          "Most commonly Instagram, LinkedIn, Facebook and X, chosen according to where your customers are, not where it is trendy. We recommend fewer platforms done well.",
      },
    ],
  },
};
