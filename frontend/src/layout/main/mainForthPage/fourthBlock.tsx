import "./fourthBlock.scss";
import { useEffect, useState } from "react";
import img from "../../../assets/Rectangle 9.png";

const FourthBlock = () => {
    const [images, setImages] = useState([]);
    const [email, setEmail] = useState(""); // State for email input

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/tokens");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                // Set images to only the first two entries
                setImages(result.slice(0, 2));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to handle email subscription
    const handleSubscribe = async () => {
        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to subscribe');
            }

            // Handle successful subscription (optional)
            alert("Successfully subscribed!");
            setEmail(""); // Clear the input field
        } catch (error) {
            console.error('Error subscribing:', error);
            alert("Error subscribing. Please try again.");
        }
    };

    return (
        <div className="mainFourthBlock">
            <div className="container">
                <div className="subscribeUpdates">
                    <div className="subscribeUpdates__img">
                        {images.length > 0 && (
                            <>
                                <img className="firstImage" src={`http://localhost:8080/api/v1/tokens/${images[0].id}/image`} alt="NFT 1" />
                                {images.length > 1 && (
                                    <img className="secondImage" src={`http://localhost:8080/api/v1/tokens/${images[1].id}/image`} alt="NFT 2" />
                                )}
                            </>
                        )}
                    </div>
                    <div className="subscribeUpdates__mail">
                        <h1>Subscribe And get our Updates Every Week</h1>
                        <p>We have a blog related to NFT so we can share thoughts and<br />routines on our blog which is updated weekly</p>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button onClick={handleSubscribe}>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FourthBlock;
