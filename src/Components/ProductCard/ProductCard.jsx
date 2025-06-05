import React from 'react'
import './ProductCard.css'
import placeholder from '../.././assets/placeholder.png'
import Button from "../Button/Button";
import { useNavigate } from 'react-router-dom';
import {ADD_TO_CART} from "../../features/cartSlice.js";
import {useDispatch} from "react-redux";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageSrc = product.image ? product.image : placeholder;

    const handleViewDetails = () => {
        navigate(`/product/${product.id}`);
    };

    return (
       <>
               <div key={product.id} className="product-card">
                   <img className="product-image"  src={imageSrc} alt='Product'
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = placeholder;
                        }}

                   />
                   <div className="product-info">
                       <h5>{product.title.slice(0,25)}</h5>
                       <h5>Brand: {product.brand}</h5>
                       <p>Category: {product.category}</p>
                       <p>Model: {product.model}</p>
                       <h5>Color: {product.color}</h5>
                       <p>Price: ${product.price}</p>
                       <h5 className="discount">Discount: {product.discount}%</h5>
                       <div>
                           <Button text={"🛒Add to cart"} onClick={() => dispatch( ADD_TO_CART(product))}/>

                              <Button text={"🔍View Detail"} onClick={handleViewDetails} />

                       </div>
                   </div>
               </div>


       </>
    )
}
export default ProductCard
