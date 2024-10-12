import React, {useEffect, useState} from 'react';
import "../../tokens.css";

interface NftToken {
    id: number;
    name: string;
    price: number;
    author: string;
    createdAt: string;
    availableUntil: string;
}

const Ishenalys: React.FC = () => {
    const [tokens, setTokens] = useState<NftToken[]>([]);
    const [showModal, setShowModal] =
        useState(false);
    const [newToken, setNewToken] =
        useState({name: '', price: '', author: '', availableUntil: ''});


    useEffect(() => {
        fetch('http://localhost:8080/api/v1/tokens')
            .then((response) => response.json())
            .then((data: NftToken[]) => setTokens(data))
            .catch((error) => console.error('Ошибка:', error));
    }, []);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Обработка изменений в форме
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewToken({...newToken, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/v1/tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newToken),
        })
            .then((response) => response.json())
            .then((data) => {
                setTokens([...tokens, data]); // Обновить список токенов
                setNewToken({name: '', price: '', author: '', availableUntil: ''});
                closeModal();
            })
            .catch((error) => console.error('Ошибка:', error));
    };

    return (
        <div className="Ishenalys">
            <h1 className="title">NFT Tokens</h1>

            <button className="create-button" onClick={openModal}>Create New</button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create NFT Token</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Token Name</label>
                            <input type="text" name="name" placeholder="Name" value={newToken.name}
                                   onChange={handleInputChange} required/>
                            <label>Price</label>
                            <input type="number" name="price" placeholder="Price" value={newToken.price}
                                   onChange={handleInputChange} required/>
                            <label>Author</label>
                            <input type="text" name="author" placeholder="Author" value={newToken.author}
                                   onChange={handleInputChange} required/>
                            <label>Available until</label>
                            <input type="datetime-local" pattern={"yyyy-MM-dd'T'HH:mm:ss"} name="availableUntil" value={newToken.availableUntil}
                                   onChange={handleInputChange} required/>
                            <button type="submit">Submit</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            <ul className="token-list">
                {tokens.map((token) => (
                    <li key={token.id} className="token-item">
                        <div className="token-details">
                            <h2 className="token-name">{token.name}</h2>
                            <p className="token-price">Price: {token.price}</p>
                            <p className="token-author">Author: {token.author}</p>
                            <p className="token-date">Created At: {token.createdAt}</p>
                            <p className="token-availability">Available Until: {token.availableUntil}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Ishenalys;