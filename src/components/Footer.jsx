import PoweredByWeltBrave from './branding/PoweredByWeltBrave'

const LINKS = [
  { label: 'Funciones',     href: '#features' },
  { label: 'Por rol',       href: '#roles' },
  { label: 'Cómo funciona', href: '#how-it-works' },
  { label: 'Plataforma',    href: '#plataforma' },
  { label: 'GitHub',        href: 'https://github.com/WeltCode/odonto_base', external: true },
  { label: 'Documentación', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-text-1 pt-12 pb-8 px-5 md:px-8">
      <div className="max-w-screen-xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="font-display font-black text-[1.0625rem] tracking-[-0.03em] text-white mb-1">
              odonto<span className="text-stamp">_</span>base
            </div>
            <div className="text-[0.8125rem] text-white/40">
              La plataforma dental en la nube.
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Enlaces del pie de página">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-[0.8125rem] text-white/50 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[0.75rem] text-white/30">
              © 2026 odonto_base — Plataforma de gestión para clínicas dentales.
            </p>
            <p className="text-[0.75rem] text-white/25">
              Datos de muestra incluidos para demostración.
            </p>
          </div>
          <PoweredByWeltBrave className="shrink-0" />
        </div>

      </div>
    </footer>
  )
}
