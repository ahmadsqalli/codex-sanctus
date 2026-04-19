import '../styles/edition.css'; 
export default function Edition(edition){

    return(
        <div className="edition">
            <h3 className='edition_title'>{edition.edition.work_name}: {edition.edition.religion}</h3>
            <div className='edition_info'>
                <p><b>Edition:</b> {edition.edition.edition_name}<br></br>
            <b>Language:</b> {edition.edition.language}<br></br>
            <b>About:</b> {edition.edition.edition_metadata.about}</p>
            </div>
        </div>
    )
};