"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { projectGalleries } from "./projectGalleries";
import portfolioConfig from "../config.json";

function getProjectGallery(projectId) {
  const raw = projectGalleries[projectId];
  if (!raw || !Array.isArray(raw)) return [];

  const projectLimit = portfolioConfig?.screenshots?.projectLimits?.[projectId];
  const globalLimit = portfolioConfig?.screenshots?.defaultLimit ?? "all";

  const effective = projectLimit !== undefined && projectLimit !== null ? projectLimit : globalLimit;

  if (effective === "all" || effective === null || effective === undefined) {
    return raw;
  }

  const num = Number(effective);
  if (!isNaN(num) && num >= 0) {
    return raw.slice(0, num);
  }

  return raw;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function withBase(path) {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }
  return `${basePath}${path.startsWith("/") ? "" : "/"}${path}`;
}

const navItems = [
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];

const featuredSkills = [
  { mark: "GO", title: "Go", detail: "Distributed services" },
  { mark: "NX", title: "Next.js", detail: "Product interfaces" },
  { mark: "PHP", title: "Laravel", detail: "Enterprise SaaS" },
  { mark: "K8S", title: "Kubernetes", detail: "Platform orchestration" },
  { mark: "API", title: "API systems", detail: "REST · gRPC · GraphQL" },
  { mark: "DB", title: "Data systems", detail: "SQL · cache · analytics" },
];

const skillGroups = [
  {
    eyebrow: "Backend engineering",
    title: "Services and application platforms",
    items: ["Go", "Gin", "GORM", "PHP", "Laravel", "CodeIgniter", "Node.js", "Express.js", "Background jobs"],
  },
  {
    eyebrow: "Frontend engineering",
    title: "Modern web product interfaces",
    items: ["JavaScript ES6+", "TypeScript", "React", "Next.js", "HTML5", "CSS3", "jQuery", "Tailwind CSS", "Bootstrap"],
  },
  {
    eyebrow: "APIs and messaging",
    title: "Connected and real-time systems",
    items: ["REST APIs", "GraphQL", "gRPC", "Protocol Buffers", "API Gateway", "Kafka", "RabbitMQ", "WebSockets", "Async processing"],
  },
  {
    eyebrow: "Data engineering",
    title: "Operational and analytical data",
    items: ["PostgreSQL", "MySQL", "ClickHouse", "Redis", "Query optimisation", "Indexing", "Relational modelling", "Real-time processing"],
  },
  {
    eyebrow: "Infrastructure and cloud",
    title: "Containers, delivery and virtualisation",
    items: ["Linux", "Docker", "Docker Compose", "Kubernetes", "Kubebuilder", "Jenkins", "CI/CD", "Git", "GitLab", "GitHub", "AWS EC2", "AWS RDS", "AWS S3", "CloudFront", "CloudWatch", "IBM Cloud", "VMware govmomi"],
  },
  {
    eyebrow: "System design",
    title: "Architecture for long-lived products",
    items: ["Microservices", "Distributed systems", "Multi-tenant SaaS", "Monoliths", "Clean Architecture", "SOLID", "MVC", "Design patterns", "Scalability"],
  },
  {
    eyebrow: "Security and observability",
    title: "Protected, supportable production systems",
    items: ["OAuth 2.0", "JWT", "Keycloak", "HashiCorp Vault", "RBAC", "API security", "CSRF protection", "Grafana", "Logging", "Performance monitoring"],
  },
  {
    eyebrow: "Quality and delivery",
    title: "Engineering from discovery to production",
    items: ["Unit testing", "Integration testing", "API testing", "PHPUnit", "Cypress", "Postman", "Technical design", "Code review", "Estimation", "Agile", "Release management", "Production support"],
  },
  {
    eyebrow: "Product integrations",
    title: "Payments, communications and location",
    items: ["Stripe", "PayPal", "Twilio", "SendGrid", "SendPulse", "Pusher", "WhatsApp/SMS", "Email and push", "Google Maps", "Google Places", "Third-party APIs"],
  },
];

const experiences = [
  {
    period: "Aug 2023–Present",
    location: "Take2 Technologies",
    role: "Senior Software Developer",
    company: "Deployed full-time at PrimaryIO",
    bullets: [
      "Work as a dedicated engineer within PrimaryIO’s product team, taking responsibility across design, implementation, debugging and delivery.",
      "Build and maintain Go microservices containerised with Docker and deployed on Kubernetes.",
      "Develop VMware disaster-recovery and VMware-to-IBM Cloud migration workflows, alongside IBM Power disaster-recovery interfaces.",
      "Deliver full-stack platform work across Go, Node.js, Next.js, React, authentication, persistence and real-time operational dashboards.",
    ],
    tags: ["Go", "Node.js", "Next.js", "Microservices", "Docker", "Kubernetes", "VMware", "IBM Cloud"],
  },
  {
    period: "Sep 2018–Jul 2023",
    location: "JustAddWater · Jaipur",
    role: "Lead Developer / Full Stack Developer",
    company: "Full-stack and lead development",
    bullets: [
      "Delivered customer applications, administration portals and mobile backends in Laravel, CodeIgniter, MySQL and REST APIs.",
      "Translated business processes into lead allocation, onboarding, inventory, billing, subscription, reporting and approval workflows.",
      "Designed relational schemas, server-side validation, RBAC, secure file handling, reports, invoices, certificates and exports.",
      "Integrated payment, email, SMS, push and real-time services while supporting modern Laravel and legacy CodeIgniter systems.",
      "Owned production troubleshooting and worked directly with product owners, designers, QA teams and clients.",
    ],
    tags: ["PHP", "Laravel", "CodeIgniter", "MySQL", "REST APIs", "AWS", "Payments", "Notifications"],
  },
];

