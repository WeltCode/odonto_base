import { useRef, useState, useEffect } from 'react'

const PANELS = [
  {
    num: '01',
    tag: 'Gestión de citas',
    heading: 'Agenda inteligente para toda la clínica',
    body: 'Visualiza, programa y gestiona todas las citas desde un solo lugar. Recordatorios automáticos, vistas por doctor y sala, y sincronización en tiempo real para todo el equipo.',
    items: [
      'Calendario diario, semanal y mensual',
      'Recordatorios por WhatsApp o correo',
      'Múltiples dentistas y salas en paralelo',
      'Reservas online para pacientes',
    ],
    bg: 'bg-white',
  },
  {
    num: '02',
    tag: 'Expedientes clínicos',
    heading: 'El historial completo de cada paciente',
    body: 'Registra tratamientos, notas clínicas, radiografías y odontogramas. Todo el historial del paciente, organizado y accesible en segundos desde cualquier consulta.',
    items: [
      'Odontograma digital interactivo',
      'Historial de tratamientos y pagos',
      'Adjuntos: radiografías, fotografías, archivos',
      'Notas clínicas estructuradas por visita',
    ],
    bg: 'bg-ink-wash',
  },
  {
    num: '03',
    tag: 'Gestión de personal',
    heading: 'Cada rol, cada permiso, bajo control',
    body: 'Asigna roles con accesos diferenciados. El dueño ve todo; el dentista accede a sus pacientes; la recepcionista gestiona la agenda. Sin superposición, sin confusión.',
    items: [
      'Roles: Dueño, Dentista, Recepcionista',
      'Permisos granulares por módulo',
      'Horarios y disponibilidad por profesional',
      'Registro de actividad del equipo',
    ],
    bg: 'bg-white',
  },
  {
    num: '04',
    tag: 'Portal del paciente',
    heading: 'Tu clínica en el bolsillo de tus pacientes',
    body: 'Los pacientes pueden ver su historial, confirmar citas, recibir recordatorios y comunicarse con la clínica — desde cualquier dispositivo, en cualquier momento.',
    items: [
      'Historial y próximas citas',
      'Confirmación y cancelación en línea',
      'Mensajería con el equipo clínico',
      'Acceso a indicaciones y documentos',
    ],
    bg: 'bg-ink-wash',
  },
]

const PANEL_LABELS = PANELS.map(p => p.tag)

/* ── Panel visual components ── */
function CalendarVisual() {
  const days = ['Lun','Mar','Mié','Jue','Vie']
  const vals = [
    { label: '4 citas', cls: 'bg-ink text-white font-bold' },
    { label: 'Hoy',    cls: 'bg-ink-wash text-ink font-bold border-[1.5px] border-ink' },
    { label: '5 citas', cls: 'bg-white border border-ruled text-text-3' },
    { label: '3 citas', cls: 'bg-white border border-ruled text-text-3' },
    { label: '7 citas', cls: 'bg-stamp-wash border border-stamp text-stamp font-bold' },
  ]
  return (
    <div className="bg-white border-[1.5px] border-ruled-deep rounded-lg overflow-hidden max-w-xs w-full" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)' }}>
      <div className="bg-ink px-3.5 py-2.5 flex justify-between items-center">
        <span className="font-display text-[0.75rem] font-bold text-white">Vista semanal</span>
        <span className="text-[0.625rem] text-white/60">Jul 2026</span>
      </div>
      <div className="p-3.5 bg-ground-alt">
        <div className="grid grid-cols-5 gap-1 mb-1.5">
          {days.map(d => <div key={d} className="text-center text-[0.5rem] font-bold text-text-3 uppercase tracking-wider">{d}</div>)}
        </div>
        <div className="grid grid-cols-5 gap-1">
          {vals.map(v => <div key={v.label} className={`text-center text-[0.5625rem] rounded-[3px] py-1.5 ${v.cls}`}>{v.label}</div>)}
        </div>
        <div className="mt-2 p-2 bg-white border border-ruled rounded-[4px]">
          <div className="text-[0.5rem] font-bold text-text-3 uppercase tracking-wider mb-1">Próxima disponible</div>
          <div className="text-[0.6875rem] font-bold text-text-1">Jue 31 Jul — 14:00</div>
          <div className="text-[0.5625rem] text-text-3">Dr. Ramírez · Sala 2</div>
        </div>
      </div>
    </div>
  )
}

