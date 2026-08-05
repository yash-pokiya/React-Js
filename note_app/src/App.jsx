import React from 'react'
import LeftColumn from './components/LeftColumn'
import RecentNotes from './components/RecentNotes'

const App = () => {

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      {/* add note */}
      <LeftColumn />

      {/* Vertical Divider */}
      <div className="hidden md:block w-px bg-white/80 self-stretch my-6"></div>

      {/* recent Notes */}
      <RecentNotes />
    </div>
  )
}

export default App