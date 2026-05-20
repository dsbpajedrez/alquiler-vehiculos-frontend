import { useState } from 'react'
import './App.css'
import AppRoter from './routes/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppRoter />
  )
}

export default App
