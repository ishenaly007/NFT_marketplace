import "./firstBlock.scss";
import { useState, useEffect } from "react";

const FirstBlock = () => {
    const [data, setData] = useState([]);
    const [remainingTimes, setRemainingTimes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [artWorkCount, setArtWorkCount] = useState(0);
    const [artistCount, setArtistCount] = useState(0);
    const [collectionCount, setCollectionCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/tokens");
                const result = await response.json();
                setData(result);

                const currentTime = Date.now();
                const times = result.map(item => {
                    if (item.availableUntil) {
                        const availableUntil = new Date(item.availableUntil).getTime();
                        const remainingTime = Math.floor((availableUntil - currentTime) / 1000);
                        return Math.max(remainingTime, 0);
                    }
                    return 0;
                });
                setRemainingTimes(times);

                // Запускаем анимацию счетчиков после загрузки данных
                animateCounters();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const animateCounters = () => {
        const targets = {
            artWork: 9,
            artist: 58,
            collection: 18
        };

        const duration = 1600;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            setArtWorkCount(Math.floor(targets.artWork * progress));
            setArtistCount(Math.floor(targets.artist * progress));
            setCollectionCount(Math.floor(targets.collection * progress));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTimes((prevTimes) => {
                return prevTimes.map((time, index) => {
                    if (index === currentIndex && time > 0) {
                        return time - 1;
                    }
                    return time;
                });
            });

            if (remainingTimes[currentIndex] === 0) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [currentIndex, remainingTimes, data.length]);

    const formatTime = (seconds) => {
        const secondString = String(Math.floor(seconds % 60)).padStart(2, "0");
        const minuteString = String(Math.floor((seconds / 60) % 60)).padStart(2, "0");
        const hoursString = String(Math.floor(seconds / 3600)).padStart(2, "0");
        return { hoursString, minuteString, secondString };
    };

    return (
        <section className="mainBlock">
            <div className="container" style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
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
                            <h2>{artWorkCount}<span>K</span></h2>
                            <p>Art work</p>
                        </div>
                        <div className="columnLine"></div>
                        <div className="stat-item">
                            <h2>{artistCount}<span>K</span></h2>
                            <p>Artist</p>
                        </div>
                        <div className="columnLine"></div>
                        <div className="stat-item">
                            <h2>{collectionCount}<span>K</span></h2>
                            <p>Collection</p>
                        </div>
                    </div>
                </div>

                {data.length > 0 && (
                    <div className="artContainer">
                        <div className="reverseTimer">
                            <div className="time">
                                <span>Ends in</span>
                                <p>
                                    {formatTime(remainingTimes[currentIndex] || 0).hoursString}:
                                    {formatTime(remainingTimes[currentIndex] || 0).minuteString}:
                                    {formatTime(remainingTimes[currentIndex] || 0).secondString}
                                </p>
                            </div>
                            <div className="price">
                                <span>Current bid</span>
                                <p>{data[currentIndex]?.price || 0} ETH</p>
                            </div>
                            <button style={{ background: "transparent", border: "1px #D6EF0E solid", width: "205px", color: "#D6EF0E", fontWeight: "bold", height: "57px" }}>Place A Bid</button>
                        </div>

                        <div className="digitalArt" key={data[currentIndex].id}>
                            <img src={`http://localhost:8080/api/v1/tokens/${data[currentIndex].id}/image`} alt={data[currentIndex].name || "NFT Art"} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FirstBlock;
