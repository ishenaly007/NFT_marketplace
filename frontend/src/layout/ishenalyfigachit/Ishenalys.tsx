import {useEffect, useState} from 'react';
import "./tokens.css";

interface NftToken {
    id: number;
    name: string;
    price: number;
    author: string;
    createdAt: string;
    availableUntil: string;
    imageUrl: string;
}

const Ishenalys: React.FC = () => {
    const [tokens, setTokens] = useState<NftToken[]>([]);
    const [showModal, setShowModal] =
        useState(false);
    const [newToken, setNewToken] =
        useState({name: '', price: '', author: '', availableUntil: ''});
    const [imageFile, setImageFile] = useState<File | null>(null);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const maxSize = 10 * 1024 * 1024; // 10MB

            if (file.size > maxSize) {
                alert('Файл слишком большой! Максимальный размер: 10MB');
                setImageFile(null);
            } else {
                setImageFile(file);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newToken.name);
        formData.append('price', newToken.price);
        formData.append('author', newToken.author);
        formData.append('availableUntil', newToken.availableUntil);
        if (imageFile) {
            formData.append('image', imageFile); // Добавляем файл в запрос
        }

        fetch('http://localhost:8080/api/v1/tokens', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setTokens([...tokens, data]); // Обновить список токенов
                setNewToken({name: '', price: '', author: '', availableUntil: ''});
                setImageFile(null);
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
                            <input type="datetime-local" pattern={"yyyy-MM-dd'T'HH:mm:ss"} name="availableUntil"
                                   value={newToken.availableUntil}
                                   onChange={handleInputChange} required/>
                            <label>Upload Image</label>
                            <input type="file" name="imageFile" accept="image/*" onChange={handleFileChange} required/>
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
                            {token.imageUrl && (
                                <img src={`http://localhost:8080/api/v1/tokens/${token.id}/image`} alt={token.name}
                                     className="token-image"/>

                            )}
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Ishenalys;