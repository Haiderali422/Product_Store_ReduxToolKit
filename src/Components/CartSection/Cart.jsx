import './cart.css';
import '../../App.css';
import Button from '../Button/Button';
import emptyCart from '../../assets/emptyCart.jpg';
import placeholder from '../../assets/placeholder.png';
import {DECREMENT_QUANTITY, INCREMENT_QUANTITY, REMOVE_FROM_CART, TOGGLE_CART } from "../../features/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";


const TAX_RATE = 0.1; // 10% tax

const Cart = () => {
    const dispatch = useDispatch();
   const items  = useSelector(state => state.cart.items || []);
   const isVisible = useSelector(state => state.cart.isVisible);

    const totalPrice = items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const tax = totalPrice * TAX_RATE;
    const grandTotal = totalPrice + tax;

    return (
        <div className={`cart-drawer ${isVisible ? 'open' : ''}`}>
            <Button text='✖' className='closeBtn' onClick={() => dispatch(TOGGLE_CART())} />
            <h2>Cart Section</h2>

            {items.length === 0 ? (
                <img src={emptyCart} alt='Empty Cart' className="empty-cart-image" />
            ) : (
                <>
                    {items.map(item => {
                        const imageSrc = item.image ? item.image : placeholder;

                        return (
                            <div key={item.id} className="cart-item">
                                <img src={imageSrc} alt='Product'
                                     onError={(e) => {
                                         e.target.onerror = null;
                                         e.target.src = placeholder;
                                     }}
                                />
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>${item.price} x {item.quantity}</p>
                                    <div>
                                        <Button text='-' onClick={() => dispatch(DECREMENT_QUANTITY(item.id))} />
                                        <Button text='+' onClick={() => dispatch( INCREMENT_QUANTITY( item.id))} />
                                        <Button text='🗑️Remove' onClick={() => dispatch( REMOVE_FROM_CART(item.id))} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="cart-summary">
                        <p>Subtotal: ${totalPrice.toFixed(2)}</p>
                        <p>Tax (10%): ${tax.toFixed(2)}</p>
                        <h3>Total: ${grandTotal.toFixed(2)}</h3>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
