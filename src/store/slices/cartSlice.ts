import { createSlice } from '@reduxjs/toolkit';

interface CartState {
  items: { [key: string]: number };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const productId = action.payload;
      state.items[productId] = (state.items[productId] || 0) + 1;
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      if (state.items[productId] > 0) {
        state.items[productId] -= 1;
      }
      if (state.items[productId] === 0) {
        delete state.items[productId];
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
