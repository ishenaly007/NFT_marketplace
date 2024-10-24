import "./thirdBlock.scss";
import { useEffect, useState } from "react";

const ThirdBlock = () => {
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [newToken, setNewToken] = useState({ // State for new token data
        name: '',
        price: '',
        author: '',
        availableUntil: '',
        imageFile: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/tokens");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setImages(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Handle input changes for the new token
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewToken((prevToken) => ({ ...prevToken, [name]: value }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setNewToken((prevToken) => ({ ...prevToken, imageFile: e.target.files[0] }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in newToken) {
            formData.append(key, newToken[key]);
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/tokens", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create NFT');
            }

            alert("NFT created successfully!");
            setShowModal(false); // Close modal after successful submission
            setNewToken({ name: '', price: '', author: '', availableUntil: '', imageFile: null }); // Reset form
        } catch (error) {
            console.error('Error creating NFT:', error);
            alert("Error creating NFT. Please try again.");
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="thirdMainBlock">
            <div className="container">
                <div className="create-sell-NFT">
                    <div className="create-sell-NFT__text">
                        <h1>Create And Sell Your Best NFTs</h1>
                        <p>Start exploring the world of digital art and NFTs today and take control of your digital assets with confidence!</p>
                        <button onClick={() => setShowModal(true)}>Create Now</button>
                        <a href="/">Learn More</a>
                    </div>

                    {images.length >= 2 && (
                        <div className="create-sell-NFT__img">
                            <img className="img-first" src={`http://localhost:8080/api/v1/tokens/${images[0].id}/image`} alt="NFT 1" />
                            <img className="img-second" src={`http://localhost:8080/api/v1/tokens/${images[1].id}/image`} alt="NFT 2" />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for creating NFT */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create NFT Token</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Token Name</label>
                            <input type="text" name="name" placeholder="Name" value={newToken.name} onChange={handleInputChange} required />
                            <label>Price</label>
                            <input type="number" name="price" placeholder="Price" value={newToken.price} onChange={handleInputChange} required />
                            <label>Author</label>
                            <input type="text" name="author" placeholder="Author" value={newToken.author} onChange={handleInputChange} required />
                            <label>Available until</label>
                            <input type="datetime-local" name="availableUntil" value={newToken.availableUntil} onChange={handleInputChange} required />
                            <label>Upload Image</label>
                            <input type="file" name="imageFile" accept="image/*" onChange={handleFileChange} required />
                            <button type="submit">Submit</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThirdBlock;
