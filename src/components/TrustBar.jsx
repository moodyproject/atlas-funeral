import styles from './TrustBar.module.css'

const logos = [
  'Bella Cucina', 'Summit Law Group', 'Bright Smile Dental',
  'Iron & Oak Fitness', 'Prestige Auto Care', 'Harbor Realty',
  'Main Street Chiropractic', 'Urban Cuts Barbershop', 'Peak Plumbing Co',
  'Golden Hour Photography', 'Riverside Veterinary', 'Atlas Accounting',
]

export default function TrustBar() {
  return (
    <section className={styles.wrap}>
      <p className={styles.label}>TRUSTED BY LOCAL BUSINESSES NATIONWIDE</p>
      <div className={styles.track}>
        <div className={styles.marquee}>
          {[...logos, ...logos].map((name, i) => (
            <div key={i} className={styles.logo}>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
