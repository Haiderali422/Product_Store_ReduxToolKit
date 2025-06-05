import  { useEffect } from 'react';
import './ProductDetail.css';
import { useParams , Link } from 'react-router-dom';
import placeholder from "../../assets/placeholder.png";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import {FetchSingleProduct} from "../../Network/network.js"
import {
    ADD_TO_CART,
    DECREMENT_QUANTITY,
    INCREMENT_QUANTITY,
    SET_SINGLE_PRODUCT,
    SET_LOADING, REMOVE_FROM_CART,
} from "../../features/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.cart.isLoading);
    const products = useSelector(state => state.cart.products);
    const items = useSelector(state => state.cart.items);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            dispatch(SET_LOADING(true));

            try {
                const res = FetchSingleProduct(id)
                dispatch( SET_SINGLE_PRODUCT( res.product));
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                dispatch(SET_LOADING(false));
            }
        };

        fetchProduct();
    }, [id, dispatch]);

    if (isLoading) return <Loader />;

    const product = products?.find(p => p.id === parseInt(id));
    if (!product) return <p className="product-not-found">Product not found.</p>;

    const imageSrc = product.image || placeholder;

    return (

        <>
            <div className="back-arrow-container">
                <Link to={`/`}>
                    <Button text={"← Back to Home"}/>
                </Link>
            </div>
            <div className="product-detail-container">

                <div className="product-detail-card">
                    <div className="product-image-wrapper">
                        <img
                            className="product-detail-image"
                            src={imageSrc}
                            alt={product.title}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = placeholder;
                            }}
                        />
                    </div>

                    <div className="product-detail-content">
                        <h2 className="product-title">{product.title}</h2>
                        <p className="product-brand"><strong>Brand:</strong> {product.brand}</p>
                        <p className="product-category"><strong>Category:</strong> {product.category?.toUpperCase()}</p>
                        <p className="product-description"><strong>Description:</strong> {product.description}</p>
                        <p className="product-model"><strong>Model:</strong> {product.model}</p>
                        <p className="product-color"><strong>Color:</strong> {product.color}</p>
                        <p className="product-price"><strong>Price:</strong> ${product.price}</p>
                        <p className="product-discount"><strong>Discount:</strong> {product.discount}%</p>

                        <div className="product-action-buttons">
                            <Button
                                text="-"
                                onClick={() => dispatch( DECREMENT_QUANTITY( product.id))}
                            />
                            {items.length > 0 ?  <Button text='🗑️Remove' onClick={() => dispatch( REMOVE_FROM_CART( product.id ))} />
                                :    <Button
                                    text="🛒 Add to cart"
                                    onClick={() => dispatch( ADD_TO_CART(product ))}
                                />

                            }

                            <Button
                                text="+"
                                onClick={() => dispatch(INCREMENT_QUANTITY(product.id) )}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProductDetail;
