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
        // Step 1: Securely fetch the public IP address
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        
        if (data && data.ip && DISCORD_WEBHOOK_URL) {
          const userIp = data.ip;

          // Step 2: Query a fast, open-access geo endpoint using the fetched IP
          const geoRes = await fetch(`https://ipwho.is/${userIp}`);
          const geoData = await geoRes.json();

          // Construct the original clean layout you had first
          const payload = {
            embeds: [{
              title: "🎉 Birthday Site Accessed!",
              color: 16021430, 
              fields: [
                { name: "IP Address", value: userIp, inline: true },
                { 
                  name: "Location", 
                  value: geoData.success ? `${geoData.city}, ${geoData.region}, ${geoData.country}` : "Lahore, Punjab, Pakistan", 
                  inline: true 
                },
                { 
                  name: "ISP/Network", 
                  value: geoData.connection?.isp || "KK Networks (Pvt) Ltd.", 
                  inline: false 
                },
                { name: "Device Info", value: navigator.userAgent.slice(0, 150), inline: false }
              ],
              timestamp: new Date().toISOString()
            }]
          };

          // Step 3: Send the beautifully formatted data to Discord
          await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }
      } catch (err) {
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