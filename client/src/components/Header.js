import '../styles/header.css';
export default function Header(religion){

    return(
            <header className="main-header">
                <div className='header-left'>
                <h4>Codex Sanctus</h4>
                </div>
                <div className='header-right'>
                <a href="/">Home</a> | <a href="/Library">Library</a> | <a href="/About">About</a>
                </div>
            </header>
    )
};