import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Movies from "./pages/MoviesPage"
import Series from "./pages/SeriesPage"
import Pricing from "./pages/PricingPage"
import Detail from "./components/Detail"
import HomePage from "./pages/HomePage"

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/movie" element={<Movies/>}/>
        <Route path="/series" element={<Series/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
    </div>
  )
}

export default App