import { createSlice } from "@reduxjs/toolkit";

const Loader = createSlice({
  name: "Loader",
  initialState: false,
  reducers: {
    loaderReducer(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { loaderReducer } = Loader.actions;
export default Loader.reducer;
