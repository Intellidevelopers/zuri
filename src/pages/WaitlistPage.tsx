import { useState, type FormEvent, type ReactNode } from 'react'
import {
  User, Building2, Phone, Mail, Briefcase, MapPin, Users, BarChart2,
  Lock, ChevronDown, ArrowLeft, CheckCircle2,
} from 'lucide-react'
import ZuriLogo from '../components/ZuriLogo'
import Footer from '../components/Footer'

interface WaitlistPageProps {
  onBack: () => void
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
          borderRadius: 12, height: 54, padding: '0 16px',
          background: '#fff',
          boxShadow: focused ? '0 0 0 3px rgba(11,79,60,0.09)' : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      >
        <Icon size={17} color={focused ? '#0B4F3C' : '#9AA39E'} strokeWidth={1.7} />
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="zuri-input"
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontSize: 14, color: '#123D32', fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>
      {error && <p style={{ color: '#e53e3e', fontSize: 12, marginTop: 4 }}>{error}</p>}
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
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          border: `1.5px solid ${error ? '#e53e3e' : focused ? '#0B4F3C' : '#DDE3DF'}`,
          borderRadius: 12, height: 54, padding: '0 16px',
          background: '#fff',
          boxShadow: focused ? '0 0 0 3px rgba(11,79,60,0.09)' : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          position: 'relative',
        }}
      >
        <Icon size={17} color={focused ? '#0B4F3C' : '#9AA39E'} strokeWidth={1.7} style={{ flexShrink: 0 }} />
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="zuri-select"
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontSize: 14, color: value ? '#123D32' : '#9AA39E',
            fontFamily: "'Inter', sans-serif", cursor: 'pointer',
          }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} color="#9AA39E" strokeWidth={1.7} style={{ flexShrink: 0 }} />
      </div>
      {error && <p style={{ color: '#e53e3e', fontSize: 12, marginTop: 4 }}>{error}</p>}
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
          borderRadius: 12, height: 54,
          background: '#fff',
          boxShadow: focused ? '0 0 0 3px rgba(11,79,60,0.09)' : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          overflow: 'hidden',
        }}
      >
        {/* Country prefix */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '0 12px', borderRight: '1.5px solid #DDE3DF',
          height: '100%', cursor: 'pointer', flexShrink: 0,
        }}>
          {/* Nigeria flag */}
          <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: 2 }}>
            <rect width="7" height="14" fill="#008751" />
            <rect x="7" width="6" height="14" fill="#FFFFFF" />
            <rect x="13" width="7" height="14" fill="#008751" />
          </svg>
          <span style={{ fontSize: 13.5, fontWeight: 500, color: '#123D32' }}>+234</span>
          <ChevronDown size={13} color="#9AA39E" strokeWidth={2} />
        </div>
        {/* Phone number */}
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
      {error && <p style={{ color: '#e53e3e', fontSize: 12, marginTop: 4 }}>{error}</p>}
    </div>
  )
}

// ---------- Success State ----------
function SuccessState() {
  return (
    <div style={{ textAlign: 'center', padding: '48px 0 24px' }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(11,79,60,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px',
      }}>
        <CheckCircle2 size={32} color="#0B4F3C" strokeWidth={1.8} />
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0B4F3C', margin: '0 0 12px' }}>
        You're on the list!
      </h2>
      <p style={{ fontSize: 15, color: '#78837F', lineHeight: 1.65, margin: '0 auto', maxWidth: 360 }}>
        Thanks for joining Zuri Pro. We'll be in touch when early access opens.
      </p>
      <div style={{
        marginTop: 32, padding: '16px 20px',
        background: 'rgba(11,79,60,0.06)', borderRadius: 12,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(11,79,60,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Mail size={16} color="#0B4F3C" strokeWidth={1.8} />
        </div>
        <p style={{ fontSize: 13.5, color: '#4a7065', margin: 0, lineHeight: 1.5 }}>
          Keep an eye on your inbox — we'll reach out at the email you provided.
        </p>
      </div>
    </div>
  )
}

// ---------- Main WaitlistPage ----------
export default function WaitlistPage({ onBack }: WaitlistPageProps) {
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', businessName: '',
    phone: '', email: '', profession: '', city: '',
    description: '', experience: '', newsletter: true,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1400)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #4A8C78 0%, #2A7060 30%, #d4e6de 70%, #eaf0ec 100%)', display: 'flex', flexDirection: 'column' }}>
      {/* Back nav */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 24px', width: '100%' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#4a7065', fontSize: 13.5, fontWeight: 500,
            fontFamily: "'Inter', sans-serif", padding: '6px 0',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#0B4F3C')}
          onMouseLeave={e => (e.currentTarget.style.color = '#4a7065')}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back to home
        </button>
      </div>

      {/* Card area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '8px 20px 64px' }}>
        <div
          style={{
            background: '#fff', borderRadius: 18, width: '100%', maxWidth: 660,
            boxShadow: '0 4px 40px rgba(11,79,60,0.10), 0 1px 3px rgba(0,0,0,0.05)',
            padding: '40px 48px',
          }}
          className="waitlist-card"
        >
          {/* Logo */}
          <div style={{ marginBottom: 28 }}>
            <ZuriLogo size="md" />
          </div>

          {submitted ? (
            <SuccessState />
          ) : (
            <>
              {/* Heading */}
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0B4F3C', margin: '0 0 10px', lineHeight: 1.2 }}>
                  Join the Zuri Pro Waitlist
                </h1>
                <p style={{ fontSize: 15, color: '#78837F', lineHeight: 1.65, margin: 0 }}>
                  Be among the first beauty professionals to<br />
                  get early access when Zuri launches.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Row 1: First + Last name */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="name-grid">
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="name-grid">
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
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginTop: 4 }}>
                    <input
                      type="checkbox"
                      className="zuri-check"
                      checked={form.newsletter}
                      onChange={e => set('newsletter')(e.target.checked)}
                      style={{ marginTop: 1 }}
                    />
                    <span style={{ fontSize: 14, color: '#4a5c56', lineHeight: 1.5 }}>
                      I'd like to receive product updates and launch announcements.
                    </span>
                  </label>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%', height: 54, borderRadius: 12,
                      background: loading ? '#2d7a63' : '#0B4F3C',
                      color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: 15.5, fontWeight: 600, fontFamily: "'Inter', sans-serif",
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

      <Footer />

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .waitlist-card { padding: 28px 20px !important; }
          .name-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
