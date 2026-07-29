import { useEffect, useRef } from 'react'

const CARDS = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 15a3.5 3.5 0 0 1-.5-6.96A4.5 4.5 0 0 1 14 7.2 3.4 3.4 0 0 1 15 14H6z"/>
        <path d="M10 11v4M8 13l2 2 2-2"/>
      </svg>
    ),
    title: 'Sin instalaciones ni servidores',
    body: 'Nosotros hospedamos y mantenemos todo. Tú entras desde el navegador, en cualquier dispositivo, y empiezas a trabajar. Las actualizaciones y mejoras llegan solas.',
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
    body: 'Personaliza logo, colores y textos para que la plataforma lleve el nombre de tu clínica. Tus pacientes ven tu identidad, no la nuestra.',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l6 2.5v4C16 13 13.5 16 10 18 6.5 16 4 13 4 8.5v-4L10 2z"/>
        <path d="M7.5 10l1.8 1.8L13 8"/>
      </svg>
    ),
    title: 'Seguridad de nivel clínico',
    body: 'Datos cifrados, copias de seguridad automáticas y control de accesos por rol. La información de tus pacientes protegida y siempre disponible.',
  },
]

export default function Platform() {
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
      id="plataforma"
      aria-labelledby="platform-heading"
      className="py-24 bg-ink"
    >
      <div className="max-w-screen-xl mx-auto px-5 md:px-8">
        <div className="inline-flex items-center gap-2.5 text-[0.6875rem] font-bold tracking-[0.12em] uppercase text-white/55 mb-4">
          <span className="w-5 h-[1.5px] bg-white/40" />
          Plataforma
        </div>
        <h2
          id="platform-heading"
          className="font-display font-extrabold tracking-[-0.035em] leading-[1.1] text-white mb-4"
          style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)' }}
        >
          Tú te dedicas a tus pacientes,<br />nosotros a la tecnología.
        </h2>
        <p className="text-[1.0625rem] text-white/70 leading-[1.65] mb-12" style={{ maxWidth: '54ch' }}>
          odonto_base es una plataforma gestionada en la nube: sin servidores que administrar, sin instalaciones y sin sorpresas técnicas. Tú te enfocas en tu clínica, nosotros en que todo funcione.
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
