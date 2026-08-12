import { useState, useEffect, useRef, type FormEvent, type ReactNode } from 'react'
import {
  User, Building2, Phone, Mail, Briefcase, MapPin, Users, BarChart2,
  Lock, ChevronDown, X, CheckCircle2, Check
} from 'lucide-react'
import ZuriLogo from '../components/ZuriLogo'

interface WaitlistModalProps {
  onClose: () => void
  initialEmail?: string
}

interface FormData {
  firstName: string
  lastName: string
  businessName: string
  phone: string
  email: string
  profession: string
  city: string
  description: string
  experience: string
  newsletter: boolean
}

interface Errors {
  [key: string]: string
}

const professions = [
  'Hair Stylist', 'Makeup Artist', 'Nail Technician', 'Barber',
  'Esthetician / Skincare', 'Lash Technician', 'Brow Artist',
  'Massage Therapist', 'Beauty Salon Owner', 'Other',
]
const cities = [
  'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan',
  'Benin City', 'Enugu', 'Owerri', 'Calabar', 'Other',
]
const descriptions = [
  'Independent / Freelancer', 'Salon Owner', 'Salon Employee', 'Student / Trainee', 'Other',
]
const experienceRanges = [
  'Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years',
]

// ---------- Field wrapper ----------
function FieldGroup({ label, required, optional, children }: {
  label: string
  required?: boolean
  optional?: boolean
  children: ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13.5, fontWeight: 600, color: '#123D32', display: 'flex', alignItems: 'center', gap: 4 }}>
        {label}
        {required && <span style={{ color: '#e53e3e', fontSize: 13, marginLeft: 1 }}>*</span>}
        {optional && <span style={{ color: '#78837F', fontWeight: 400, fontSize: 12.5, marginLeft: 4 }}>(Optional)</span>}
      </label>
      {children}
    </div>
  )
}

// ---------- Text Input ----------
function TextInput({
  icon: Icon, placeholder, value, onChange, error, type = 'text', name,
}: {
  icon: React.ElementType
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  name?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          border: `1.5px solid ${error ? '#e53e3e' : focused ? '#0B4F3C' : '#DDE3DF'}`,
          borderRadius: 12, height: 50, padding: '0 16px',
          background: '#fff',
          boxShadow: focused ? '0 0 0 3px rgba(11,79,60,0.09)' : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      >
        <Icon size={16} color={focused ? '#0B4F3C' : '#9AA39E'} strokeWidth={1.7} />
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontSize: 14, color: '#123D32', fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>
      {error && <p style={{ color: '#e53e3e', fontSize: 12, marginTop: 4, marginBottom: 0 }}>{error}</p>}
    </div>
  )
}

// ---------- Select Input ----------


