export default function CTA() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #04112E 0%, #0F2570 50%, #1A3FA8 100%)' }}
    >
      {/* Ruled-dark — clinical line rhythm, same world as hero */}
      <div className="absolute inset-0 ruled-dark pointer-events-none" />

      {/* Odontogram ring — subtle, bottom-right */}
      <svg
        aria-hidden="true" focusable="false"
        className="absolute pointer-events-none select-none"
        style={{ right: '-8vw', bottom: '-8vh', width: 'min(55vw, 560px)', height: 'auto', opacity: 0.08 }}
        viewBox="0 0 640 640" fill="none"
      >
        <circle cx="320" cy="320" r="300" stroke="white" strokeWidth="1.5"/>
        <circle cx="320" cy="320" r="220" stroke="white" strokeWidth="1"/>
        <circle cx="320" cy="320" r="140" stroke="white" strokeWidth="0.75"/>
        <line x1="320" y1="20" x2="320" y2="620" stroke="white" strokeWidth="0.75"/>
        <line x1="20" y1="320" x2="620" y2="320" stroke="white" strokeWidth="0.75"/>
      </svg>

      <div className="relative z-10 max-w-screen-xl mx-auto px-5 md:px-8 text-center">

        {/* Tag */}
        <div
          className="inline-flex items-center gap-2 font-display text-[0.625rem] font-black tracking-[0.16em] uppercase px-3 py-1.5 rounded-[2px] mb-8"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-stamp shrink-0" />
          Empieza hoy — es gratis
        </div>

        <h2
          id="cta-heading"
          className="font-display font-black tracking-[-0.045em] leading-[1.06] text-white mx-auto mb-6"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', maxWidth: '20ch' }}
        >
          Tu clínica merece una herramienta a su medida.
        </h2>

        <p
          className="text-[1.0625rem] leading-[1.65] mx-auto mb-12"
          style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '46ch' }}
        >
          Solicita acceso a odonto_base y lleva la gestión dental al siguiente nivel — con tu marca, bajo tu control, sin costos de licencia permanentes.
        </p>

        {/* CTAs — primary pulses */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Pulsing primary */}
          <div className="btn-pulse-wrap rounded-[2px]">
            <a
              href="#"
              className="relative inline-flex items-center gap-2 bg-white text-ink font-bold text-[1rem] px-8 py-4 rounded-[2px] hover:bg-ink-wash transition-all duration-150 hover:-translate-y-px"
            >
              Solicitar acceso gratuito
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <a
            href="https://github.com/WeltCode/odonto_base"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-[1rem] px-7 py-4 rounded-[2px] transition-all duration-150"
            style={{ color: 'rgba(255,255,255,0.75)', border: '1.5px solid rgba(255,255,255,0.2)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
          >
            Ver en GitHub
          </a>
        </div>

        <p
          className="text-[0.75rem] mt-10 pt-8"
          style={{ color: 'rgba(255,255,255,0.3)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          Plataforma en la nube · Con tu marca · Soporte incluido ·{' '}
          <em>Los datos mostrados son de ejemplo — tu clínica gestiona los suyos.</em>
        </p>
      </div>
    </section>
  )
}
