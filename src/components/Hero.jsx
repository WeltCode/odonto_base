import { useState, useEffect } from 'react'

const APPOINTMENTS = [
  { time: '09:00', dur: '30 min', name: 'María González',  sub: 'Limpieza · Dr. Ramírez',  badge: 'Confirmada', cls: 'bg-ok-bg text-ok-fg' },
  { time: '10:30', dur: '45 min', name: 'Carlos Herrera',  sub: 'Extracción · Dr. Ramírez', badge: 'Pendiente',  cls: 'bg-warn-bg text-warn-fg' },
  { time: '12:00', dur: '60 min', name: 'Ana López',       sub: 'Ortodoncia · Dra. Vargas', badge: 'Urgente',    cls: 'bg-stamp-wash text-stamp' },
]

function OdontogramRing() {
  const q1 = [['328','30','11'],['372','40','12'],['408','64','13'],['434','100','14'],['448','140','15'],['450','184','16'],['440','228','17'],['422','268','18']]
  const q2 = [['272','30','21'],['228','40','22'],['192','64','23'],['166','100','24'],['152','140','25'],['150','184','26'],['160','228','27'],['178','268','28']]
  const q4 = [['328','624','41'],['372','612','42'],['408','588','43'],['434','554','44'],['448','514','45'],['450','472','46'],['440','428','47'],['422','388','48']]
  const q3 = [['272','624','31'],['228','612','32'],['192','588','33'],['166','554','34'],['152','514','35'],['150','472','36'],['160','428','37'],['178','388','38']]
  return (
    <svg
      aria-hidden="true" focusable="false"
      className="absolute pointer-events-none select-none"
      style={{ right: '-6vw', top: '50%', transform: 'translateY(-50%)', width: 'min(60vw, 680px)', height: 'min(60vw, 680px)', opacity: 0.12 }}
      viewBox="0 0 640 640" fill="none"
    >
      <circle cx="320" cy="320" r="300" stroke="white" strokeWidth="1.5"/>
      <circle cx="320" cy="320" r="220" stroke="white" strokeWidth="1"/>
      <circle cx="320" cy="320" r="140" stroke="white" strokeWidth="0.75"/>
      <line x1="320" y1="20"  x2="320" y2="620" stroke="white" strokeWidth="0.75"/>
      <line x1="20"  y1="320" x2="620" y2="320" stroke="white" strokeWidth="0.75"/>
      <line x1="108" y1="108" x2="532" y2="532" stroke="white" strokeWidth="0.5"/>
      <line x1="532" y1="108" x2="108" y2="532" stroke="white" strokeWidth="0.5"/>
      {q1.map(([x,y,t]) => <text key={t} x={x} y={y} fontSize="11" fill="white" fontFamily="system-ui">{t}</text>)}
      {q2.map(([x,y,t]) => <text key={t} x={x} y={y} fontSize="11" fill="white" fontFamily="system-ui" textAnchor="end">{t}</text>)}
      {q4.map(([x,y,t]) => <text key={t} x={x} y={y} fontSize="11" fill="white" fontFamily="system-ui">{t}</text>)}
      {q3.map(([x,y,t]) => <text key={t} x={x} y={y} fontSize="11" fill="white" fontFamily="system-ui" textAnchor="end">{t}</text>)}
    </svg>
  )
}

function ToothSilhouette() {
  return (
    <svg
      aria-hidden="true" focusable="false"
      className="absolute pointer-events-none select-none"
      style={{ left: '-2vw', bottom: '-4vh', width: 'min(28vw, 320px)', height: 'auto', opacity: 0.06 }}
      viewBox="0 0 200 280" fill="none"
    >
      <path
        d="M100 18 C72 18 46 36 46 72 C46 96 52 118 62 136 C58 158 54 180 50 200 C46 218 50 232 62 234 C74 236 78 220 80 204 C82 188 82 172 82 158 L118 158 C118 172 118 188 120 204 C122 220 126 236 138 234 C150 232 154 218 150 200 C146 180 142 158 138 136 C148 118 154 96 154 72 C154 36 128 18 100 18 Z"
        stroke="white" strokeWidth="3" fill="white"
      />
    </svg>
  )
}