function SelectInput({
  icon: Icon, placeholder, value, onChange, options, error,
}: {
  icon: React.ElementType
  placeholder: string
  value: string
  onChange: (v: string) => void
  options: string[]
  error?: string
}) {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Keep highlighted item in view
  useEffect(() => {
    if (open && highlighted >= 0 && listRef.current) {
      const item = listRef.current.children[highlighted] as HTMLElement
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlighted, open])

  function openList() {
    setOpen(true)
    const idx = options.indexOf(value)
    setHighlighted(idx >= 0 ? idx : 0)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault()
      openList()
      return
    }
    if (!open) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlighted >= 0) {
        onChange(options[highlighted])
        setOpen(false)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <div
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        tabIndex={0}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          border: `1.5px solid ${error ? '#e53e3e' : open ? '#0B4F3C' : '#DDE3DF'}`,
          borderRadius: 12, height: 50, padding: '0 16px',
          background: '#fff',
          boxShadow: open ? '0 0 0 3px rgba(11,79,60,0.09)' : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
          userSelect: 'none',
          outline: 'none',
        }}
      >
        <Icon size={16} color={open ? '#0B4F3C' : '#9AA39E'} strokeWidth={1.7} style={{ flexShrink: 0 }} />
        <span
          style={{
            flex: 1,
            fontSize: 14,
            color: value ? '#123D32' : '#9AA39E',
            fontFamily: "'Inter', sans-serif",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          size={15}
          color="#9AA39E"
          strokeWidth={1.7}
          style={{
            flexShrink: 0,
            transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        />
      </div>

      {/* Dropdown panel */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          right: 0,
          zIndex: 50,
          background: '#fff',
          border: '1px solid #E8EDEA',
          borderRadius: 14,
          boxShadow: '0 12px 32px rgba(17,24,20,0.12), 0 2px 8px rgba(17,24,20,0.06)',
          overflow: 'hidden',
          transformOrigin: 'top center',
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(-6px)',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'transform 0.18s cubic-bezier(0.22,1,0.36,1), opacity 0.15s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div
          ref={listRef}
          role="listbox"
          style={{
            maxHeight: 240,
            overflowY: 'auto',
            padding: 6,
          }}
        >
          {options.map((o, i) => {
            const selected = o === value
            const active = i === highlighted
            return (
              <div
                key={o}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setHighlighted(i)}
                onMouseDown={(e) => {
                  e.preventDefault() // keep focus on combobox
                  onChange(o)
                  setOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  padding: '10px 12px',
                  borderRadius: 9,
                  fontSize: 14,
                  fontFamily: "'Inter', sans-serif",
                  color: selected ? '#0B4F3C' : '#2A332E',
                  fontWeight: selected ? 600 : 400,
                  background: active ? '#F0F5F2' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.12s ease',
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {o}
                </span>
                {selected && <Check size={15} color="#0B4F3C" strokeWidth={2.2} style={{ flexShrink: 0 }} />}
              </div>
            )
          })}
        </div>
      </div>

      {error && <p style={{ color: '#e53e3e', fontSize: 12, marginTop: 4, marginBottom: 0 }}>{error}</p>}
    </div>
  )
}
// ---------- Phone Input ----------
function PhoneInput({ value, onChange, error }: {
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <div
        style={{
          display: 'flex', alignItems: 'center',
          border: `1.5px solid ${error ? '#e53e3e' : focused ? '#0B4F3C' : '#DDE3DF'}`,
          borderRadius: 12, height: 50,
          background: '#fff',
          boxShadow: focused ? '0 0 0 3px rgba(11,79,60,0.09)' : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          overflow: 'hidden',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '0 12px', borderRight: '1.5px solid #DDE3DF',
          height: '100%', cursor: 'pointer', flexShrink: 0,
        }}>
          <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: 2 }}>
            <rect width="7" height="14" fill="#008751" />
            <rect x="7" width="6" height="14" fill="#FFFFFF" />
            <rect x="13" width="7" height="14" fill="#008751" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#123D32' }}>+234</span>
          <ChevronDown size={12} color="#9AA39E" strokeWidth={2} />
        </div>
        <input
          type="tel"
          placeholder="802 123 4567"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontSize: 14, color: '#123D32', fontFamily: "'Inter', sans-serif",
            padding: '0 16px',
          }}
        />
      </div>
      {error && <p style={{ color: '#e53e3e', fontSize: 12, marginTop: 4, marginBottom: 0 }}>{error}</p>}
    </div>
  )
}

