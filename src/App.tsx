import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import WaitlistModal from './pages/WaitlistPage'

export default function App() {
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [heroEmail, setHeroEmail] = useState('')

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <LandingPage onJoinWaitlist={(email?: string) => { setHeroEmail(email ?? ''); setShowWaitlist(true) }} />
      {showWaitlist && (
        <WaitlistModal onClose={() => setShowWaitlist(false)} initialEmail={heroEmail} />
      )}
    </div>
  )
}
