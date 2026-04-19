import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import '../styles/library.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Loading from '../components/Loading.js';
import ErrorPage from '../components/Error.js';

function classify_books(books) {
  //console.log(books);
  const classified = {};
    for (const book of books) {
        console.log(book.religion);
        if (classified[book.religion]) {
            classified[book.religion].push(book);
        } else {
            classified[book.religion] = [book];
        }
    }
    console.log(classified);
    return classified;
}

const Library = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axios
            .get(`${process.env.REACT_APP_API_URL}/library`)
            .then((response) => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    let classified_lib = classify_books(data);

    if (loading) return <div><Loading /></div>;
    if (error) return <ErrorPage error_message={error} />;
    if (data.error === true) return <ErrorPage error_message={data.data} />;

    return (
        <>
            <Header religion={null} />
            <div className='library-container'>
            <div className="library-title ">
                <h1>The Library</h1>
            </div>
            <div className="accordion">
                {Object.entries(classified_lib).map(([religion, books]) => (
                    <div className="religion-section accordion-item" key={religion}>

                        <div className='accordion-button accor-header' data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-" + religion} aria-expanded="true" aria-controls={"panelsStayOpen-" + religion}>

                        <h2>{religion}</h2>

                        </div>

                        <div id={"panelsStayOpen-" + religion} className='books-section accordion-collapse collapse show'>
                            {books.map((book) => (
                                
                                    <div className='library-book' key={book['id']}>
                                    <h4 className='book-name'>{book['work_name']}</h4>
                                        <div>
                                            <b>Edition:</b> {book['edition_name']}<br></br>
                                            <b>Language:</b> {book['language']}<br></br>
                                        </div>
                                    <div className='read-btn-section'>
                                        <Link className='read-book' to={'/book/' + book['id']}>Read Book</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                </div>
        </div>
        <Footer />
        </>
    );
};

export default Library;