import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import FeatureRail from './components/FeatureRail'
import Roles from './components/Roles'
import HowItWorks from './components/HowItWorks'
import Platform from './components/Platform'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { DemoModalProvider } from './context/DemoModalContext'
import './App.css'

export default function App() {
  return (
    <DemoModalProvider>
      <Navbar />
      <Hero />
      <Stats />
      <FeatureRail />
      <Roles />
      <HowItWorks />
      <Platform />
      <CTA />
      <Footer />
    </DemoModalProvider>
  )
}
