import styles from './TrustBar.module.css'

const logos = [
  'Smith & Sons', 'Heritage Memorial', 'Peaceful Rest',
  'Golden Gate Memorial', 'Evergreen Services', 'Dignity First',
  'Sunrise Chapel', 'Oak Hill Funeral Home', 'Grace & Mercy',
  'Eternal Light', 'Haven Memorial', 'Serenity Funeral Home',
]

export default function TrustBar() {
  return (
    <section className={styles.wrap}>
      <p className={styles.label}>TRUSTED BY FUNERAL HOMES NATIONWIDE</p>
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
