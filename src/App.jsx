import { useState, useCallback, useEffect } from 'react'
import AuthGateway from './components/AuthGateway'
import TerminalSequence from './components/TerminalSequence'
import ExcuseAnnihilator from './components/ExcuseAnnihilator'
import Dashboard from './components/Dashboard'
import Finale from './components/Finale'
import ParticleBackground from './components/ParticleBackground'
import './App.css'

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1518559811560542348/fudhFlDLjdKbKLdqH_SoB4GCRuOcZJw46LtjScu0LmmySPOntm_RpDBLbbYQSKf1a4EV";

export default function App() {
  const [phase, setPhase] = useState('AUTH')
  
 
 // Background tracking function
 // Background tracking function
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        if (!DISCORD_WEBHOOK_URL) return;

        // Create a unique callback identifier for the global scope
        const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        
        window[callbackName] = async (data) => {
          // Clean up the script traces instantly from memory
          delete window[callbackName];
          document.getElementById(callbackName)?.remove();

          // Safely extract parameters with fallbacks to avoid passing "undefined" to Discord
          const visitorIp = data.ip || "Unknown IP";
          const locationText = data.city && data.region && data.country_name 
            ? `${data.city}, ${data.region}, ${data.country_name}` 
            : "Unknown Location";
          const providerNet = data.org || "Unknown Network";

          // Corrected structural payload format expected by Discord
          const payload = {
            embeds: [{
              title: "🎉 Birthday Site Accessed!",
              color: 16021430, 
              fields: [
                { name: "IP Address", value: visitorIp, inline: true },
                { name: "Location", value: locationText, inline: true },
                { name: "ISP/Network", value: providerNet, inline: false },
                { name: "Device Info", value: navigator.userAgent.slice(0, 150), inline: false }
              ],
              timestamp: new Date().toISOString()
            }]
          };

          // Post to your verified Discord webhook channel
          await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        };

        // Inject the secure script element to safely slide past CORS walls
        const script = document.createElement('script');
        script.id = callbackName;
        script.src = `https://ipapi.co/jsonp/?callback=${callbackName}`;

        document.body.appendChild(script);
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