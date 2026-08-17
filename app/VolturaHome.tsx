"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type Service = {
  title: string;
  image: string;
  description: string;
  benefits: string[];
};

type Project = {
  title: string;
  category: "Electrical" | "Mechanical";
  image: string;
  scope: string;
  note: string;
};

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${assetBase}${path}`;

const electricalServices: Service[] = [
  { title: "Home Power Supply Installation", image: "/images/services/home-power.webp", description: "New residential supply arrangements planned for safety, capacity and future additions.", benefits: ["Load planning", "Neat routing"] },
  { title: "Residential Wiring & Rewiring", image: "/images/services/residential-wiring.webp", description: "Practical wiring for new homes, renovations and ageing electrical systems.", benefits: ["Safer circuits", "Room-by-room scope"] },
  { title: "Commercial Electrical Installation", image: "/images/services/commercial-electrical.webp", description: "Coordinated power distribution for shops, offices, workshops and SME facilities.", benefits: ["Three-phase ready", "Operational clarity"] },
  { title: "Lighting Installation & Upgrades", image: "/images/services/lighting-upgrades.webp", description: "Efficient indoor, outdoor and high-bay lighting with balanced coverage.", benefits: ["Better visibility", "Lower energy use"] },
  { title: "Distribution Board Installation", image: "/images/services/distribution-board.webp", description: "New boards and practical upgrades with organized protection and circuit separation.", benefits: ["Clear protection", "Capacity review"] },
  { title: "Sockets, Switches & Power Points", image: "/images/services/sockets-switches.webp", description: "Cleanly installed access to power, positioned around real day-to-day use.", benefits: ["Practical placement", "Clean finish"] },
  { title: "Troubleshooting & Fault Finding", image: "/images/services/fault-finding.webp", description: "Structured diagnosis for nuisance trips, failed circuits and intermittent faults.", benefits: ["Measured diagnosis", "Focused repairs"] },
  { title: "Earthing & Grounding Systems", image: "/images/services/earthing-grounding.webp", description: "Grounding arrangements that support protection, stability and safer operation.", benefits: ["Testable system", "Risk reduction"] },
  { title: "Generator & Backup Power", image: "/images/services/generator-backup.webp", description: "Orderly backup-power connections and changeover planning for critical loads.", benefits: ["Continuity planning", "Safe changeover"] },
  { title: "Preventive Electrical Maintenance", image: "/images/services/electrical-maintenance.webp", description: "Routine inspections that identify heat, wear and loose connections before failure.", benefits: ["Less downtime", "Early detection"] },
];

const mechanicalServices: Service[] = [
  { title: "Water Pump Installation & Repair", image: "/images/services/water-pump.webp", description: "Pump selection, installation and repair for dependable water movement.", benefits: ["Stable pressure", "Service access"] },
  { title: "Piping Installation", image: "/images/services/piping.webp", description: "Supported, organized piping routes for practical building and equipment needs.", benefits: ["Clean routing", "Maintainable layout"] },
  { title: "Plumbing Support Works", image: "/images/services/plumbing-support.webp", description: "Targeted plumbing support for small commercial and residential facilities.", benefits: ["Fast isolation", "Reliable flow"] },
  { title: "Air-Conditioning Installation", image: "/images/services/air-conditioning.webp", description: "Comfort-system installation and maintenance with attention to access and drainage.", benefits: ["Better comfort", "Efficient upkeep"] },
  { title: "Ventilation & Exhaust Systems", image: "/images/services/ventilation.webp", description: "Air movement solutions for workshops, kitchens and enclosed working areas.", benefits: ["Cleaner airflow", "Heat removal"] },
  { title: "Mechanical Equipment Installation", image: "/images/services/equipment-installation.webp", description: "Careful placement, alignment and connection of compact mechanical equipment.", benefits: ["Correct alignment", "Stable operation"] },
  { title: "Minor Fabrication Works", image: "/images/services/fabrication.webp", description: "Purpose-built brackets, supports and small steel components for site needs.", benefits: ["Made to fit", "Practical finish"] },
  { title: "Welding & Repair Works", image: "/images/services/welding-repair.webp", description: "Controlled repair and joining work for frames, supports and small assemblies.", benefits: ["Durable repair", "Site-ready result"] },
  { title: "Preventive Mechanical Maintenance", image: "/images/services/mechanical-maintenance.webp", description: "Routine checks for pumps, motors and moving equipment to reduce disruption.", benefits: ["Longer equipment life", "Fewer surprises"] },
  { title: "Facility Maintenance Services", image: "/images/services/facility-maintenance.webp", description: "Coordinated support across everyday electrical and mechanical facility needs.", benefits: ["One local team", "Planned support"] },
];

const projects: Project[] = [
  { title: "Residential wiring renewal", category: "Electrical", image: "/images/services/residential-wiring.webp", scope: "Rewiring • Distribution • Testing", note: "Representative residential scope" },
  { title: "Shoplot electrical upgrade", category: "Electrical", image: "/images/services/commercial-electrical.webp", scope: "Power • Lighting • Cable routes", note: "Representative commercial scope" },
  { title: "Warehouse lighting upgrade", category: "Electrical", image: "/images/services/lighting-upgrades.webp", scope: "High-bay lighting • Controls", note: "Representative industrial scope" },
  { title: "Water pump installation", category: "Mechanical", image: "/images/services/water-pump.webp", scope: "Pump • Valves • Commissioning", note: "Representative facility scope" },
  { title: "Ventilation improvement", category: "Mechanical", image: "/images/services/ventilation.webp", scope: "Extract • Ducting • Airflow", note: "Representative workshop scope" },
  { title: "Planned facility maintenance", category: "Mechanical", image: "/images/services/facility-maintenance.webp", scope: "Inspection • Repair • Reporting", note: "Representative maintenance scope" },
];

const industries = ["Homes", "Retail", "Offices", "Workshops", "Warehouses", "Small factories", "Building owners", "SMEs"];

function VolturaLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`header-brand-lockup ${compact ? "compact" : ""}`}>
      <span className="header-brand-mark-wrap" aria-hidden="true">
        <img className="header-brand-mark" src={asset("/images/brand/voltura-mark-transparent.png")} alt="" />
      </span>
      <i className="header-brand-divider" aria-hidden="true" />
      <span className="header-brand-type">
        <img className="header-brand-wordmark" src={asset("/images/brand/voltura-wordmark-transparent.png")} alt="Voltura" />
        <span className="header-brand-tagline">POWER &amp; ENGINEERING</span>
      </span>
    </span>
  );
}

function IndustrySymbol({ industry }: { industry: string }) {
  const symbol = industry.toLowerCase().replaceAll(" ", "-");
  return <span className={`industry-symbol symbol-${symbol}`} aria-hidden="true"><i /><i /><i /><b /><em /></span>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="section-heading reveal">
      <p className="section-eyebrow"><span />{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeServices, setActiveServices] = useState<"electrical" | "mechanical">("electrical");
  const [projectFilter, setProjectFilter] = useState<"All" | "Electrical" | "Mechanical">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const audioRef = useRef<AudioContext | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const filteredProjects = useMemo(
    () => projectFilter === "All" ? projects : projects.filter(project => project.category === projectFilter),
    [projectFilter],
  );

  const playTone = (frequency = 260, duration = 0.09, gain = 0.025) => {
    if (!soundOn || typeof window === "undefined") return;
    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    const context = audioRef.current ?? new AudioCtor();
    audioRef.current = context;
    const oscillator = context.createOscillator();
    const volume = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.25, context.currentTime + duration);
    volume.gain.setValueAtTime(gain, context.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    oscillator.connect(volume).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    if (next) {
      window.setTimeout(() => {
        const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtor) return;
        const context = audioRef.current ?? new AudioCtor();
        audioRef.current = context;
        void context.resume();
        const oscillator = context.createOscillator();
        const volume = context.createGain();
        oscillator.frequency.value = 310;
        volume.gain.setValueAtTime(0.025, context.currentTime);
        volume.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.12);
        oscillator.connect(volume).connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.12);
      }, 0);
    }
  };

  useEffect(() => {
    const stored = window.localStorage.getItem("voltura-theme") as "dark" | "light" | null;
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("voltura-theme", theme);
  }, [theme]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
      const hero = heroRef.current;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const travel = hero.offsetHeight - window.innerHeight;
        setHeroProgress(Math.max(0, Math.min(1, -rect.top / Math.max(travel, 1))));
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("is-visible", entry.isIntersecting));
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [activeServices, projectFilter]);

  useEffect(() => {
    if (!soundOn) return;
    const heard = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !heard.has(entry.target)) {
          heard.add(entry.target);
          playTone(190 + heard.size * 24, 0.08, 0.012);
        }
      });
    }, { threshold: 0.55 });
    document.querySelectorAll("[data-sound-section]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundOn]);

  const phase = heroProgress < 0.32 ? 0 : heroProgress < 0.68 ? 1 : 2;
  const cubeStyle = {
    "--hero-p": heroProgress,
    transform: `rotateX(${4 - heroProgress * 7}deg) rotateY(${-10 + heroProgress * 20}deg) translateY(${heroProgress * -12}px)`,
  } as CSSProperties;

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("Your quotation details are prepared. Voltura’s final email or WhatsApp destination can be connected before public launch.");
    playTone(420, 0.14, 0.025);
  };

  const navItems = [
    ["Home", "#home"], ["About", "#about"], ["Electrical Services", "#services"], ["Mechanical Services", "#services"],
    ["Projects", "#projects"], ["Industries", "#industries"], ["Why Voltura", "#why"], ["Gallery", "#gallery"], ["Contact", "#contact"],
  ];

  return (
    <main className="site-shell" id="home">
      <header className="site-header">
        <a href="#home" className="brand-link" aria-label="Voltura Power and Engineering home" onClick={() => playTone(240)}><VolturaLogo /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <details className="services-menu">
            <summary>Services <span>⌄</span></summary>
            <div className="mega-menu">
              <a href="#services" onClick={() => setActiveServices("electrical")}><b>Electrical</b><small>10 installation and maintenance scopes</small></a>
              <a href="#services" onClick={() => setActiveServices("mechanical")}><b>Mechanical</b><small>10 facility and equipment scopes</small></a>
            </div>
          </details>
          <a href="#projects">Projects</a>
          <a href="#industries">Industries</a>
          <a href="#why">Why Voltura</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-tools">
          <button className="icon-button" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title="Theme">
            <span aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</span>
          </button>
          <button className={`icon-button ${soundOn ? "active" : ""}`} type="button" onClick={toggleSound} aria-label={soundOn ? "Mute interface sound" : "Enable interface sound"} title="Optional sound">
            <span aria-hidden="true">{soundOn ? "♪" : "×♪"}</span>
          </button>
          <a href="#quote" className="header-cta" onClick={() => playTone(330)}>Get quotation <span className="thunder-arrow">ϟ</span></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle navigation"><i /><i /></button>
        </div>
      </header>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`} id="mobile-menu">
        {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => { setMenuOpen(false); if (label.startsWith("Mechanical")) setActiveServices("mechanical"); if (label.startsWith("Electrical")) setActiveServices("electrical"); }}>{label}<span className="thunder-arrow">ϟ</span></a>)}
        <a href="#quote" className="mobile-quote" onClick={() => setMenuOpen(false)}>Get Quotation <span className="thunder-arrow">ϟ</span></a>
      </div>

      <section className="hero-sequence" ref={heroRef} data-sound-section>
        <div className="hero-sticky">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">BINTULU, SARAWAK <b>•</b> EST. 2026</p>
            <h1>Reliable power.<br /><span>Practical engineering.</span></h1>
            <p className="hero-text">Electrical and mechanical solutions for homes, businesses and growing industry.</p>
            <div className="hero-actions">
              <a className="button primary magnetic" href="#services" onClick={() => playTone(330)}>Explore services <span className="thunder-arrow">ϟ</span></a>
              <a className="button secondary" href="#quote" onClick={() => playTone(290)}>Request a quote <span className="thunder-arrow">ϟ</span></a>
            </div>
            <div className="hero-microcopy"><span>01</span><p>Scroll to scale from local power work to advanced infrastructure.</p></div>
          </div>

          <div className="power-stage">
            <div className="stage-topline"><span>SCALABLE ENGINEERING</span><span>{String(phase + 1).padStart(2, "0")} / 03</span></div>
            <div className="transform-box" style={cubeStyle}>
              <div className="glass-shell" />
              <figure className="scene-panel scene-home" style={{ opacity: Math.max(0, 1 - heroProgress * 1.6) }}>
                <img src={asset("/images/services/home-power.webp")} alt="Residential power distribution installation" />
                <figcaption><span>HOME POWER</span><b>Dependable foundations</b></figcaption>
              </figure>
              <div className="scene-panel scene-commercial" style={{ opacity: 1 - Math.abs(heroProgress - 0.5) * 3.4 }}>
                <img src={asset("/images/services/commercial-electrical.webp")} alt="Commercial electrical installation" />
                <figcaption><span>COMMERCIAL</span><b>Ready for growth</b></figcaption>
              </div>
              <figure className="scene-panel scene-data" style={{ opacity: Math.max(0, (heroProgress - 0.45) * 1.9) }}>
                <img src={asset("/images/hero/datacenter.webp")} alt="Structured data center power infrastructure" />
                <figcaption><span>DATA INFRASTRUCTURE</span><b>Structured capability</b></figcaption>
              </figure>
              <div className="energy-line"><i /><i /><i /></div>
              <div className="technical-corners"><i /><i /><i /><i /></div>
            </div>
            <div className="stage-caption">
              <span className={phase === 0 ? "active" : ""}>01 · Residential</span>
              <span className={phase === 1 ? "active" : ""}>02 · Commercial</span>
              <span className={phase === 2 ? "active" : ""}>03 · Infrastructure</span>
            </div>
          </div>

          <a className="bolt-cue" href="#about" aria-label="Continue to company overview"><span>ϟ</span><i /></a>
        </div>
      </section>

      <section className="manifesto-section" id="about" data-sound-section>
        <div className="company-landmark" aria-hidden="true"><img src={asset("/images/company/bintulu-landmark.webp")} alt="" /><span /></div>
        <div className="manifesto-index">01 — COMPANY</div>
        <div className="manifesto-copy reveal">
          <p>Local response. Engineering discipline.</p>
          <h2>Built in Bintulu for the work that keeps everyday spaces running.</h2>
        </div>
        <div className="founder-card reveal">
          <div className="founder-mark">C</div>
          <div><span>FOUNDER</span><h3>Chua</h3><p>Voltura was established in 2026 to bring clear communication, practical workmanship and coordinated electrical-mechanical support to local clients.</p></div>
        </div>
        <div className="mission-grid reveal">
          <article><span>MISSION</span><p>Deliver reliable, practical engineering work with safety, clarity and responsive local service.</p></article>
          <article><span>VISION</span><p>Grow from trusted local support into a capable engineering partner for Bintulu’s evolving homes and businesses.</p></article>
        </div>
      </section>

      <section className="services-section" id="services" data-sound-section>
        <SectionHeading eyebrow="02 — CAPABILITIES" title="One team. Two disciplines." copy="Twenty clearly defined service scopes, each presented with purpose-built engineering imagery." />
        <div className="service-tabs" role="tablist" aria-label="Service category">
          <button role="tab" aria-selected={activeServices === "electrical"} className={activeServices === "electrical" ? "active" : ""} onClick={() => { setActiveServices("electrical"); playTone(260); }}><span>01</span>Electrical<b>{electricalServices.length}</b></button>
          <button role="tab" aria-selected={activeServices === "mechanical"} className={activeServices === "mechanical" ? "active" : ""} onClick={() => { setActiveServices("mechanical"); playTone(300); }}><span>02</span>Mechanical<b>{mechanicalServices.length}</b></button>
        </div>
        <div className="service-grid" role="tabpanel">
          {(activeServices === "electrical" ? electricalServices : mechanicalServices).map((service, index) => (
            <article className="service-card reveal" key={service.title}>
              <div className="service-image"><img src={asset(service.image)} alt={service.title} loading="lazy" /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="service-card-body">
                <h3>{service.title}</h3><p>{service.description}</p>
                <div className="service-benefits">{service.benefits.map(item => <span key={item}>{item}</span>)}</div>
                <a href="#quote" onClick={() => playTone(310)}>Discuss this service <b className="thunder-arrow">ϟ</b></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="industries-section" id="industries" data-sound-section>
        <SectionHeading eyebrow="03 — SECTORS" title="Where we work." copy="Support shaped around the operating realities of homes, small businesses and growing industrial spaces." />
        <div className="industry-grid">
          {industries.map((industry, index) => <article key={industry} className="industry-card reveal"><span>{String(index + 1).padStart(2, "0")}</span><IndustrySymbol industry={industry} /><h3>{industry}</h3><p>Electrical + mechanical support</p></article>)}
        </div>
      </section>

      <section className="why-section" id="why" data-sound-section>
        <div className="why-visual reveal">
          <img src={asset("/images/services/facility-maintenance.webp")} alt="Coordinated facility maintenance systems" loading="lazy" />
          <div className="why-overlay"><span>BINTULU BASED</span><b>Responsive by design.</b></div>
        </div>
        <div className="why-content">
          <SectionHeading eyebrow="04 — WHY VOLTURA" title="Practical answers, clearly delivered." />
          <div className="why-list">
            {[
              ["Local Bintulu service", "Faster coordination and a practical understanding of local client needs."],
              ["Two disciplines, one team", "Electrical and mechanical support coordinated through one point of contact."],
              ["Workmanship you can inspect", "Clean routing, maintainable layouts and clear communication around the scope."],
              ["Maintenance-minded thinking", "Installations planned with access, future checks and everyday operation in mind."],
            ].map(([title, copy], index) => <article className="reveal" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects" data-sound-section>
        <div className="projects-header">
          <SectionHeading eyebrow="05 — PROJECT SCOPES" title="Work, made visible." copy="Representative scopes showing how Voltura can approach residential, commercial and facility work." />
          <div className="project-filters" aria-label="Filter project scopes">
            {(["All", "Electrical", "Mechanical"] as const).map(filter => <button key={filter} className={projectFilter === filter ? "active" : ""} onClick={() => { setProjectFilter(filter); playTone(250); }}>{filter}</button>)}
          </div>
        </div>
        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <button className="project-card reveal" key={project.title} type="button" onClick={() => { setSelectedProject(project); playTone(320); }}>
              <img src={asset(project.image)} alt="" loading="lazy" />
              <span className="project-number">P{String(index + 1).padStart(2, "0")}</span>
              <div className="project-info"><p>{project.category} · Bintulu</p><h3>{project.title}</h3><span>{project.scope}</span></div>
              <b className="thunder-arrow">ϟ</b>
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="gallery" data-sound-section>
        <SectionHeading eyebrow="06 — ENGINEERING GALLERY" title="Details that tell the story." copy="Generated visual studies of the equipment, routing and maintenance environments behind Voltura’s services." />
        <div className="gallery-grid reveal">
          {[
            ["/images/services/distribution-board.webp", "Protected distribution"],
            ["/images/services/piping.webp", "Ordered piping"],
            ["/images/services/lighting-upgrades.webp", "Efficient lighting"],
            ["/images/services/welding-repair.webp", "Controlled fabrication"],
            ["/images/services/earthing-grounding.webp", "Measured grounding"],
          ].map(([image, label], index) => <figure key={label} className={`gallery-item gallery-${index + 1}`}><img src={asset(image)} alt={label} loading="lazy" /><figcaption>{label}<span className="thunder-arrow">ϟ</span></figcaption></figure>)}
        </div>
      </section>

      <section className="quote-section" id="quote" data-sound-section>
        <div className="quote-intro">
          <p className="section-eyebrow"><span />07 — START A CONVERSATION</p>
          <h2>Tell us what needs to work better.</h2>
          <p>Share the site type, service and timing. Voltura can turn it into a clear conversation about scope and next steps.</p>
          <div className="quote-steps"><span><b>01</b>Describe the work</span><span><b>02</b>Arrange a site discussion</span><span><b>03</b>Receive a practical scope</span></div>
        </div>
        <form className="quote-form" onSubmit={submitQuote}>
          <div className="field-row"><label>Name<input name="name" required placeholder="Your name" /></label><label>Phone or email<input name="contact" required placeholder="Best way to reach you" /></label></div>
          <div className="field-row"><label>Service<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Electrical installation</option><option>Electrical maintenance</option><option>Mechanical installation</option><option>Mechanical maintenance</option><option>Not sure yet</option></select></label><label>Site type<select name="site" defaultValue=""><option value="" disabled>Select site type</option>{industries.map(item => <option key={item}>{item}</option>)}</select></label></div>
          <label>Project details<textarea name="details" required rows={5} placeholder="Location, issue, preferred timing and any useful details" /></label>
          <button className="submit-button" type="submit">Prepare quotation request <span className="thunder-arrow">ϟ</span></button>
          {formStatus && <p className="form-status" role="status">{formStatus}</p>}
        </form>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-map"><iframe title="Voltura service area in Bintulu, Sarawak" loading="lazy" src="https://www.google.com/maps?q=Bintulu%2C%20Sarawak&output=embed" /></div>
        <div className="contact-details">
          <VolturaLogo />
          <p>Electrical and mechanical support for Bintulu and surrounding areas.</p>
          <div className="contact-lines"><span><small>BASE</small>Bintulu, Sarawak, Malaysia</span><span><small>HOURS</small>Project scheduling by enquiry</span><span><small>CONTACT</small>Phone, WhatsApp and email to be confirmed</span></div>
          <a href="#quote" className="button primary">Request a quotation <span className="thunder-arrow">ϟ</span></a>
        </div>
      </section>

      <footer>
        <a href="#home" aria-label="Voltura Power and Engineering home"><VolturaLogo compact /></a>
        <p>Powering reliable engineering solutions.</p>
        <div className="footer-nav"><a href="#services">Services</a><a href="#projects">Projects</a><a href="#about">Company</a><a href="#contact">Contact</a></div>
        <small>© 2026 Voltura Power &amp; Engineering. Bintulu, Sarawak.</small>
        <div className="build-credit">
          <b>CREATED BY MEJALISM CORP.</b>
          <span>MADE IN SARAWAK</span>
          <span>WEBSITE V1.6</span>
        </div>
      </footer>

      <a className="scroll-bolt" href="#home" aria-label="Back to top" style={{ "--scroll": scrollProgress } as CSSProperties}><span>ϟ</span><i /></a>

      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={selectedProject.title} onClick={() => setSelectedProject(null)}>
          <article onClick={event => event.stopPropagation()}>
            <button type="button" aria-label="Close project details" onClick={() => setSelectedProject(null)}>×</button>
            <img src={asset(selectedProject.image)} alt={selectedProject.title} />
            <p>{selectedProject.category} · Bintulu, Sarawak</p><h2>{selectedProject.title}</h2><span>{selectedProject.scope}</span><small>{selectedProject.note}. Final scope depends on site assessment.</small>
            <a href="#quote" onClick={() => setSelectedProject(null)}>Discuss a similar project <b className="thunder-arrow">ϟ</b></a>
          </article>
        </div>
      )}
    </main>
  );
}
