import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail  from "./Components/ProductDetail/ProductDetail.jsx";
import Home from "./Pages/Home/Home.jsx";
import AboutUS from "./Pages/AboutUs/AboutUS";
import ContactUs from "./Pages/ContactUS/ContactUS";
import Layout from "./Pages/Layout/Layout";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>} >
                    <Route path="/" element={<Home/>} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/about" element={<AboutUS/>}/>
                    <Route path="/contact" element={<ContactUs/>}/>
                </Route>
            </Routes>
        </Router>
    </>
  )
}

export default App
