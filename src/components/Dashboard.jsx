import { useState } from 'react'
import { triggerConfetti } from '../utils/confetti'

const RUTHLESS_METRICS = [
  'Actual Status: Certified Bakri 🐐',
  'Classes Survived: Some (barely)',
  'Tissue Consumption: Deforestation risk HIGH',
  'Water Bottle: 10% Hers, 90% Faizan\'s',
]
const SINCERE_METRICS = [
  'Recognized Status: THE GOAT ✨',
  'Loyalty Level: 100%',
  'BTS Defense Protocol: Lethal',
  'Vibe: Immaculate',
]

const RUTHLESS_ALERT = "Enjoy as much as you can because it won't last long. Summer semester loading... Prepare for maximum academic damage bro."
const SINCERE_ALERT  = "Enjoy the vacation puri tarah! I know that boring hostel room is waiting, but don't stress about it today. We will survive the summer semester together."

const POLAROIDS = [
  { emoji: '🏔️', bg: '#e8c8f0', caption: 'The Hike\nRIP stamina',       rot: '-4deg' },
  { emoji: '✨', bg: '#c8d8f0', caption: 'The \n GOAT',        rot:  '3deg' },
  { emoji: '💜', bg: '#f0c8e0', caption: 'KDrama hours\ndo not disturb',    rot: '-2deg' },
  { emoji: '📚', bg: '#f0e8c8', caption: "Sir Amir's courses\nwe don't\ntalk about it", rot: '5deg' },
]

export default function Dashboard({ onFinale }) {
  const [isSincere, setIsSincere] = useState(false)
  const [vaultOpen, setVaultOpen] = useState(false)

  const metrics = isSincere ? SINCERE_METRICS : RUTHLESS_METRICS
  const alertText = isSincere ? SINCERE_ALERT : RUTHLESS_ALERT

  const handleDecrypt = () => {
    triggerConfetti()
    setTimeout(onFinale, 400)
  }

  return (
    <div className="dashboard-wrapper phase">

      <div className="toggle-row">
        <span className={!isSincere ? 'lbl-active' : 'lbl-inactive'}>RUTHLESS</span>
        <label className="switch">
          <input type="checkbox" checked={isSincere} onChange={e => setIsSincere(e.target.checked)} />
          <span className="slider" />
        </label>
        <span className={isSincere ? 'lbl-active' : 'lbl-inactive'}>SINCERE</span>
      </div>

      <div className="dash-grid">
        <div className="widget">
          <div className="widget-title" style={{ color: isSincere ? 'var(--lavender)' : 'var(--rose)' }}>
            {isSincere ? 'Genuine Metrics' : 'Friendship Metrics'}
          </div>
          <ul className="metrics-list">
            {metrics.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </div>

        <div
          className="widget"
          style={isSincere
            ? { borderColor: 'rgba(147,51,234,0.3)', background: 'rgba(147,51,234,0.05)' }
            : { borderColor: 'rgba(251,113,133,0.25)', background: 'rgba(251,113,133,0.05)' }
          }
        >
          <div className="widget-title" style={{ color: isSincere ? 'var(--lavender)' : '#fb7185' }}>
            {isSincere ? 'Current Status' : 'System Warning'}
          </div>
          <p style={{ fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.7 }}>
            {alertText}
          </p>
        </div>
      </div>

      <div className="gallery-section">
        <div className="gallery-label">// Memory Archive</div>
        <div className="polaroids">
          {POLAROIDS.map((p, i) => (
            <div key={i} className="polaroid" style={{ '--rot': p.rot }}>
              <div className="polaroid-img" style={{ background: p.bg }}>{p.emoji}</div>
              <div className="polaroid-caption">{p.caption}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="vault-btn" onClick={() => setVaultOpen(v => !v)}>
        {vaultOpen ? 'CLOSE ARCHIVES' : 'DECRYPT TRIP LOGS'}
      </button>

      {vaultOpen && (
        <div className="vault-card">
          <div className="vault-label">ARCHIVE 01 — THE ORIGIN</div>
          <p className="vault-text">
            Trip par geya after facing third party rejection (ifykyk) and met some of the most amazing people I know.
          </p>
          <div className="vault-label">ARCHIVE 02 — THE HIKE</div>
          <p className="vault-text">
            <strong style={{ color: 'var(--text)' }}>Expectation:</strong> A scenic, aesthetic mountain walk.<br />
            <strong style={{ color: 'var(--text)' }}>Reality:</strong> Me literally dragging you up the mountain because your hiking stamina completely failed.
          </p>
        </div>
      )}

      <button className="decrypt-btn" onClick={handleDecrypt}>
        ✦ DECRYPT SINCERE MESSAGE ✦
      </button>
    </div>
  )
}
