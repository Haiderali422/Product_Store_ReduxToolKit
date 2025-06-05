import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    isLoading: false,
    items: [],
    isError: false,
    products: [],
    categories: [],
    selectedCategory: 'all',
    filteredProducts: [],
    limit : 10,
    page: 1,
    currentData:[],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        SET_PRODUCTS: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },

        SET_SINGLE_PRODUCT: (state, action) => {
            state.product = action.payload;
        },

        FETCH_CATEGORIES: (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        },

        SET_CATEGORIES: (state, action) => {
            state.categories = action.payload;
        },
        SET_CURRENT_DATA: (state, action) => {
            state.currentData = action.payload;
        },
        SET_FILTER: (state, action) => {
            state.selectedCategory = action.payload;
        },

        LOADING: (state) => {
            state.isLoading = true;
        },

        SET_LOADING: (state, action) => {
            state.isLoading = action.payload;
        },

        ERROR: (state) => {
            state.isLoading = false;
            state.isError = true;
        },

        TOGGLE_CART: (state) => {
            state.isVisible = !state.isVisible;
        },

        ADD_TO_CART: (state, action) => {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },

        INCREMENT_QUANTITY: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },

        DECREMENT_QUANTITY: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== action.payload);
                }
            }
        },

        REMOVE_FROM_CART: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        SET_PAGE: (state, action) => {
            state.page = action.payload;
        },
    }
});

export const {
    SET_PRODUCTS,
    FETCH_CATEGORIES,
    SET_CATEGORIES,
    SET_FILTER,
    LOADING,
    ERROR,
    TOGGLE_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
    SET_SINGLE_PRODUCT,
    SET_LOADING,
    SET_CURRENT_DATA,
    SET_PAGE,
} = cartSlice.actions;

export default cartSlice.reducer;
