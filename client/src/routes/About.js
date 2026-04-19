import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

function About() {

  return (
    <>
    <style>{'.about { max-width: 800px; margin: 2rem auto; padding: 20px; background-color: #6E320A; font-family: "Cinzel", serif; border: 3px solid goldenrod; corner-shape: scoop; border-radius: 1rem;} .about h1 { color: #EFBF04; } .about h2 { color: #6E320A; } .about-content { background-color: #e4b04a; padding: 1.5rem 2.5rem; border-radius: 1rem; } .about-content p{font-family: Georgia; padding-left: 2rem;} @media (max-width: 672px) { .about{margin:0.3rem;padding:2rem 0.3rem;} .about-content { padding: 2rem 3px; } .about-content p { padding: 0; }}'}</style>
      <Header religion={null} />
      <div className="about">
        <h1>About Codex Sanctus</h1><br></br>
        <div className='about-content'>
          <h2>The Vision Behind the Project:</h2>
          <p>This project was developed to serve as a central source of scriptures for anyone interested in faith and religion, whether it is to learn more about the rich history of the Abrahamic faith, going through the Dharmic paths, to understand Confucian philosophy, or feel the harmony that makes up the foundation of Taoism, Scriptures seek to serve as a free, reliable, and a comprehensive library, by searching for, aggregating, and preserving these books, and making them easily accessible for everyone, everywhere.</p><br></br>
          <h2>An Evolving Library:</h2>
          <p>While we host a significant core of all the major world scriptures, our work is far from finished. We are dedicated to continuous updates, regularly integrating rare manuscripts, and rare books from unexplored, unheard-of, and lesser-known religions, to ensure that every Scriptures finds a home here.</p><br></br>
          <h2>Translations:</h2>
          <p>In our continuous effort to break down barriers, we are also expanding our library beyond traditional boundaries. Recognizing that many sacred texts are currently only available in their native language or in the English languages, we are actively working to source and integrate diverse translations for every book in our collection, so these books are accessible to everyone, regardless of their native tongue.</p>
        </div>
        </div>
        <Footer />
    </>
  );
}

export default About;