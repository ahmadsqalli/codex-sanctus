import '../styles/error.css'; 
import error_icon from '../assets/icons/error.svg';
import { Link } from "react-router-dom";

export default function ErrorPage(error_message){

    return(
        <div className="error_page">
            <img src={error_icon} fill="#EFBF04" alt="Error" />

            <h1>Error</h1>
            <p>{error_message.error_message}</p>

            <div className="error_page_buttons">
                <Link to={'/Library'} className="error_page_button">Go to Library</Link>
            </div>
            
                <Link to={'/'} className="error_page_button_2">Go to Home Page</Link>
        </div>
    )
};