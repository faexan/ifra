import { useState } from 'react'
import AuthGateway from './components/AuthGateway'
import TerminalSequence from './components/TerminalSequence'
import ExcuseAnnihilator from './components/ExcuseAnnihilator'
import Dashboard from './components/Dashboard'
import Finale from './components/Finale'
import ParticleBackground from './components/ParticleBackground'
import './App.css'

export default function App() {
  const [phase, setPhase] = useState('AUTH')

  return (
    <>
      <ParticleBackground />
      <div className="crt-overlay" />
      <div className="app-container">
        {phase === 'AUTH'      && <AuthGateway       onUnlock={()   => setPhase('TERMINAL')}  />}
        {phase === 'TERMINAL'  && <TerminalSequence  onComplete={()  => setPhase('MINIGAME')}  />}
        {phase === 'MINIGAME'  && <ExcuseAnnihilator onComplete={()  => setPhase('DASHBOARD')} />}
        {phase === 'DASHBOARD' && <Dashboard         onFinale={()    => setPhase('FINALE')}    />}
        {phase === 'FINALE'    && <Finale />}
      </div>
    </>
  )
}
