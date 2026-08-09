import ZuriLogo from './ZuriLogo'

function IconInstagram() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg>
}
function IconFacebook() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
}
function IconTikTok() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 11-2.1-2.79V9.42a6.34 6.34 0 104.55 6.1V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z"/></svg>
}
function IconLinkedin() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
}

const socialLinks = [
  { icon: IconInstagram, label: 'Instagram', href: '#' },
  { icon: IconFacebook, label: 'Facebook', href: '#' },
  { icon: IconTikTok, label: 'TikTok', href: '#' },
  { icon: IconLinkedin, label: 'LinkedIn', href: '#' },
]

const quickLinks = ['Features', 'How it works', 'Why join early', 'Waitlist']
const supportLinks = [
  { label: 'hello@zuri.app', href: 'mailto:hello@zuri.app' },
  { label: 'Contact support', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0B4F3C' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 32px 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 40,
          }}
          className="footer-grid"
        >
          {/* Col 1 - Logo */}
          <div>
            <ZuriLogo variant="light" size="md" />
            <p style={{ color: '#a0bfb5', fontSize: 14, lineHeight: 1.7, marginTop: 16, maxWidth: 220 }}>
              Nigeria's beauty marketplace connecting trusted professionals with clients nearby.
            </p>
          </div>

          {/* Col 2 - Quick Links */}
          <div>
            <p style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              Quick Links
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {quickLinks.map(link => (
                <li key={link}>
                  <a href="#" style={{ color: '#a0bfb5', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#a0bfb5')}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Support */}
          <div>
            <p style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              Support
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {supportLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} style={{ color: '#a0bfb5', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#a0bfb5')}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Follow */}
          <div>
            <p style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              Follow
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#a0bfb5', textDecoration: 'none', transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.1)'
                    el.style.color = '#fff'
                    el.style.borderColor = 'rgba(255,255,255,0.5)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'transparent'
                    el.style.color = '#a0bfb5'
                    el.style.borderColor = 'rgba(255,255,255,0.25)'
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: 48, padding: '20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0bfb5" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M14.83 14.83A4 4 0 119.17 9.17" />
          </svg>
          <p style={{ color: '#a0bfb5', fontSize: 13, margin: 0 }}>2026 Zuri. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
