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

function MobileAbout() {
  return (
    <div className="mobile-about">
      {ABOUT_SECTIONS.map((section, index) => (
        <div key={index} className="mobile-about__card">
          <img
            src={section.imageUrl}
            alt={section.imageAlt}
            className="mobile-about__image"
          />
          <h2 className="mobile-about__title">{section.title}</h2>
          <p className="mobile-about__text">{section.message}</p>
        </div>
      ))}
    </div>
  );
}

export default MobileAbout;
