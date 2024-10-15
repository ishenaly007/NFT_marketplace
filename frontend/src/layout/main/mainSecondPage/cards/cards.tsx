import logo from "../../../../assets/ethereum-classic-(etc).svg";
import clock from "../../../../assets/clock.svg";
import "../secondBlock.scss"

const Card = ({ imgSrc, title, ethAmount, timeLeft }) => (
    <div className="card">
        <img src={imgSrc} alt={title} />
        <div className="nameMoney">
            <h3>{title}</h3>
            <p>
                <img src={logo} alt="Ethereum logo" style={{width: "24px", height: "24px", margin: "0"}}/>
                {ethAmount}ETH
            </p>
        </div>
        <p style={{
            color: "grey",
            fontWeight: "400",
            fontSize: "14px",
            margin: "-10px",
            marginLeft: "30px"}}>Ending in</p>
        <div className="timeBuy">
            <p>
                <img src={clock} alt="Clock icon" />
                {timeLeft}
            </p>
            <button>Place a Bid</button>
        </div>
    </div>
);

export default Card;
