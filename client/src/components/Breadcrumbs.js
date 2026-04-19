import '../styles/navigation.css';
import { useParams, Link } from 'react-router-dom';
export default function Breadcrumbs(data){
    const { book_id, read_param } = useParams();
    console.log('Breadcrumbs() data -> : ', data);
    return(

      <nav aria-label="breadcrumb" className='nav-breadcrumb'>
          <ol className="breadcrumb nodes-breadcrumb">
            <li className="breadcrumb-item"><Link to={'/book/' + book_id}>{data.data.editions.work_name}</Link></li>
            {data.data.level === 2 || (data.data.level === true && data.data.structures.level_1_name) ? (<li className="breadcrumb-item">{data.data.structures.level_1_name}</li>) : (null)}
            {data.data.level === 3 || (data.data.level === true && data.data.structures.level_2_name) ? (<li className="breadcrumb-item">{data.data.structures.level_2_name}</li>) : (null)}
            {data.data.level === 4 || (data.data.level === true && data.data.structures.level_3_name) ? (<li className="breadcrumb-item">{data.data.structures.level_3_name}</li>) : (null)}
            {data.data.level === 5 || (data.data.level === true && data.data.structures.level_4_name) ? (<li className="breadcrumb-item">{data.data.structures.level_4_name}</li>) : (null)}
            {read_param ? (<li className="breadcrumb-item active" aria-current="page">{read_param}</li>) : (null)}
          </ol>
        </nav>
        
    )
};