function RecordVisual() {
  return (
    <div className="bg-white border-[1.5px] border-ruled-deep rounded-lg overflow-hidden max-w-xs w-full" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)' }}>
      <div className="bg-ink px-3.5 py-2.5 flex justify-between items-center">
        <span className="font-display text-[0.75rem] font-bold text-white">Expediente #00142</span>
        <span className="text-[0.5625rem] font-bold bg-ok-bg text-ok-fg px-1.5 py-0.5 rounded-[2px] uppercase tracking-wide">Activo</span>
      </div>
      <div className="p-3.5 bg-white">
        <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-ruled">
          <div className="w-9 h-9 rounded-full bg-ink flex items-center justify-center text-white font-display font-black text-[0.875rem] shrink-0">MG</div>
          <div>
            <div className="font-semibold text-[0.8125rem] text-text-1">María González</div>
            <div className="text-[0.5625rem] text-text-3">34 años · Paciente desde Ene 2023</div>
          </div>
        </div>
        <div className="text-[0.5rem] font-bold uppercase tracking-[0.09em] text-text-3 mb-1.5">Última consulta — 22 Jul 2026</div>
        <div className="bg-ground-alt border border-ruled rounded-[4px] p-2 text-[0.75rem] text-text-2 leading-relaxed mb-2">
          Limpieza dental + Sellador diente 36. Buen estado periodontal. Próxima cita en 6 meses.
        </div>
        <div className="flex gap-1 flex-wrap">
          {['Limpieza','Sellador','Sin observaciones'].map(t => (
            <span key={t} className={`text-[0.5rem] font-black uppercase tracking-[0.05em] px-1.5 py-0.5 rounded-[2px] ${t === 'Sin observaciones' ? 'bg-ok-bg text-ok-fg' : 'bg-ink-wash text-ink'}`}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function StaffVisual() {
  const staff = [
    { initials:'DR', name:'Dr. Ramírez',   sub:'Dueño y Dentista',  role:'Dueño',     ic:'bg-white/20 text-white', rc:'bg-white/20 text-white',     wrap:'bg-ink' },
    { initials:'DV', name:'Dra. Vargas',    sub:'Ortodoncista',      role:'Dentista',   ic:'bg-ink-wash text-ink',  rc:'bg-ink-wash text-ink',       wrap:'bg-white border-[1.5px] border-ruled-deep' },
    { initials:'LM', name:'Lucía Mendoza',  sub:'Recepcionista',     role:'Staff',      ic:'bg-ok-bg text-ok-fg',   rc:'bg-ok-bg text-ok-fg',        wrap:'bg-white border-[1.5px] border-ruled-deep' },
  ]
  return (
    <div className="flex flex-col gap-1.5 max-w-xs w-full">
      {staff.map(s => (
        <div key={s.name} className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg ${s.wrap}`}
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-[0.6875rem] shrink-0 ${s.ic}`}>{s.initials}</div>
            <div>
              <div className={`font-bold text-[0.8125rem] ${s.wrap === 'bg-ink' ? 'text-white' : 'text-text-1'}`}>{s.name}</div>
              <div className={`text-[0.5625rem] ${s.wrap === 'bg-ink' ? 'text-white/55' : 'text-text-3'}`}>{s.sub}</div>
            </div>
          </div>
          <span className={`text-[0.5rem] font-black uppercase tracking-[0.07em] px-2 py-0.5 rounded-[2px] ${s.rc}`}>{s.role}</span>
        </div>
      ))}
    </div>
  )
}

function PortalVisual() {
  return (
    <div className="w-44 bg-text-1 rounded-3xl p-3.5" style={{ boxShadow: '0 20px 48px rgba(10,15,30,0.28)' }}>
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="bg-ink px-3 py-3 text-center">
          <div className="text-[0.5rem] font-bold uppercase tracking-[0.1em] text-white/60 mb-1">Mi Clínica</div>
          <div className="font-display font-black text-[0.8125rem] text-white">Hola, María</div>
        </div>
        <div className="p-2.5 bg-ground-alt">
          <div className="bg-white border border-ruled rounded-[5px] p-2 mb-1.5">
            <div className="text-[0.5rem] font-bold uppercase tracking-[0.08em] text-ink mb-1">Próxima cita</div>
            <div className="text-[0.6875rem] font-bold text-text-1">Mié 3 Ago · 10:00</div>
            <div className="text-[0.5rem] text-text-3">Dr. Ramírez · Limpieza</div>
          </div>
          <div className="flex gap-1">
            <button className="flex-1 bg-ink text-white rounded-[4px] py-1.5 text-[0.5rem] font-bold">Confirmar</button>
            <button className="flex-1 bg-white border border-ruled text-text-3 rounded-[4px] py-1.5 text-[0.5rem] font-bold">Historial</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const VISUALS = [<CalendarVisual />, <RecordVisual />, <StaffVisual />, <PortalVisual />]

export default function FeatureRail() {
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const fillRef  = useRef(null)
  const [panel, setPanel] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const outer = outerRef.current
    const track = trackRef.current
    const fill  = fillRef.current
    if (!outer || !track) return

    const onScroll = () => {
      const rect     = outer.getBoundingClientRect()
      const scrolled = -rect.top
      const range    = rect.height - window.innerHeight
      if (range <= 0) return
      const p = Math.min(Math.max(scrolled / range, 0), 1)
      track.style.transform = `translateX(-${p * 300}vw)`
      if (fill) fill.style.width = `${((p * 3 + 1) / 4) * 100}%`
      setPanel(Math.min(Math.floor(p * 4), 3))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  /* ── Mobile: simple vertical stack ── */
  if (isMobile) {
    return (
      <div id="features" aria-label="Funciones principales">
        {PANELS.map((p, i) => (
          <div key={p.num} className={`px-5 py-14 border-t ${i === 0 ? 'border-ink border-t-[2.5px]' : 'border-ruled'} ${p.bg}`}>
            <div className="font-display text-[4.5rem] font-black text-ink/10 leading-none tracking-[-0.06em] mb-[-0.75rem]">{p.num}</div>
            <div className="text-[0.6875rem] font-bold tracking-[0.12em] uppercase text-stamp mb-2">{p.tag}</div>
            <h2 className="font-display font-extrabold text-[1.625rem] tracking-[-0.03em] leading-[1.15] text-text-1 mb-3">{p.heading}</h2>
            <p className="text-[0.9375rem] text-text-2 leading-[1.7] mb-5">{p.body}</p>
            <ul className="flex flex-col gap-2">
              {p.items.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-text-2">
                  <span className="w-4 h-4 bg-ink text-white rounded-[2px] text-[0.5rem] font-black flex items-center justify-center shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  /* ── Desktop: horizontal sticky rail ── */
  return (
    <div id="features" ref={outerRef} style={{ height: '400vh' }} aria-label="Funciones principales">
      <div className="sticky top-0 h-screen overflow-hidden border-t-[2.5px] border-ink">
        {/* Track */}
        <div ref={trackRef} className="flex h-full" style={{ width: '400vw', willChange: 'transform' }}>
          {PANELS.map((p, i) => (
            <div key={p.num} className={`flex items-center px-8 shrink-0 ${p.bg}`} style={{ width: '100vw' }}>
              <div className="max-w-screen-xl mx-auto w-full grid grid-cols-2 gap-16 items-center">
                {/* Text */}
                <div>
                  <div className="font-display font-black leading-none tracking-[-0.06em] text-ink/10 mb-[-0.75rem]" style={{ fontSize: '5.5rem' }}>{p.num}</div>
                  <div className="text-[0.6875rem] font-bold tracking-[0.12em] uppercase text-stamp mb-3">{p.tag}</div>
                  <h2 className="font-display font-extrabold tracking-[-0.035em] leading-[1.12] text-text-1 mb-3.5" style={{ fontSize: 'clamp(1.625rem, 3vw, 2.375rem)' }}>{p.heading}</h2>
                  <p className="text-[1rem] text-text-2 leading-[1.7] mb-6" style={{ maxWidth: '44ch' }}>{p.body}</p>
                  <ul className="flex flex-col gap-2">
                    {p.items.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-text-2">
                        <span className="w-[1.125rem] h-[1.125rem] bg-ink text-white rounded-[2px] text-[0.5rem] font-black flex items-center justify-center shrink-0 mt-[0.1875rem]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Visual */}
                <div className="flex items-center justify-center">{VISUALS[i]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-ruled">
          <div ref={fillRef} className="h-full bg-ink transition-none" style={{ width: '25%' }} />
        </div>

        {/* Dots + hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4" aria-hidden="true">
          <div className="flex gap-1.5">
            {PANELS.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-250 ${i === panel ? 'w-[7px] h-[7px] bg-ink scale-[1.4]' : 'w-[6px] h-[6px] bg-ruled-deep'}`}
              />
            ))}
          </div>
          <span className="font-display text-[0.5625rem] font-bold tracking-[0.1em] uppercase text-text-3">
            {PANEL_LABELS[panel]} ({panel + 1}/{PANELS.length})
          </span>
        </div>
      </div>
    </div>
  )
}
