import React, { useState, useEffect } from 'react'

const allItems = ["Apple", "Banana", "Cherry", "Date", "Elderberry",
    "Fig", "Grape", "Honeydew", "Kiwi", "Lemon", "Litchi",
    "Mango", "Nectarine", "Orange", "Papaya", "Quince"
]

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (searchTerm === "") {
            setResults([]);
            return
        }

        setIsLoading(true)

        const timer = setTimeout(() => {
            const filtered = allItems.filter((item) => {
                return item.toLowerCase().includes(searchTerm.toLowerCase()) // added return
            })
            console.log(filtered)
            setResults(filtered)
            setIsLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchTerm])

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='search fruits'
                style={{ padding: "8px", width: "100%" }}
            />

            {isLoading && <p>Searching fruits...</p>}

            {!isLoading && searchTerm && results.length === 0 && (
                <p>No results found</p>
            )}

            <ul>
                {results.map((item) =>{ return <li key={item}>{item}</li> })}
            </ul>
        </div>
    )
}

export default Search