const platformProjects = [
  {
    title: "DRaaS",
    categoryKeys: ["cloud-dr", "systems"],
    categoryBadge: "Cloud & DR",
    category: "Kubernetes-native disaster recovery for VMware",
    role: "Full Stack Developer · PrimaryIO",
    context: "Enterprise platform",
    image: "/projects/draas/draas-01-dashboard.png",
    imageAlt: "DRaaS VMware disaster recovery dashboard with replication metrics",
    gallery: getProjectGallery("draas"),
    description:
      "A multi-tenant disaster-recovery platform coordinating protected workloads, recovery points, failovers and infrastructure operations.",
    highlights: [
      "Built Go persistence services and tenant-aware data access, plus a Node.js Gatekeeper API gateway.",
      "Contributed to Kubebuilder operators for replication, fire drills, failover, failback, cleanup, retries and finalizers.",
      "Integrated Keycloak, IBM IAM and Vault, maintained Kubernetes delivery, and built a real-time observation dashboard.",
    ],
    tags: ["Go", "Gin", "GORM", "Node.js", "Kubernetes", "Kubebuilder", "govmomi", "Keycloak", "Vault"],
  },
  {
    title: "ConvertIO",
    categoryKeys: ["cloud-dr"],
    categoryBadge: "Cloud Migration",
    category: "VMware to IBM Cloud migration platform",
    role: "Full Stack Developer · PrimaryIO",
    context: "Enterprise platform",
    image: "/projects/convertio/convertio-01.png",
    imageAlt: "ConvertIO migration wizard and discovery overview",
    gallery: getProjectGallery("convertio"),
    description:
      "A guided migration product that moves virtual machines through discovery, configuration, synchronisation and cutover into IBM Cloud VPC.",
    highlights: [
      "Led UI delivery for six production modules across a 20+ state migration pipeline.",
      "Built a five-step wizard with CSV batch onboarding, per-NIC networking, IBM Cloud selectors and preflight checks.",
      "Delivered live progress, cutover, delta-sync, abort and retry workflows, plus a Next.js BFF to Flask and gRPC services.",
    ],
    tags: ["Next.js 14", "React 18", "MUI", "Formik", "Chart.js", "Flask", "gRPC", "MySQL", "Docker"],
  },
  {
    title: "ConvertIO Classic",
    categoryKeys: ["cloud-dr"],
    categoryBadge: "Cloud Migration",
    category: "IBM Classic Infrastructure to VPC migration",
    role: "UI Developer · PrimaryIO",
    context: "Enterprise platform",
    image: "/projects/convertio-classic/classic-01.png",
    imageAlt: "ConvertIO Classic IBM Classic to VPC migration console",
    gallery: getProjectGallery("convertio-classic"),
    description:
      "A Next.js migration interface for configuring, validating and monitoring batch moves from IBM Classic VSIs to VPC.",
    highlights: [
      "Built VM and disk selection, per-NIC CSV configuration, migration summaries and live status views.",
      "Added abort, retry and log-download controls for operational recovery.",
      "Created BFF routes and reusable site, storage and profile components with credential and connectivity checks.",
    ],
    tags: ["Next.js", "React", "TypeScript", "IBM Carbon", "NextAuth.js", "Axios", "FastAPI"],
  },
  {
    title: "DR Power",
    categoryKeys: ["cloud-dr"],
    categoryBadge: "Disaster Recovery",
    category: "IBM Power disaster-recovery console",
    role: "UI Developer · PrimaryIO",
    context: "Enterprise platform",
    image: "/projects/dr-power/dr-power-01.png",
    imageAlt: "DR Power IBM PowerHA disaster recovery console",
    gallery: getProjectGallery("dr-power"),
    description:
      "A focused web console for operating disaster recovery across IBM i and PowerHA environments through a central API gateway.",
    highlights: [
      "Delivered interfaces for sites, clusters, tasks, alerts and configuration.",
      "Built site management with certificate upload and filterable operational monitoring.",
    ],
    tags: ["Next.js", "React", "REST APIs", "IBM Power", "PowerHA", "Gatekeeper"],
  },
  {
    title: "Algorithmic Trading Platform",
    categoryKeys: ["systems"],
    categoryBadge: "Distributed Systems",
    category: "Event-driven market and execution system",
    role: "Independent engineering · In progress",
    context: "Personal build",
    imageMark: "AT",
    description:
      "An independently developed platform for real-time market data, order-management workflows and risk management.",
    highlights: [
      "Designed around event-driven processing for continuously changing market and order state.",
      "Brings market data, order operations and risk controls into one evolving system.",
    ],
    tags: ["Event-driven architecture", "Real-time data", "Order management", "Risk management"],
  },
];

