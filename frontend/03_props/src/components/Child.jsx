// import React from "react";

// const Child = () => {
//     return(
//         <div>
//             <h1>Child component</h1>
//         </div>
//     )
// }

// export default Child

//shortcut trick - rafce 

import React from 'react'

// example 1
// const Child = (props) => {
//     console.log(props.product)
//     console.log(props.price)

//     return (
//         <>
//             <h1>This is BENQ MONITOR SERIES 2</h1>
//             <div>{props.product}</div>
//             <div>{props.price}</div>
//         </>
//     )
// }

// example 2
function Child({product, price, phoneNumber = 987374837484738}){
    return (
        <>
            <div>{product}</div>
            <div>{price}</div>
            <div>{phoneNumber}</div>
        </>
    )
}

export default Child