import './DropDown.css'

import {SET_FILTER} from "../../features/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";


const DropDown = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(state => state.cart.selectedCategory);
    const categories = useSelector(state => state.cart.categories);
    return (
        <>

            <select
                onChange={(e) => dispatch(SET_FILTER( e.target.value))}
                value= {selectedCategory}
            >
                <option value="all">All Products</option>
                {categories.map((cat , index) => (
                    <option key={index} value={cat}>{cat.toUpperCase()}</option>
                ))}
            </select>

        </>
    )
}
export default DropDown


