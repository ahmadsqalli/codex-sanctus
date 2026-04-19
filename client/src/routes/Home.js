import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import '../styles/home.css'
import { Link } from "react-router-dom";

function Home() {

  return (
    <>
      <Header />
      <div className='home-page'>
          <div className='codex-hero'>
        <div className='codex-container'>
          <div className='hero-left'>
            <h1>Codex Sanctus</h1>
            <h3>A Faithful's Library</h3>
          </div>
          <div className='hero-right'>
          </div>
        </div>
        </div>
        

        <div className='section-om'>
          <div className='left-om'>
          <h4>Across Worlds, Languages, Cultures.</h4>
          <h3>Building Bridges, Not Borders.</h3>
          </div>
          <div className='right-om'>
            <p>Step beyond the confines of a single tradition, and <Link to={'/Library'}>Browse</Link> through the world's most enduring texts. Here, the boundaries of time and geography fade, leaving only the eternal search for meaning.</p>
          </div>
        </div>


        <div className='section-quran'>
          <div className='left-quran'>
            
            <p>For thousands of years, scribes have laboured to copy and preserve the texts that shape humanity's deepest beliefs. <Link to={'/Library'}>Codex Sanctus</Link> continues that tradition in the digital age, gathering scriptures into one reverent space. Here, every verse will be preserved, forever, waiting for you to discover it.</p>
          </div>
          <div className='right-quran'>
            <h2>A Sanctuary for Sacred Words</h2>
          </div>
        </div>


        <div className='section-lu'>
          <div className='left-lu'>
          <p>The search for meaning is the oldest journey known to humankind. Codex Sanctus provides the <Link to={'/Library'}>map</Link>. Read, reflect, and let the enduring words of prophets, sages, and saints guide your personal exploration. A quiet place for your mind and spirit awaits.</p>
          </div>
          <div className='right-lu'>
          <h4>Fueling Humanity's Divine Quest</h4>
          <h2>One Book At a Time.</h2>
          </div>
        </div>


        <div className='section-proverb'>
          <div className='left-proverb'>
          <p>An intelligent heart acquires knowledge, and the ear of the wise seeks knowledge. <Link to={'/read/10/node/9665/15'}>Proverbs 18:15</Link></p>
          </div>
          <div className='right-proverb'>
            <p>No single tradition holds all the answers, and by exploring the wisdom of many traditions, you discover that light shines through many windows. And in knowledge, we find the strength to honour both our differences and our common humanity.</p>
          </div>
        </div>

        <div className='home-enter'>
          <Link to={'/Library'}>Read</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Home;