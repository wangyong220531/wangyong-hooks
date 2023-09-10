import useIncreament from "./hooks/useIncreament"

function App() {
    const [value, changeValue] = useIncreament(200, 3000);

    const handleClick = () => {
        changeValue(10);
    };

    return (
        <div>
            <p>{value}</p>
            <button onClick={handleClick}>改变值为10</button>
        </div>
    );
}

export default App
