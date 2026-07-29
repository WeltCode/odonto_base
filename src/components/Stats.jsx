import { useRef, useState, useEffect } from 'react'

function useCountUp(target, duration, active) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    const isFloat = !Number.isInteger(target)
    const raf = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setValue(isFloat ? parseFloat((ease * target).toFixed(1)) : Math.round(ease * target))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [active, target, duration])
  return value
}

const STATS = [
  { target: 4,   suffix: '',   label: 'Módulos integrados',   duration: 1400 },
  { target: 3,   suffix: '',   label: 'Roles con permisos',   duration: 1300 },
  { target: 100, suffix: '%',  label: 'En la nube',           duration: 1600 },
  { target: 24,  suffix: '/7', label: 'Acceso continuo',      duration: 1500 },
]

function StatItem({ stat, active, delayMs }) {
  const count   = useCountUp(stat.target, stat.duration, active)
  const display = stat.format ? stat.format(count) : count

  /* DELIGHT: "cifra registrada" — badge stamps in when the counter settles */
  const [stamped, setStamped] = useState(false)
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setStamped(true), stat.duration + 320)
    return () => clearTimeout(t)
  }, [active, stat.duration])

  return (
    <div
      className="flex flex-col items-center text-center px-6 py-8"
      style={{
        opacity:    active ? 1 : 0,
        transform:  active ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.5s ${delayMs}ms ease-out, transform 0.5s ${delayMs}ms ease-out`,
      }}
    >
      <span
        className="font-display font-black leading-none tracking-[-0.04em] text-ink mb-2"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        aria-label={`${stat.target}${stat.suffix}`}
      >
        {display}{stat.suffix}
      </span>
      <span className="text-[0.9375rem] font-medium text-text-2 mt-1">{stat.label}</span>

      {/* DELIGHT: clinical verification badge appears after count completes */}
      {stamped && (
        <span
          className="mt-3 inline-flex items-center gap-1 font-display text-[0.5rem] font-black tracking-[0.1em] uppercase text-ink border border-ink/30 px-2 py-[3px] rounded-[2px]"
          style={{ animation: 'badge-stamp 0.32s cubic-bezier(.2,.8,.4,1) both' }}
          aria-hidden="true"
        >
          ✓ registrado
        </span>
      )}
    </div>
  )
}

export default function Stats() {
  const ref    = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Estadísticas de la plataforma"
      className="bg-white border-b border-ruled"
    >
      <div className="max-w-screen-xl mx-auto">
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: '1.5px', background: '#E2E8F0' }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="bg-white">
              <StatItem stat={stat} active={active} delayMs={i * 80} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