const productProjects = [
  {
    title: "KPIP",
    categoryKeys: ["saas"],
    categoryBadge: "Enterprise SaaS",
    category: "Multi-tenant enterprise software suite",
    role: "Lead Developer · 2020–2023",
    context: "Original product screenshot",
    image: "/projects/kpip/kpip-01-crm-dashboard.jpg",
    imageAlt: "KPIP CRM dashboard with client and interaction reports",
    gallery: getProjectGallery("kpip"),
    url: "https://kprimesoft.com/en",
    description:
      "Led a six-person team building a connected, multi-tenant Laravel suite for CRM, HRM, inventory, accounting, legal, rental and project-management workflows.",
    highlights: [
      "Engineered IFRS double-entry accounting, 20+ reports and a real-time CFO dashboard.",
      "Connected invoicing, e-signature, onboarding, subscriptions, payroll and Kanban workflows.",
      "Managed AWS delivery with Stripe, PayPal, Twilio, SendGrid, Solr and Memcached integrations.",
    ],
    tags: ["PHP", "Laravel", "MySQL", "AWS", "Stripe", "Multi-tenant SaaS", "IFRS"],
  },
  {
    title: "FurnacePrices / FP Leads",
    categoryKeys: ["saas"],
    categoryBadge: "Enterprise SaaS",
    category: "Lead management and partner distribution",
    role: "Lead Developer · 2021–2023",
    context: "Original product screenshot",
    image: "/projects/fp-leads/fp-01-dashboard.png",
    imageAlt: "FP Leads administration dashboard with lead and email reports",
    gallery: getProjectGallery("fp-leads"),
    url: "https://quotes.furnaceprices.ca/",
    description:
      "Led a SaaS lead-management product replacing Gravity Forms with campaign tooling, partner operations and multi-role reporting.",
    highlights: [
      "Built a JSON drag-and-drop form builder with multi-page flows, conditions, formulas, outcomes and field mapping.",
      "Automated postal-code routing, partner availability, scoring and CRM timelines, cutting response time by 60%+.",
      "Integrated Stripe, Twilio, SendGrid, SendPulse and Pusher in an AWS-hosted PWA.",
    ],
    tags: ["Laravel", "MySQL", "PWA", "Pusher", "Twilio", "AWS"],
  },
  {
    title: "Needgr8r",
    categoryKeys: ["marketplace-data"],
    categoryBadge: "Marketplace",
    category: "Community marketplace and classifieds",
    role: "Full-stack engineering",
    context: "Original product screenshot",
    image: "/projects/needgr8r/needgr8r-01-workroom.jpg",
    imageAlt: "Needgr8r private project workroom and messaging interface",
    gallery: getProjectGallery("needgr8r"),
    url: "https://needgr8r.org/",
    description:
      "Developed an Elance-inspired community marketplace now serving 10K+ active users and hundreds of completed projects.",
    highlights: [
      "Built profiles, job posting, freelancer discovery, search and managed collaboration workrooms.",
      "Added classifieds, local-business promotion and administration workflows.",
      "Integrated Google Maps and Places for list and map-based location discovery.",
    ],
    tags: ["PHP", "CodeIgniter", "jQuery", "MySQL", "Google Maps"],
  },
  {
    title: "ParkDB",
    categoryKeys: ["marketplace-data"],
    categoryBadge: "Data Platform",
    category: "Amusement-park intelligence database",
    role: "Backend and admin-platform engineering",
    context: "Original product screenshot",
    image: "/projects/parkdb/parkdb-01-parks-list.png",
    imageAlt: "ParkDB reporting screen with filters and park data",
    gallery: getProjectGallery("parkdb"),
    url: "https://www.theparkdb.com/",
    description:
      "Built a worldwide directory with map search and a custom administration system for operational, financial and market data.",
    highlights: [
      "Structured parks, rides, tickets, brands, news, media, permissions and keyword data.",
      "Built interactive map search and a custom administration platform.",
      "Modelled currencies, inflation, costs and market size into consistent reports.",
    ],
    tags: ["PHP", "MySQL", "Maps", "Data modelling", "Reporting"],
  },
];

const projectFilterCategories = [
  { id: "all", label: "All" },
  { id: "cloud-dr", label: "Cloud & DR" },
  { id: "saas", label: "Enterprise SaaS" },
  { id: "systems", label: "Distributed Systems" },
  { id: "marketplace-data", label: "Marketplaces & Data" },
];

