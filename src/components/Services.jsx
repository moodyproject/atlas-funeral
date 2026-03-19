import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Services.module.css'

const services = [
  {
    title: 'AI Receptionist',
    desc: 'Never miss a call. Our 24/7 AI receptionist answers every call, handles customer inquiries, and schedules appointments automatically.',
    stat: '24/7',
    statLabel: 'Availability',
  },
  {
    title: 'Search Engine Optimization',
    desc: 'Dominate Google when customers search for businesses like yours. Our proven SEO strategies put you at the top.',
    stat: '#1',
    statLabel: 'Page Rankings',
  },
  {
    title: 'Website Design',
    desc: 'Premium websites that reflect the quality of your brand and convert visitors into customers.',
    stat: '3x',
    statLabel: 'More Conversions',
  },
  {
    title: 'Reputation Management',
    desc: 'Build and maintain a 5-star online presence. Automated review generation and response management.',
    stat: '5.0',
    statLabel: 'Star Average',
  },
]

export default function Services() {
  const ref = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      })
      const cards = ref.current.querySelectorAll('.' + styles.card)
      gsap.from(cards, {
        y: 60, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      const statValues = ref.current.querySelectorAll('.' + styles.statValue)
      statValues.forEach((el, i) => {
        gsap.to(el, {
          scale: 1.15, y: -3, duration: 0.8, repeat: -1, yoyo: true,
          ease: 'power2.inOut', delay: i * 0.4,
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" className={`dark-section ${styles.section}`}>
      <div className="container">
        <div ref={headerRef} className={styles.header}>
          <p className="section-label">WHAT WE DO</p>
          <h2 className="section-heading" style={{ color: '#ffffff' }}>
            Full-Service Local Business <span className="gradient-text">Marketing</span>
          </h2>
          <p className="section-body" style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0 auto' }}>
            Everything your business needs to grow, under one roof.
          </p>
        </div>
        <div ref={ref} className={styles.grid}>
          {services.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardInner}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <div className={styles.cardStat}>
                  <span className={styles.statValue}>{s.stat}</span>
                  <span className={styles.statLabel}>{s.statLabel}</span>
                </div>
              </div>
              <div className={styles.cardGlow} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
