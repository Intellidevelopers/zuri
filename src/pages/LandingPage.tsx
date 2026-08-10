import { useState, useEffect, useRef, type ReactNode } from 'react'
import { Users, Zap, Gift, MessageSquare, ChevronDown } from 'lucide-react'
import ZuriLogo from '../components/ZuriLogo'
import Footer from '../components/Footer'

// Asset paths (files live in /public, copied verbatim to dist/ —
// avoids Vite 8's Rolldown-native bundler which can't resolve PNG imports)
const heroMockup = '/hero-mockup.png'
const smartBookings = '/smart-bookings.png'
const professionalProfile = '/profesiional-profile.png'
const securePayments = '/secure-payments.png'
const promotions = '/promotions.png'
const joinWaitlistImg = '/join-waitlist.png'
const getEarlyAccessImg = '/get-early-access.png'
const growYourBusinessImg = '/grow-your-business.png'
const footerLogo = '/footer.png'

interface LandingPageProps {
  onJoinWaitlist: () => void
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
type RevealDir = 'up' | 'left' | 'right'

function useReveal(dir: RevealDir = 'up') {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.dataset.revealDir = dir
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [dir])
  return ref
}

function Reveal({
  children,
  delay = 0,
  dir = 'up',
  style = {},
}: {
  children: ReactNode
  delay?: number
  dir?: RevealDir
  style?: React.CSSProperties
}) {
  const ref = useReveal(dir)
  return (
    <div
      ref={ref}
      className={`reveal${delay ? ` reveal-delay-${delay}` : ''}`}
      data-reveal-dir={dir}
      style={style}
    >
      {children}
    </div>
  )
}

