import "./AboutSection.css";

function AboutSection({title, description}) {
  return <section className="aboutSection">
    <h2 className="title text">{title}</h2>
    <p className="description text">{description}</p>
  </section>;
}

export default AboutSection;