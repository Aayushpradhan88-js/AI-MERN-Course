import { useState } from 'react'
import './App.css'
import Child from './components/Child'
import GetName from './components/GetName'

function App() { //parent component

  const users = ["rakesh", "umesh"];
  const showUserName = (name) => {
    alert(`hello, ${name}`);
  };
  return (
    <>
      {/* <h1>Hello react</h1>
      <h2>Hello Props</h2>

      <Child product="benq montior" price="NPR 40,000" /> //child component */}

      <div>
        {users.map((user, index) => (
          <GetName key={index} name={user} onSendName={showUserName} />
        ))}
      </div>
    </>

  )
}

export default App
