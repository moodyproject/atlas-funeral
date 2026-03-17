import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PassionExpertise.module.css'

const agents = [
  { name: 'AI Receptionist', desc: 'Answers every call 24/7. Never miss a family in need.', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { name: 'AI Booking Agent', desc: 'Schedules consultations and arrangements automatically.', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'AI Review Manager', desc: 'Generates and responds to Google reviews on autopilot.', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  { name: 'AI Social Media', desc: 'Creates and posts compassionate, on-brand content daily.', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
  { name: 'AI Email Campaigns', desc: 'Nurture leads with automated drip sequences.', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'AI Chat Widget', desc: 'Live website chat that answers questions instantly.', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { name: 'AI SEO Optimizer', desc: 'Dominates local search rankings in your area.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { name: 'AI Content Writer', desc: 'Blog posts, guides, and resources that rank and convert.', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { name: 'AI Ad Manager', desc: 'Runs and optimizes Google and Facebook ads.', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z' },
  { name: 'AI Analytics', desc: 'Real-time dashboard tracking calls, leads, and ROI.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { name: 'AI Reputation Monitor', desc: 'Tracks every mention of your funeral home online.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  { name: 'AI Lead Qualifier', desc: 'Scores and prioritizes incoming leads automatically.', icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' },
  { name: 'AI Follow-Up Agent', desc: 'Never lets a lead go cold with smart follow-up sequences.', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { name: 'AI Obituary Assistant', desc: 'Helps families craft beautiful, personalized obituaries.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: 'AI Grief Resources', desc: 'Provides families with curated support and resources.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { name: 'AI Community Outreach', desc: 'Plans and promotes local community events.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { name: 'AI Competitor Tracker', desc: 'Monitors competitor pricing, ads, and rankings.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { name: 'AI Video Creator', desc: 'Generates video content for social and web.', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { name: 'AI Translation Agent', desc: 'Multilingual support for diverse communities.', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
  { name: 'AI Staff Trainer', desc: 'On-demand training modules for your entire team.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
]

export default function PassionExpertise() {
  const ref = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current
      const heading = el.querySelector('.' + styles.heading)
      const body = el.querySelector('.' + styles.body)
      const cards = el.querySelectorAll('.' + styles.card)
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 80%' },
        defaults: { ease: 'power3.out' },
      })
      if (heading) tl.from(heading, { y: 40, duration: 0.8 })
      if (body) tl.from(body, { y: 30, duration: 0.6 }, '-=0.4')
      if (cards.length) tl.from(cards, { y: 50, duration: 0.7, stagger: 0.12 }, '-=0.3')
    }, ref)
    return () => ctx.revert()
  }, [])

  // Clone items for infinite scroll
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const clone = track.innerHTML
    track.insertAdjacentHTML('beforeend', clone)
  }, [])

  return (
    <section ref={ref} className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">WHY ATLAS</p>
          <h2 className={`section-heading ${styles.heading}`}>
            Built Different. <span className="gradient-text">Built for You.</span>
          </h2>
          <p className={`section-body ${styles.body}`} style={{ margin: '0 auto' }}>
            We don't do generic marketing. Every strategy is custom-built for the funeral home industry.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardHeading}><span className={styles.blackWord}>Dedicated</span> to Funeral Home Growth</h3>
            <p className={styles.cardBody}>
              We live and breathe funeral home marketing. Every strategy we build
              stems from our commitment to helping funeral directors connect with
              families who need them.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardHeading}><span className={styles.blackWord}>Proven</span> Systems That Deliver</h3>
            <p className={styles.cardBody}>
              With proven marketing systems that consistently deliver calls,
              arrangements, and revenue growth. You bring the funeral home.
              We bring the playbook.
            </p>
          </div>
        </div>
      </div>

      {/* AI Agents Carousel */}
      <div className={styles.carouselSection}>
        <div className="container">
          <h3 className={styles.carouselHeading}>
            <span className="gradient-text">20 AI Agents</span> Working for Your Funeral Home
          </h3>
        </div>
        <div className={styles.carousel}>
          <div className={styles.carouselFadeLeft} />
          <div className={styles.carouselFadeRight} />
          <div ref={trackRef} className={styles.carouselTrack}>
            {agents.map((agent, i) => (
              <div key={i} className={styles.agentCard}>
                <div className={styles.agentIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={agent.icon} />
                  </svg>
                </div>
                <h4 className={styles.agentName}>{agent.name}</h4>
                <p className={styles.agentDesc}>{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
