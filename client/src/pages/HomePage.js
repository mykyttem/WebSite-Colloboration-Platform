import React, {useState, useEffect} from "react";

const Home = () => {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("/test").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

    return (
        <div>
            <h1>Welcome to platform colloboration</h1>
        </div>
    )
}

export default Home;