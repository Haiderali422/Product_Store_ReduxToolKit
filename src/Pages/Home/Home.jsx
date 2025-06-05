import React, {useRef} from 'react';
import {useEffect} from "react";
import Pagination from "../../Components/Pagination/Pagination";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loader from "../../Components/Loader/Loader";
import DropDown from "../../Components/DropDown/DropDown";
import {useDispatch, useSelector} from "react-redux";
import {ERROR, FETCH_CATEGORIES, LOADING, SET_PRODUCTS, SET_CURRENT_DATA, SET_PAGE} from "../../features/cartSlice.js";
import {FetchCategory, FetchProduct, SelectedCategory} from "../../Network/network.js";



const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);
    const selectedCategory = useSelector(state => state.cart.selectedCategory);
    const isLoading = useSelector(state => state.cart.isLoading);
    const limit = useSelector(state => state.cart.limit);
    const page = useSelector(state => state.cart.page);
    const currentData = useSelector(state => state.cart.currentData);


    useEffect(() => {
        const fetchData = async () => {
            dispatch(LOADING());
            try {
                const categoryData = await FetchCategory();

                let productData;
                if (selectedCategory === 'all') {
                    productData = await FetchProduct();
                } else {
                    productData = await SelectedCategory(selectedCategory);
                }
                dispatch(FETCH_CATEGORIES(categoryData.categories));
                dispatch(SET_PRODUCTS(productData.products));

                const productsArray = productData.products;
                const start = (page - 1) * limit;
                const end = start + limit;
                const paginatedData = productsArray.slice(start, end);
                dispatch(SET_CURRENT_DATA(paginatedData));
            } catch (err) {
                dispatch(ERROR());
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [selectedCategory, dispatch, page, limit ]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [page]);
    const prevCategory = useRef(selectedCategory);
    useEffect(() => {
        if (prevCategory.current !== selectedCategory) {
            dispatch(SET_PAGE(1))
            prevCategory.current = selectedCategory;
        }
    }, [selectedCategory , dispatch ]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <DropDown/>

            <>
                {currentData.length > 0 ? (
                    <div style={{ marginTop: '20px' }} className='App'>
                        {currentData.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p>No products found.</p>
                )}
            </>

            <Pagination
                currentPage={page}
                setCurrentPage={(p) => dispatch(SET_PAGE(p))}
                totalItems={products.length}
                itemsPerPage={limit}
            />
        </>
    );
};

export default Home;