// ---------- Success State ----------
function SuccessState({ onClose, alreadyJoined }: { onClose: () => void; alreadyJoined?: boolean }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0 16px' }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(11,79,60,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px',
      }}>
        <CheckCircle2 size={32} color="#0B4F3C" strokeWidth={1.8} />
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0B4F3C', margin: '0 0 12px' }}>
        {alreadyJoined ? "You're already on the list!" : "You're on the list!"}
      </h2>
      <p style={{ fontSize: 15, color: '#78837F', lineHeight: 1.65, margin: '0 auto 28px', maxWidth: 340 }}>
        {alreadyJoined
          ? "Looks like you've already joined the Zuri Pro waitlist. We'll be in touch soon with your early access details."
          : "Thanks for joining Zuri Pro. We'll be in touch when early access opens."}
      </p>
      <div style={{
        padding: '16px 20px',
        background: 'rgba(11,79,60,0.06)', borderRadius: 12,
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(11,79,60,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Mail size={16} color="#0B4F3C" strokeWidth={1.8} />
        </div>
        <p style={{ fontSize: 13.5, color: '#4a7065', margin: 0, lineHeight: 1.5 }}>
          {alreadyJoined
            ? "Check your inbox for your confirmation email — your spot is already secured."
            : "Keep an eye on your inbox and we'll reach out at the email you provided."}
        </p>
      </div>
      <button
        onClick={onClose}
        style={{
          background: '#0B4F3C', color: '#fff', border: 'none',
          borderRadius: 10, padding: '12px 32px', fontSize: 14,
          fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#094234')}
        onMouseLeave={e => (e.currentTarget.style.background = '#0B4F3C')}
      >
        Close
      </button>
    </div>
  )
}

// ---------- Main WaitlistModal ----------
export default function WaitlistModal({ onClose, initialEmail = '' }: WaitlistModalProps) {
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', businessName: '',
    phone: '', email: initialEmail, profession: '', city: '',
    description: '', experience: '', newsletter: true,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [alreadyJoined, setAlreadyJoined] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Lock body scroll when modal open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const set = (key: keyof FormData) => (value: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const validate = () => {
    const e: Errors = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.phone.trim()) e.phone = 'Mobile number is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.profession) e.profession = 'Please select your profession'
    if (!form.city) e.city = 'Please select your city'
    return e
  }

  const formatPhone = (raw: string): string => {
    const digits = raw.replace(/\D/g, '')
    if (digits.startsWith('234')) return '+' + digits
    if (digits.startsWith('0')) return '+234' + digits.slice(1)
    return '+234' + digits
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitError(null)
    setLoading(true)

    const payload = {
      email: form.email.trim(),
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      phone: formatPhone(form.phone),
      role: 'professional',
    }

    try {
      const res = await fetch('https://api.zuri.ng/api/v1/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        let msg = 'Something went wrong. Please try again.'
        try {
          const data = await res.json()
          if (data?.message) msg = data.message
        } catch { /* ignore parse error */ }
        throw new Error(msg)
      }

      const data = await res.json()
      if (data?.data?.alreadyJoined) {
        setAlreadyJoined(true)
      }
      setLoading(false)
      setSubmitted(true)
    } catch (err) {
      setLoading(false)
      const message = err instanceof Error ? err.message : 'Network error. Please check your connection and try again.'
      setSubmitError(message)
    }
  }

  return (
    <>
      {/* Overlay backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(34, 33, 33, 0.55)',
          zIndex: 200,
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Modal container — scrollable */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 201,
          overflowY: 'auto',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '32px 16px 48px',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        {/* Modal card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            width: '100%',
            maxWidth: 620,
            boxShadow: '0 24px 80px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.08)',
            padding: '36px 44px 40px',
            position: 'relative',
            animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          className="waitlist-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#f0f2f0',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
              zIndex: 1,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e0e5e2')}
            onMouseLeave={e => (e.currentTarget.style.background = '#f0f2f0')}
          >
            <X size={17} color="#555" strokeWidth={2.2} />
          </button>

          {/* Logo */}
          <div style={{ marginBottom: 24 }}>
            <ZuriLogo size="md" />
          </div>

          {submitted ? (
            <SuccessState onClose={onClose} alreadyJoined={alreadyJoined} />
          ) : (
            <>
              {/* Heading */}
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0B4F3C', margin: '0 0 10px', lineHeight: 1.2 }}>
                  Join the Zuri Pro Waitlist
                </h1>
                <p style={{ fontSize: 14.5, color: '#78837F', lineHeight: 1.65, margin: 0 }}>
                  Be among the first beauty professionals to<br />
                  get early access when Zuri launches.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Row 1: First + Last name */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="name-grid">
                    <FieldGroup label="First Name" required>
                      <TextInput
                        icon={User} placeholder="Enter your first name"
                        value={form.firstName} onChange={set('firstName')}
                        error={errors.firstName} name="firstName"
                      />
                    </FieldGroup>
                    <FieldGroup label="Last Name" required>
                      <TextInput
                        icon={User} placeholder="Enter your last name"
                        value={form.lastName} onChange={set('lastName')}
                        error={errors.lastName} name="lastName"
                      />
                    </FieldGroup>
                  </div>

                  {/* Business Name */}
                  <FieldGroup label="Business Name" optional>
                    <TextInput
                      icon={Building2} placeholder="Your business or salon name"
                      value={form.businessName} onChange={set('businessName')}
                      name="businessName"
                    />
                  </FieldGroup>

                  {/* Mobile */}
                  <FieldGroup label="Mobile Number" required>
                    <PhoneInput value={form.phone} onChange={set('phone')} error={errors.phone} />
                  </FieldGroup>

                  {/* Email */}
                  <FieldGroup label="Email Address" required>
                    <TextInput
                      icon={Mail} placeholder="you@example.com"
                      value={form.email} onChange={set('email')}
                      error={errors.email} type="email" name="email"
                    />
                  </FieldGroup>

                  {/* Profession + City */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="name-grid">
                    <FieldGroup label="Beauty Profession" required>
                      <SelectInput
                        icon={Briefcase} placeholder="Select your profession"
                        value={form.profession} onChange={set('profession')}
                        options={professions} error={errors.profession}
                      />
                    </FieldGroup>
                    <FieldGroup label="City" required>
                      <SelectInput
                        icon={MapPin} placeholder="Select your city"
                        value={form.city} onChange={set('city')}
                        options={cities} error={errors.city}
                      />
                    </FieldGroup>
                  </div>

                  {/* Description */}
                  <FieldGroup label="What best describes you?">
                    <SelectInput
                      icon={Users} placeholder="Select an option"
                      value={form.description} onChange={set('description')}
                      options={descriptions}
                    />
                  </FieldGroup>

                  {/* Experience */}
                  <FieldGroup label="Years of Experience">
                    <SelectInput
                      icon={BarChart2} placeholder="Select range"
                      value={form.experience} onChange={set('experience')}
                      options={experienceRanges}
                    />
                  </FieldGroup>

                  {/* Newsletter checkbox */}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginTop: 2 }}>
                    <input
                      type="checkbox"
                      className="zuri-check"
                      checked={form.newsletter}
                      onChange={e => set('newsletter')(e.target.checked)}
                      style={{ marginTop: 2, accentColor: '#0B4F3C', width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 13.5, color: '#4a5c56', lineHeight: 1.5 }}>
                      I&apos;d like to receive product updates and launch announcements.
                    </span>
                  </label>

                  {/* Submit error */}
                  {submitError && (
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: 'rgba(229, 62, 62, 0.08)',
                      border: '1px solid rgba(229, 62, 62, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                      <X size={16} color="#e53e3e" strokeWidth={2} style={{ flexShrink: 0 }} />
                      <p style={{ fontSize: 13.5, color: '#c53030', margin: 0, lineHeight: 1.5 }}>
                        {submitError}
                      </p>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%', height: 52, borderRadius: 12,
                      background: loading ? '#2d7a63' : '#0B4F3C',
                      color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: 16, fontWeight: 500, fontFamily: "'Inter', sans-serif",
                      transition: 'background 0.2s, transform 0.15s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      marginTop: 4,
                    }}
                    onMouseEnter={e => { if (!loading) (e.currentTarget.style.background = '#094234') }}
                    onMouseLeave={e => { if (!loading) (e.currentTarget.style.background = '#0B4F3C') }}
                    onMouseDown={e => { if (!loading) (e.currentTarget.style.transform = 'translateY(1px)') }}
                    onMouseUp={e => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    {loading ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                          <path d="M12 2a10 10 0 0110 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Joining...
                      </>
                    ) : 'Join Waitlist'}
                  </button>

                  {/* Security message */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: -4 }}>
                    <Lock size={13} color="#9AA39E" strokeWidth={1.8} />
                    <p style={{ fontSize: 12.5, color: '#9AA39E', margin: 0 }}>
                      Your information is secure and will never be shared with third parties.
                    </p>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .waitlist-card { padding: 28px 20px 32px !important; border-radius: 16px !important; }
          .name-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
