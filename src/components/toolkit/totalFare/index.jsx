import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalFare: "",
};

const TotalFare = createSlice({
  name: "TotalFare",
  initialState,
  reducers: {
    userTotalFare(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { userTotalFare } = TotalFare.actions;
export default TotalFare.reducer;
