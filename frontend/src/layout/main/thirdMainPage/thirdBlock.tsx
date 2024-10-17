import "./thirdBlock.scss"
import img from "../../../assets/Rectangle 9.png"

const ThirdBlock = () => {
    return (
        <div className="thirdMainBlock">
            <div className="container">
                <div className="create-sell-NFT">
                    <div className="create-sell-NFT__text">
                        <h1>Create And Sell
                            Your Best NFTs</h1>
                        <p>Start exploring the world of digital art and NFTs today and take control of your digital assets with confidence!</p>
                        <button>Create Now</button>
                        <a href="/">Learn More</a>
                    </div>
                    <div className="create-sell-NFT__img">
                        <img className="img-first" src={img} alt=""/>
                        <img className="img-second" src={img} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThirdBlock;