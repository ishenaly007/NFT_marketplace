import "./secondBlock.scss";
import img from "../../../assets/Rectangle 9.png";
import { useEffect, useState } from "react";
import Card from "./cards/cards.tsx";

const SecondBlock = () => {
    const [seconds, setSeconds] = useState(100);

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

    const formattedTime = `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor((seconds / 60) % 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

    const cardData = [
        { title: "Charge, Qi tiao yu", ethAmount: 490, imgSrc: img },
        { title: "Charge, Qi tiao yu", ethAmount: 490, imgSrc: img },
        { title: "Charge, Qi tiao yu", ethAmount: 490, imgSrc: img },
    ];

    return (
        <div className="mainSecondBlock">
            <div className="container">
                <div className="Super-art-week">
                    <div className="Super-art-week__text">
                        <h1>
                            <span>Amazing</span> and Super<br />
                            Unique Art of This <span>Week</span>
                        </h1>
                        <button>See All</button>
                    </div>
                    <div className="Super-art-week__card">
                        <div className="cards">
                            {cardData.map((data, index) => (
                                <Card key={index} imgSrc={data.imgSrc} title={data.title} ethAmount={data.ethAmount} timeLeft={formattedTime} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondBlock;
