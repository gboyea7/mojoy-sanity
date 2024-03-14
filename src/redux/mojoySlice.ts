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
      const { _id } = action.payload;
      const existingProductIndex = state.productData.findIndex(
        (item) => item._id === _id
      );

      if (existingProductIndex !== -1) {
        // If product already exists, do nothing
        console.error("Product already in the cart");
      } else {
        const productToAdd = { ...action.payload, quantity: 1 }; // Set quantity to 1
        state.productData.push(productToAdd);
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
