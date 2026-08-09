import { useState, useEffect, useRef, type ReactNode } from 'react'
import {
  Users, Zap, Gift, MessageSquare, ChevronDown, Menu, X,
} from 'lucide-react'
import ZuriLogo from '../components/ZuriLogo'
import Footer from '../components/Footer'

interface LandingPageProps {
  onJoinWaitlist: () => void
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal${delay ? ` reveal-delay-${delay}` : ''}`} style={style}>
      {children}
    </div>
  )
}

// ── Phone frame ───────────────────────────────────────────────────────────────
function PhoneFrame({ children, width = 220 }: { children: ReactNode; width?: number }) {
  return (
    <div style={{
      width,
      background: '#111',
      borderRadius: Math.round(width * 0.16),
      padding: `${Math.round(width * 0.038)}px ${Math.round(width * 0.03)}px`,
      boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.25)',
      flexShrink: 0,
    }}>
      {/* Dynamic island */}
      <div style={{
        width: Math.round(width * 0.28), height: Math.round(width * 0.045),
        background: '#111', borderRadius: 999,
        margin: '0 auto', marginBottom: Math.round(width * 0.018),
        position: 'relative', zIndex: 2,
      }} />
      <div style={{
        borderRadius: Math.round(width * 0.13),
        overflow: 'hidden',
        background: '#fff',
      }}>
        {children}
      </div>
    </div>
  )
}

// ── App screens ───────────────────────────────────────────────────────────────
function WalletScreen() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F7F8F7', minHeight: 380 }}>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px 4px', alignItems: 'center' }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: '#111' }}>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <rect x="0" y="4" width="2" height="6" rx="1" fill="#111" />
            <rect x="3.5" y="2.5" width="2" height="7.5" rx="1" fill="#111" />
            <rect x="7" y="1" width="2" height="9" rx="1" fill="#111" />
            <rect x="10.5" y="0" width="2" height="10" rx="1" fill="#111" />
          </svg>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M6 2.5C7.9 2.5 9.6 3.3 10.8 4.6L12 3.3C10.4 1.6 8.3 0.5 6 0.5C3.7 0.5 1.6 1.6 0 3.3L1.2 4.6C2.4 3.3 4.1 2.5 6 2.5Z" fill="#111" />
            <path d="M6 5.5C7.1 5.5 8.1 5.9 8.8 6.6L10 5.3C8.9 4.3 7.5 3.5 6 3.5C4.5 3.5 3.1 4.3 2 5.3L3.2 6.6C3.9 5.9 4.9 5.5 6 5.5Z" fill="#111" />
            <circle cx="6" cy="8.5" r="1.5" fill="#111" />
          </svg>
          <div style={{ width: 18, height: 9, border: '1.5px solid #111', borderRadius: 3, padding: '1px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '80%', height: '100%', background: '#111', borderRadius: 1.5 }} />
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 14px 10px' }}>
        <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M8 1L3 6L8 11" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#111', margin: 0 }}>My Wallet</p>
      </div>

      {/* Wallet card */}
      <div style={{ margin: '0 12px 14px', background: '#0B4F3C', borderRadius: 16, padding: '18px 16px 14px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circle */}
        <div style={{ position: 'absolute', right: -20, top: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', right: 10, top: 10, width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8">
            <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
          </svg>
        </div>
        <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', margin: '0 0 4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Wallet Balance</p>
        <p style={{ fontSize: 26, fontWeight: 800, color: '#C6A24A', margin: '0 0 12px', lineHeight: 1 }}>₦120,000</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.45)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>This Month</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 1px' }}>₦45,500</p>
            <p style={{ fontSize: 7.5, color: '#4ade80', margin: 0 }}>↑+12% vs last month</p>
          </div>
          <div>
            <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.45)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Spent</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 1px' }}>₦98,500</p>
            <p style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.45)', margin: 0 }}>14 transactions</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, padding: '0 12px 14px' }}>
        {['Top Up', 'Send'].map((label, i) => (
          <div key={label} style={{
            flex: 1, height: 34, borderRadius: 10,
            background: i === 0 ? '#0B4F3C' : '#F0F2F0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: i === 0 ? '#fff' : '#333' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BookingsScreen() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fff', minHeight: 340 }}>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px 4px', alignItems: 'center' }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: '#111' }}>9:41</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 1 }}>{[3,5,7,9].map(h => <div key={h} style={{ width: 2.5, height: h, background: '#111', borderRadius: 1 }} />)}</div>
          <div style={{ width: 16, height: 8, border: '1.5px solid #111', borderRadius: 2.5, padding: '1px' }}><div style={{ width: '75%', height: '100%', background: '#111', borderRadius: 1 }} /></div>
        </div>
      </div>
      <div style={{ padding: '4px 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginRight: 6 }}><path d="M8 1L3 6L8 11" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <p style={{ flex: 1, textAlign: 'center', fontSize: 12.5, fontWeight: 700, color: '#111', margin: 0 }}>My Bookings</p>
        </div>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
          {['All', 'Pending', 'Confirmed', 'Completed'].map((t, i) => (
            <div key={t} style={{
              padding: '3px 8px', borderRadius: 999, fontSize: 9,
              background: i === 0 ? '#0B4F3C' : '#F4F6F4',
              color: i === 0 ? '#fff' : '#666', fontWeight: i === 0 ? 600 : 400,
            }}>{t}</div>
          ))}
        </div>
        <p style={{ fontSize: 9, color: '#999', margin: '0 0 8px' }}>Pending requests (2)</p>
        {/* Booking card */}
        <div style={{ border: '1px solid #F0F2F0', borderRadius: 10, padding: '9px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#F0EBE3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#C6A24A' }}>CA</span>
              </div>
              <div>
                <p style={{ fontSize: 9.5, fontWeight: 700, color: '#111', margin: 0 }}>Chioma Adeleke</p>
                <p style={{ fontSize: 8, color: '#888', margin: '1px 0 0' }}>Luxury Knotless Braids (Medium)</p>
              </div>
            </div>
            <span style={{ fontSize: 7.5, color: '#e05050', background: '#FFF0F0', borderRadius: 4, padding: '2px 5px', fontWeight: 600 }}>Expires in 45m</span>
          </div>
          <p style={{ fontSize: 7.5, color: '#aaa', margin: '0 0 8px' }}>Today, Jul 22 · 2:30 PM</p>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ flex: 1, height: 28, borderRadius: 7, border: '1px solid #E0E6E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: '#555' }}>Decline</span>
            </div>
            <div style={{ flex: 1, height: 28, borderRadius: 7, background: '#0B4F3C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: '#fff' }}>Accept</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileScreen() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F7F8F7', minHeight: 340 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px 4px', alignItems: 'center' }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: '#111' }}>9:41</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ display: 'flex', gap: 1 }}>{[3,5,7,9].map(h => <div key={h} style={{ width: 2.5, height: h, background: '#111', borderRadius: 1 }} />)}</div>
          <div style={{ width: 16, height: 8, border: '1.5px solid #111', borderRadius: 2.5, padding: '1px' }}><div style={{ width: '75%', height: '100%', background: '#111', borderRadius: 1 }} /></div>
        </div>
      </div>
      <div style={{ padding: '4px 14px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ width: 24, height: 24 }} />
          <p style={{ fontSize: 12.5, fontWeight: 700, color: '#111', margin: 0 }}>Profile</p>
          <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
          </div>
        </div>
        {/* Avatar */}
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg, #C6A24A, #e8c06a)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>C</span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 800, color: '#111', margin: '0 0 2px' }}>Chioma Okafor</p>
          <p style={{ fontSize: 9.5, color: '#666', margin: '0 0 5px' }}>Hair Stylist · <span style={{ color: '#0B4F3C', fontWeight: 600 }}>Glow by Chioma</span></p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
            {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#C6A24A', fontSize: 9.5 }}>★</span>)}
            <span style={{ fontSize: 8.5, color: '#666', marginLeft: 3 }}>4.9 (342 Reviews)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginTop: 4 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ fontSize: 8.5, color: '#888' }}>Lekki, Lagos</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentsScreen() {
  const txns = [
    { label: 'Partial Refund', sub: 'Silk Press · Customer: Deborah John', amount: '-₦8,000', status: 'Completed', sign: -1 },
    { label: 'Ada Okafor', sub: 'Luxury Knotless Braids · Wallet Payment', amount: '+₦18,000', status: 'Completed', sign: 1 },
    { label: 'Withdrawal to GTBank', sub: 'Bank Transfer', amount: '-₦150,000', status: 'Completed', sign: -1 },
  ]
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fff', padding: '12px 14px', minHeight: 200 }}>
      {txns.map((t, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '9px 0', borderBottom: i < txns.length - 1 ? '1px solid #F4F6F4' : 'none' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flex: 1 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: t.sign > 0 ? '#EDF7F2' : '#FFF0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t.sign > 0 ? '#0B4F3C' : '#e05050'} strokeWidth="2">
                {t.sign > 0 ? <path d="M12 19V5M5 12l7-7 7 7" /> : <path d="M12 5v14M5 12l7 7 7-7" />}
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 9.5, fontWeight: 700, color: '#111', margin: '0 0 2px' }}>{t.label}</p>
              <p style={{ fontSize: 8, color: '#999', margin: 0, lineHeight: 1.4 }}>{t.sub}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: t.sign > 0 ? '#0B4F3C' : '#333', margin: '0 0 2px' }}>{t.amount}</p>
            <span style={{ fontSize: 7.5, color: '#0B4F3C', background: '#EDF7F2', padding: '1px 5px', borderRadius: 3, fontWeight: 600 }}>{t.status}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function PromotionsScreen() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fff', minHeight: 200 }}>
      {/* Promo banner */}
      <div style={{ background: '#0B4F3C', padding: '14px 14px 16px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=150&fit=crop)', backgroundSize: 'cover', opacity: 0.25 }} />
        <span style={{ display: 'inline-block', background: '#C6A24A', color: '#fff', fontSize: 7.5, fontWeight: 700, borderRadius: 999, padding: '2px 8px', marginBottom: 8, position: 'relative' }}>Limited Offer</span>
        <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2, position: 'relative' }}>Glow Up This<br />Weekend</p>
      </div>
      {/* Promote card */}
      <div style={{ margin: '12px 12px 0', border: '1px solid #F0F2F0', borderRadius: 12, padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#EDF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0B4F3C" strokeWidth="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
        </div>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#111', margin: '0 0 3px' }}>Promote Your Services</p>
          <p style={{ fontSize: 8, color: '#888', lineHeight: 1.5, margin: 0 }}>Create limited time offers to attract new customers, fill open slots, and increase bookings.</p>
        </div>
      </div>
    </div>
  )
}

function Step1Screen() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F7F8F7', minHeight: 300, padding: '12px 14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 700 }}>9:41</span>
        <div style={{ display: 'flex', gap: 1 }}>{[3,5,7,9].map(h => <div key={h} style={{ width: 2, height: h, background: '#111', borderRadius: 1 }} />)}</div>
      </div>
      <p style={{ fontSize: 11.5, fontWeight: 800, color: '#111', margin: '0 0 2px' }}>Good morning, Rona 👋</p>
      <p style={{ fontSize: 8, color: '#999', margin: '0 0 12px' }}>Thu, 20 February</p>
      <div style={{ background: '#fff', borderRadius: 10, padding: '8px 10px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 8, fontWeight: 700, color: '#111', margin: '0 0 1px' }}>Apple Projects</p>
          <p style={{ fontSize: 7, color: '#999', margin: 0 }}>Rona</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#111', margin: 0 }}>0</p>
            <p style={{ fontSize: 7, color: '#999', margin: 0 }}>Overdue</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#0B4F3C', margin: 0 }}>4</p>
            <p style={{ fontSize: 7, color: '#999', margin: 0 }}>Today</p>
          </div>
        </div>
      </div>
      {/* Download badges */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
        {['App store', 'Play store'].map(b => (
          <div key={b} style={{ background: '#111', borderRadius: 6, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 7.5, color: '#fff', fontWeight: 600 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Step2Screen() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fff', minHeight: 300, padding: '12px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 20, alignItems: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 700 }}>9:41</span>
        <div style={{ display: 'flex', gap: 1 }}>{[3,5,7,9].map(h => <div key={h} style={{ width: 2, height: h, background: '#111', borderRadius: 1 }} />)}</div>
      </div>
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#0B4F3C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, boxShadow: '0 4px 16px rgba(11,79,60,0.3)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p style={{ fontSize: 12, fontWeight: 800, color: '#111', margin: '0 0 8px', lineHeight: 1.3 }}>Your Business<br />is Ready!</p>
      <p style={{ fontSize: 8.5, color: '#888', lineHeight: 1.5, margin: 0, maxWidth: 160 }}>
        Congratulations! Your Zuri Pro account has been successfully set up. Customers can now discover and book your services.
      </p>
    </div>
  )
}

function Step3Screen() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fff', minHeight: 300, padding: '12px 14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 700 }}>9:41</span>
        <div style={{ display: 'flex', gap: 1 }}>{[3,5,7,9].map(h => <div key={h} style={{ width: 2, height: h, background: '#111', borderRadius: 1 }} />)}</div>
      </div>
      <p style={{ fontSize: 11, fontWeight: 800, color: '#111', margin: '0 0 4px' }}>How do you operate<br />your business?</p>
      <p style={{ fontSize: 8, color: '#999', margin: '0 0 12px' }}>Choose the option that best describes your setup.</p>
      {[
        { title: 'Sole Professional', desc: 'Work independently and manage your bookings and clients on your own.' },
        { title: 'Shop-Based Business', desc: 'Manage a beauty shop, staff, and customer bookings from one place.' },
      ].map((opt, i) => (
        <div key={opt.title} style={{
          border: `1.5px solid ${i === 0 ? '#0B4F3C' : '#E0E6E2'}`,
          borderRadius: 10, padding: '9px 10px', marginBottom: 8,
          background: i === 0 ? '#EDF7F2' : '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${i === 0 ? '#0B4F3C' : '#ccc'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 }}>
              {i === 0 && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0B4F3C' }} />}
            </div>
            <div>
              <p style={{ fontSize: 9.5, fontWeight: 700, color: '#111', margin: '0 0 2px' }}>{opt.title}</p>
              <p style={{ fontSize: 7.5, color: '#888', margin: 0, lineHeight: 1.4 }}>{opt.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Navigation ────────────────────────────────────────────────────────────────
function Nav({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(11,79,60,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      transition: 'background 0.3s, backdrop-filter 0.3s',
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto', padding: '0 32px',
        height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <ZuriLogo variant="light" size="md" />

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {['Features', 'How it works', 'Why join early'].map(l => (
            <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.72)')}
            >{l}</a>
          ))}
        </div>

        <button
          className="nav-cta"
          onClick={onJoinWaitlist}
          style={{
            background: 'rgba(255,255,255,0.95)', color: '#0B4F3C', border: 'none',
            borderRadius: 999, padding: '8px 18px', fontSize: 13, fontWeight: 700,
            fontFamily: "'Inter', sans-serif", cursor: 'pointer', transition: 'background 0.2s',
            letterSpacing: '0.03em',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.95)')}
        >JOIN WAITLIST</button>

        <button
          className="nav-ham"
          onClick={() => setMenuOpen(v => !v)}
          style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="nav-ham" style={{ background: '#0B4F3C', padding: '12px 24px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {['Features', 'How it works', 'Why join early'].map(l => (
            <a key={l} href="#" style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: 15, padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}>{l}</a>
          ))}
          <button onClick={onJoinWaitlist} style={{ marginTop: 16, width: '100%', background: '#fff', color: '#0B4F3C', border: 'none', borderRadius: 999, padding: '12px', fontSize: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", cursor: 'pointer' }}>JOIN WAITLIST</button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-ham { display: flex !important; align-items: center; }
        }
      `}</style>
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [email, setEmail] = useState('')

  return (
    <div style={{ background: '#fff', paddingTop: 0 }}>
      {/* Outer: white page bg — on mobile shows as padding around the green card */}
      <div className="hero-outer" style={{ padding: '0' }}>
        <div
          className="hero-card"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 80% 20%, #1E7A60 0%, #0B4F3C 55%, #083D2E 100%)',
            borderRadius: '0 0 28px 28px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Nav row inside hero on mobile */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 0' }}>
            <ZuriLogo variant="light" size="md" />
            <button
              onClick={onJoinWaitlist}
              className="hero-nav-btn"
              style={{
                background: '#fff', color: '#0B4F3C', border: 'none',
                borderRadius: 999, padding: '7px 14px', fontSize: 11, fontWeight: 700,
                fontFamily: "'Inter', sans-serif", cursor: 'pointer', letterSpacing: '0.04em',
              }}
            >JOIN WAITLIST</button>
          </div>

          {/* Center content */}
          <div style={{ textAlign: 'center', padding: '36px 24px 0', maxWidth: 640, margin: '0 auto' }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999, padding: '5px 16px', marginBottom: 22 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Coming Soon</span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, margin: '0 0 18px' }}>
              Find more clients.<span style={{ color: 'rgba(255,255,255,0.85)' }}>grow your<br />Beauty business with Zuri.</span>
            </h1>

            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, margin: '0 0 32px', maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
              Join Nigeria's upcoming beauty marketplace where customer discover and book trusted professionals near them for salon visits or home services.
            </p>

            {/* Email CTA pill */}
            <div style={{
              display: 'flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.96)',
              borderRadius: 999,
              padding: '5px 5px 5px 20px',
              maxWidth: 420, margin: '0 auto 40px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }} className="hero-pill">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1, border: 'none', outline: 'none', background: 'transparent',
                  fontSize: 14, color: '#333', fontFamily: "'Inter', sans-serif",
                  minWidth: 0,
                }}
              />
              <button
                onClick={onJoinWaitlist}
                style={{
                  background: '#0B4F3C', color: '#fff', border: 'none',
                  borderRadius: 999, padding: '10px 18px', fontSize: 13, fontWeight: 700,
                  fontFamily: "'Inter', sans-serif", cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'background 0.2s', flexShrink: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#094234')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0B4F3C')}
              >JOIN WAITLIST</button>
            </div>
          </div>

          {/* Phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 0 }}>
            <PhoneFrame width={260}>
              <WalletScreen />
            </PhoneFrame>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-outer { padding: 10px 10px 0 !important; }
          .hero-card { border-radius: 20px !important; }
          .hero-nav-btn { display: flex !important; }
        }
        @media (min-width: 641px) {
          .hero-nav-btn { display: none !important; }
          .hero-outer { padding: 0 !important; }
          .hero-card { padding-top: 68px; border-radius: 0 0 28px 28px !important; }
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
    screen: <BookingsScreen />,
  },
  {
    title: 'Professional Profile',
    desc: 'Build trust before the first appointment. Showcase your work and services.',
    screen: <ProfileScreen />,
  },
  {
    title: 'Secure Payments',
    desc: 'Receive payments with confidence. Instant payouts, zero headaches.',
    screen: <PaymentsScreen />,
  },
  {
    title: 'Promotions',
    desc: 'Fill empty appointment slots faster. Create and launch deals in seconds.',
    screen: <PromotionsScreen />,
  },
]

function FeaturesSection() {
  return (
    <section style={{ background: '#fff', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: '#111', margin: '0 0 12px', lineHeight: 1.2 }}>
              Everything you need to grow.
            </h2>
            <p style={{ fontSize: 16, color: '#78837F', margin: 0, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
              One platform built specifically for beauty professionals
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="feat-grid">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2 + 1) as 1 | 2}>
              <div
                style={{
                  background: '#F4F6F4', borderRadius: 20,
                  padding: '28px 28px 0', overflow: 'hidden',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.09)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0B4F3C', margin: '0 0 6px' }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: '#78837F', lineHeight: 1.65, margin: '0 0 20px', maxWidth: 320 }}>{f.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <PhoneFrame width={200}>
                    {f.screen}
                  </PhoneFrame>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 700px) { .feat-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ── Steps ─────────────────────────────────────────────────────────────────────
const steps = [
  {
    n: 1, title: 'Join Waitlist',
    desc: 'Enter your details and reserve your spot before public launch',
    screen: <Step1Screen />,
  },
  {
    n: 2, title: 'Get Early Access',
    desc: 'Receive your personal invitation before the platform opens to everyone.',
    screen: <Step2Screen />,
  },
  {
    n: 3, title: 'Grow Your Business',
    desc: 'Set up your profile and start accepting bookings from day one.',
    screen: <Step3Screen />,
  },
]

function StepsSection({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  return (
    <section style={{ background: '#fff', padding: '96px 24px', borderTop: '1px solid #F0F4F0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 80, alignItems: 'start' }} className="steps-grid">
          {/* Left */}
          <Reveal>
            <div style={{ position: 'sticky', top: 100 }}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111', margin: '0 0 16px', lineHeight: 1.15 }}>
                Get started in 3<br />simple steps.
              </h2>
              <p style={{ fontSize: 15, color: '#78837F', lineHeight: 1.7, margin: '0 0 28px' }}>
                From waitlist to fully booked  we make getting started effortless.
              </p>
              <button
                onClick={onJoinWaitlist}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: '#0B4F3C', color: '#fff', border: 'none',
                  borderRadius: 8, padding: '10px 20px', fontSize: 11.5,
                  fontWeight: 700, fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#094234')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0B4F3C')}
              >JOIN WAITLIST</button>
            </div>
          </Reveal>

          {/* Right — timeline */}
          <div style={{ position: 'relative' }}>
            {/* Dashed vertical line */}
            <div style={{
              position: 'absolute', left: -28, top: 16, bottom: 16,
              width: 0,
              borderLeft: '2px dashed #D4E0DB',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {steps.map((step, i) => (
                <Reveal key={step.n} delay={(i + 1) as 1 | 2 | 3}>
                  <div style={{ position: 'relative' }}>
                    {/* Circle on the line */}
                    <div style={{
                      position: 'absolute', left: -40, top: 20,
                      width: 28, height: 28, borderRadius: '50%',
                      background: '#0B4F3C', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      zIndex: 2, boxShadow: '0 0 0 4px #fff',
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>{step.n}</span>
                    </div>

                    {/* Card */}
                    <div style={{ background: '#F4F6F4', borderRadius: 16, padding: '20px 20px 0', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <PhoneFrame width={180}>
                          {step.screen}
                        </PhoneFrame>
                      </div>
                      <div style={{ padding: '16px 0 20px' }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#0B4F3C', margin: '0 0 5px' }}>{step.title}</p>
                        <p style={{ fontSize: 13, color: '#78837F', margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
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
          .steps-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .steps-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  )
}

// ── Benefits ──────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: Users,
    title: 'Founding Member',
    desc: 'Be among the first professionals on Zuri and earn your founding member status forever.',
  },
  {
    icon: Zap,
    title: 'Priority Access',
    desc: 'Receive your invitation before the public launch — skip the line entirely.',
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
    <section style={{
      background: 'radial-gradient(ellipse 100% 80% at 50% 0%, #1E7A60 0%, #0B4F3C 60%)',
      padding: '96px 24px',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>
              Why Join Early
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: '0 auto', maxWidth: 380, lineHeight: 1.65 }}>
              Be among the first beauty professionals<br />shaping the future of Zuri Pro.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }} className="ben-grid">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div style={{
                background: '#fff', borderRadius: 16, padding: '18px 16px',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}
              >
                <b.icon size={18} color="#0B4F3C" strokeWidth={1.6} style={{ marginBottom: 12, display: 'block' }} />
                <p style={{ fontSize: 13.5, fontWeight: 700, color: '#111', margin: '0 0 6px' }}>{b.title}</p>
                <p style={{ fontSize: 12, color: '#78837F', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .ben-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .ben-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'What is Zuri', a: 'Zuri is a professional beauty marketplace built specifically for Nigerian beauty professionals. It connects skilled beauty pros with clients nearby, making it easy to get discovered, manage bookings, and grow your business.' },
  { q: 'Is joining free?', a: 'Yes, joining the waitlist is completely free. When Zuri launches, early members will also benefit from reduced platform fees and exclusive founding member perks.' },
  { q: 'When will Zuri launch?', a: "We're working hard to launch Zuri as soon as possible. Joining the waitlist ensures you'll be among the first to know and get access the moment we open our doors." },
  { q: 'Can I offer home services?', a: 'Absolutely. Zuri supports both salon-based and mobile/home service beauty professionals. You can set your service area and whether you offer home visits.' },
  { q: 'Can I own a salon and still join?', a: 'Yes. Zuri is designed for both solo beauty professionals and salon owners. You can manage multiple staff members and service locations from one account.' },
  { q: 'Can I edit my profile later?', a: "Of course. You can update your profile, services, pricing, availability, and photos at any time after launch. Your profile is always yours to manage." },
]

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ background: '#fff', padding: '96px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Reveal>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#78837F', letterSpacing: '0.08em', margin: '0 0 10px', textTransform: 'uppercase' }}>FAQ</p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, color: '#0B4F3C', margin: '0 0 48px', lineHeight: 1.2 }}>
            Questions, answered
          </h2>
        </Reveal>

        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: '1px solid #E8EDEA' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '18px 0', background: 'none',
                border: 'none', cursor: 'pointer', gap: 16, textAlign: 'left',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500, color: '#111', flex: 1 }}>{f.q}</span>
              <ChevronDown
                size={17}
                color="#9AA39E"
                strokeWidth={2}
                style={{ flexShrink: 0, transition: 'transform 0.3s', transform: open === i ? 'rotate(180deg)' : 'none' }}
              />
            </button>
            <div className="faq-content" style={{ maxHeight: open === i ? 200 : 0, opacity: open === i ? 1 : 0, paddingBottom: open === i ? 18 : 0 }}>
              <p style={{ fontSize: 14.5, color: '#78837F', lineHeight: 1.7, margin: 0 }}>{f.a}</p>
            </div>
          </div>
        ))}
        <div style={{ borderBottom: '1px solid #E8EDEA' }} />
      </div>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  return (
    <section style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="cta-grid">
          {/* Image */}
          <Reveal>
            <div style={{ borderRadius: 20, overflow: 'hidden', background: '#1A7060', aspectRatio: '4/4.5' }}>
              <img
                src="https://images.unsplash.com/photo-1750507972182-4a3600af5621?w=700&h=800&fit=crop&auto=format"
                alt="Beauty professional looking at phone"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={1}>
            <div>
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 22 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0B4F3C' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0B4F3C', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Limited Spots</span>
              </div>

              <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, color: '#0B4F3C', margin: '0 0 16px', lineHeight: 1.15 }}>
                Ready to Grow with<br />Zuri?
              </h2>

              <p style={{ fontSize: 15, color: '#78837F', lineHeight: 1.7, margin: '0 0 32px', maxWidth: 380 }}>
                Join the waitlist today and secure your spot as a founding member. Early access. Exclusive rewards. No commitment.
              </p>

              <button
                onClick={onJoinWaitlist}
                style={{
                  background: '#0B4F3C', color: '#fff', border: 'none',
                  borderRadius: 999, padding: '13px 28px', fontSize: 14.5,
                  fontWeight: 600, fontFamily: "'Inter', sans-serif",
                  cursor: 'pointer', transition: 'background 0.2s, transform 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#094234'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0B4F3C'; (e.currentTarget as HTMLElement).style.transform = ''; }}
              >Join Waitlist</button>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cta-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
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
