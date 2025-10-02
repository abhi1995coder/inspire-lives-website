import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Clean Coming Soon page for Inspire Lives Foundation (India)
 * With logo image and banner image support
 */

// ---------------- IMAGE CONFIGURATION ----------------
// Replace these with your actual image URLs
const LOGO_IMAGE = "/images/logo.png"; // or "https://yourdomain.com/images/logo.png"
const BANNER_IMAGE = "/images/banner1.jpg"; // or "https://yourdomain.com/images/banner.jpg"

// Fallback in case images don't load
const FALLBACK_LOGO = (
  <div className="rounded-3 bg-dark text-white fw-bold d-flex align-items-center justify-content-center"
       style={{ width: 50, height: 50 }}>
    IL
  </div>
);

// ---------------- CONTENT ----------------
const NGO_NAME = "Inspire Lives Foundation";
const TAGLINE = "Inspiring Together, Growing Together";
const SHORT_BLURB = "At Inspire Lives Foundation, we believe that true progress comes when communities grow together with compassion, equality, and dignity. Established with the vision of empowering lives, our foundation is committed to building a better India through sustainable initiatives in education, healthcare, women empowerment, environment, and youth development.";

const LAUNCH_DATE = new Date("2025-12-01T10:00:00+05:30");
const CONTACT_EMAIL = "contact@inspirelives.org";
const CONTACT_PHONE = "+91-90000-00000";
const CONTACT_CITY = "India";

const SOCIAL = {
  instagram: "",
  facebook: "",
  twitter: "",
  linkedin: "",
};

// ---------------- COMPONENTS ----------------
function Logo({ src, alt = "Logo", fallback = FALLBACK_LOGO }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return fallback;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="img-fluid"
      style={{
        height: '50px',
        width: 'auto',
        maxWidth: '150px'
      }}
      onError={() => setError(true)}
    />
  );
}

function BannerImage({ src, alt = "Banner" }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="bg-light border rounded text-center py-5">
        <i className="bi bi-image text-muted fs-1 d-block mb-2"></i>
        <p className="text-muted">Banner Image</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="img-fluid w-100 rounded shadow-sm"
      style={{
        maxHeight: '400px',
        objectFit: 'contain'
      }}
      onError={() => setError(true)}
    />
  );
}

function useCountdown(target) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [target]);

  return useMemo(() => {
    if (!target) return null;
    const diff = Math.max(0, target.getTime() - now.getTime());
    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / (3600 * 24));
    const hours = Math.floor((sec % (3600 * 24)) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return { days, hours, minutes, seconds, reached: diff === 0 };
  }, [now, target]);
}

