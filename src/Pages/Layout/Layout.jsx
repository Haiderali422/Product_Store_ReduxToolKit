import React from 'react'
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Cart from "../../Components/CartSection/Cart";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
       <>
           <Navbar />
           <Cart />
           <Outlet/>


       </>
    )
}
export default Layout
