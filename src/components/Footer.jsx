import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Footer.module.css'

export default function Footer() {
  const ctaRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    gsap.from(ctaRef.current.children, {
      y: 35,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
    })
  }, [])

  useEffect(() => {
    gsap.from(formRef.current, {
      y: 30,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
    })
  }, [])

  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div ref={ctaRef} className={styles.ctaSection}>
          <p className="section-label" style={{ display: 'block', textAlign: 'center' }}>GET STARTED</p>
          <h2 className={styles.heading} style={{ color: '#ffffff' }}>
            Ready to Grow Your <span className="gradient-text">Business?</span>
          </h2>
          <p className={styles.sub} style={{ color: 'rgba(255,255,255,0.8)' }}>
            Apply for a free consultation. We'll audit your current marketing
            and show you exactly how we can help.
          </p>
        </div>

        <div ref={formRef} className={styles.formCard}>
          <h3 className={styles.formHeading}>Get In Touch</h3>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formRow}>
              <input type="text" placeholder="Your Name" className={styles.input} />
              <input type="email" placeholder="Email Address" className={styles.input} />
            </div>
            <div className={styles.formRow}>
              <input type="text" placeholder="Business Name" className={styles.input} />
              <input type="tel" placeholder="Phone Number" className={styles.input} />
            </div>
            <textarea placeholder="Tell us about your business..." className={styles.textarea} rows={4} />
            <button type="submit" className="cta-btn" style={{ width: '100%', textAlign: 'center' }}>
              <span>Submit Application</span>
            </button>
          </form>
        </div>

        <div className={styles.bottom}>
          <div className={styles.brand}>
            <span className={styles.logo}>ATLAS</span>
            <p className={styles.tagline}>Websites, AI & Software for Local Business</p>
          </div>
          <nav className={styles.links}>
            <a href="#">Home</a>
            <a href="#services">Services</a>
            <a href="#results">Results</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <p className={styles.copy}>&copy; Atlas 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
