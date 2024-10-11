//import React, {useEffect, useState} from 'react';
import Layout from './layout/layout.tsx';
import './tokens.css';

// interface NftToken {
//     id: number;
//     name: string;
//     price: number;
//     author: string; // Добавлено
//     createdAt: string; // Добавлено
//     availableUntil: string; // Добавлено
// }

const App: React.FC = () => {
    // const [tokens, setTokens] = useState<NftToken[]>([]);
    //
    // useEffect(() => {
    //     // Делаем запрос к backend (Spring Boot на 8080)
    //     fetch('http://localhost:8080/api/v1/tokens')
    //         .then((response) => response.json())
    //         .then((data: NftToken[]) => {
    //             setTokens(data); // Устанавливаем данные в state
    //         })
    //         .catch((error) => {
    //             console.error('Ошибка:', error);
    //         });
    // }, []);

    return (
        <div className="App">
            <Layout/>
            {/*<h1 className="title">NFT Tokens</h1>*/}
            {/*<ul className="token-list">*/}
            {/*    {tokens.map((token) => (*/}
            {/*        <li key={token.id} className="token-item">*/}
            {/*            <div className="token-details">*/}
            {/*                <h2 className="token-name">{token.name}</h2>*/}
            {/*                <p className="token-price">Price: {token.price}</p>*/}
            {/*                <p className="token-author">Author: {token.author}</p>*/}
            {/*                <p className="token-date">Created At: {token.createdAt}</p>*/}
            {/*                <p className="token-availability">Available Until: {token.availableUntil}</p>*/}
            {/*            </div>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    );
};

export default App;