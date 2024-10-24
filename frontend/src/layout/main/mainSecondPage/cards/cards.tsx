import logo from "../../../../assets/ethereum-classic-(etc).svg";
import clock from "../../../../assets/clock.svg";
import "../secondBlock.scss";

class CardProps {
    key?: number;
    title?: string;
    ethAmount?: number;
    timeLeft?: number;
    imgSrc?: string;
}

const formatTime = (seconds: number) => {
    const secondString = String(seconds % 60).padStart(2, "0");
    const minuteString = String(Math.floor((seconds / 60) % 60)).padStart(2, "0");
    const hoursString = String(Math.floor(seconds / 3600)).padStart(2, "0");
    return `${hoursString}:${minuteString}:${secondString}`;
};

const Card = ({ imgSrc, title, ethAmount, timeLeft }: CardProps) => (
    <div className="card">
        <img src={imgSrc} alt={title} />
        <div className="nameMoney">
            <h3>{title}</h3>
            <p>
                <img src={logo} alt="Ethereum logo" style={{ width: "24px", height: "24px", margin: "0" }} />
                {ethAmount} ETH
            </p>
        </div>
        <p style={{ color: "grey", fontWeight: "400", fontSize: "14px", margin: "-10px", marginLeft: "30px" }}>
            Ending in
        </p>
        <div className="timeBuy">
            <p>
                <img src={clock} alt="Clock icon" />
                {formatTime(timeLeft || 0)}
            </p>
            <button>Place a Bid</button>
        </div>
    </div>
);

export default Card;
