import useIncreament from "./hooks/useIncreament"

function App() {
    const value = useIncreament(0, 10)

    return <>{value}</>
}

export default App
