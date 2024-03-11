import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../type";

interface StoreState {
  productData: ProductProps[];
}

const initialState: StoreState = {
  productData: [],
};

export const mojoySlice = createSlice({
  name: "mojoy",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, quantity } = action.payload;
      const existingProduct = state.productData.find(
        (item) => item._id === _id
      );

      if (existingProduct) {
        const newQuantity = existingProduct.quantity + quantity;
        if (newQuantity <= existingProduct.quantity) {
          existingProduct.quantity = newQuantity;
        } else {
          console.error("Exceeded available quantity");
        }
      } else {
        action.payload.availableQuantity = action.payload.quantity; // Set availableQuantity initially
        state.productData.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductProps) => item._id === action.payload._id
      );
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductProps) => item._id === action.payload._id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity === 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
} = mojoySlice.actions;
export default mojoySlice.reducer;
