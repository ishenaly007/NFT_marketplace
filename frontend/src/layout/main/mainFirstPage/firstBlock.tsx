import "./firstBlock.scss";
import mainImage from "../../../assets/Rectangle 9.png";
import { useState, useEffect } from "react";

const FirstBlock = () => {
    const [second, setSeconds] = useState(100);
    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prev) => {
                if (prev === 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const secondString = String(Math.floor(second % 60)).padStart(2, "0");
    const minuteString = String(Math.floor((second / 60) % 60)).padStart(2, "0");
    const hoursString = String(Math.floor(second / 3600)).padStart(2, "0");

    //potom

    //const isTimeOut = minuteString < 30;

    return (
        <section className="mainBlock">
            <div className="container" style={{ flexDirection: "row", alignItems: "center" }}>
                <div className="discoverText">
                    <div className="titleDiscover">
                        <h1>
                            Discover and<br /> Collect The Best NFTs<span style={{ color: "#D6EF0E" }}> Digital Art.</span>
                        </h1>
                        <p>
                            Get started with the easiest and most secure platform to buy and trade digital ART and NFT’s.
                            Start exploring the world of digital art and NFTs today and take control of your digital
                            assets with confidence!
                        </p>
                    </div>
                    <div className="learnAbout">
                        <button style={{ width: "178px", height: "52px" }}>Explore Now</button>
                        <a href="">Learn more</a>
                    </div>
                    <div className="statistic">
                        <div className="stat-item">
                            <h2>8.9<span>K</span></h2>
                            <p>Art work</p>
                        </div>
                        <div className="columnLine"></div>
                        <div className="stat-item">
                            <h2>65<span>K</span></h2>
                            <p>Artist</p>

                        </div>
                        <div className="columnLine"></div>
                        <div className="stat-item">
                            <h2>87<span>K</span></h2>
                            <p>Collection</p>
                        </div>
                    </div>
                </div>

                <div className="artContainer">
                    <div className="digitalArt">
                        <img src={mainImage} alt=""/>
                    </div>
                    <div className="reverseTimer">
                        <div className="time">
                            <span>Ends in</span>
                            <p>{hoursString}:{minuteString}:{secondString}</p>
                        </div>
                        <div className="price">
                            <span>Current bid</span>
                            <p>0.24ETH</p>
                        </div>
                        <button style={{ background: "transparent", border: "1px #D6EF0E solid", width: "205px", color: "#D6EF0E", fontWeight: "bold", height: "57px" }}>Place A Bid</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FirstBlock;
