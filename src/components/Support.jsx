import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Support.module.css'

const features = [
  {
    title: 'Dedicated Account Manager',
    desc: 'A single point of contact who knows your funeral home inside and out.',
  },
  {
    title: 'Same-Day Response',
    desc: 'Questions answered fast. Issues resolved immediately. No waiting.',
  },
  {
    title: 'Monthly Performance Reviews',
    desc: 'Detailed reporting on calls, leads, rankings, and ROI every month.',
  },
  {
    title: 'Always-On AI Systems',
    desc: 'Your AI agents work 24/7. Nights, weekends, holidays. Never off.',
  },
]

export default function Support() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current.querySelectorAll('.' + styles.card)
      gsap.from(cards, {
        y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <p className="section-label">SUPPORT</p>
          <h2 className={styles.heading}>
            We Don't Disappear After <span className="gradient-text">You Sign</span>
          </h2>
          <p className={styles.sub}>
            Most agencies ghost you after the contract. We do the opposite.
          </p>
        </div>

        <div ref={ref} className={styles.grid}>
          {features.map((f, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.banner}>
          <div className={styles.bannerInner}>
            <span className={styles.bannerText}>Have a question right now?</span>
            <a href="#contact" className="cta-btn"><span>Talk to Us</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}