const allProjects = [...platformProjects, ...productProjects];

const additionalWork = [
  { name: "POS / COID", detail: "Sales, purchasing and inventory", gallery: getProjectGallery("pos-coid") },
  { name: "Zuma Juice", detail: "E-commerce & direct-to-consumer store", gallery: getProjectGallery("zuma-juice") },
  { name: "Zona / CircuitHelp", detail: "Field service & safety management (Web & Mobile)", gallery: getProjectGallery("zona") },
  { name: "FFRAT" },
  { name: "PlanInsta" },
  { name: "Haldibaan" },
  { name: "Jaico" },
  { name: "TTC" },
  { name: "Sharktech CRM" },
  { name: "Custom CMS / admin portals" },
];

function SectionHeading({ id, label, title, description }) {
  return (
    <div className="section-heading reveal">
      <p className="section-label">{label}</p>
      <h2 id={id}>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

function TagList({ items, label }) {
  return (
    <ul className="tag-list" aria-label={label}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function Header({ activeSection, menuOpen, scrolled, setMenuOpen }) {
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Amit Choudhary, back to top">
          <span className="brand-mark" aria-hidden="true">AC</span>
          <span className="brand-copy">
            <strong>AMIT CHOUDHARY</strong>
            <small className="brand-subtitle-full">Senior Software Developer | Full Stack</small>
            <small className="brand-subtitle-short">Senior Developer</small>
          </span>
        </a>

        <div className="header-nav-wrap">
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                className={activeSection === item.id ? "is-active" : ""}
                href={`#${item.id}`}
                key={item.id}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="button-header-cv"
            href={withBase("/Amit_Choudhary_Resume.pdf")}
            target="_blank"
            rel="noreferrer"
            download="Amit_Choudhary_Resume.pdf"
            aria-label="Download CV"
            title="Download CV (PDF)"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>CV</span>
          </a>
          <a
            className="button-header-cv"
            href={withBase("/Amit_Choudhary_Cover_Letter.pdf")}
            target="_blank"
            rel="noreferrer"
            download="Amit_Choudhary_Cover_Letter.pdf"
            aria-label="Download Cover Letter"
            title="Download Cover Letter (PDF)"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <span>Cover Letter</span>
          </a>
          <a className="button button-header-contact" href="#contact">
            Get in touch
          </a>
        </div>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen ? (
        <div
          className="mobile-menu-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onClick={() => setMenuOpen(false)}
        >
          <nav
            className="mobile-menu"
            id="mobile-navigation"
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="mobile-menu-label">Navigate</p>
            {navItems.map((item) => (
              <a
                className={activeSection === item.id ? "is-active" : ""}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mobile-menu-actions">
              <a
                className="button button-secondary"
                href={withBase("/Amit_Choudhary_Resume.pdf")}
                target="_blank"
                rel="noreferrer"
                download="Amit_Choudhary_Resume.pdf"
                onClick={() => setMenuOpen(false)}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download CV
              </a>
              <a
                className="button button-secondary"
                href={withBase("/Amit_Choudhary_Cover_Letter.pdf")}
                target="_blank"
                rel="noreferrer"
                download="Amit_Choudhary_Cover_Letter.pdf"
                onClick={() => setMenuOpen(false)}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Cover Letter
              </a>
              <a
                className="button button-primary"
                href="#contact"
                onClick={() => setMenuOpen(false)}
              >
                Get in touch
              </a>
            </div>
            <div className="mobile-menu-meta">
              <span>Jaipur, India</span>
              <span>Go · PHP · Laravel</span>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function ExperienceCard({ item }) {
  return (
    <article className="experience-card panel reveal">
      <div className="experience-meta">
        <time>{item.period}</time>
        <span>{item.location}</span>
      </div>
      <div className="experience-body">
        <p className="role-context">{item.company}</p>
        <h3>{item.role}</h3>
        <ul className="detail-list">
          {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
        <TagList items={item.tags} label={`${item.role} technologies`} />
      </div>
    </article>
  );
}

function GalleryModal({ project, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const images = project?.gallery || [];
  const currentImage = images[currentIndex] || images[0];
  const thumbRefs = useRef([]);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - touchStartX.current;
    const diffY = endY - touchStartY.current;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      } else {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose, project]);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [project]);

  useEffect(() => {
    if (thumbRefs.current[currentIndex]) {
      thumbRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  if (!project || !images.length) return null;

  const title = project.title || project.name;
  const category = project.category || project.detail || "Project Gallery";

  return (
    <div
      className="gallery-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshot gallery`}
      onClick={onClose}
    >
      <div
        className="gallery-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gallery-header">
          <div className="gallery-title-wrap">
            <span className="gallery-category">{category}</span>
            <h3 className="gallery-title">{title}</h3>
          </div>
          <div className="gallery-header-actions">
            <span className="gallery-counter">
              <strong>{currentIndex + 1}</strong> / {images.length}
            </span>
            <button
              type="button"
              className="gallery-close"
              onClick={onClose}
              aria-label="Close screenshot gallery (Escape)"
            >
              ✕
            </button>
          </div>
        </div>

        <div
          className="gallery-viewer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {images.length > 1 && (
            <button
              type="button"
              className="gallery-nav prev"
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              aria-label="Previous screenshot (Left Arrow)"
            >
              ‹
            </button>
          )}

          <div className="gallery-stage">
            <div className="gallery-main-image-wrap">
              <img
                src={withBase(currentImage.src)}
                alt={currentImage.title || `${title} screenshot ${currentIndex + 1}`}
                className="gallery-main-image"
              />
            </div>
            {(currentImage.title || currentImage.caption) && (
              <div className="gallery-caption-box">
                {currentImage.title && <h4>{currentImage.title}</h4>}
                {currentImage.caption && <p>{currentImage.caption}</p>}
              </div>
            )}
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className="gallery-nav next"
              onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              aria-label="Next screenshot (Right Arrow)"
            >
              ›
            </button>
          )}
        </div>

        {images.length > 1 && (
          <div className="gallery-filmstrip">
            {images.map((img, idx) => (
              <button
                type="button"
                key={img.src}
                ref={(el) => (thumbRefs.current[idx] = el)}
                className={`gallery-thumb${idx === currentIndex ? " is-active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`View image ${idx + 1}: ${img.title || ""}`}
              >
                <img src={withBase(img.src)} alt="" />
                <span className="gallery-thumb-idx">{idx + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpenGallery }) {
  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);

  return (
    <article className="project-card panel reveal is-visible">
      <div className="project-image">
        {project.image ? (
          hasGallery ? (
            <button
              type="button"
              className="project-image-trigger"
              onClick={() => onOpenGallery(project)}
              aria-label={`View ${project.gallery.length} ${project.gallery.length === 1 ? "screenshot" : "screenshots"} for ${project.title}`}
            >
              <Image
                src={withBase(project.image)}
                alt={project.imageAlt || project.title}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <span className="gallery-badge">
                <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                {project.gallery.length} {project.gallery.length === 1 ? "screenshot" : "screenshots"}
              </span>
              <span className="gallery-hover-overlay" aria-hidden="true">
                <span className="gallery-hover-pill">View screenshot gallery</span>
              </span>
            </button>
          ) : (
            <Image
              src={withBase(project.image)}
              alt={project.imageAlt || project.title}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          )
        ) : (
          <div
            className="project-image-placeholder"
            role="img"
            aria-label={`${project.title} project image placeholder`}
          >
            <span className="project-placeholder-mark" aria-hidden="true">{project.imageMark}</span>
            <span className="project-placeholder-copy">
              <strong>Project architecture</strong>
              <small>System in progress</small>
            </span>
          </div>
        )}
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>{project.role}</span>
          <span className="project-category-badge">{project.categoryBadge || project.context}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-category">{project.category}</p>
        <p className="project-description">{project.description}</p>
        <ul className="project-highlights">
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <TagList items={project.tags} label={`${project.title} technologies`} />
        <div className="project-actions">
          {hasGallery ? (
            <button
              type="button"
              className="button button-gallery"
              onClick={() => onOpenGallery(project)}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15" aria-hidden="true">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              View {project.gallery.length} {project.gallery.length === 1 ? "screenshot" : "screenshots"}
            </button>
          ) : null}
          {project.url ? (
            <a
              className="text-link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit the ${project.title} project website`}
            >
              Visit project website
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  const [activeSection, setActiveSection] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeGalleryProject, setActiveGalleryProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredProjects = useMemo(() => {
    let list = allProjects.filter((p) => {
      if (activeFilter === "all") return true;
      return p.categoryKeys?.includes(activeFilter);
    });

    if (sortBy === "screenshots-desc") {
      list = [...list].sort((a, b) => (b.gallery?.length || 0) - (a.gallery?.length || 0));
    } else if (sortBy === "title-asc") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    }
    return list;
  }, [activeFilter, sortBy]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65%", threshold: 0 },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) sectionObserver.observe(section);
    });

    document.documentElement.classList.add("enhanced");
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      sectionObserver.disconnect();
      revealObserver.disconnect();
      document.documentElement.classList.remove("enhanced");
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const menu = document.getElementById("mobile-navigation");
    const menuButton = document.querySelector(".menu-button");
    const focusable = menu ? Array.from(menu.querySelectorAll("a[href], button:not([disabled])")) : [];
    const handleMenuKeys = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleMenuKeys);
    focusable[0]?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleMenuKeys);
      if (menuButton && menuButton.offsetParent !== null) menuButton.focus();
    };
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <Header
        activeSection={activeSection}
        menuOpen={menuOpen}
        scrolled={scrolled}
        setMenuOpen={setMenuOpen}
      />

      <main id="top">
        <section className="hero">
          <div className="container hero-inner">
            <div className="identity-pill">Senior Software Developer · Jaipur, India</div>
            <h1>Hey, I’m Amit Choudhary.</h1>
            <p className="hero-specialisation">
              I work across <strong>distributed Go services</strong>, <strong>cloud platforms</strong> and <strong>enterprise web products</strong>.
            </p>
            <p className="hero-summary">
              Senior Software Developer and Full-Stack Engineer with 8+ years of experience designing and delivering scalable
              enterprise applications, cloud-native platforms, and distributed systems. Strong background in backend engineering,
              microservices, disaster recovery, cloud migration, and multi-tenant SaaS. Experienced in leading teams, architecting
              applications from scratch, and managing the full software development lifecycle. Independently building an
              event-driven algorithmic trading platform for real-time market data, order management, and risk management.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Get in touch</a>
              <a className="button button-secondary" href="#projects">Explore projects</a>
              <a className="button button-quiet" href="#experience">View experience</a>
            </div>

            <div className="metrics-strip panel" aria-label="Career summary">
              <div>
                <strong>8+ years</strong>
                <span>Software development</span>
              </div>
              <div>
                <strong>Cloud + DR</strong>
                <span>Migration and recovery platforms</span>
              </div>
              <div>
                <strong>Full stack</strong>
                <span>Services, interfaces and delivery</span>
              </div>
              <div>
                <strong>Microservices</strong>
                <span>Go, gRPC, REST and event streaming</span>
              </div>
              <div>
                <strong>Distributed Systems</strong>
                <span>Kubernetes, containers, operators and cloud scale</span>
              </div>
              <div>
                <strong>Enterprise SaaS</strong>
                <span>Multi-tenant platforms, IFRS billing and data scale</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="profile" aria-labelledby="profile-title">
          <div className="container">
            <SectionHeading id="profile-title" label="Profile" title="Professional summary" />
            <div className="profile-copy reveal">
              <p className="profile-lead">
                I design and deliver dependable software from service architecture to the final product workflow.
              </p>
              <p>
                My current work covers Kubernetes-native disaster recovery, VMware and IBM Cloud migration,
                multi-tenant services, API gateways and real-time operational interfaces. I take features from
                requirements and technical design through implementation, testing, release and production support.
              </p>
              <p>
                My product background also includes Laravel SaaS, accounting, lead distribution, marketplaces,
                inventory, subscriptions, payments and reporting. Alongside client work, I’m building an
                event-driven algorithmic trading platform for market data, order management and risk management.
              </p>
            </div>

            <div className="strength-grid">
              <article className="strength-card panel reveal">
                <span className="icon-well" aria-hidden="true">BE</span>
                <div>
                  <h3>Backend and platform engineering</h3>
                  <p>APIs, data models, access control, background jobs, integrations and cloud-backed services.</p>
                </div>
              </article>
              <article className="strength-card panel reveal">
                <span className="icon-well amber" aria-hidden="true">PD</span>
                <div>
                  <h3>Product delivery ownership</h3>
                  <p>Requirements, estimation, implementation, testing, release coordination and production support.</p>
                </div>
              </article>
              <article className="strength-card panel reveal">
                <span className="icon-well blue" aria-hidden="true">FS</span>
                <div>
                  <h3>Full-stack problem solving</h3>
                  <p>Service design, data flows and product interfaces shaped around complex operational work.</p>
                </div>
              </article>
            </div>

            <article className="current-role panel reveal">
              <div className="current-role-meta">
                <span className="section-label">Current role</span>
                <time>Aug 2023–Present</time>
              </div>
              <div className="current-role-body">
                <p className="role-context">Take2 Technologies · Deployed at PrimaryIO</p>
                <h3>Senior Software Developer</h3>
                <p>
                  Building Go and Node.js services, Next.js interfaces, DRaaS and VMware-to-IBM Cloud migration
                  workflows across Docker, Kubernetes, VMware and IBM Cloud.
                </p>
                <TagList
                  items={["Go", "Node.js", "Next.js", "Microservices", "Docker", "Kubernetes", "VMware", "IBM Cloud"]}
                  label="Current role technologies"
                />
                <a className="text-link" href="https://www.primaryio.com/" target="_blank" rel="noreferrer">
                  About PrimaryIO
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="skills" aria-labelledby="skills-title">
          <div className="container">
            <SectionHeading
              id="skills-title"
              label="Architecture & skills"
              title="A practical engineering toolkit"
              description="Backend, frontend, data, infrastructure and delivery skills used across real production systems."
            />

            <div className="featured-skills">
              {featuredSkills.map((skill) => (
                <article className="featured-skill panel reveal" key={skill.title}>
                  <span>{skill.mark}</span>
                  <div>
                    <h3>{skill.title}</h3>
                    <p>{skill.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="skill-grid">
              {skillGroups.map((group) => (
                <article className="skill-panel panel reveal" key={group.title}>
                  <p className="card-eyebrow">{group.eyebrow}</p>
                  <h3>{group.title}</h3>
                  <TagList items={group.items} label={group.title} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <div className="container">
            <SectionHeading
              id="experience-title"
              label="Track record"
              title="Professional experience"
              description="More than eight years spanning cloud platforms, distributed systems and full-cycle product engineering."
            />
            <div className="experience-list">
              {experiences.map((item) => <ExperienceCard item={item} key={item.role} />)}
            </div>
          </div>
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <div className="container">
            <SectionHeading
              id="projects-title"
              label="Project portfolio"
              title="Platforms and products built in production"
              description="Production platforms and enterprise SaaS applications. Filter by category, sort by gallery depth or title, and click any project to explore interactive screenshots and architecture."
            />

            <div className="project-controls panel reveal is-visible">
              <div className="project-filters" role="tablist" aria-label="Filter projects by category">
                {projectFilterCategories.map((cat) => {
                  const count = cat.id === "all"
                    ? allProjects.length
                    : allProjects.filter((p) => p.categoryKeys?.includes(cat.id)).length;
                  const isActive = activeFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`project-filter-pill${isActive ? " is-active" : ""}`}
                      onClick={() => setActiveFilter(cat.id)}
                    >
                      <span>{cat.label}</span>
                      <span className="project-filter-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="project-sort-wrap">
                <label htmlFor="project-sort-select" className="project-sort-label">
                  <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
                    <path d="M3 4.5h14a.75.75 0 010 1.5H3a.75.75 0 010-1.5zm3 5h8a.75.75 0 010 1.5H6a.75.75 0 010-1.5zm3 5h2a.75.75 0 010 1.5H9a.75.75 0 010-1.5z" />
                  </svg>
                  <span>Sort by:</span>
                </label>
                <div className="project-select-wrapper">
                  <select
                    id="project-sort-select"
                    className="project-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort projects"
                  >
                    <option value="default">Featured / Default</option>
                    <option value="screenshots-desc">Most screenshots</option>
                    <option value="title-asc">Project name (A–Z)</option>
                    <option value="title-desc">Project name (Z–A)</option>
                  </select>
                  <svg className="project-select-chevron" viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="project-meta-bar">
              <span className="project-result-count">
                Showing <strong>{filteredProjects.length}</strong> of {allProjects.length} projects
                {activeFilter !== "all" || sortBy !== "default" ? (
                  <button
                    type="button"
                    className="project-reset-filter"
                    onClick={() => {
                      setActiveFilter("all");
                      setSortBy("default");
                    }}
                  >
                    Reset filters
                  </button>
                ) : null}
              </span>
            </div>

            {filteredProjects.length > 0 ? (
              <div className="project-grid">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    project={project}
                    key={project.title}
                    onOpenGallery={setActiveGalleryProject}
                  />
                ))}
              </div>
            ) : (
              <div className="project-empty-state panel reveal is-visible">
                <p>No projects match the selected filter.</p>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => {
                    setActiveFilter("all");
                    setSortBy("default");
                  }}
                >
                  Show all projects
                </button>
              </div>
            )}

            <div className="additional-work panel reveal">
              <div className="additional-work-intro">
                <p className="card-eyebrow">Additional product work</p>
                <h3>The complete additional project list from the résumé.</h3>
                <p>More delivered work across commerce, training, field operations, assessment and administration. Projects with screenshots are clickable to view their galleries.</p>
              </div>
              <ul className="archive-grid" aria-label="Additional projects">
                {additionalWork.map((item) => (
                  <li className="archive-item" key={item.name}>
                    {item.gallery?.length ? (
                      <button
                        type="button"
                        className="archive-button"
                        onClick={() => setActiveGalleryProject(item)}
                        aria-label={`View ${item.gallery.length} screenshots for ${item.name}`}
                      >
                        <div className="archive-content">
                          <strong>{item.name}</strong>
                          {item.detail ? <span>{item.detail}</span> : null}
                        </div>
                        <span className="archive-badge">
                          {item.gallery.length} screenshots ↗
                        </span>
                      </button>
                    ) : (
                      <div className="archive-content">
                        <strong>{item.name}</strong>
                        {item.detail ? <span>{item.detail}</span> : null}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="education" aria-labelledby="education-title">
          <div className="container">
            <SectionHeading id="education-title" label="Education" title="Academic background" />
            <div className="education-grid">
              <article className="education-card panel reveal">
                <time>2021</time>
                <h3>Master of Computer Applications</h3>
                <p>Sri Balaji College of Engineering &amp; Technology, Jaipur</p>
                <span>Rajasthan Technical University · 75%</span>
              </article>
              <article className="education-card panel reveal">
                <time>2018</time>
                <h3>Bachelor of Computer Applications</h3>
                <p>Shree Karni College, Jaipur</p>
                <span>Rajasthan University · 71%</span>
              </article>
              <article className="education-card panel reveal">
                <time>2015</time>
                <h3>Senior Secondary (10+2)</h3>
                <p>Board of Secondary Education, Rajasthan</p>
                <span>64.60%</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="contact" aria-labelledby="contact-title">
          <div className="container">
            <SectionHeading
              id="contact-title"
              label="Reach out"
              title="Get in touch"
              description="Open to Architecture & Engineering Opportunities worldwide."
            />

            <div className="contact-showcase panel reveal">
              <div className="contact-showcase-intro">
                <div>
                  <div className="availability-tag">
                    <span className="availability-dot"></span>
                    <span>Available for engineering roles</span>
                  </div>

                  <h3>Let’s talk about your next project or engineering role.</h3>

                  <p className="contact-lead-text">
                    Whether you have an opening for a Senior Software Developer, Backend &amp; Distributed Systems Engineer,
                    Cloud Platform / Microservices Architect, or Full-Stack Engineer — my inbox is always open.
                  </p>
                </div>

                <div className="contact-intro-meta">
                  <div className="contact-meta-item">
                    <span className="meta-item-label">Location</span>
                    <strong className="meta-item-val">Jaipur, Rajasthan, India</strong>
                  </div>
                  <div className="contact-meta-item">
                    <span className="meta-item-label">Work mode</span>
                    <strong className="meta-item-val">Remote · Hybrid · On-site (Pan-India)</strong>
                  </div>
                </div>

                <div className="contact-intro-cta">
                  <a
                    className="button button-primary"
                    href="mailto:amitchoudhary9487@gmail.com"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Send an email
                  </a>
                  <a
                    className="button button-secondary"
                    href="tel:+916377098903"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call / WhatsApp
                  </a>
                </div>
              </div>

              <div className="contact-showcase-channels">
                <p className="channels-heading">Direct Channels &amp; Verified Documents</p>

                <div className="channel-list">
                  <a
                    className="channel-item"
                    href="mailto:amitchoudhary9487@gmail.com"
                  >
                    <div className="channel-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div className="channel-content">
                      <span className="channel-label">Email</span>
                      <strong className="channel-val">amitchoudhary9487@gmail.com</strong>
                    </div>
                    <span className="channel-action">Write ↗</span>
                  </a>

                  <a
                    className="channel-item"
                    href="tel:+916377098903"
                  >
                    <div className="channel-icon amber" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className="channel-content">
                      <span className="channel-label">Phone &amp; WhatsApp</span>
                      <strong className="channel-val">+91 6377098903</strong>
                    </div>
                    <span className="channel-action">Call ↗</span>
                  </a>

                  <a
                    className="channel-item"
                    href="https://www.linkedin.com/in/amitc1996/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="channel-icon blue" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </div>
                    <div className="channel-content">
                      <span className="channel-label">LinkedIn Profile</span>
                      <strong className="channel-val">linkedin.com/in/amitc1996</strong>
                    </div>
                    <span className="channel-action">Connect ↗</span>
                  </a>

                  <a
                    className="channel-item"
                    href={withBase("/Amit_Choudhary_Resume.pdf")}
                    target="_blank"
                    rel="noreferrer"
                    download="Amit_Choudhary_Resume.pdf"
                  >
                    <div className="channel-icon amber" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M12 18v-6" />
                        <path d="m9 15 3 3 3-3" />
                      </svg>
                    </div>
                    <div className="channel-content">
                      <span className="channel-label">Curriculum Vitae (.pdf)</span>
                      <strong className="channel-val">Amit_Choudhary_Resume.pdf</strong>
                    </div>
                    <span className="channel-action">Download ↓</span>
                  </a>

                  <a
                    className="channel-item"
                    href={withBase("/Amit_Choudhary_Cover_Letter.pdf")}
                    target="_blank"
                    rel="noreferrer"
                    download="Amit_Choudhary_Cover_Letter.pdf"
                  >
                    <div className="channel-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <line x1="10" y1="9" x2="8" y2="9" />
                      </svg>
                    </div>
                    <div className="channel-content">
                      <span className="channel-label">Cover Letter (.pdf)</span>
                      <strong className="channel-val">Amit_Choudhary_Cover_Letter.pdf</strong>
                    </div>
                    <span className="channel-action">View ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true">AC</span>
            <div>
              <strong>Amit Choudhary</strong>
              <p>Senior Software Developer · Jaipur, Rajasthan, India</p>
            </div>
          </div>
          <div className="footer-meta">
            <span>English · Hindi</span>
          </div>
        </div>
      </footer>

      <a
        className={`back-to-top${scrolled ? " is-visible" : ""}`}
        href="#top"
        aria-label="Back to top"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </a>

      <GalleryModal
        project={activeGalleryProject}
        onClose={() => setActiveGalleryProject(null)}
      />
    </div>
  );
}
