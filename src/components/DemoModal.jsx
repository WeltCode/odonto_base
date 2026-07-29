import { useEffect, useRef, useState } from 'react'

/* ────────────────────────────────────────────────────────────
   Endpoint de captación de leads.
   Pega aquí la URL de tu servicio (Formspree, Tally, Basin…):
   p. ej. 'https://formspree.io/f/xxxxxxx'
   Si se deja vacío, el formulario funciona en modo demo:
   valida, muestra la confirmación y registra el lead en consola.
   ──────────────────────────────────────────────────────────── */
const FORM_ENDPOINT = ''

const SIZE_OPTIONS = [
  { value: '',     label: '¿Cuántos dentistas sois?' },
  { value: '1',    label: 'Solo yo' },
  { value: '2-3',  label: '2 – 3 dentistas' },
  { value: '4-6',  label: '4 – 6 dentistas' },
  { value: '7+',   label: '7 o más' },
]

const EMPTY = { name: '', clinic: '', email: '', size: '', phone: '', consent: false }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function DemoModal({ open, onClose }) {
  const [data,   setData]   = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const panelRef  = useRef(null)
  const firstRef  = useRef(null)
  const restoreRef = useRef(null)

  /* Reset al abrir; recuerda el elemento que tenía el foco */
  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement
    setData(EMPTY)
    setErrors({})
    setStatus('idle')
    const t = setTimeout(() => firstRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [open])

  /* Bloquea el scroll del fondo mientras el modal está abierto */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  /* Escape para cerrar + trampa de foco básica */
  useEffect(() => {
    if (!open) return
    const onKey = e => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last  = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  /* Devuelve el foco al cerrar */
  useEffect(() => {
    if (open) return
    restoreRef.current?.focus?.()
  }, [open])

  if (!open) return null

  const setField = (k, v) => {
    setData(d => ({ ...d, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!data.name.trim())   e.name   = 'Dinos tu nombre.'
    if (!data.clinic.trim()) e.clinic = 'Indica el nombre de tu clínica.'
    if (!data.email.trim())  e.email  = 'Necesitamos tu correo para contactarte.'
    else if (!EMAIL_RE.test(data.email.trim())) e.email = 'Ese correo no parece válido.'
    if (!data.consent)       e.consent = 'Necesitamos tu consentimiento para continuar.'
    return e
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const firstErr = panelRef.current?.querySelector('[data-invalid="true"]')
      firstErr?.focus?.()
      return
    }
    setStatus('loading')
    const payload = {
      nombre: data.name.trim(),
      clinica: data.clinic.trim(),
      email: data.email.trim(),
      dentistas: data.size || 'no indicado',
      whatsapp: data.phone.trim() || 'no indicado',
      origen: 'landing odonto_base',
    }
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('respuesta no válida')
      } else {
        // Modo demo: sin endpoint configurado todavía.
        console.info('[odonto_base] Lead capturado (configura FORM_ENDPOINT para enviarlo):', payload)
        await new Promise(r => setTimeout(r, 700))
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const invalid = k => (errors[k] ? { 'data-invalid': 'true', 'aria-invalid': 'true' } : {})
  const inputCls =
    'w-full rounded-[4px] border bg-white px-3.5 py-3 text-[0.9375rem] text-text-1 ' +
    'placeholder:text-text-3 transition-colors duration-150 focus:outline-none ' +
    'focus:border-ink focus:ring-2 focus:ring-ink/15'
  const borderCls = k => (errors[k] ? 'border-stamp' : 'border-ruled-deep')

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      style={{ animation: 'modal-fade 0.2s ease-out both' }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 w-full h-full cursor-default"
        style={{ background: 'rgba(4,17,46,0.72)', backdropFilter: 'blur(4px)' }}
        tabIndex={-1}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        className="relative w-full sm:w-auto sm:max-w-md max-h-[92vh] overflow-y-auto
                   rounded-t-2xl sm:rounded-xl bg-white overflow-hidden"
        style={{
          boxShadow: '0 24px 64px rgba(4,17,46,0.4), 0 4px 16px rgba(0,0,0,0.2)',
          animation: 'sheet-in 0.32s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        {/* Header — barra ink, mismo mundo que las tarjetas del sitio */}
        <div className="relative bg-ink px-5 py-4 pr-14">
          <div className="absolute inset-0 ruled-dark pointer-events-none" />
          <div className="relative">
            <span className="block font-display text-[0.5625rem] font-black tracking-[0.16em] uppercase text-white/55 mb-1">
              odonto_base · Solicitud
            </span>
            <h2 id="demo-modal-title" className="font-display font-extrabold text-[1.1875rem] tracking-[-0.02em] text-white leading-tight">
              {status === 'success' ? 'Solicitud recibida' : 'Solicita tu demo gratuita'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3.5 right-3.5 w-9 h-9 flex items-center justify-center rounded-[3px]
                       text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Success ── */}
        {status === 'success' ? (
          <div className="px-6 py-9 text-center">
            <div
              className="mx-auto mb-5 w-14 h-14 bg-ink rounded-[3px] flex items-center justify-center"
              style={{ animation: 'badge-stamp 0.4s cubic-bezier(.2,.8,.4,1) both' }}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <path d="M6 13.5l4.5 4.5L20 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-[1.25rem] tracking-[-0.02em] text-text-1 mb-2">
              {(() => {
                const first = data.name.trim().replace(/^(dr|dra|sr|sra|srta|dn|dña)\.?\s+/i, '').split(' ')[0]
                return first ? `¡Gracias, ${first}!` : '¡Gracias!'
              })()}
            </p>
            <p className="text-[0.9375rem] text-text-2 leading-[1.6] mb-7" style={{ maxWidth: '34ch', marginInline: 'auto' }}>
              Hemos recibido tu solicitud. Te contactaremos en <strong className="text-text-1">24–48 horas</strong> en{' '}
              <span className="text-ink font-semibold">{data.email.trim()}</span> para preparar tu demo personalizada.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-ink text-white font-bold text-[0.9375rem] px-7 py-3 rounded-[2px] hover:bg-ink-deep transition-colors"
            >
              Entendido
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} noValidate className="px-5 sm:px-6 py-5">
            <p className="text-[0.875rem] text-text-2 leading-[1.55] mb-5">
              Cuéntanos sobre tu clínica y te mostramos odonto_base funcionando con tu marca. Sin compromiso.
            </p>

            <div className="flex flex-col gap-3.5">
              <Field label="Nombre y apellidos" error={errors.name} htmlFor="f-name">
                <input
                  id="f-name" ref={firstRef} type="text" autoComplete="name"
                  value={data.name} onChange={e => setField('name', e.target.value)}
                  placeholder="Dra. Ana Ramírez"
                  className={`${inputCls} ${borderCls('name')}`} {...invalid('name')}
                />
              </Field>

              <Field label="Nombre de la clínica" error={errors.clinic} htmlFor="f-clinic">
                <input
                  id="f-clinic" type="text" autoComplete="organization"
                  value={data.clinic} onChange={e => setField('clinic', e.target.value)}
                  placeholder="Clínica Dental Sonrisa"
                  className={`${inputCls} ${borderCls('clinic')}`} {...invalid('clinic')}
                />
              </Field>

              <Field label="Correo electrónico" error={errors.email} htmlFor="f-email">
                <input
                  id="f-email" type="email" autoComplete="email" inputMode="email"
                  value={data.email} onChange={e => setField('email', e.target.value)}
                  placeholder="tu@clinica.com"
                  className={`${inputCls} ${borderCls('email')}`} {...invalid('email')}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Field label="Nº de dentistas" htmlFor="f-size" optional>
                  <select
                    id="f-size" value={data.size} onChange={e => setField('size', e.target.value)}
                    className={`${inputCls} ${borderCls('size')} appearance-none bg-no-repeat`}
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 fill=%27none%27%3E%3Cpath d=%27M3 4.5l3 3 3-3%27 stroke=%27%236B7280%27 stroke-width=%271.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E")',
                      backgroundPosition: 'right 0.85rem center',
                    }}
                  >
                    {SIZE_OPTIONS.map(o => (
                      <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                    ))}
                  </select>
                </Field>

                <Field label="WhatsApp" htmlFor="f-phone" optional>
                  <input
                    id="f-phone" type="tel" autoComplete="tel" inputMode="tel"
                    value={data.phone} onChange={e => setField('phone', e.target.value)}
                    placeholder="+34 600 000 000"
                    className={`${inputCls} ${borderCls('phone')}`}
                  />
                </Field>
              </div>

              {/* Consent */}
              <label className="flex items-start gap-2.5 mt-1 cursor-pointer select-none" htmlFor="f-consent">
                <input
                  id="f-consent" type="checkbox" checked={data.consent}
                  onChange={e => setField('consent', e.target.checked)}
                  className="mt-0.5 w-4 h-4 shrink-0 accent-ink" {...invalid('consent')}
                />
                <span className={`text-[0.75rem] leading-[1.5] ${errors.consent ? 'text-stamp' : 'text-text-3'}`}>
                  Acepto la{' '}
                  <a href="#" className="text-ink underline underline-offset-2 hover:no-underline">política de privacidad</a>{' '}
                  y el tratamiento de mis datos para ser contactado sobre odonto_base.
                </span>
              </label>
              {errors.consent && (
                <span className="-mt-1.5 block text-[0.75rem] text-stamp" role="alert">{errors.consent}</span>
              )}
            </div>

            {status === 'error' && (
              <div className="mt-4 flex items-start gap-2 bg-stamp-wash border border-stamp/30 rounded-[4px] px-3 py-2.5" role="alert">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                  <circle cx="7.5" cy="7.5" r="6.5" stroke="#C8281C" strokeWidth="1.3" />
                  <path d="M7.5 4.5v4M7.5 10.5v.01" stroke="#C8281C" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-[0.8125rem] text-stamp leading-[1.45]">
                  No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o escríbenos a{' '}
                  <a href="mailto:hola@weltbrave.com" className="font-semibold underline">hola@weltbrave.com</a>.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-ink text-white font-bold text-[0.9375rem] px-6 py-3.5 rounded-[2px] transition-colors hover:bg-ink-deep disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden="true" />
                  Enviando…
                </>
              ) : (
                <>
                  Solicitar mi demo
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>

            <p className="mt-3 text-center text-[0.6875rem] text-text-3">
              Respuesta en 24–48h · Sin compromiso · Tus datos, seguros
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({ label, error, htmlFor, optional, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-center justify-between mb-1.5">
        <span className="text-[0.8125rem] font-semibold text-text-2">
          {label}{!optional && <span className="text-stamp"> *</span>}
        </span>
        {optional && <span className="text-[0.625rem] text-text-3 uppercase tracking-wide">Opcional</span>}
      </label>
      {children}
      {error && (
        <span className="mt-1 block text-[0.75rem] text-stamp" role="alert">{error}</span>
      )}
    </div>
  )
}
