import Header from '../components/Header.js';
import Footer from '../components/Footer.js'
import Edition from '../components/BookEdition.js';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Loading from '../components/Loading.js';
import '../styles/navigation.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ErrorPage from '../components/Error.js';

function navigate_nodes(structure, node_id) {
  // Filter nodes that have the current parentId
  // If node_id is present, fetch the content for that node
  // console.log('current node_id in navigate_nodes:: ', node_id);
  let current_node_id = parseInt(node_id);

  if (node_id){
                
  const nodeExists = structure.find(structure => structure.id === current_node_id);
  
  let node_level;

  if (nodeExists) {
    
    if (nodeExists.level_1_name && nodeExists.level_2_name === null) {
      node_level = 2;
    }
    if (nodeExists.level_2_name && nodeExists.level_3_name === null) {
      node_level = 3;
    }
    if (nodeExists.level_3_name && nodeExists.level_4_name === null) {
      node_level = 4;
    }



    const index = structure.findIndex(item => item.id === current_node_id);
    const result = index !== -1 ? structure.slice(index + 1) : [];

    let filtered_nodes = [];

    // console.log("Current node:", nodeExists);
    // console.log("Node exists:", nodeExists.id, "Determined node level:", node_level);

    for (const node of result) {

      if (node_level === 2 && node.level_2_name === null){
        break; // Stop if we reach a node of the same or higher level
      }
      if (node_level === 3 && node.level_3_name === null){
        break; // Stop if we reach a node of the same or higher level
      }
      if (node_level === 4 && node.level_4_name === null){
        break; // Stop if we reach a node of the same or higher level
      }
      filtered_nodes.push(node);

    }
    // console.log("Filtered nodes:", filtered);
    console.log('nodes index: ', structure[0]);
    return [node_level, filtered_nodes, structure[0]];
  }
  else {
    console.log("Node with id", current_node_id, "not found in structure.");
    return [];
  }

}
  else{
    let filtered_nodes = structure.filter(structure => structure.level_2_name === null);
    // console.log("No node_id provided, Level 1 nodes:", filtered_nodes);
    console.log('nodes index: ', structure[0]);
    return [1, filtered_nodes, structure[0]];
    
  }  

}

function node_row(structure, node_id) {
  
  let current_node_id = parseInt(node_id);
  console.log('current node_id in node_row:: ', node_id);
  const nodeExists = structure.find(structure => structure.id === current_node_id);
  if (nodeExists) {
    //find the node in the structure with the given node_id
    const node_row = structure.find(structure => structure.id === current_node_id);
    return node_row;
  }
  if (node_id === null || node_id === undefined){
    return structure[0];
  }
}

function Navigate({structure, edition}) {

  const { book_id, node_id } = useParams();
  
  let navigation_data = navigate_nodes(structure, node_id);
  let node_row_data = node_row(structure, node_id);
  console.log('node_row_data:: ', node_row_data);
  return (
    <div className='book'>
      <div className="navigation">
        
        <Breadcrumbs data={{ editions: edition, structures: node_row_data, level: navigation_data[0] }} />
        <div className='top-nav-button'>
        { navigation_data[0] < 2 ? ( <div style={{float:'right'}}>ㅤ</div> ) : (null)}
        { navigation_data[0] === 2 ? ( <Link style={{float:'right'}} to={'/Book/' + book_id}>Book Home</Link> ) : (null)}
        { navigation_data[0] > 2 ? ( <Link style={{float:'right'}} to={'/Book/' + book_id + '/node/' + (parseInt(node_id)-1)}>Previous Level</Link> ) : (null)}<div style={{clear:'both'}}></div>
        </div>
        
        <ul className="list-group nav-nodes">
          {navigation_data && navigation_data.length > 0 ? (
            navigation_data[1].map((node) => (
              <li className="list-group-item" key={node.id}>
                {node.level_1_name}
                {node.level_2_name ? ': ' + node.level_2_name : ''}
                {node.level_3_name ? ': ' + node.level_3_name : ''}
                {node.level_4_name ? ': ' + node.level_4_name : ''}

                <div className='nav-button'>
                  {node.is_leaf_container === 1 ? (
                  <Link to={`/read/${book_id}/node/${node.id}/full`}>Read</Link>
                ) : (
                  <Link to={`/Book/${book_id}/node/${node.id}`}>Navigate In</Link>
                )}
                </div>

              </li>
            ))
          ) : (
            <li>No navigation data available</li>
          )}
        </ul>
      </div>
      </div>
  );
}

function Book() {

  const { book_id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();

      setLoading(true);
      setError(null); // Reset error when switching chapters
      // Make GET request to fetch data
      axios
          .get(`/book/${book_id}`, {
            signal: controller.signal // Attach the signal to axios
          })
          .then((response) => {
              setData(response.data);
              setLoading(false);
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
  }, [book_id]);
  if (loading) return <div><Loading /></div>;
  if (error) return <ErrorPage error_message={error} />;
  if (data.error === true) return <ErrorPage error_message={data.data} />;

  return (
    <>
      <Header religion={data.data.book_edition.religion} />
      <div className='book-title'>
          <h1>{data.data.book_edition.work_name}: {data.data.book_edition.edition_name}</h1>
          </div>
      <div className='book-container'>
        
        <Navigate structure={data.data.structure} edition={data.data.book_edition} />
        
        <Edition edition={data.data.book_edition} />
      </div>
      <Footer />
    </>
  );
}

export default Book;