import { useState, useEffect } from 'react'
import './App.css'

async function postData() {
  const response = await fetch('api', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "josh",
      age: "24",
    })
  })
  const datas = await response.json();
  return datas;
}

/*function App() {
  const [data, setData] = useState()

  async function fetchData() {
    const response = await fetch('https://randomuser.me/api/');
    const datas = await response.json();
    setData(datas)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
     
      <h1>Vite + React</h1>
        <pre>
        {
          JSON.stringify(data)
        }
        </pre>
      
    </>
  )
}

export default App
*/