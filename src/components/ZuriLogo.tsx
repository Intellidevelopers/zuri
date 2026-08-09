interface ZuriLogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

export default function ZuriLogo({ variant = 'dark', size = 'md' }: ZuriLogoProps) {
  const scale = { sm: 0.7, md: 1, lg: 1.3 }[size]
  const textColor = variant === 'light' ? '#ffffff' : '#0B4F3C'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 1, userSelect: 'none', lineHeight: 1 }}>
      {/* Gold Z mark — geometric double-stroke Z */}
      <svg
        width={Math.round(38 * scale)}
        height={Math.round(34 * scale)}
        viewBox="0 0 38 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top horizontal bar */}
        <rect x="4" y="3" width="22" height="5" rx="1.5" fill="#C6A24A" />
        {/* Diagonal stroke */}
        <path
          d="M24.5 6.5 L9.5 22.5"
          stroke="#C6A24A"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Bottom horizontal bar */}
        <rect x="10" y="22" width="22" height="5" rx="1.5" fill="#C6A24A" />
        {/* Small dot detail at end */}
        <circle cx="33" cy="27.5" r="2.5" fill="#C6A24A" />
      </svg>
      {/* uri wordmark */}
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: Math.round(17 * scale),
          color: textColor,
          letterSpacing: '-0.5px',
          lineHeight: 1,
          marginLeft: -Math.round(2 * scale),
        }}
      >
        uri
      </span>
    </div>
  )
}
