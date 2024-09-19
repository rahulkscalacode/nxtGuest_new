import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    response : []
};

const Stripe = createSlice({
  name: "Stripe",
  initialState,
  reducers: {
    userStripeReducer(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { userStripeReducer } = Stripe.actions;
export default Stripe.reducer;
