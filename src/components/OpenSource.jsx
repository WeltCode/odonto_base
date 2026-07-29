import { useEffect, useRef } from 'react'

const CARDS = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3v14M3 7l7-4 7 4"/><path d="M5 9l-2 4h4L5 9zM15 9l-2 4h4l-2-4z"/><path d="M3 17h14"/>
      </svg>
    ),
    title: 'Licencia MIT',
    body: 'Código libre para usar, modificar y distribuir sin restricciones. Construye sobre la base, agrégale lo que necesites, y distribúyelo como tuyo.',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="14" height="10" rx="1"/>
        <circle cx="7"  cy="8" r="1.25" fill="currentColor" stroke="none"/>
        <circle cx="10" cy="8" r="1.25" fill="currentColor" stroke="none"/>
        <circle cx="13" cy="8" r="1.25" fill="currentColor" stroke="none"/>
        <path d="M7 17h6M10 13v4"/>
      </svg>
    ),
    title: 'Tu marca, completamente',
    body: 'Personaliza logos, colores y textos para que la plataforma lleve el nombre de tu clínica. Tus pacientes ven tu identidad, no la nuestra.',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.5 4.5a3 3 0 0 0-4 4L4 16a1.5 1.5 0 0 0 2 2l7.5-7.5a3 3 0 0 0 4-4l-2 2-1.5-1.5 2-2z"/>
      </svg>
    ),
    title: 'Extensible por diseño',
    body: 'Arquitectura modular pensada para crecer. Agrega módulos, integra sistemas externos o adapta flujos específicos a tu práctica sin perder la base.',
  },
]

export default function OpenSource() {
  const gridRef = useRef(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const cards = gridRef.current?.querySelectorAll('[data-card]') ?? []
    cards.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(18px)'
      el.style.transition = `opacity 0.45s ${i * 0.1}s ease-out, transform 0.45s ${i * 0.1}s ease-out`
    })
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' })
    cards.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="open-source"
      aria-labelledby="oss-heading"
      className="py-24 bg-ink"
    >
      <div className="max-w-screen-xl mx-auto px-5 md:px-8">
        <div className="inline-flex items-center gap-2.5 text-[0.6875rem] font-bold tracking-[0.12em] uppercase text-white/55 mb-4">
          <span className="w-5 h-[1.5px] bg-white/40" />
          Open source
        </div>
        <h2
          id="oss-heading"
          className="font-display font-extrabold tracking-[-0.035em] leading-[1.1] text-white mb-4"
          style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)' }}
        >
          Construido para ser tuyo,<br />no rentado.
        </h2>
        <p className="text-[1.0625rem] text-white/70 leading-[1.65] mb-12" style={{ maxWidth: '54ch' }}>
          odonto_base nació como base open source porque las clínicas dentales merecen tecnología sin ataduras — sin suscripciones perpetuas, sin vendor lock-in.
        </p>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 rounded-lg overflow-hidden"
          style={{ gap: '1.5px', background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.12)' }}
        >
          {CARDS.map(card => (
            <div
              key={card.title}
              data-card
              className="group p-8 transition-colors duration-200"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.10)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              <div
                className="w-[2.375rem] h-[2.375rem] rounded-[2px] flex items-center justify-center mb-4 [&_svg]:w-[1.125rem] [&_svg]:h-[1.125rem] [&_svg]:text-white"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                {card.icon}
              </div>
              <h3 className="font-display font-bold text-[1rem] text-white mb-2">
                {card.title}
              </h3>
              <p className="text-[0.9rem] text-white/65 leading-[1.65]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
