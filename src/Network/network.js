
import axios from "axios";

const Product_URL = import.meta.env.VITE_API_PRODUCT_URL;
const Category_URL = import.meta.env.VITE_API_CATEGORY_URL;

export  const FetchCategory  = async () => {
    const response = await axios.get(`${Category_URL}`)
    return response.data;
}

export const SelectedCategory = async (selectedCategory) => {
    const response = await axios.get(`${Category_URL}?type=${selectedCategory}`);
    return response.data;

}


export  const FetchProduct  = async () => {
    const response = await axios.get(`${Product_URL}`)
    return response.data;
}


export  const FetchSingleProduct  = async (id) => {
    const response = await axios.get(`${Product_URL}/${id}`)
    return response.data;
}

export const PaginationFunc = async (page = 1  , limit = 10) => {
    const response = await axios.get(`${Product_URL}?page=${page}&limit=${limit}`);
    return response.data.products;
}