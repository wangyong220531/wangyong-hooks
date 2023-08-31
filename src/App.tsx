import useIncreament from "./hooks/useIncreament"

function App() {
    const value = useIncreament(0, 100)

    return <>{value}</>
}

export default App
