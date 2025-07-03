import { useState } from 'react'
import './App.css'

function App() {
  const [date, setDate] = useState(new Date())

  return (
    <>
    <h1 class="text-2xl flex justify-center items-center h-screen font-bold">
      Welcome to SpaceX!
    </h1>
    </>
  )
}

export default App
