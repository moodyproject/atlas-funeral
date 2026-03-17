import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Process.module.css'

const steps = [
  {
    title: 'Audit & Strategy',
    desc: 'We audit your current presence, identify gaps in your market, and build a custom strategy tailored to your funeral home.',
  },
  {
    title: 'Build & Execute',
    desc: 'From SEO to AI agents to ad campaigns, we execute everything. No more juggling vendors or hoping for results.',
  },
  {
    title: 'Track & Grow',
    desc: 'We track every call, every arrangement, every dollar. Real results, real accountability, real growth.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        })
      }
      const cards = ref.current.querySelectorAll('.' + styles.step)
      gsap.from(cards, {
        y: 50, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">HOW IT WORKS</p>
          <h2 className="section-heading">
            Three Steps to <span className="gradient-text">Growth</span>
          </h2>
          <p className="section-body" style={{ margin: '0 auto', textAlign: 'center' }}>
            A proven process that delivers results every time.
          </p>
        </div>
        <div className={styles.gridWrap}>
          <div ref={lineRef} className={styles.connectLine} />
          <div ref={ref} className={styles.grid}>
            {steps.map((s, i) => (
              <div key={i} className={styles.step}>
                <h3 className={styles.title}><span className={styles.titleBlack}>{s.title.split(' & ')[0]} &</span> <span className={styles.titleGold}>{s.title.split(' & ')[1]}</span></h3>
                <p className={styles.desc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
