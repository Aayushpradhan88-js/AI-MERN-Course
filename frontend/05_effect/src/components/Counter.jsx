import React, {useState, useEffect} from 'react'

const Counter = () => {
    const [count, setCount] = useState(0)

    //useEffect 

    // running useeffect withouh dependency array
    // useEffect(() => {
    //     console.log("My code is run after single render.......")
    // })

    // running useEffect with empty dependency array
    useEffect(() => {
        console.log("My code is run after single render.......")
        // document.title = "Welcome to React"
    }, [])
    

  return (
    <div>
        <h1>Counter: {count}</h1>
        <button onClick={() => setCount(count + 1)}>Inc +</button>
        <button onClick={() => setCount(count - 1)}>Dec -</button>
    </div>
  )
}

export default Counter