// ── Navigation — slides in only after scrolling past hero ────────────────────
function Nav({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: 'rgba(8,42,30,0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: 2100,
          margin: '0 auto',
          padding: '0 40px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <ZuriLogo variant="light" size="md" />

        <button
          onClick={onJoinWaitlist}
          className="nav-cta-btn"
          style={{
            background: '#fff',
            color: '#0B4F3C',
            border: 'none',
            borderRadius: 999,
            padding: '10px 24px',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            cursor: 'pointer',
            transition: 'box-shadow 0.2s, transform 0.15s',
            letterSpacing: '0.05em',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)'
            e.currentTarget.style.transform = ''
          }}
        >
          JOIN WAITLIST
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nav-inner { height: 58px !important; padding: 0 18px !important; }
          .nav-cta-btn { padding: 7px 14px !important; font-size: 11px !important; letter-spacing: 0.03em !important; }
        }
      `}</style>
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [email, setEmail] = useState('')

  return (
    <div style={{ background: '#fff' }}>
      {/* Full-width hero card — 2100px max, centered layout */}
      <div
        style={{
          maxWidth: 2200,
          margin: '0 auto',
          padding: '0 24px 0',
        }}
        className="hero-outer"
      >
        <div
          style={{
            /*
             * Background: deep green base + radial spotlight in the center
             * creating the glowing teal effect from the reference.
             */
            background: `
              radial-gradient(ellipse 70% 60% at 50% 38%, #2E9E72 0%, #1B7A58 25%, transparent 70%),
              radial-gradient(ellipse 100% 100% at 50% 0%, #1a6b50 0%, #0D5540 40%, #083A2A 100%)
            `,
            borderRadius: 40,
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            minHeight: 'clamp(680px, 90vh, 1000px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 20
          }}
          className="hero-card"
        >
          {/* ── In-hero top nav bar: logo left, JOIN WAITLIST right ── */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              padding: '28px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            className="hero-nav-bar"
          >
            <ZuriLogo variant="light" size="md" />
            <button
              onClick={onJoinWaitlist}
              className="hero-topbar-btn"
              style={{
                background: '#fff',
                color: '#0B4F3C',
                border: 'none',
                borderRadius: 999,
                padding: '10px 24px',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                letterSpacing: '0.05em',
                boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                transition: 'box-shadow 0.2s, transform 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.28)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.18)'
                e.currentTarget.style.transform = ''
              }}
            >
              JOIN WAITLIST
            </button>
          </div>

          {/* Subtle glow orbs */}
          <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 40, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

          {/* ── Centered content block ── */}
          <div
            className="hero-content"
            style={{
              textAlign: 'center',
              padding: 'clamp(96px, 12vh, 140px) 24px 0',
              width: '100%',
              maxWidth: 860,
              zIndex: 1,
            }}
          >
            {/* Glass "COMING SOON" badge */}
            <div
              className="hero-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.10)',
                border: '1.5px solid rgba(255,255,255,0.22)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 999,
                padding: '6px 20px',
                marginBottom: 28,
                boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
                marginTop: 40
              }}
            >
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                Coming Soon
              </span>
            </div>

            {/* Headline */}
            <h1
              className="hero-headline"
              style={{
                fontSize: 'clamp(30px, 5.5vw, 68px)',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.15,
                margin: '0 0 22px',
              }}
            >
              Find more clients, grow your Beauty business with Zuri.
            </h1>

            {/* Subtitle */}
            <p
              className="hero-subtitle"
              style={{
                fontSize: 'clamp(13.5px, 1.5vw, 17px)',
                color: 'rgba(255,255,255,0.60)',
                lineHeight: 1.7,
                margin: '0 auto 40px',
                maxWidth: 540,
              }}
            >
              Join Nigeria&apos;s upcoming beauty marketplace where customer discover
              and book trusted professionals near them for salon visits or home services.
            </p>

            {/* Glass email pill CTA */}
            {/* <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.13)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 999,
                padding: '6px 6px 6px 24px',
                maxWidth: 520,
                margin: '0 auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
              className="hero-pill"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: 15,
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                  minWidth: 0,
                }}
                onFocus={(e) => (e.currentTarget.style.caretColor = '#fff')}
              />
              <button
                onClick={onJoinWaitlist}
                className="hero-pill-btn"
                style={{
                  background: '#fff',
                  color: '#0B4F3C',
                  border: 'none',
                  borderRadius: 999,
                  padding: '13px 26px',
                  fontSize: 13.5,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s, box-shadow 0.2s',
                  flexShrink: 0,
                  letterSpacing: '0.05em',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f0f0f0'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
                }}
              >
                JOIN WAITLIST
              </button>
            </div> */}
          </div>

          {/* Phone mockup — centered, cropped at card bottom, faded out at bottom */}
          <div
            className="hero-mockup-wrap"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginTop: 'clamp(36px, 5vh, 64px)',
              flex: 1,
              position: 'relative',
            }}
          >
            <img
              src={heroMockup}
              alt="Zuri app mockup"
              className="hero-mockup-img"
              style={{
                width: 'clamp(260px, 38vw, 560px)',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
                objectPosition: 'bottom',
                filter: 'drop-shadow(0 -8px 40px rgba(0,0,0,0.25)) drop-shadow(0 32px 60px rgba(0,0,0,0.38))',
                position: 'relative',
                zIndex: 1,
              }}
            />
            {/* Gradient fade overlay — blends mockup bottom into card bg */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '52%',
                background: 'linear-gradient(to top, #083A2A 0%, rgba(8,58,42,0.85) 30%, rgba(8,58,42,0.4) 60%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none',
                borderRadius: '0 0 28px 28px',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-outer { padding: 0 14px !important; }
          /* Use fixed pixel height instead of 86vh — mobile browsers change the
             vh value when the address bar collapses, which causes the hero to
             resize on scroll and shift everything below (including reveal
             animations that were mid-flight). 760px comfortably fits the
             hero content + mockup on all standard mobile screen sizes. */
          .hero-card { min-height: 760px !important; border-radius: 30px !important; }
          .hero-nav-bar { padding: 18px 18px !important; }
          .hero-topbar-btn { padding: 7px 14px !important; font-size: 11px !important; letter-spacing: 0.03em !important; }
          .hero-content { padding: 84px 18px 0 !important; }
          .hero-badge { padding: 5px 16px !important; margin-bottom: 20px !important; }
          .hero-headline { margin-bottom: 14px !important; }
          .hero-subtitle { margin-bottom: 28px !important; }
          .hero-mockup-wrap { margin-top: 28px !important; }
          .hero-mockup-img { width: clamp(200px, 58vw, 320px) !important; }
          .hero-pill {
            flex-direction: column !important;
            border-radius: 18px !important;
            padding: 14px !important;
            gap: 10px;
            align-items: stretch !important;
          }
          .hero-pill input { text-align: center; font-size: 14px !important; padding: 6px 0; }
          .hero-pill-btn { border-radius: 12px !important; padding: 12px 20px !important; font-size: 13px !important; width: 100%; }
        }
      `}</style>
    </div>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────
const features = [
  {
    title: 'Smart Bookings',
    desc: 'Clients book you in minutes. Accept, reschedule, and manage all from your phone.',
    img: smartBookings,
  },
  {
    title: 'Professional Profile',
    desc: 'Build trust before the first appointment. Showcase your work and services.',
    img: professionalProfile,
  },
  {
    title: 'Secure Payments',
    desc: 'Receive payments with confidence. Instant payouts, zero headaches on zuri.ng.',
    img: securePayments,
  },
  {
    title: 'Promotions',
    desc: 'Fill empty appointment slots faster. Create and launch deals in seconds.',
    img: promotions,
  },
]

function FeaturesSection() {
  const revealDirs: Array<'left' | 'right'> = ['left', 'right', 'left', 'right']

  return (
    <section style={{ background: '#fff', padding: '100px 24px' }} className="feat-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal dir="up">
          <div style={{ textAlign: 'center', marginBottom: 60 }} className="feat-heading">
            <h2
              style={{
                fontSize: 'clamp(26px, 4vw, 42px)',
                fontWeight: 800,
                color: '#111',
                margin: '0 0 12px',
                lineHeight: 1.2,
              }}
            >
              Everything you need to grow.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: '#78837F',
                margin: '0 auto',
                maxWidth: 400,
              }}
            >
              One platform built specifically for beauty professionals
            </p>
          </div>
        </Reveal>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
          className="feat-grid"
        >
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 2 + 1) as 1 | 2}
              dir={revealDirs[i]}
            >
              <div
                style={{
                  background: '#F4F6F4',
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'translateY(-4px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    '0 16px 48px rgba(0,0,0,0.10)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = ''
                  ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                }}
              >
                {/* Mockup image — top */}
                <div
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    background: '#f5f5f8ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 220,
                  }}
                  className="feat-img-wrap"
                >
                  <img
                    src={f.img}
                    alt={f.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: 280,
                      objectFit: 'contain',
                      objectPosition: 'top',
                      display: 'block',
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Text — bottom */}
                <div style={{ padding: '22px 26px 26px', backgroundColor: '#f5f5f8ff' }} className="feat-text">
                  <h3
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: '#177456',
                      margin: '0 0 8px',
                      textAlign: 'center',
                    }}
                    className="feat-title"
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      color: '#78837F',
                      lineHeight: 1.65,
                      margin: 0,
                      textAlign: 'center',
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .feat-grid { grid-template-columns: 1fr !important; }
          .feat-section { padding: 64px 18px !important; }
          .feat-heading { margin-bottom: 36px !important; }
          .feat-img-wrap { min-height: 180px !important; }
          .feat-title { font-size: 20px !important; }
          .feat-text { padding: 18px 20px 22px !important; }
        }
      `}</style>
    </section>
  )
}

// ── Steps ─────────────────────────────────────────────────────────────────────
const steps = [
  {
    n: 1,
    title: 'Join Waitlist',
    desc: 'Enter your details and reserve your spot before public launch.',
    img: joinWaitlistImg,
  },
  {
    n: 2,
    title: 'Get Early Access',
    desc: 'Receive your personal invitation before the platform opens to everyone.',
    img: getEarlyAccessImg,
  },
  {
    n: 3,
    title: 'Grow Your Business',
    desc: 'Set up your profile and start accepting bookings from day one.',
    img: growYourBusinessImg,
  },
]

function StepsSection({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  return (
    <section
      style={{ background: '#fff', padding: '100px 24px', borderTop: '1px solid #F0F4F0' }}
      className="steps-section"
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            gap: 80,
            alignItems: 'start',
          }}
          className="steps-grid"
        >
          {/* Left sticky */}
          <Reveal dir="left">
            <div style={{ position: 'sticky', top: 100, width: '100%' }} className="steps-left">
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 800,
                  color: '#111',
                  margin: '0 0 16px',
                  lineHeight: 1.15,
                }}
              >
                Get started in 3 simple steps.
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: '#78837F',
                  lineHeight: 1.7,
                  margin: '0 0 28px',
                }}
              >
                From waitlist to fully booked, we make getting started
                effortless.
              </p>
              <button
                onClick={onJoinWaitlist}
                className="steps-cta-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#0B4F3C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 20,
                  padding: '16px 32px',
                  fontSize: 14,
                  fontWeight: 400,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 0.2s, transform 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#094234'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0B4F3C'
                  e.currentTarget.style.transform = ''
                }}
              >
                JOIN WAITLIST
              </button>
            </div>
          </Reveal>

          {/* Right — timeline */}
          <div style={{ position: 'relative' }} className="steps-timeline">
            {/* Dashed vertical line */}
            <div
              className="steps-line"
              style={{
                position: 'absolute',
                left: -28,
                top: 20,
                bottom: 20,
                width: 0,
                borderLeft: '2px dashed #D4E0DB',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {steps.map((step, i) => (
                <Reveal
                  key={step.n}
                  delay={(i + 1) as 1 | 2 | 3}
                  dir="right"
                >
                  <div style={{ position: 'relative' }}>
                    {/* Step circle */}
                    <div
                      className="steps-circle"
                      style={{
                        position: 'absolute',
                        left: -40,
                        top: 24,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: '#0B4F3C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        boxShadow: '0 0 0 4px #fff',
                      }}
                    >
                      <span
                        style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}
                      >
                        {step.n}
                      </span>
                    </div>

                    {/* Card */}
                    <div
                      className="steps-card"
                      style={{
                        background: '#F4F6F4',
                        borderRadius: 16,
                        overflow: 'hidden',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.transform =
                          'translateY(-3px)'
                        ;(e.currentTarget as HTMLElement).style.boxShadow =
                          '0 12px 36px rgba(0,0,0,0.09)'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.transform = ''
                        ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                      }}
                    >
                      {/* Mockup image */}
                      <div
                        style={{
                          width: '100%',
                          background: '#f5f5f8ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                        className="steps-img-wrap"
                      >
                        <img
                          src={step.img}
                          alt={step.title}
                          style={{
                            width: '100%',
                            maxHeight: 350,
                            objectFit: 'contain',
                            objectPosition: 'top',
                            display: 'block',
                          }}
                          loading="lazy"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '20%',
                            background:
                              'linear-gradient(to top, #f5f5f8ff 0%, rgba(245,245,248,0.75) 40%, transparent 100%)',
                            pointerEvents: 'none',
                          }}
                        />
                      </div>
                      {/* Text — bottom */}
                      <div style={{ padding: '16px 20px 20px', textAlign: 'center', backgroundColor: '#f5f5f8ff' }} className="steps-text">
                        <p
                          style={{
                            fontSize: 24,
                            fontWeight: 600,
                            color: '#177456',
                            margin: '0 0 5px',
                          }}
                          className="steps-title"
                        >
                          {step.title}
                        </p>
                        <p
                          style={{
                            fontSize: 16,
                            color: '#78837F',
                            margin: 0,
                            lineHeight: 1.6,
                          }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-section { padding: 64px 18px !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .steps-left { position: static !important; }
          /* Give the timeline column left breathing room so the
             absolutely-positioned line/circles sit inside the viewport
             instead of overflowing off the left edge. */
          .steps-timeline { padding-left: 34px !important; }
          .steps-line { left: 2px !important; top: 14px !important; bottom: 14px !important; }
          .steps-circle { left: -10px !important; width: 24px !important; height: 24px !important; top: 20px !important; }
          .steps-circle span { font-size: 10px !important; }
          .steps-img-wrap { min-height: 200px !important; }
          .steps-img-wrap img { max-height: 260px !important; }
          .steps-title { font-size: 19px !important; }
          .steps-text { padding: 14px 16px 18px !important; }
        }
        @media (max-width: 900px) {
          .steps-cta-btn { padding: 13px 24px !important; font-size: 12.5px !important; width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  )
}

// ── Benefits ("Why Join Early") ────────────────────────────────────────────────
const benefits = [
  {
    icon: Users,
    title: 'Founding Member',
    desc: 'Be among the first professionals on Zuri and earn your founding member status forever.',
  },
  {
    icon: Zap,
    title: 'Priority Access',
    desc: 'Receive your invitation before the public launch and skip the line entirely.',
  },
  {
    icon: Gift,
    title: 'Launch Rewards',
    desc: 'Exclusive benefits and perks reserved only for our earliest members.',
  },
  {
    icon: MessageSquare,
    title: 'Help Shape Zuri',
    desc: 'Your feedback directly influences the features we build. Your voice matters.',
  },
]

function BenefitsSection() {
  return (
    <section
      style={{
        background:
          'radial-gradient(ellipse 120% 80% at 50% 0%, #1E7A60 0%, #0B4F3C 60%)',
        padding: '100px 24px',
      }}
      className="ben-section"
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal dir="up">
          <div style={{ textAlign: 'center', marginBottom: 56 }} className="ben-heading">
            <h2
              style={{
                fontSize: 'clamp(26px, 4vw, 40px)',
                fontWeight: 800,
                color: '#fff',
                margin: '0 0 14px',
              }}
            >
              Why Join Early
            </h2>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.6)',
                margin: '0 auto',
                maxWidth: 380,
                lineHeight: 1.65,
              }}
            >
              Be among the first beauty professionals shaping the future of Zuri
              Pro.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
          className="ben-grid"
        >
          {benefits.map((b, i) => {
            const dirs: Array<'left' | 'up' | 'right'> = [
              'left',
              'up',
              'up',
              'right',
            ]
            return (
              <Reveal
                key={b.title}
                delay={(i + 1) as 1 | 2 | 3 | 4}
                dir={dirs[i]}
              >
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    padding: '24px 20px',
                    height: '100%',
                    boxSizing: 'border-box',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform =
                      'translateY(-4px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow =
                      '0 16px 48px rgba(0,0,0,0.18)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = ''
                    ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: '#F0F7F4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <b.icon size={22} color="#0B4F3C" strokeWidth={1.7} />
                  </div>

                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#111',
                      margin: '0 0 8px',
                      lineHeight: 1.3,
                    }}
                  >
                    {b.title}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: '#78837F',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .ben-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .ben-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) {
          .ben-section { padding: 60px 18px !important; }
          .ben-heading { margin-bottom: 32px !important; }
        }
      `}</style>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'What is Zuri?',
    a: 'Zuri is a professional beauty marketplace built specifically for Nigerian beauty professionals. It connects skilled beauty pros with clients nearby, making it easy to get discovered, manage bookings, and grow your business.',
  },
  {
    q: 'Is joining free?',
    a: 'Yes, joining the waitlist is completely free. When Zuri launches, early members will also benefit from reduced platform fees and exclusive founding member perks.',
  },
  {
    q: 'When will Zuri launch?',
    a: "We're working hard to launch Zuri as soon as possible. Joining the waitlist ensures you'll be among the first to know and get access the moment we open our doors.",
  },
  {
    q: 'Can I offer home services?',
    a: 'Absolutely. Zuri supports both salon-based and mobile/home service beauty professionals. You can set your service area and whether you offer home visits.',
  },
  {
    q: 'Can I own a salon and still join?',
    a: 'Yes. Zuri is designed for both solo beauty professionals and salon owners. You can manage multiple staff members and service locations from one account.',
  },
  {
    q: 'Can I edit my profile later?',
    a: 'Of course. You can update your profile, services, pricing, availability, and photos at any time after launch. Your profile is always yours to manage.',
  },
]

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ background: '#fff', padding: '100px 24px' }} className="faq-section">
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Reveal dir="up">
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#78837F',
              letterSpacing: '0.08em',
              margin: '0 0 10px',
              textTransform: 'uppercase',
            }}
          >
            FAQ
          </p>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 800,
              color: '#0B4F3C',
              margin: '0 0 48px',
              lineHeight: 1.2,
            }}
            className="faq-heading"
          >
            Questions, answered
          </h2>
        </Reveal>

        {faqs.map((f, i) => (
          <Reveal key={i} dir={i % 2 === 0 ? 'left' : 'right'}>
            <div style={{ borderBottom: '1px solid #E8EDEA' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  gap: 16,
                  textAlign: 'left',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span
                  style={{ fontSize: 15, fontWeight: 500, color: '#111', flex: 1 }}
                >
                  {f.q}
                </span>
                <ChevronDown
                  size={17}
                  color="#9AA39E"
                  strokeWidth={2}
                  style={{
                    flexShrink: 0,
                    transition: 'transform 0.3s',
                    transform: open === i ? 'rotate(180deg)' : 'none',
                  }}
                />
              </button>
              <div
                style={{
                  maxHeight: open === i ? 240 : 0,
                  opacity: open === i ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease, opacity 0.3s ease',
                  paddingBottom: open === i ? 18 : 0,
                }}
              >
                <p
                  style={{
                    fontSize: 14.5,
                    color: '#78837F',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
        <div style={{ borderBottom: '1px solid #E8EDEA' }} />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .faq-section { padding: 60px 18px !important; }
          .faq-heading { margin-bottom: 32px !important; }
        }
      `}</style>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  return (
    <section style={{ background: '#fff', padding: '80px 24px' }} className="final-cta-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
          className="cta-grid"
        >
          {/* Image */}
          <Reveal dir="left">
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: '#1A7060',
                aspectRatio: '4/4.5',
              }}
              className="cta-img"
            >
              <img
                src={footerLogo}
                alt="Beauty professional looking at phone"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={1} dir="right">
            <div className="cta-content">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 22,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#0B4F3C',
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#0B4F3C',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Limited Spots
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 800,
                  color: '#0B4F3C',
                  margin: '0 0 16px',
                  lineHeight: 1.15,
                }}
              >
                Ready to Grow with<br />Zuri?
              </h2>

              <p
                style={{
                  fontSize: 15,
                  color: '#78837F',
                  lineHeight: 1.7,
                  margin: '0 0 32px',
                  maxWidth: 380,
                }}
              >
                Join the waitlist today and secure your spot as a founding
                member. Early access. Exclusive rewards. No commitment.
              </p>

              <button
                onClick={onJoinWaitlist}
                className="final-cta-btn"
                style={{
                  background: '#0B4F3C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 999,
                  padding: '13px 30px',
                  fontSize: 16,
                  fontWeight: 400,
                  fontFamily: "'Inter', sans-serif",
                  cursor: 'pointer',
                  transition: 'background 0.2s, transform 0.15s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = '#094234'
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = '#0B4F3C'
                  ;(e.currentTarget as HTMLElement).style.transform = ''
                }}
              >
                Join Waitlist
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cta-img { aspect-ratio: 16/10 !important; }
          .cta-content { text-align: center; }
        }
        @media (max-width: 640px) {
          .final-cta-section { padding: 56px 18px !important; }
          .final-cta-btn { padding: 12px 24px !important; font-size: 14px !important; width: 100%; }
        }
      `}</style>
    </section>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function LandingPage({ onJoinWaitlist }: LandingPageProps) {
  return (
    <div style={{ background: '#fff' }}>
      <Nav onJoinWaitlist={onJoinWaitlist} />
      <Hero onJoinWaitlist={onJoinWaitlist} />
      <FeaturesSection />
      <StepsSection onJoinWaitlist={onJoinWaitlist} />
      <BenefitsSection />
      <FAQSection />
      <FinalCTA onJoinWaitlist={onJoinWaitlist} />
      <Footer />
    </div>
  )
}