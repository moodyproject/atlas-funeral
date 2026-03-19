import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

const highlights = [
  { value: '100+', label: 'Businesses Served' },
  { value: '15+', label: 'States Covered' },
  { value: '$2M+', label: 'Revenue Generated' },
]

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = ref.current.querySelectorAll('[data-animate]')
      gsap.from(children, {
        y: 35,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className={`dark-section ${styles.section}`}>
      <div ref={ref} className={`container ${styles.inner}`}>
        <div className={styles.left} data-animate>
          <p className="section-label">ABOUT US</p>
          <h2 className={styles.heading}>
            The Premier Local Business <span className="gradient-text">Marketing Agency</span>
          </h2>
          <p className={styles.body}>
            Founded by top-tier engineers and marketing professionals with one mission: help local businesses
            stop losing customers and start generating qualified leads.
          </p>
          <p className={styles.body}>
            Our systems combine SEO dominance, AI-powered customer engagement, and proven lead conversion to create
            a predictable pipeline of customers who need your services.
          </p>
          <a href="#contact" className="cta-btn" style={{ marginTop: '24px' }}><span>Book Your Call</span></a>
        </div>

        <div className={styles.right} data-animate>
          {highlights.map((h, i) => (
            <div key={i} className={styles.highlightCard}>
              <span className={styles.highlightValue}>{h.value}</span>
              <span className={styles.highlightLabel}>{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
