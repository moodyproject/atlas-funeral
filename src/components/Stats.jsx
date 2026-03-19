import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Stats.module.css'

const stats = [
  { value: 50, suffix: '+', label: 'Businesses Served' },
  { value: 15, suffix: '+', label: 'States Covered' },
  { value: 2, prefix: '$', suffix: 'M+', label: 'In Additional Revenue Generated' },
  { value: 98, suffix: '%', label: 'Client Retention Rate' },
]

function AnimatedCounter({ stat, inView }) {
  const elRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current || !elRef.current) return
    hasAnimated.current = true

    const obj = { val: 0 }
    gsap.to(obj, {
      val: stat.value,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (elRef.current) {
          elRef.current.textContent = (stat.prefix || '') + Math.round(obj.val) + (stat.suffix || '')
        }
      },
    })
  }, [inView, stat])

  return (
    <span ref={elRef} className={styles.value}>
      {(stat.prefix || '') + '0' + (stat.suffix || '')}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

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
    const items = ref.current.querySelectorAll('.' + styles.item)
    gsap.from(items, {
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    })
  }, [])

  return (
    <section className={styles.section}>
      <div ref={ref} className={`container ${styles.grid}`}>
        {stats.map((s, i) => (
          <div key={i} className={styles.item}>
            <AnimatedCounter stat={s} inView={inView} />
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
