const ABOUT_SECTIONS = [
  {
    title: "Hi! I'm Vince",
    message: `Welcome to my portfolio website! I'm Vince Ruiz, a passionate computer engineer
      with a deep love for embedded systems and software development. With my bachelor's degree in Computer Engineering (Digital Systems & software
      concentrations), I hope to further my knowledge in computer architecture, embedded systems design, and software development practices.`,
    imageUrl: "https://res.cloudinary.com/dbhn8kvoh/image/upload/v1715729468/Snapchat-1030394388_ixr4n3.jpg",
    imageAlt: "Vince Ruiz"
  },
  {
    title: "My Journey",
    message: `My growing curiosity in the field of electronics started when I was only a little kid,
      inputting complicated cheat codes into the id tech 3 engine terminal in the Star Wars Jedi Knight games. Since
      then, I've had the pleasure of working with ESTI Consulting Services on two occasions, in which I developed my collaboration, networking, and
      software development skills.`,
    imageUrl: "https://res.cloudinary.com/dbhn8kvoh/image/upload/v1715665025/263716_10150238073201249_6181190_n_nvip5o.jpg",
    imageAlt: "Engineering"
  },
  {
    title: "My Mission",
    message: `As a graduate of the University of Saskatchewan's College of Engineering, my mission is to leverage my expertise in computer engineering
      to create innovative and reliable solutions that will grant my clients with 100% satisfaction. I aim to continuously grow and adapt in the ever-evolving field of technology,
      ensuring that each project is delivered with precision and creativity.`,
    imageUrl: "https://res.cloudinary.com/dbhn8kvoh/image/upload/v1715659972/About_-_Engineering_fxafob.jpg",
    imageAlt: "Mission"
  },
  {
    title: "Beyond Engineering",
    message: `When I'm not in the office, you can find me learning new technologies and programming practices, playing the latest trending video games, writing music with my band Palace
      in the Sky, at the gym, or spending time with my family and friends.
      Thank you for visiting, and I look forward to connecting with you!`,
    imageUrl: "https://res.cloudinary.com/dbhn8kvoh/image/upload/v1715660311/20240513_221735_jn0lig.jpg",
    imageAlt: "Hobbies"
  }
];

function AboutCard({ title, message, imageUrl, imageAlt }) {
  return (
    <div className="app-about__card">
      <img src={imageUrl} alt={imageAlt} className="app-about__card-image" />
      <h2 className="app-about__card-title">{title}</h2>
      <p className="app-about__card-message">{message}</p>
    </div>
  );
}

function About() {
  return (
    <div className="app-about">
      <div className="app-about__content">
        {ABOUT_SECTIONS.map((section, index) => (
          <AboutCard key={index} {...section} />
        ))}

        <div className="app-about__contact">
          <h2>Contact</h2>
          <ul className="app-about__links">
            <li>
              <a
                href="https://github.com/vinceruizz"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/vinceruiz"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
