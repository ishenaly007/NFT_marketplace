import "./Main.scss";
import FirstBlock from "./mainFirstPage/firstBlock.tsx";
import SecondBlock from "./mainSecondPage/secondBlock.tsx";
import ThirdBlock from "./thirdMainPage/thirdBlock.tsx";
import FourthBlock from "./mainForthPage/fourthBlock.tsx";

const Main = () => {
    return (
        <main className="main">
            <div className="container">
                <FirstBlock />
                <SecondBlock />
                <ThirdBlock />
                <FourthBlock />
            </div>
        </main>
    );
};

export default Main;
