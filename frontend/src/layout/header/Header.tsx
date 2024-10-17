import { useState } from "react"
import "./header.scss"


const pages = ['Marketplace', 'Artists', 'Community', "Collections"];

function Header() {

    const [activeLinePage, setActiveLinePage] = useState(pages[0])

    return (
        <header className='Header'>
            <div className="container" style={{display: "flex", justifyContent: "space-between", width: "100%", flexDirection: "row" }}>
                <div className="appBar_header">
                    {pages.map(page => (
                        <div
                            key={page}
                            className={`page_style ${activeLinePage === page ? 'active' : ''}`}
                            onClick={() => {
                                setActiveLinePage(page)
                            }}
                        >
                            {page}
                            {activeLinePage === page && <div className='underline'></div>}
                        </div>
                    ))}
                </div>
                <button style={{width: "143px", height:"48px"}}>CONTACT</button>
            </div>
        </header>
    );
}
export default Header;
