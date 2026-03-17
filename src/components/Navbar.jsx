import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoText}>ATLAS</span>
        </a>

        {/* Mobile menu backdrop */}
        {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.show : ''}`}>
          <li><a href="#services" onClick={() => setMenuOpen(false)}>Services</a></li>
          <li><a href="#results" onClick={() => setMenuOpen(false)}>Results</a></li>
          <li><a href="#process" onClick={() => setMenuOpen(false)}>Process</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className={styles.navCta}
            >
              Book Your Call
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
