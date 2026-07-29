import { createContext, useContext, useState, useCallback } from 'react'
import DemoModal from '../components/DemoModal'

const DemoModalContext = createContext(null)

export function DemoModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openModal  = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  return (
    <DemoModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <DemoModal open={open} onClose={closeModal} />
    </DemoModalContext.Provider>
  )
}

export function useDemoModal() {
  const ctx = useContext(DemoModalContext)
  if (!ctx) throw new Error('useDemoModal debe usarse dentro de <DemoModalProvider>')
  return ctx
}
