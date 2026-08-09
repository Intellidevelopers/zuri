import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import WaitlistPage from './pages/WaitlistPage'

export type Page = 'landing' | 'waitlist'

export default function App() {
  const [page, setPage] = useState<Page>('landing')

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {page === 'landing' ? (
        <LandingPage onJoinWaitlist={() => setPage('waitlist')} />
      ) : (
        <WaitlistPage onBack={() => setPage('landing')} />
      )}
    </div>
  )
}
