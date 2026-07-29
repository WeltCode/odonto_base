import { useEffect, useRef } from 'react'

const STEPS = [
  {
    num: '1',
    title: 'Clona y configura',
    desc: 'Descarga odonto_base desde GitHub, configura tu clínica con nombre, logo y datos de contacto. Listo en minutos con la guía de instalación incluida.',
  },
  {
    num: '2',
    title: 'Personaliza tu marca',
    desc: 'Adapta colores, logo y textos para que la plataforma sea completamente tuya. Tus pacientes verán tu clínica, no un software genérico.',
  },
  {
    num: '3',
    title: 'Invita a tu equipo',
    desc: 'Agrega dentistas, recepcionistas y staff. Cada usuario accede solo a lo que le corresponde según su rol, desde el primer día.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const lineRef    = useRef(null)
  const numRefs    = useRef([])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    /* DELIGHT: connector line draws left-to-right as section enters view */
    const lineEl = lineRef.current
    if (lineEl) {
      lineEl.style.transform = 'scaleX(0)'
      lineEl.style.transformOrigin = 'left'
      lineEl.style.transition = 'transform 0.85s 0.2s cubic-bezier(.16,1,.3,1)'
    }

    /* DELIGHT: step number boxes enter as clinical rubber stamps */
    numRefs.current.forEach(el => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'scale(1.45)'
    })

    /* Text content fades up normally */
    const textEls = sectionRef.current?.querySelectorAll('[data-text]') ?? []
    textEls.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(14px)'
      el.style.transition = `opacity 0.4s ${0.15 + i * 0.1}s ease-out, transform 0.4s ${0.15 + i * 0.1}s ease-out`
    })

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        /* Trigger line draw */
        if (lineEl) lineEl.style.transform = 'scaleX(1)'

        /* Stamp each number box */
        numRefs.current.forEach((el, i) => {
          if (!el) return
          setTimeout(() => {
            el.style.animation = `stamp 0.38s ${i * 0.1}s cubic-bezier(.2,.8,.4,1) both`
          }, i * 60)
        })

        /* Fade-up text */
        textEls.forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        })

        io.disconnect()
      })
    }, { threshold: 0.2 })

    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="py-24 bg-ground-alt border-t border-b border-ruled"
    >
      <div className="max-w-screen-xl mx-auto px-5 md:px-8">
        <div className="inline-flex items-center gap-2.5 text-[0.6875rem] font-bold tracking-[0.12em] uppercase text-ink mb-4">
          <span className="w-5 h-[1.5px] bg-ink" />
          Cómo funciona
        </div>
        <h2
          id="how-heading"
          className="font-display font-extrabold tracking-[-0.035em] leading-[1.1] text-text-1 mb-4"
          style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)' }}
        >
          Tu clínica online en tres pasos
        </h2>
        <p className="text-[1.0625rem] text-text-2 leading-[1.65] mb-14" style={{ maxWidth: '54ch' }}>
          Sin meses de implementación ni contratos complicados. Una base lista para usar, personalizar y crecer.
        </p>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
          {/* DELIGHT: connector line draws itself into view */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-[1.75rem] h-[1.5px] bg-ruled-deep pointer-events-none"
            style={{ left: 'calc(16.666% + 1.75rem)', right: 'calc(16.666% + 1.75rem)' }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <div key={step.num} className="relative">
              {/* DELIGHT: stamp animation on number box */}
              <div
                ref={el => { numRefs.current[i] = el }}
                className="w-14 h-14 bg-ink text-white rounded-[2px] flex items-center justify-center font-display font-black text-[1.375rem] mb-5 relative z-10"
                style={{ willChange: 'transform, opacity' }}
              >
                {step.num}
              </div>
              <div data-text>
                <h3 className="font-display font-extrabold text-[1.0625rem] tracking-[-0.02em] text-text-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-[0.9375rem] text-text-2 leading-[1.65]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
