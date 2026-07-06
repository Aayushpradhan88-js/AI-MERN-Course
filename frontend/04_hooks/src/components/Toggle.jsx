import React, { useState } from 'react'

const Toggle = () => {
    const[isVisible, setIsVisible] = useState(false)

    return (
        <div>
            {/* <h1>Toggle</h1> */}

            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'Hide' : 'Show'} Message
            </button>

            {/* conditional Rendering */}
            {isVisible && <p>Hello there I am ReactJS</p>} 
        </div>
    )
}

export default Toggle