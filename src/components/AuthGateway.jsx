import { useState } from 'react'

const ANSWER = 'bakri'

export default function AuthGateway({ onUnlock }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (input.toLowerCase().trim() === ANSWER) {
      setError(false)
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => { setError(false); setShake(false) }, 2500)
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card phase">
        <div className="glitch-title">// identity verification</div>
        <p className="auth-sub">
          This is a highly secure protocol.<br />
          Answer correctly to proceed.
        </p>
        <div className="auth-question">Aapka Title Kiya hai?</div>
        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="B....."
            autoFocus
            autoComplete="off"
            spellCheck="false"
            style={shake ? { borderColor: '#fb7185' } : {}}
          />
          <button className="auth-btn" type="submit">
            UNLOCK PROTOCOL
          </button>
        </form>
        {error && (
          <p className="error-msg">
            ERROR: Access Denied. Hint: text me lol
          </p>
        )}
      </div>
    </div>
  )
}
