import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state, action){
            const course = action.payload ;
            const index = state.cart.findIndex((item) => item._id === course._id) ;

            if(index >= 0){
                // if the course is already in the cart, do not modify the quantity
                toast.error("Course already in your cart.");
                return ;
            }

            state.cart.push(course) ;

            state.totalItems++ ;
            state.total += course.price ;

            localStorage.setItem("cart", JSON.stringify(state.cart)) ;
            localStorage.setItem("total", JSON.stringify(state.total)) ;
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems)) ;

            toast.success("Course added to cart") ;
        },
        removeFromCart(state, action){
            const course = action.payload ;
            const index = state.cart.findIndex((item) => item._id === course._id) ;

            if(index >= 0){
                // if the item is found in the cart, remove the item
                state.cart.splice(index, 1) ;
                state.totalItems-- ;
                state.total -= state.cart[index].price ;

                // update in local storage
                localStorage.setItem("cart", JSON.stringify(state.cart)) ;
                localStorage.setItem("total", JSON.stringify(state.total)) ;
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems)) ;

                toast.success("Course removed from your cart") ;
            }
        },
        resetCart(state){
            state.cart = [] ;
            state.total = 0 ;
            state.totalItems = 0 ;

            // update in localStorage
            localStorage.removeItem("cart") ;
            localStorage.removeItem("total") ;
            localStorage.removeItem("totalItems") ;
        }
    }
}) ;

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions ;
export default cartSlice.reducer ;