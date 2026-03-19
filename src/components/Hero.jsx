import { useEffect, useRef, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TrustBar from './TrustBar.jsx'
import styles from './Hero.module.css'

const WireframeGlobe = lazy(() => import('./WireframeGlobe.jsx'))

export default function Hero({ loaded }) {
  const ref = useRef(null)
  const parallaxRef = useRef(null)

  useEffect(() => {
    if (!loaded) return
    const el = ref.current
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(el.querySelector('.' + styles.label), { y: 20, duration: 0.8 }, 0)
      .from(el.querySelector('h1'), { y: 40, duration: 1 }, 0.1)
      .from(el.querySelector('.' + styles.sub), { y: 30, duration: 0.8 }, 0.3)
      .from(el.querySelector('.' + styles.body), { y: 20, duration: 0.8 }, 0.5)
      .from(el.querySelector('.' + styles.cta), { y: 20, duration: 0.6 }, 0.7)

    return () => tl.kill()
  }, [loaded])

  useEffect(() => {
    if (!parallaxRef.current) return
    gsap.to(parallaxRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [loaded])

  return (
    <section ref={ref} className={styles.hero}>
      <div ref={parallaxRef} className={styles.bg}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridOverlay} />
      </div>

      {/* 3D Wireframe Globe */}
      <Suspense fallback={null}>
        <WireframeGlobe className={styles.globe} />
      </Suspense>

      <div className={`container ${styles.content}`}>
        <p className={styles.label}>WEBSITES & AI FOR LOCAL BUSINESS</p>
        <h1 className={styles.heading}>
          The Digital Agency That Grows Local Businesses
        </h1>
        <p className={styles.sub}>Websites, AI agents, SEO & custom software</p>
        <p className={styles.body}>
          We deliver all-inclusive digital systems for local businesses.
          You focus on running your business. We handle everything else.
        </p>
        <div className={styles.cta}>
          <a href="#contact" className="cta-btn"><span>Book Your Call</span></a>
          <a href="#services" className="cta-btn cta-btn--outline"><span>Our Services</span></a>
        </div>
      </div>

      {/* Trust bar inside hero so globe shows behind it */}
      <div className={styles.trustBarWrap}>
        <TrustBar />
      </div>
    </section>
  )
}
