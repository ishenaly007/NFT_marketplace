import "./fourthBlock.scss"
import img from "../../../assets/Rectangle 9.png"

const FourthBlock = () => {
    return (
        <div className="mainFourthBlock">
            <div className="container">
                <div className="subscribeUpdates">
                    <div className="subscribeUpdates__img">
                        <img className="firstImage" src={img} alt=""/>
                        <img className="secondImage" src={img} alt=""/>
                    </div>
                    <div className="subscribeUpdates__mail">
                        <h1>Subscribe And get our
                            Updates Every Week</h1>
                        <p>We have a blog related to NFT so we can share thoughts and<br/>routines on our blog which is updated weekly</p>
                        <div className="input-container">
                            <input type="text" placeholder="Enter your email"/>
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FourthBlock;