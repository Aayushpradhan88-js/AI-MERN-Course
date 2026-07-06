import React from 'react'

const GetName = ({ name, onSendName }) => {

    const handleClick = () => {
        onSendName(name); // sending this card's name to parent
    };
    return (
        <div className="card">
            <p>hello, {name}</p>
            <button onClick={handleClick}>Greet</button>
        </div>
    )
}

export default GetName