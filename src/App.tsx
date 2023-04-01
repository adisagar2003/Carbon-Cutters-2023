import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CallToActionWithAnnotation from './Components/Cta'
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import Navbar from './Components/Navbar'
import MainPage from './Pages/MainPage'
import MapPage from './Pages/MapPage'

function App() {
  const [count, setCount] = useState<Number>(0);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/explore' element={<MapPage />} />
      </Routes>
    </div>
  )
}

export default App
