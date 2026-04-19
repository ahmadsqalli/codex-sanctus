import Header from '../components/Header.js';
import Footer from '../components/Footer.js'
import Edition from '../components/BookEdition.js';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Loading from '../components/Loading.js';
import ErrorPage from '../components/Error.js';
import '../styles/read.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Read() {

  const { book_id, node_id, read_param } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const controller = new AbortController();

      setLoading(true);
      setError(null); // Reset error when switching chapters
      // Make GET request to fetch data
      axios
          .get(`/read/${book_id}/node/${node_id}/${read_param}`, {
            signal: controller.signal // Attach the signal to axios
          })
          .then((response) => {
              setData(response.data);
              setLoading(false);
              //console.log(response.data.data.structure);

          })
          .catch((err) => {
              // Ignore errors caused by us cancelling the request
              if (axios.isCancel(err)) {
                  console.log("Request cancelled:", err.message);
              } else {
                  setError(err.message);
                  setLoading(false);
              }
          });
  }, [book_id, node_id, read_param]);

   
  if (loading) return <div><Loading /></div>;
  if (error) return <ErrorPage error_message={error} />;
  if (data.error === true) return <ErrorPage error_message={data.data} />;

  return (
    <>
        <Header religion={data.data.book_edition.religion} />

        <div className='book-title'>
          <h1>{data.data.book_edition.work_name}: {data.data.book_edition.edition_name}</h1>
          </div>

        <div className='read-container'>
          
          <div className='read-content'>

            <Breadcrumbs data={{ editions: data.data.book_edition, structures: data.data.structure, level: true }} />
            
            <div className='book-content' style={{
                fontFamily: data.data.book_edition.language === "Arabic" || data.data.book_edition.language === "Arabic (Clean)" ? '"Fustat", sans-serif' : 'Gorgia', fontSize: '18px'
              }}
            >
              <p className='verses' style={{
                direction: data.data.book_edition.language === "Arabic" || data.data.book_edition.language === "Arabic (Clean)" || data.data.book_edition.language === "Hebrew" ? 'rtl' : 'ltr'
              }}>
                {data.data.content.map((verse) => (
                  <span key={verse.id}>
                    <b><small><sup><Link to={'/read/' + book_id + '/node/' + node_id + '/' + verse.verse_num}>{verse.verse_num} </Link></sup></small></b>
                    <span>{verse.content_text} </span>
                  </span>
                ))}
              </p>
          </div>

          </div>

          <Edition edition={data.data.book_edition} />
          </div>

        <Footer />
    </>
  );
}

export default Read;