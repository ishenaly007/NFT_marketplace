import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import {database} from "./package.js";

function App() {
    return (
        <div className={App}>
            <Header/>
            <h2>Эчпочмаки</h2>
            <div>
                {database.map((pizza, index) => (
                    <Card
                        key={index}
                        name={pizza.name}
                        subtitle={pizza.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default App