import React from 'react'

function Greeting({name, time}){

//    const time = Date.now() 
   return(
    <>
      <h1>Hello, {name}</h1>
      <p>What is you're current time {time}</p>
    </>
   )
}

export default Greeting