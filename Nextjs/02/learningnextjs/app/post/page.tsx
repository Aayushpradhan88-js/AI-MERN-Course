import React from 'react'

export default async function PostPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  console.log("response", response)

  const posts = await response.json()
  console.log("posts data:", posts)

  return (
    <div className='bg-amber-500'>
      {posts.slice(0, 5).map((p: any) => {
        <h2 key={p.id}>{p.title}</h2>
      })}
    </div>
  )

}
