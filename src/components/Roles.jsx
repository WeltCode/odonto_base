import { useEffect, useRef } from 'react'

const ROLES = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="14" height="11"/><path d="M1 8l9-6 9 6"/><path d="M8 19v-6h4v6"/><path d="M10 5v3M8 7h4"/>
      </svg>
    ),
    name: 'Dueño de la clínica',
    desc: 'Visibilidad total del negocio: ingresos, ocupación, rendimiento del equipo y métricas clave en tiempo real.',
    items: ['Dashboard financiero y de ingresos', 'Reporte de ocupación por periodo', 'Gestión completa del personal', 'Configuración de marca y clínica'],
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 2C4.5 2 3 4 3 6.5c0 1.5.5 3 1 4.5.6 1.8 1 4 1.5 6 .3 1.2.8 1 1 0 .2-1.2.5-3 1.5-3s1.3 1.8 1.5 3c.2 1 .7 1.2 1 0 .5-2 .9-4.2 1.5-6 .5-1.5 1-3 1-4.5C14 4 12.5 2 10 2c-.8 0-1.5.2-1.5.2S8.8 2 8 2a4 4 0 0 0-1 0z"/>
      </svg>
    ),
    name: 'Dentista',
    desc: 'Su agenda, sus pacientes y el historial clínico completo — organizado para el trabajo diario en consulta sin fricciones.',
    items: ['Agenda personalizada por profesional', 'Acceso completo al expediente', 'Registro rápido de notas clínicas', 'Odontograma digital por paciente'],
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="10" height="14" rx="1"/><path d="M8 3V2h4v1"/><path d="M8 8h4M8 11h4M8 14h2"/>
      </svg>
    ),
    name: 'Recepcionista',
    desc: 'Gestión ágil de la agenda y atención al paciente sin acceso a información clínica sensible — el acceso justo.',
    items: ['Alta y edición de citas', 'Gestión de recordatorios y llamadas', 'Registro de nuevos pacientes', 'Vista de disponibilidad del equipo'],
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="6" r="3"/><path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
      </svg>
    ),
    name: 'Paciente',
    desc: 'El portal refuerza la relación con la clínica y reduce ausencias con comunicación directa y recordatorios automáticos.',
    items: ['Consulta y confirmación de citas', 'Historial de tratamientos propios', 'Mensajería con la clínica', 'Indicaciones y documentos adjuntos'],
  },
]

/* 3-D mouse-tracking tilt with a glint that follows the cursor */
function TiltCard({ children }) {
  const cardRef = useRef(null)
  const glintRef = useRef(null)

  const onMove = e => {
    const r = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
    const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
    cardRef.current.style.transform =
      `perspective(700px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale(1.018) translateZ(10px)`
    if (glintRef.current) {
      glintRef.current.style.opacity = '1'
      glintRef.current.style.background =
        `radial-gradient(160px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(255,255,255,0.13), transparent)`
    }
  }

  const onLeave = () => {
    cardRef.current.style.transform =
      'perspective(700px) rotateX(0) rotateY(0) scale(1) translateZ(0)'
    if (glintRef.current) glintRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: 'transform 0.2s cubic-bezier(.2,.8,.4,1)',
        transformStyle: 'preserve-3d',
        position: 'relative',
        height: '100%',
      }}
    >
      {/* glint overlay */}
      <div
        ref={glintRef}
        style={{
          position: 'absolute', inset: 0, opacity: 0,
          pointerEvents: 'none', transition: 'opacity 0.15s',
          zIndex: 10, borderRadius: 'inherit',
        }}
      />
      {children}
    </div>
  )
}

function RoleCard({ role }) {
  return (
    <div className="group relative bg-white h-full p-9 overflow-hidden transition-colors duration-200 hover:bg-ink-wash">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-ink origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
      <div className="w-[2.625rem] h-[2.625rem] bg-ink rounded-[2px] flex items-center justify-center mb-5 shrink-0 [&_svg]:w-[1.1875rem] [&_svg]:h-[1.1875rem] [&_svg]:text-white">
        {role.icon}
      </div>
      <h3 className="font-display font-extrabold text-[1.125rem] tracking-[-0.025em] text-text-1 mb-2">
        {role.name}
      </h3>
      <p className="text-[0.9375rem] text-text-2 leading-[1.65] mb-5">{role.desc}</p>
      <ul className="flex flex-col gap-1.5">
        {role.items.map(item => (
          <li key={item} className="flex items-start gap-2 text-[0.8125rem] text-text-3">
            <span className="text-ink font-bold shrink-0">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Roles() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const cards = sectionRef.current?.querySelectorAll('[data-card]') ?? []
    cards.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = `opacity 0.45s ${i * 0.07}s ease-out, transform 0.45s ${i * 0.07}s ease-out`
    })
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })
    cards.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="roles" aria-labelledby="roles-heading" className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-5 md:px-8">
        <div className="inline-flex items-center gap-2.5 text-[0.6875rem] font-bold tracking-[0.12em] uppercase text-ink mb-4">
          <span className="w-5 h-[1.5px] bg-ink" />
          Por rol
        </div>
        <h2
          id="roles-heading"
          className="font-display font-extrabold tracking-[-0.035em] leading-[1.1] text-text-1 mb-4"
          style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)' }}
        >
          Una plataforma,<br />todos los roles
        </h2>
        <p className="text-[1.0625rem] text-text-2 leading-[1.65] mb-12" style={{ maxWidth: '54ch' }}>
          Desde el dueño de la clínica hasta el paciente, cada usuario tiene exactamente lo que necesita.
        </p>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 rounded-lg overflow-hidden"
          style={{ gap: '1.5px', background: '#CBD5E1', border: '1.5px solid #CBD5E1' }}
        >
          {ROLES.map(role => (
            <div key={role.name} data-card>
              <TiltCard>
                <RoleCard role={role} />
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
