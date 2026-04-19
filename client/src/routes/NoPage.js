import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

function NoPage() {

  return (
    <>
      <Header religion={null} />
      <div className="404">
        <h1>404 - Page Not Found</h1>
        <p>Library too big you got lost T-T.</p>
        <p>Please check the URL or return to the <a href="/">home page</a>.</p>
       </div>
       <Footer />
    </>
  );
}

export default NoPage;