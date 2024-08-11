import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { Globe } from './pages/Globe'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <Globe/>
    </div>
  )
}

export default App
