import logoImg from '../assets/logo.png'

interface ZuriLogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

const heights = { sm: 28, md: 36, lg: 48 }

export default function ZuriLogo({ size = 'md' }: ZuriLogoProps) {
  const h = heights[size]
  return (
    <img
      src={logoImg}
      alt="Zuri"
      style={{ height: '40px', width: '40px', display: 'block', userSelect: 'none' }}
      draggable={false}
    />
  )
}
