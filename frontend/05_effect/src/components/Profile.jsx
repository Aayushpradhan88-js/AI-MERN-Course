import React, { useState, useEffect } from 'react'

const Profile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => { //api calls 
        async function fetchUser() {
            const res = await fetch("https://api.github.com/users/octocat")
            console.log("res", res)
            console.log("status: ", res.status)
            console.log("type: ", res.type)

            const data = await res.json()
            // console.log("data2:",data)
            // console.log("status", data.status)
            // const status =  data.status
            setUser(data)
            setLoading(false)
        }

        fetchUser()
    }, [])

    if (loading) return <p>Loading.......</p>

    return (
        <div>
            <h1>{user.name}Profile </h1>

            <h2>{user.name}</h2>
            <h2>{user.bio}</h2>

        </div>
    )
}

export default Profile