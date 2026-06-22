import { useState, useEffect } from 'react'

const LINES = [
  { text: 'INITIALIZING IFRA BIRTHDAY PROTOCOL...', type: 'success' },
  { text: 'CRITICAL WARNING: Midnight delivery missed. Developer was compiling.', type: 'warn' },
  { text: 'Recalibrating for 3AM perfection... SUCCESS.', type: 'success' },
  { text: 'Scanning academic transcript...', type: '' },
  { text: 'WARNING: Critical damage detected.', type: 'warn' },
  { text: 'Bypassing Real Analysis 2... FAILED (Grade: F).', type: 'error' },
  { text: 'Bypassing Group Theory... FAILED (Grade: F).', type: 'error' },
  { text: 'Bypassing Topology... FATAL ERROR (Grade: F).', type: 'error' },
  { text: 'Redirecting to summer semester retake protocols...', type: 'warn' },
  { text: 'SYSTEM READY. Loading dashboard...', type: 'success' },
]

export default function TerminalSequence({ onComplete }) {
  const [visible, setVisible] = useState([])

  // Adds one line per tick. Index is derived from prev.length, never from
  // a closure variable, so StrictMode's double-invoke / Fast Refresh can't
  // desync it from LINES and cause an out-of-bounds (undefined) entry.
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(prev => {
        if (prev.length >= LINES.length) return prev
        return [...prev, LINES[prev.length]]
      })
    }, 1050)
    return () => clearInterval(interval)
  }, [])

  // Fires onComplete once all lines are in, as a reaction to state
  // rather than inline inside the interval callback.
  useEffect(() => {
    if (visible.length === LINES.length) {
      const timeout = setTimeout(onComplete, 1400)
      return () => clearTimeout(timeout)
    }
  }, [visible, onComplete])

  return (
    <div className="terminal phase">
      <div className="terminal-header">
        <div className="dot dot-r" />
        <div className="dot dot-y" />
        <div className="dot dot-g" />
        <span className="terminal-title">birthday_protocol.sh</span>
      </div>
      {visible.map((line, i) => (
        line && (
          <p key={i} className={`t-line ${line.type}`}>
            {`> ${line.text}`}
          </p>
        )
      ))}
      <span className="cursor">_</span>
    </div>
  )
}
