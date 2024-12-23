import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category: null,
    editCategory: false
} ;

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload ;
        },
        setEditCategory: (state, action) => {
            state.editCategory = action.payload ;
        },
    }
})

export const { setCategory, setEditCategory } = categorySlice.actions ;

export default categorySlice.reducer ;