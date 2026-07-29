import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Funciones',     href: '#features' },
  { label: 'Por rol',       href: '#roles' },
  { label: 'Cómo funciona', href: '#how-it-works' },
  { label: 'Plataforma',    href: '#plataforma' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [progress,  setProgress]  = useState(0)
  const [open,      setOpen]      = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y     = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      setScrolled(y > 8)
      setProgress(total > 0 ? (y / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-[background,box-shadow] duration-200
        ${scrolled ? 'bg-white/96 backdrop-blur-xl shadow-[0_1px_0_0_#E2E8F0]' : 'bg-transparent'}`}
    >
      {/* ── Scroll progress bar ── */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-ink transition-none z-20"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* ── Main row ── */}
      <div className="h-full max-w-screen-xl mx-auto px-5 md:px-8 flex items-center justify-between gap-6">

        {/* Logo */}
        <a
          href="#"
          aria-label="odonto_base — inicio"
          className="flex items-center gap-2.5 shrink-0"
        >
          <span
            className="font-display font-black text-[1.0625rem] tracking-[-0.03em] leading-none"
            style={{ color: scrolled ? '#1A3FA8' : 'white' }}
          >
            odonto<span className="text-stamp">_</span>base
          </span>
          <span
            className="hidden sm:flex items-center text-[0.5rem] font-bold tracking-[0.13em] uppercase px-1.5 py-[3px] rounded-[2px] leading-none transition-colors duration-200"
            style={scrolled
              ? { background: '#EEF3FF', color: '#1A3FA8', border: '1px solid rgba(26,63,168,0.2)' }
              : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)' }
            }
          >
            en la nube
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[0.875rem] font-medium py-1 group transition-colors duration-150"
              style={{ color: scrolled ? '#374151' : 'rgba(255,255,255,0.72)' }}
              onMouseEnter={e => e.currentTarget.style.color = scrolled ? '#1A3FA8' : 'white'}
              onMouseLeave={e => e.currentTarget.style.color = scrolled ? '#374151' : 'rgba(255,255,255,0.72)'}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-ink scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* GitHub */}
          <a
            href="https://github.com/WeltCode/odonto_base"
            target="_blank" rel="noopener noreferrer"
            aria-label="Ver en GitHub"
            className="hidden lg:flex items-center gap-1.5 text-[0.8125rem] font-medium px-3 py-[7px] rounded-[2px] transition-all duration-150"
            style={scrolled
              ? { color: '#6B7280', border: '1px solid #CBD5E1' }
              : { color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.2)' }
            }
            onMouseEnter={e => { e.currentTarget.style.color = scrolled ? '#1A3FA8' : 'white'; e.currentTarget.style.borderColor = scrolled ? 'rgba(26,63,168,0.5)' : 'rgba(255,255,255,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.color = scrolled ? '#6B7280' : 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = scrolled ? '#CBD5E1' : 'rgba(255,255,255,0.2)' }}
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
              <path d="M7.5 0C3.35 0 0 3.35 0 7.5c0 3.31 2.15 6.12 5.13 7.12.37.07.51-.16.51-.36 0-.17 0-.77 0-1.4-2.09.46-2.53-.99-2.53-.99-.34-.87-.84-1.1-.84-1.1-.69-.47.05-.46.05-.46.76.05 1.16.78 1.16.78.68 1.16 1.78.82 2.21.63.07-.49.27-.82.49-1.01-1.69-.19-3.46-.85-3.46-3.75 0-.83.3-1.5.78-2.03-.08-.19-.34-.96.07-2 0 0 .63-.2 2.07.77.6-.17 1.24-.25 1.88-.25.64 0 1.28.08 1.88.25 1.44-.97 2.07-.77 2.07-.77.41 1.04.15 1.81.07 2 .49.53.78 1.2.78 2.03 0 2.91-1.77 3.55-3.46 3.75.27.23.51.69.51 1.39 0 1.01 0 1.81 0 2.06 0 .2.14.43.52.36C12.85 13.62 15 10.81 15 7.5 15 3.35 11.65 0 7.5 0z"/>
            </svg>
            GitHub
          </a>

          {/* CTA */}
          <a
            href="#cta"
            className="flex items-center gap-1.5 text-[0.875rem] font-semibold px-4 py-[7px] rounded-[2px] transition-all duration-150"
            style={scrolled
              ? { background: '#1A3FA8', color: 'white' }
              : { background: 'white', color: '#1A3FA8' }
            }
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <span className="hidden sm:inline">Solicitar demo</span>
            <span className="sm:hidden">Demo</span>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 6.5h9M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 ml-0.5 rounded-[2px]"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="block h-[1.5px] transition-all duration-200 origin-center"
                style={{
                  width: i === 1 ? (open ? 0 : '14px') : '18px',
                  background: scrolled ? '#374151' : 'rgba(255,255,255,0.8)',
                  opacity: i === 1 && open ? 0 : 1,
                  transform: open
                    ? (i === 0 ? 'rotate(45deg) translateY(6.5px)' : i === 2 ? 'rotate(-45deg) translateY(-6.5px)' : 'none')
                    : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-250 ease-in-out ${open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-white/98 backdrop-blur-xl border-t border-ruled shadow-sm">
          <nav className="max-w-screen-xl mx-auto px-5 py-3 flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between text-[0.9375rem] font-medium text-text-2 hover:text-ink py-3 transition-colors duration-150 ${i < NAV_LINKS.length - 1 ? 'border-b border-ruled' : ''}`}
              >
                {link.label}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M6.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
            <div className="pt-3 pb-1">
              <a href="https://github.com/WeltCode/odonto_base" target="_blank" rel="noopener noreferrer" className="text-[0.8125rem] font-medium text-text-3 hover:text-ink transition-colors">
                Ver en GitHub →
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
