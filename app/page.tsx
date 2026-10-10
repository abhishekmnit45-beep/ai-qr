"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  QrCode,
  Star,
  Check,
  ScanLine,
  MessageCircle,
  Users,
  BarChart3,
  Menu,
  X,
  RotateCcw,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const experiences = [
  {
    name: "Cafés & restaurants",
    business: "The Daily Grind",
    detail: "A little feedback with your daily coffee.",
    icon: "☕",
  },
  {
    name: "Salons & studios",
    business: "Studio Bloom",
    detail: "A fresh look. A few honest words.",
    icon: "✂",
  },
  {
    name: "Shops & services",
    business: "Corner & Co.",
    detail: "Good service deserves a conversation.",
    icon: "✦",
  },
];
const features = [
  {
    icon: QrCode,
    label: "One code. Every touchpoint.",
    text: "Download your business QR code for your counter, packaging, receipts, or anywhere customers meet you.",
  },
  {
    icon: MessageCircle,
    label: "Make feedback feel easy.",
    text: "Let customers rate their visit, personalize a suggested review, or send a private message.",
  },
  {
    icon: BarChart3,
    label: "See the whole journey.",
    text: "Follow scans, ratings, and review activity in your business analytics dashboard.",
  },
  {
    icon: Users,
    label: "Remember the people.",
    text: "Keep customer details and review history together, and give your team access to your workspace.",
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [experience, setExperience] = useState(0);
  const [rating, setRating] = useState(0);
  const [step, setStep] = useState<"rating" | "review" | "done">("rating");
  const [draft, setDraft] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const selected = experiences[experience];
  useEffect(() => {
    root.current?.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    root.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  function reset(index = experience) {
    setExperience(index);
    setRating(0);
    setStep("rating");
    setDraft("");
  }
  function continueDemo() {
    setDraft(
      `I visited ${selected.business} and rated my experience ${rating} out of 5. `,
    );
    setStep("review");
  }
  return (
    <div ref={root} className="landing">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="brand">
          <span className="brand-icon">
            <QrCode size={22} />
          </span>
          aiqr<span className="brand-dot">.</span>
        </Link>
        <nav
          className={menuOpen ? "site-nav open" : "site-nav"}
          aria-label="Main navigation"
        >
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How it works
          </a>
          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>
          <a href="#demo" onClick={() => setMenuOpen(false)}>
            Try it out
          </a>
        </nav>
        <div className="header-actions">
          <Link href="/login" className="login-link">
            Log in
          </Link>
          <Link href="/signup" className="button button-small">
            Get started <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> SMALL CODE. BIG CONVERSATIONS.
            </div>
            <h1>
              Good experiences
              <br />
              deserve{" "}
              <span className="serif-accent">
                great
                <br />
                stories.
              </span>
              <span className="hero-spark">✳</span>
            </h1>
            <p>
              Turn a quick scan into meaningful customer feedback. One simple QR
              code to collect reviews, listen better, and stay connected.
            </p>
            <div className="hero-actions">
              <Link href="/signup" className="button">
                Create your QR experience <ArrowUpRight size={19} />
              </Link>
              <a href="#demo" className="text-button">
                Explore the demo <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-note">
              <Check size={15} /> Your business. Your QR code. Your customer
              insights.
            </div>
          </div>
          <div
            className="hero-visual"
            aria-label="Illustrative QR review experience"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="qr-display">
              <div className="display-top">
                <span className="mini-brand">aiqr.</span>
                <span>MADE FOR REAL CONNECTIONS</span>
              </div>
              <div className="qr-paper">
                <span className="paper-icon">✳</span>
                <h2>Enjoyed your visit?</h2>
                <p>We’d love to hear about it.</p>
                <QRCodeSVG
                  value="https://example.com/aiqr-demo"
                  size={172}
                  fgColor="#203e32"
                  bgColor="#fafaf3"
                  marginSize={2}
                />
                <span className="scan-caption">
                  <ScanLine size={16} /> SCAN. SHARE. MAKE OUR DAY.
                </span>
              </div>
              <div className="display-bottom">
                A little scan goes a long way. <ArrowUpRight size={18} />
              </div>
            </div>
            <div className="floating-note note-review">
              <span className="note-icon">
                <MessageCircle size={18} />
              </span>
              <div>
                <strong>A conversation starts here</strong>
                <span>Every customer has a story.</span>
              </div>
            </div>
            <div className="floating-note note-stars">
              <span className="stars">★★★★★</span>
              <span>Small moments. Lasting impressions.</span>
            </div>
            <span className="visual-label">
              YOUR COUNTER’S NEW CONVERSATION STARTER ↗
            </span>
          </div>
        </section>
        <div className="audience-strip">
          <span>AT HOME IN YOUR NEIGHBORHOOD</span>
          <div>
            Independent cafés <span>✳</span> Local shops <span>✳</span> Beauty
            studios <span>✳</span> Everyday services
          </div>
        </div>
        <section
          id="how-it-works"
          className="section-wrap steps-section reveal"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">LESS FRICTION. MORE CONNECTION.</div>
              <h2>
                From “thank you”
                <br />
                to <span className="serif-accent">tell us more.</span>
              </h2>
            </div>
            <p>
              No apps for your customers to install.
              <br />
              Just a scan, a moment, and their own words.
            </p>
          </div>
          <div className="steps-grid">
            {[
              {
                title: "Make it yours",
                text: "Create your business account, add your review link, and download your unique QR code.",
              },
              {
                title: "Put it out there",
                text: "Place it where the experience happens. Customers scan and rate their visit on their phone.",
              },
              {
                title: "Keep the conversation going",
                text: "Customers can edit a review suggestion or share private feedback. You see the activity in your dashboard.",
              },
            ].map((item, i) => (
              <article className="step-card" key={item.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ArrowUpRight size={24} />
              </article>
            ))}
          </div>
        </section>
        <section id="demo" className="demo-section">
          <div className="section-wrap demo-grid">
            <div className="demo-copy reveal">
              <div className="eyebrow">TAKE IT FOR A LITTLE SPIN</div>
              <h2>
                A customer’s shoes.
                <br />
                <span className="serif-accent">Try them on.</span>
              </h2>
              <p>
                Explore a sample review experience. Pick a business, choose a
                rating, and make the words your own.
              </p>
              <div
                className="experience-tabs"
                role="group"
                aria-label="Demo business type"
              >
                {experiences.map((item, i) => (
                  <button
                    key={item.name}
                    aria-pressed={experience === i}
                    onClick={() => reset(i)}
                    className={experience === i ? "selected" : ""}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                    <ArrowUpRight size={16} />
                  </button>
                ))}
              </div>
              <p className="demo-disclaimer">
                Illustrative demo. Nothing is submitted or posted.
              </p>
            </div>
            <div className="demo-phone reveal">
              <div className="phone-top">
                <span>9:41</span>
                <span>● ● ●</span>
              </div>
              <div className="phone-content" key={`${experience}-${step}`}>
                <span className="demo-business-icon">{selected.icon}</span>
                <span className="demo-business-name">{selected.business}</span>
                {step === "rating" ? (
                  <>
                    <h3>How was your visit?</h3>
                    <p>{selected.detail}</p>
                    <div
                      className="rating-stars"
                      role="group"
                      aria-label="Choose your rating"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          aria-label={`${n} ${n === 1 ? "star" : "stars"}`}
                          aria-pressed={rating === n}
                          onClick={() => setRating(n)}
                        >
                          <Star fill={n <= rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                    <span className="rating-caption" aria-live="polite">
                      {rating
                        ? [
                            "",
                            "Room to improve",
                            "Could be better",
                            "It was okay",
                            "A lovely visit",
                            "Made my day!",
                          ][rating]
                        : "Tap a star to get started"}
                    </span>
                    <button
                      className="button"
                      disabled={!rating}
                      onClick={continueDemo}
                    >
                      Continue <ArrowRight size={17} />
                    </button>
                    <span className="phone-footnote">
                      Your honest feedback makes a difference.
                    </span>
                  </>
                ) : step === "review" ? (
                  <>
                    <h3>Your story, your words.</h3>
                    <p>
                      Edit this starting point to reflect your actual visit.
                    </p>
                    <label className="sr-only" htmlFor="demo-review">
                      Your review
                    </label>
                    <textarea
                      id="demo-review"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      rows={5}
                    />
                    <button
                      className="button"
                      disabled={!draft.trim()}
                      onClick={() => setStep("done")}
                    >
                      Preview complete <Check size={17} />
                    </button>
                    <button
                      className="demo-back"
                      onClick={() => setStep("rating")}
                    >
                      Back to rating
                    </button>
                  </>
                ) : (
                  <>
                    <div className="demo-success">
                      <Check size={30} />
                    </div>
                    <h3>That’s the experience.</h3>
                    <p>
                      In your live flow, customers can choose to share a public
                      review or send you private feedback.
                    </p>
                    <Link href="/signup" className="button">
                      Create yours <ArrowUpRight size={17} />
                    </Link>
                    <button onClick={() => reset()} className="demo-back">
                      <RotateCcw size={14} /> Try again
                    </button>
                  </>
                )}
              </div>
              <div className="phone-home" />
            </div>
          </div>
        </section>
        <section id="features" className="section-wrap features-section reveal">
          <div className="section-heading">
            <div>
              <div className="eyebrow">BEHIND EVERY SCAN</div>
              <h2>
                A little more insight.
                <br />
                <span className="serif-accent">A lot more possibility.</span>
              </h2>
            </div>
            <Link href="/signup" className="text-button">
              Meet your workspace <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="features-grid">
            {features.map(({ icon: Icon, label, text }) => (
              <article key={label}>
                <span className="feature-icon">
                  <Icon size={24} />
                </span>
                <h3>{label}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="honesty-note">
            <span>✳</span>
            <div>
              <h3>Real experiences. Honest words.</h3>
              <p>
                Review suggestions use personalized templates. Customers should
                edit them to describe their own visit. Choose Always Open to
                offer public reviews and private feedback at every rating.
              </p>
            </div>
          </div>
        </section>
        <section className="faq-section section-wrap reveal">
          <div>
            <div className="eyebrow">A FEW GOOD QUESTIONS</div>
            <h2>
              Glad you <span className="serif-accent">asked.</span>
            </h2>
          </div>
          <div className="faq-list">
            {[
              {
                q: "Do customers need an account?",
                a: "No. Customers can open your business review experience by scanning the QR code in their phone’s camera. Your business dashboard requires an account.",
              },
              {
                q: "Does aiqr post reviews automatically?",
                a: "No. Customers stay in control. They can edit a suggested draft and choose to open your public review link, or send private feedback.",
              },
              {
                q: "Can I customize my business experience?",
                a: "Yes. Set your business name, location, review link, and feedback mode. You can also choose your QR color and export PNG or SVG from the dashboard.",
              },
              {
                q: "Can my team use it too?",
                a: "Yes. Business owners can add staff accounts from the Team page. Each business has its own customer records, feedback, and analytics.",
              },
            ].map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span>+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="closing-section reveal">
          <span className="closing-flower">✳</span>
          <div className="eyebrow">YOUR NEXT CONVERSATION STARTS HERE</div>
          <h2>
            Make room for
            <br />
            <span className="serif-accent">good feedback.</span>
          </h2>
          <Link href="/signup" className="button">
            Let’s create your QR code <ArrowUpRight size={19} />
          </Link>
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <Link href="/" className="brand">
          aiqr<span className="brand-dot">.</span>
        </Link>
        <p>Small code. Human connections.</p>
        <div>
          <Link href="/login">Log in</Link>
          <a href="#how-it-works">How it works</a>
          <a href="#demo">Explore demo</a>
        </div>
        <span>© {new Date().getFullYear()} AI QR System</span>
      </footer>
    </div>
  );
}
