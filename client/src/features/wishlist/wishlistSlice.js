import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentUserId: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    syncUserWishlist: (state, action) => {
      const userId = action.payload;
      state.currentUserId = userId;
      const key = userId ? `wishlist_${userId}` : "wishlist_guest";
      state.items = JSON.parse(localStorage.getItem(key)) || [];
    },
    toggleWishlist: (state, action) => {
      const { product, userId } = action.payload;
      const index = state.items.findIndex((item) => item._id === product._id);

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }

      const key = userId ? `wishlist_${userId}` : "wishlist_guest";
      localStorage.setItem(key, JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      state.currentUserId = null;
    },
  },
});

export const { toggleWishlist, clearWishlist, syncUserWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
