import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import Home from './routes/Home.js'
import Book from './routes/Book.js'
import Read from './routes/Read.js'
import About from './routes/About.js'
import Library from './routes/Library.js'
import NoPage from './routes/NoPage.js'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Library" element={<Library />} />
         <Route path="/Book/:book_id" element={<Book />} />
         <Route path="/Book/:book_id/node/:node_id" element={<Book />} />
         <Route path="/Read/:book_id/node/:node_id/:read_param" element={<Read />} />
         <Route path="/About" element={<About />} />
         <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
