function About() {
  return (
    <div className="app-about">
      <div className="app-about__header">
        <div className="app-about__avatar">VR</div>
        <h1>Vince Ruiz</h1>
        <p>Full-Stack Developer</p>
      </div>
      <div className="app-about__content">
        <section>
          <h2>About</h2>
          <p>
            Building modern web applications with React, Node.js, and cloud technologies.
            Passionate about clean code, performance, and great user experiences.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <ul className="app-about__links">
            <li>
              <a href="https://github.com/vinceruiz" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/vinceruiz" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About;