function CountdownTimer({ countdown }) {
  if (!countdown) return null;

  return (
    <div className="my-4" aria-live="polite">
      <h3 className="h5 mb-3 text-center text-muted">We're launching in:</h3>
      <div className="d-flex gap-2 flex-wrap justify-content-center">
        {[
          { k: "Days", v: countdown.days },
          { k: "Hours", v: countdown.hours },
          { k: "Minutes", v: countdown.minutes },
          { k: "Seconds", v: countdown.seconds },
        ].map((it) => (
          <div
            key={it.k}
            className="card border border-2"
            style={{ minWidth: 100 }}
          >
            <div className="card-body py-2 text-center">
              <div className="fs-3 fw-bold text-dark">{String(it.v).padStart(2, "0")}</div>
              <div className="small text-muted">{it.k}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubscriptionForm({ onSubmit }) {
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();
    if (!email) return;
    onSubmit(email);
    emailRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4" role="form">
      <div className="row g-2 justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="input-group input-group-lg">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-envelope text-dark"/>
            </span>
            <input
              type="email"
              ref={emailRef}
              required
              className="form-control border-start-0"
              placeholder="Enter your email to get updates"
              aria-label="Email for updates"
            />
            <button
              className="btn btn-dark fw-semibold px-4 text-white"
              type="submit"
            >
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

// ---------------- MAIN COMPONENT ----------------
export default function NGOComingSoon() {
  const countdown = useCountdown(LAUNCH_DATE);
  const [subscriptionCount, setSubscriptionCount] = useState(1247);

  useEffect(() => {
    document.title = `${NGO_NAME} — Coming Soon`;
  }, []);

  const handleSubscribe = (email) => {
    console.log('Subscribed:', email);
    setSubscriptionCount(prev => prev + 1);
    alert(`Thank you! We'll keep you posted at ${email}. You're subscriber #${subscriptionCount + 1}`);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-white text-dark">
      {/* Header */}
      <header className="container py-4 border-bottom">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <Logo src={LOGO_IMAGE} alt={`${NGO_NAME} Logo`} />
            <div>
              <div className="fw-bold fs-4 text-dark">{NGO_NAME}</div>
              <div className="text-muted small">India • Non-Profit Organization</div>
            </div>
          </div>
          <span className="badge rounded-pill bg-dark text-white">
            Coming Soon
          </span>
        </div>
      </header>

      {/* Hero Section with Banner */}
      <main className="container flex-grow-1 py-5">
        <section className="mb-5">
          <div className="row align-items-center gy-4">
            {/* Banner Image */}
            <div className="col-lg-6">
              <BannerImage src={BANNER_IMAGE} alt="Inspire Lives Foundation - Community Service" />
            </div>

            {/* Content */}
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-4 text-dark">
                {TAGLINE}
              </h1>
              <p className="lead text-dark mb-4">
                {SHORT_BLURB}
              </p>

              <CountdownTimer countdown={countdown} />

              <SubscriptionForm onSubmit={handleSubscribe} />

              <div className="mt-3 text-muted small">
                <i className="bi bi-people-fill me-2"></i>
                Join {subscriptionCount.toLocaleString()}+ supporters waiting for our launch
              </div>

              {/* Quick Contact */}
              <div className="mt-4 pt-3 border-top">
                <div className="d-flex flex-wrap gap-4 text-muted small">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-envelope"></i>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted text-decoration-none">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-telephone"></i>
                    <a href={`tel:${CONTACT_PHONE}`} className="text-muted text-decoration-none">
                      {CONTACT_PHONE}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of your sections remain the same */}
        <section className="mb-5">
          <h2 className="h2 fw-bold text-center mb-5 text-dark">Our Focus Areas</h2>
          <div className="row g-4">
            {[
              { title: "Education", desc: "Access, e‑learning, skill‑building and life skills.", icon: "📚" },
              { title: "Healthcare", desc: "Awareness, camps and community health support.", icon: "🏥" },
              { title: "Women Empowerment", desc: "Skill training, leadership and self‑reliance.", icon: "💪" },
              { title: "Environment", desc: "Sustainability, clean drives and climate action.", icon: "🌱" },
              { title: "Youth Development", desc: "Mentoring, leadership and changemaker programs.", icon: "🌟" },
              { title: "Soft Skills", desc: "Communication, collaboration, critical thinking.", icon: "💼" },
            ].map((pillar, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card h-100 border">
                  <div className="card-body text-center p-4">
                    <div className="fs-1 mb-3" aria-hidden="true">{pillar.icon}</div>
                    <h3 className="h5 fw-bold mb-3 text-dark">{pillar.title}</h3>
                    <p className="text-muted mb-0">{pillar.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Add other sections here... */}
      </main>

      {/* Footer */}
      <footer className="container py-4 mt-5 border-top">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
              <Logo
                src={LOGO_IMAGE}
                alt={`${NGO_NAME} Logo`}
                fallback={
                  <div className="rounded-3 bg-dark text-white fw-bold d-flex align-items-center justify-content-center"
                       style={{ width: 32, height: 32, fontSize: '0.8rem' }}>
                    IL
                  </div>
                }
              />
              <div className="fw-semibold text-dark">{NGO_NAME}</div>
            </div>
            <div className="small text-muted">
              © {new Date().getFullYear()} {NGO_NAME}. All rights reserved.
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="small text-muted">
              Built with care in India. This Coming Soon page is a placeholder while we prepare the full website.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}