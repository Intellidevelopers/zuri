import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import WaitlistModal from './pages/WaitlistPage'

export default function App() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <LandingPage onJoinWaitlist={() => setShowWaitlist(true)} />
      {showWaitlist && (
        <WaitlistModal onClose={() => setShowWaitlist(false)} />
      )}
    </div>
  )
}
