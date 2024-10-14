import "./footer.scss"
import icon1 from "../../assets/socialIcon/Frame.svg"
import icon2 from "../../assets/socialIcon/Frame1.svg"
import icon3 from "../../assets/socialIcon/Frame2.svg"
import icon4 from "../../assets/socialIcon/Frame3.svg"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="socialMainIcons">
                    <div className="socialNetworks">
                        <p>Discover NFTs by category, track the latest drop, and and follow the collections you love. Enjoy
                            it!</p>
                        <div className="imgIcons" style={{gap: "5px", display: "flex"}}>
                            <img src={icon1} alt=""/>
                            <img src={icon2} alt=""/>
                            <img src={icon3} alt=""/>
                            <img src={icon4} alt=""/>
                        </div>
                    </div>

                    <div className="About">
                        <div className="Explore">
                            <h2>Explore</h2>
                            <p>Art Sign it</p>
                            <p>Collectibles</p>
                            <p>Domain name</p>
                            <p>Utility</p>
                        </div>
                        <div className="Statistic">
                            <h2>Statistic</h2>
                            <p>Art Sign it</p>
                            <p>Collectibles</p>
                            <p>Domain name</p>
                        </div>
                        <div className="Company">
                            <h2>Company</h2>
                            <p>Art Sign it</p>
                            <p>Collectibles</p>
                            <p>Domain name</p>
                            <p>Utility</p>
                        </div>
                        <div className="Resources">
                            <h2>Resources</h2>
                            <p>Art Sign it</p>
                            <p>Collectibles</p>
                            <p>Domain name</p>
                        </div>
                    </div>
                </div>

                <div className="Privacy">
                    <div className="PolicyLine" style={{width: "1200px",height: "1px", backgroundColor: "1E1E1EB8"}}></div>
                    <div className="Copyright">
                        <p>© Copyright 2023 - davixq</p>
                        <div className="Privacy">
                            <a href="">Privacy Policy</a>
                            <a href="">Terms & Conditions</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;