import { useState, useEffect } from 'react'
import { triggerConfetti } from '../utils/confetti'

const MESSAGE_PARAS = [
  'Happy Birthday, Ifra.',
  "Mai lamba emotional paragraph likhna wala tha laykin I thought, 'Why should I waste my precious time?' (JK, bro). Aap 1 saal aur bari ho gayi maa g, ab please baro ki tarah behave karna bhi start kar dein. hehe.",
  "Jokes aside, you're really a brilliant friend to have. Idk how from that trip to now you became such an important part of my life. Honestly, sometimes your texts and jokes make my worst days into great ones.",
  'Agar koi mujh se pouche k how did you guys become such good friends in a short term? My reaction would be the same as the crowds on Saqlain quote: "tf are you sayin\'?"',
  'But seriously, I am proud to have you as a friend. Be happy and genuine as always. Once again, Happiest Birthday!!!',
]

const FULL_TEXT = MESSAGE_PARAS.join('\n\n')

export default function Finale() {
  const [charCount, setCharCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    triggerConfetti()
    let i = 0
    const interval = setInterval(() => {
      i++
      setCharCount(i)
      if (i >= FULL_TEXT.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 18)
    return () => clearInterval(interval)
  }, [])

  const displayed = FULL_TEXT.slice(0, charCount)
  const paras = displayed.split('\n\n')

  return (
    <div className="finale phase">
      <div className="finale-title">
        <span className="gold-star">✦</span> MESSAGE DECRYPTED <span className="gold-star">✦</span>
      </div>

      <div className="message-body">
        {paras.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {done && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button className="replay-btn" onClick={triggerConfetti}>
            ✦ replay confetti
          </button>
        </div>
      )}
    </div>
  )
}
