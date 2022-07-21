import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQty: 0,
}

export default cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart(state, action){
            //Get New Item
            const newItem = action.payload

            //Check item availability
            const exitingItem = state.cartItems.find(item => item.id === newItem.id)

            if(exitingItem){
                exitingItem.totalQty++

                exitingItem.totalPrice += newItem.price
            }else{
                state.cartItems.push({
                    id: newItem.id,
                    image: newItem.image,
                    title: newItem.title,
                    totalQty: 1,
                    price: newItem.price,
                    totalPrice: newItem.price
                })
            }

            /* console.log(state.cartItems); */
        },
        remoreFromCart(state, action){
            const id = action.payload

            const existingItem = state.cartItems.find(item => item.id === id)

            if(existingItem.totalQty === 1){
                state.cartItems = state.cartItems.filter(item => item.id !== id)
                state.totalQty--
            }else{
                existingItem.totalQty--
                existingItem.totalPrice -= existingItem.price
            }
        }
    }
})

export const cartActions = cartSlice.actions