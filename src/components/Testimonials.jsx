import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonials.module.css'

const testimonials = [
  { name: 'Heritage Memorial Chapel', quote: 'Atlas completely transformed our online presence. We went from invisible to dominating page one in 4 months.', role: 'Director', initials: 'HM' },
  { name: 'Peaceful Rest Funeral Home', quote: 'The AI receptionist alone paid for the entire service. We never miss a call now, even at 2am.', role: 'Owner', initials: 'PR' },
  { name: 'Golden Gate Memorial', quote: 'Finally a marketing team that understands funeral homes. The results speak for themselves.', role: 'General Manager', initials: 'GG' },
  { name: 'Evergreen Services', quote: 'Our monthly arrangements increased by 40% in the first six months. Incredible ROI.', role: 'Operations Director', initials: 'ES' },
  { name: 'Dignity First Funeral Home', quote: 'Professional, responsive, and they actually deliver. Atlas is the real deal.', role: 'Owner', initials: 'DF' },
  { name: 'Sunrise Memorial Chapel', quote: 'We stopped worrying about marketing and started focusing on families again. Atlas handles everything.', role: 'Director', initials: 'SM' },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    const heading = el.querySelector('h2')
    const label = el.querySelector('.section-label')

    gsap.from([label, heading], {
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' },
    })
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const clone = el.innerHTML
    el.innerHTML += clone
  }, [])

  return (
    <section ref={sectionRef} className={`dark-section ${styles.section}`}>
      <div className="container">
        <p className="section-label" style={{ textAlign: 'center', display: 'block' }}>TESTIMONIALS</p>
        <h2 className="section-heading" style={{ textAlign: 'center', color: '#ffffff' }}>
          Trusted by Funeral Homes <span className="gradient-text">Across America</span>
        </h2>
      </div>
      <div className={styles.trackWrap}>
        <div ref={trackRef} className={styles.track}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.stars}>
                {'★★★★★'.split('').map((s, j) => <span key={j} className={styles.star}>{s}</span>)}
              </div>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.meta}>
                <div className={styles.avatar}>{t.initials}</div>
                <div>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
