import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}
// HOatla
export const getCartItems = createAsyncThunk('cart/getCartItems',async (msg,thunkAPI) => {
    try {
        console.log(thunkAPI);
        const res = await axios(url);
        console.log('data',res);
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue('something went wrong')
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state,action) => {
            // console.log("state: ",state);
            // console.log("action:",action);
            const itemID = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemID)
        },
        toggleAmount: (state,{payload}) => {
            const {id:userID, msg} = payload;
            // console.log(userID, msg);
            const cartItem = state.cartItems.find((item) => item.id === userID);
            if(msg === 'inc'){
                cartItem.amount +=1;
                state.amount +=1;
            }else if(msg === 'dec'){
                cartItem.amount -=1;
                state.amount -=1;

            }
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount*item.price
            })
            state.amount = amount;
            state.total = total;
        }

    },
    extraReducers:{
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state,action) => {
            console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state,action) => {
            console.log(action);
            state.isLoading = false
        }
    }
})

// console.log(cartSlice);
export const {clearCart,removeItem,toggleAmount,calculateTotal} = cartSlice.actions;
export default cartSlice.reducer;