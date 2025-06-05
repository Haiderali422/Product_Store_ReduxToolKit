
import { ShoppingCart } from 'lucide-react';
import './CartIcon.css';
import {useDispatch, useSelector} from "react-redux";
import {TOGGLE_CART} from "../../features/cartSlice.js";
const CartIcon = () => {
   const dispatch = useDispatch();
   const items = useSelector(state => state.cart.items);
    return (
        <div className="cart-icon-wrapper" onClick={() => dispatch(TOGGLE_CART())}>
            <ShoppingCart size={35} />
            { items.length> 0 ? <span className="cart-badge">{items.length}</span> : <span className="cart-badge">{0}</span>}
        </div>
    );
};

export default CartIcon;
