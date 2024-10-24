import "./secondBlock.scss";
import { useEffect, useState } from "react";
import Card from "./cards/cards.tsx";

const SecondBlock = () => {
    const [seconds, setSeconds] = useState(100);
    const [cardData, setCardData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false); // Modal state
    const [newToken, setNewToken] = useState({
        name: '',
        price: '',
        author: '',
        availableUntil: '',
        imageFile: null,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prev) => (prev === 0 ? 0 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor((seconds / 60) % 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

    useEffect(() => {
        const autoSlide = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
        }, 3000);
        return () => clearInterval(autoSlide);
    }, [cardData.length]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/tokens");
                const result = await response.json();
                setCardData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cardData.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewToken((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setNewToken((prev) => ({ ...prev, imageFile: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, send data to the server
        const formData = new FormData();
        Object.entries(newToken).forEach(([key, value]) => {
            formData.append(key, value);
        });
        try {
            await fetch("http://localhost:8080/api/v1/tokens", {
                method: "POST",
                body: formData,
            });
            setShowModal(false);
            // Optionally, refresh card data
        } catch (error) {
            console.error("Error submitting token:", error);
        }
    };

    return (
        <div className="mainSecondBlock">
            <div className="container">
                <div className="Super-art-week">
                    <div className="Super-art-week__text">
                        <h1>
                            <span>Amazing</span> and Super<br />
                            Unique Art of This <span>Week</span>
                        </h1>
                        <button onClick={() => setShowModal(true)}>Add your</button>
                    </div>

                    <div className="Super-art-week__card">
                        <div className="cards-wrapper">
                            <div className="cards"
                                 style={{transform: `translateX(-${Math.min(currentIndex * (370 + 20), 1170)}px)`}}>
                                {cardData.map((data, index) => (
                                    <Card
                                        key={index}
                                        imgSrc={`http://localhost:8080/api/v1/tokens/${data.id}/image`}
                                        title={data.name}
                                        ethAmount={data.price}
                                        timeLeft={formattedTime}
                                    />
                                ))}
                            </div>
                        </div>
                        <button className="arrow left" onClick={handlePrevClick}>{"<"}</button>
                        <button className="arrow right" onClick={handleNextClick}>{">"}</button>
                    </div>

                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Create NFT Token</h2>
                                <form onSubmit={handleSubmit}>
                                    <label>Token Name</label>
                                    <input type="text" name="name" placeholder="Name" value={newToken.name}
                                           onChange={handleInputChange} required />
                                    <label>Price</label>
                                    <input type="number" name="price" placeholder="Price" value={newToken.price}
                                           onChange={handleInputChange} required />
                                    <label>Author</label>
                                    <input type="text" name="author" placeholder="Author" value={newToken.author}
                                           onChange={handleInputChange} required />
                                    <label>Available until</label>
                                    <input type="datetime-local" name="availableUntil" value={newToken.availableUntil}
                                           onChange={handleInputChange} required />
                                    <label>Upload Image</label>
                                    <input type="file" name="imageFile" accept="image/*" onChange={handleFileChange} required />
                                    <button type="submit">Submit</button>
                                    <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecondBlock;
