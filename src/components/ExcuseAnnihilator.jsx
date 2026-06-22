import { useState, useRef, useEffect } from 'react'

const INITIAL_EXCUSES = [
  { id: 1, text: 'Compiling the code, sorry!', delay: '0s' },
  { id: 2, text: 'Net nahi aa raha tha.', delay: '0.2s' },
  { id: 3, text: '3 AM aesthetic ka wait kar raha tha', delay: '0.4s' },
  { id: 4, text: 'I fell asleep (JK bro)', delay: '0.6s' },
  { id: 5, text: 'Was listening to Lana Del Rey', delay: '0.8s' },
]

const APOLOGIES = [
  'Acha sorry yar...',
  'My bad, maa g.',
  'Ghalti ho gayi bhae.',
  'Okay okay, valid hit.',
  'Access granted. Stop hitting me.',
]

// Audio file paths (Replace with your actual assets)
const HIT_SOUND_URL = '../punch.mp3'
const DESTROY_SOUND_URL = '../distroyed.mp3'

export default function ExcuseAnnihilator({ onComplete }) {
  // Initialize excuses with a random hit capacity between 2 and 4
  const [excuses, setExcuses] = useState(() => 
    INITIAL_EXCUSES.map(exc => ({
      ...exc,
      hitsLeft: Math.floor(Math.random() * 3) + 2 // Generates 2, 3, or 4 hits
    }))
  )
  const [apologies, setApologies] = useState([])
  const [smashing, setSmashing] = useState(null)
  
  const smashCountRef = useRef(0)
  const hitAudioRef = useRef(null)
  const destroyAudioRef = useRef(null)

  // Preload audio objects on mount
  useEffect(() => {
    hitAudioRef.current = new Audio(HIT_SOUND_URL)
    destroyAudioRef.current = new Audio(DESTROY_SOUND_URL)
  }, [])

  const playSound = (isDestroyed) => {
    const audio = isDestroyed ? destroyAudioRef.current : hitAudioRef.current
    if (audio) {
      audio.currentTime = 0 // Rewind to start for rapid successive clicks
      audio.play().catch(() => {
        // Handle browser autoplay blockages gracefully
      })
    }
  }

  const smash = (id) => {
    if (smashing === id) return
    setSmashing(id)

    // Find the target element to assess if it's the final blow
    const target = excuses.find(e => e.id === id)
    if (!target) return

    const isFinalBlow = target.hitsLeft <= 1

    // Play appropriate sound immediately on click for instant responsive feedback
    playSound(isFinalBlow)

    setTimeout(() => {
      if (isFinalBlow) {
        const currentSmashIndex = smashCountRef.current
        const apologyText = APOLOGIES[currentSmashIndex] || 'Okay I give up...'
        smashCountRef.current += 1

        setExcuses((prevExcuses) => {
          const next = prevExcuses.filter(e => e.id !== id)
          if (next.length === 0 && onComplete) {
            setTimeout(onComplete, 1100)
          }
          return next
        })

        setApologies((prevApologies) => [
          { id: crypto.randomUUID(), text: apologyText },
          ...prevApologies
        ])
      } else {
        // Decrement hit counter if the bubble survives
        setExcuses((prevExcuses) =>
          prevExcuses.map(e => e.id === id ? { ...e, hitsLeft: e.hitsLeft - 1 } : e)
        )
      }
      
      setSmashing(null)
    }, 120) // Slightly reduced timeout window for snappy successive combos
  }

  return (
    <div className="phase">
      <div className="game-header">
        <div className="game-title">LATE DELIVERY INTERROGATION 💅</div>
        <div className="game-sub">Smash all excuses like you are hitting Faizan. Zor se marro bhai</div>
        <div className="progress-text">
          Targets remaining: <strong>{excuses.length}</strong>
        </div>
      </div>

      <div className="game-area">
        {excuses.map(exc => (
          <button
            key={exc.id}
            className={`excuse-bubble${smashing === exc.id ? ' smashed' : ''}`}
            style={{ 
              animationDelay: exc.delay,
              transform: smashing === exc.id ? 'scale(0.9) rotate(-3deg)' : 'scale(1)'
            }}
            onClick={() => smash(exc.id)}
          >
            <span className="excuse-text">{exc.text}</span>
            <span className="hit-badge">HP: {exc.hitsLeft}</span>
          </button>
        ))}
      </div>

      <div className="apology-log">
        {apologies.length === 0 ? (
          <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>&gt; Awaiting justice...</span>
        ) : (
          apologies.map((ap) => (
            <p key={ap.id} className="apology-text">{`> System: ${ap.text}`}</p>
          ))
        )}
      </div>
    </div>
  )
}