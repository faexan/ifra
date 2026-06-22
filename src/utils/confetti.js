export function triggerConfetti() {
  const canvas = document.getElementById('particle-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const colors = ['#f472b6', '#c084fc', '#fbbf24', '#fb7185', '#e879f9', '#f9a8d4']

  let count = 0
  function burst() {
    if (count++ > 4) return
    const x = 0.15 + Math.random() * 0.7
    const particles = []

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: canvas.width * x,
        y: canvas.height * 0.55,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 16 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 7 + 3,
        life: 1,
        decay: 0.012 + Math.random() * 0.01,
        rot: Math.random() * 360,
        rotV: (Math.random() - 0.5) * 12,
      })
    }

    function animBurst() {
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        p.vy += 0.45
        p.life -= p.decay
        p.rot += p.rotV
      })
      const alive = particles.filter(p => p.life > 0)
      if (alive.length === 0) return
      alive.forEach(p => {
        ctx.save()
        ctx.globalAlpha = p.life
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot * Math.PI / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      })
      particles.length = 0
      particles.push(...alive)
      requestAnimationFrame(animBurst)
    }
    animBurst()
    setTimeout(burst, 380)
  }
  burst()
}
