import { createSlice } from '@reduxjs/toolkit'

const initialState = [];


const cartSlice = createSlice({
    name : 'cart',
    initialState ,
    reducers : {
        add(state, action) {
            const doesExist = state.findIndex(item => item.ProductId === action.payload.ProductId);
            if(doesExist >= 0){
                increaseQty(state, action.payload)
            }
            else{
                state.push(action.payload);
            }
            
        },
        remove(state, action){
            return state.filter( item => item.ProductId !== action.payload.ProductId)
        },
        increaseQty(state, action){
            const indexFound = state.findIndex(item => item.ProductId === action.payload.ProductId);
            state.at(indexFound).ProductQty += 1
        },
        decreaseQty(state, action){
            const indexFound = state.findIndex(item => item.ProductId === action.payload.ProductId);
            if(state.at(indexFound).ProductQty === 1){
                remove(state, action.payload)
            }
            else{
                state.at(indexFound).ProductQty -= 1
            }
        },
        emptyCart(){
            return initialState
        }
    }
});

export const {add,remove, increaseQty, decreaseQty,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;