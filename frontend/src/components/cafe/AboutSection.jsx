import styles from"../styles/AboutSection.module.css";

function AboutSection({title, description}) {
  return <section className={styles.aboutSection}>
    <h3>{title}</h3>
    <p>{description}</p>
  </section>;
}

export default AboutSection;