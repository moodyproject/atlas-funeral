import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import USMap from './USMap.jsx'
import styles from './Nationwide.module.css'

export default function Nationwide() {
  const ref = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 80%' },
        defaults: { ease: 'power3.out' },
      })
      tl.from(el.querySelector('h2'), { y: 40, duration: 0.8 })
        .from(el.querySelector('.' + styles.bodyText), { y: 25, duration: 0.6 }, '-=0.4')
      if (mapRef.current) tl.from(mapRef.current, { y: 40, scale: 0.97, duration: 0.8 }, '-=0.3')
    }, ref)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!mapRef.current) return
    const dots = mapRef.current.querySelectorAll('.' + styles.dot)
    dots.forEach((dot) => {
      gsap.to(dot, {
        scale: 1.3,
        duration: 1.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
        ease: 'sine.inOut',
      })
    })
  }, [])

  // Dots positioned to roughly match real US city locations
  // Percentages of the map container
  const dotPositions = [
    { x: 82, y: 22 }, // Boston
    { x: 79, y: 28 }, // NYC
    { x: 80, y: 33 }, // NJ
    { x: 77, y: 30 }, // PA
    { x: 73, y: 35 }, // VA
    { x: 70, y: 45 }, // NC
    { x: 67, y: 52 }, // GA
    { x: 72, y: 65 }, // FL
    { x: 62, y: 48 }, // AL
    { x: 57, y: 50 }, // MS
    { x: 52, y: 55 }, // LA
    { x: 44, y: 55 }, // TX south
    { x: 40, y: 48 }, // TX north
    { x: 42, y: 42 }, // OK
    { x: 55, y: 30 }, // IL
    { x: 59, y: 28 }, // OH
    { x: 52, y: 22 }, // WI
    { x: 48, y: 32 }, // MO
    { x: 33, y: 32 }, // CO
    { x: 25, y: 42 }, // AZ
    { x: 13, y: 30 }, // CA north
    { x: 11, y: 42 }, // CA south
    { x: 14, y: 18 }, // OR
    { x: 20, y: 35 }, // NV
  ]

  return (
    <section ref={ref} className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <p className="section-label">NATIONWIDE COVERAGE</p>
          <h2 className="section-heading">
            Funeral Home Marketing That <span className="gradient-text">Fills Your Calendar</span>
          </h2>
          <p className={`section-body ${styles.bodyText}`} style={{ margin: '0 auto 56px', textAlign: 'center' }}>
            From coast to coast, we help funeral homes dominate their local markets.
            Our strategies are tailored to your specific region, competition, and community.
          </p>

          <div ref={mapRef} className={styles.map}>
            <USMap className={styles.mapSvg} />
            <div className={styles.mapInner}>
              {dotPositions.map((pos, i) => (
                <div
                  key={i}
                  className={styles.dot}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <div className={styles.dotRing} />
                </div>
              ))}
            </div>
            <p className={styles.mapLabel}>
              Serving funeral homes in <strong>15+ states</strong> and growing
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
