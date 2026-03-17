import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './CaseStudies.module.css'

const cases = [
  {
    name: 'Heritage Memorial',
    stat: '85%',
    desc: 'increase in monthly calls',
    detail: 'SEO + Google Ads strategy delivered consistent lead flow within 90 days.',
  },
  {
    name: 'Peaceful Rest',
    stat: '$50K',
    desc: 'per year saved on staffing',
    detail: 'AI Receptionist handles after-hours calls and schedules arrangements automatically.',
  },
  {
    name: 'Golden Gate',
    stat: '3x',
    desc: 'more Google visibility',
    detail: 'From page 3 to the top 3 organic results in 6 months.',
  },
]

function AnimatedStat({ stat, inView }) {
  const elRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current || !elRef.current) return
    hasAnimated.current = true

    const numMatch = stat.match(/[\d.]+/)
    if (!numMatch) return

    const target = parseFloat(numMatch[0])
    const prefix = stat.slice(0, stat.indexOf(numMatch[0]))
    const suffix = stat.slice(stat.indexOf(numMatch[0]) + numMatch[0].length)
    const obj = { val: 0 }

    elRef.current.textContent = prefix + '0' + suffix

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        const display = target % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(0)
        if (elRef.current) elRef.current.textContent = prefix + display + suffix
      },
    })
  }, [inView, stat])

  return <div ref={elRef} className={styles.stat}>{stat}</div>
}

export default function CaseStudies() {
  const ref = useRef(null)
  const headerRef = useRef(null)
  const [inView, setInView] = useState(false)

  // Use IntersectionObserver for counter trigger
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    gsap.from(headerRef.current.children, {
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
    })
  }, [])

  useEffect(() => {
    const cards = ref.current.querySelectorAll('.' + styles.card)
    gsap.from(cards, {
      y: 50,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section id="results" className={`dark-section ${styles.section}`}>
      <div className="container">
        <div ref={headerRef} className={styles.header}>
          <p className="section-label">RESULTS</p>
          <h2 className="section-heading" style={{ color: '#ffffff' }}>
            Real Results for <span className="gradient-text">Real Funeral Homes</span>
          </h2>
          <p className="section-body" style={{ color: 'rgba(255,255,255,0.75)', margin: '0 auto', textAlign: 'center' }}>
            Numbers don't lie. Here's what happens when you partner with Atlas.
          </p>
        </div>
        <div ref={ref} className={styles.grid}>
          {cases.map((c, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.name}>{c.name}</span>
              </div>
              <div className={styles.statWrap}>
                <AnimatedStat stat={c.stat} inView={inView} />
                <p className={styles.desc}>{c.desc}</p>
              </div>
              <p className={styles.detail}>{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
