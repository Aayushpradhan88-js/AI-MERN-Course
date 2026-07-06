import React, { useState, useEffect, use } from 'react'

const JokeGenerator = () => {
    const [joke, setJoke] = useState("click to see new joke to make your boring life some seconds happy")
    const [loading, setLoading] = useState(false)

    //function
    function fetchJoke() {
        setLoading(true)

        fetch("https://official-joke-api.appspot.com/random_joke")
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setJoke(`${data.setup}-${data.punchline}-${data.id}-${data.type}`)
                setLoading(false) //data aaisako loading banda garneee
            })
            .catch(() => {
                setJoke("Couldn't fetch a joke. Try again....!!")
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchJoke()
    }, [])

    return (
        <div className='flex flex-col items-center min-h-screen bg-yellow-300 px-4'>
            <h1 className='text-3xl font-bold mb-6 text-gray-800'>Joke generator</h1>
            <div>
                {loading ? "Loading a joke" : joke}
            </div>

            <button
                onClick={fetchJoke}
                className='mt-6 bg-green-600 text-white px-6 py-3 rounded-lg  font-bold hover:bg-green:500'
            >Get New Joke</button>
        </div>
    )
}

export default JokeGenerator