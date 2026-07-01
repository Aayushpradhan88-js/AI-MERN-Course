import React, { useState } from 'react'
// import { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0)
    console.log(count)

    return (
        <>
        <div>Counter: {count}</div>
        <button onClick={() => setCount(count + 1)} >inc + </button>
        <button onClick={() => setCount(count - 2)} >dec - </button>
        <h1>{count}</h1>
        </>
    )
}

export default Counter