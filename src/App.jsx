import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import PassionExpertise from './components/PassionExpertise.jsx'
import Testimonials from './components/Testimonials.jsx'
import Nationwide from './components/Nationwide.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import CaseStudies from './components/CaseStudies.jsx'
import Stats from './components/Stats.jsx'
import About from './components/About.jsx'
import Support from './components/Support.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef(null)
  const progressRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Scroll progress bar
  useEffect(() => {
    if (!progressRef.current || !loaded) return
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  }, [loaded])

  // Always start at top on load/refresh
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Preloader
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoaded(true),
    })

    tl.to('.preloader-logo', { opacity: 1, duration: 0.6, ease: 'power2.out' })
      .to('.preloader-fill', { width: '100%', duration: 1, ease: 'power2.inOut' }, '-=0.2')
      .to('.preloader', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.2,
      })
      .set('.preloader', { display: 'none' })

    return () => tl.kill()
  }, [])

  // Refresh ScrollTrigger after load
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => ScrollTrigger.refresh(true), 300)
      return () => clearTimeout(timer)
    }
  }, [loaded])

  return (
    <>
      {/* Preloader */}
      <div className="preloader">
        <div className="preloader-logo">ATLAS</div>
        <div className="preloader-bar">
          <div className="preloader-fill" />
        </div>
      </div>

      {/* Scroll Progress */}
      <div ref={progressRef} className="scroll-progress" />

      <div ref={appRef} className="app">
        <Navbar />
        <Hero loaded={loaded} />
        <PassionExpertise />
        <Testimonials />
        <Nationwide />
        <Services />
        <Process />
        <CaseStudies />
        <Stats />
        <About />
        <Support />
        <Footer />
      </div>
    </>
  )
}

export default App