/* ── Appointment preview with live data stream delight ── */
function AppointmentPreview() {
  const [rowVisible, setRowVisible] = useState([false, false, false])

  /* DELIGHT: rows arrive in sequence, like real data streaming from the server */
  useEffect(() => {
    APPOINTMENTS.forEach((_, i) => {
      setTimeout(() => {
        setRowVisible(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 480 + i * 130)
    })
  }, [])

  return (
    <div className="relative">
      <div className="absolute -top-4 -left-5 z-20 bg-stamp text-white font-display text-[0.5625rem] font-black tracking-[0.14em] uppercase px-3 py-1 rounded-[2px] rotate-[-1.75deg] whitespace-nowrap select-none">
        DATOS DE MUESTRA
      </div>
      <div
        className="bg-white rounded-xl overflow-hidden border border-white/10"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)' }}
        role="img"
        aria-label="Vista previa del módulo de agenda"
      >
        {/* DELIGHT: live system indicator in the header */}
        <div className="bg-ink px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="live-dot w-2 h-2 rounded-full shrink-0"
              style={{ background: '#4ADE80' }}
              aria-hidden="true"
            />
            <span className="font-display text-[0.8125rem] font-bold text-white">Clínica Ejemplo · Agenda</span>
          </div>
          <span className="text-[0.6875rem] text-white/60">Mar 29 Jul · 2026</span>
        </div>

        <div className="bg-ground-alt p-4">
          <div className="text-[0.5625rem] font-bold tracking-[0.1em] uppercase text-text-3 pb-2 border-b border-ruled mb-3">
            CITAS DE HOY — 3 registradas
          </div>

          {APPOINTMENTS.map((a, i) => (
            <div
              key={a.name}
              className="bg-white border border-ruled rounded-[4px] px-3 py-2.5 mb-1.5 grid gap-2.5 items-center"
              style={{
                gridTemplateColumns: '2.75rem 1fr auto',
                opacity: rowVisible[i] ? 1 : 0,
                transform: rowVisible[i] ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'opacity 0.32s ease-out, transform 0.32s ease-out',
              }}
            >
              <div className="font-display text-[0.8125rem] font-bold text-ink leading-tight">
                {a.time}
                <span className="block font-normal text-[0.625rem] text-text-3">{a.dur}</span>
              </div>
              <div>
                <span className="block text-[0.8125rem] font-semibold text-text-1">{a.name}</span>
                <span className="text-[0.625rem] text-text-3">{a.sub}</span>
              </div>
              <span className={`text-[0.5rem] font-black tracking-[0.07em] uppercase px-1.5 py-0.5 rounded-[2px] whitespace-nowrap ${a.cls}`}>
                {a.badge}
              </span>
            </div>
          ))}

          <div className="grid grid-cols-3 gap-1.5 mt-3">
            {[['12','Citas hoy'],['4','Doctores'],['98%','Ocupación']].map(([v,l]) => (
              <div key={l} className="bg-white border border-ruled rounded-[4px] p-2 text-center">
                <strong className="block font-display text-[1.125rem] font-black text-ink">{v}</strong>
                <span className="text-[0.5rem] uppercase tracking-[0.06em] text-text-3">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const HEADLINE_LINES = [
  { text: 'Gestión clínica', delay: 0 },
  { text: 'completa, con', delay: 0.14 },
  { text: 'tu marca y bajo', delay: 0.28, accent: true },
  { text: 'tu control.', delay: 0.42, accent: true },
]

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #04112E 0%, #081F52 52%, #1A3FA8 100%)' }}
    >
      <div className="absolute inset-0 ruled-dark pointer-events-none" />
      <OdontogramRing />
      <ToothSilhouette />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-5 md:px-8 pt-28 pb-24">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

          <div>
            <div
              className="inline-flex items-center gap-2 mb-8 font-display text-[0.625rem] font-black tracking-[0.16em] uppercase px-3 py-1.5 rounded-[2px] border border-white/20"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)', animation: 'fade-up 0.5s ease-out both' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-stamp shrink-0" />
              Plataforma dental en la nube
            </div>

            <h1 id="hero-heading" className="font-display font-black leading-[1.03] tracking-[-0.045em] mb-7"
              style={{ fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)' }}>
              {HEADLINE_LINES.map(({ text, delay, accent }) => (
                <span
                  key={text}
                  className="block"
                  style={{
                    color: accent ? '#7BA4FF' : 'white',
                    animation: `line-in 0.75s ${delay}s cubic-bezier(.16,1,.3,1) both`,
                  }}
                >
                  {text}
                </span>
              ))}
            </h1>

            <p
              className="text-[1.0625rem] leading-[1.7] mb-10"
              style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '46ch', animation: 'fade-up 0.7s 0.58s ease-out both' }}
            >
              odonto_base es la plataforma que las clínicas dentales merecen: citas, expedientes, personal y portal del paciente — todo en uno, en la nube, personalizable con tu marca y sin instalaciones.
            </p>

            <div className="flex flex-wrap gap-3.5 mb-10" style={{ animation: 'fade-up 0.6s 0.68s ease-out both' }}>
              <a
                href="#cta"
                className="inline-flex items-center gap-2 bg-white text-ink font-bold text-[0.9375rem] px-7 py-3.5 rounded-[2px] hover:bg-ink-wash transition-all duration-150 hover:-translate-y-px"
              >
                Solicitar acceso
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="https://github.com/WeltCode/odonto_base"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-[0.9375rem] px-5 py-3.5 rounded-[2px] transition-all duration-150"
                style={{ color: 'rgba(255,255,255,0.75)', border: '1.5px solid rgba(255,255,255,0.2)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
                  <path d="M7.5 0C3.35 0 0 3.35 0 7.5c0 3.31 2.15 6.12 5.13 7.12.37.07.51-.16.51-.36 0-.17 0-.77 0-1.4-2.09.46-2.53-.99-2.53-.99-.34-.87-.84-1.1-.84-1.1-.69-.47.05-.46.05-.46.76.05 1.16.78 1.16.78.68 1.16 1.78.82 2.21.63.07-.49.27-.82.49-1.01-1.69-.19-3.46-.85-3.46-3.75 0-.83.3-1.5.78-2.03-.08-.19-.34-.96.07-2 0 0 .63-.2 2.07.77.6-.17 1.24-.25 1.88-.25.64 0 1.28.08 1.88.25 1.44-.97 2.07-.77 2.07-.77.41 1.04.15 1.81.07 2 .49.53.78 1.2.78 2.03 0 2.91-1.77 3.55-3.46 3.75.27.23.51.69.51 1.39 0 1.01 0 1.81 0 2.06 0 .2.14.43.52.36C12.85 13.62 15 10.81 15 7.5 15 3.35 11.65 0 7.5 0z"/>
                </svg>
                Ver en GitHub
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5" style={{ animation: 'fade-up 0.6s 0.76s ease-out both' }}>
              {['Todo en la nube', 'Tu marca, tu dominio', 'Multirrol'].map(item => (
                <div key={item} className="flex items-center gap-1.5 text-[0.8125rem] font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-white text-[0.45rem] font-black flex items-center justify-center shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="float" style={{ animation: 'float 6s cubic-bezier(.45,.05,.55,.95) infinite, fade-up 0.7s 0.2s ease-out both' }}>
            <AppointmentPreview />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 scroll-hint" aria-hidden="true">
        <span className="text-[0.5625rem] font-bold tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Explorar</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }} />
    </section>
  )
}
