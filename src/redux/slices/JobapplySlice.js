import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


axios.defaults.baseURL = process.env.REACT_APP_HOST;
console.log(process.env.REACT_APP_HOST);
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";


  const id = JSON.parse(localStorage.getItem("usersID")); 

 
 

export const applyJob = createAsyncThunk(
  "apply/job",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `/users/${id}/apply-job`,
        payload
      );
      if(data.success){
        toast.success("Job Applied Successfully");
      }
 
      return data;
    } catch (error) {
      toast.error("Error Applying Job");
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue("Error Fetching Data");
    }
  }
);

export const fetchSinglekey = createAsyncThunk(
  "single/key",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/keys/${payload}`
      );

      return data.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchinstitutionkey = createAsyncThunk(
  "institution/key",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/keys/all/${payload}`
      );

      return data.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  cartItems: [],
};
const storeSlices = createSlice({
  name: "stores",
  initialState: initialState,

  reducers: {
    increaseQty(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.p_id === action.payload
      );
      if (
        state.cartItems[itemIndex].cartQuantity < state.cartItems[itemIndex].qty
      ) {
        state.cartItems[itemIndex].cartQuantity += 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(applyJob.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(applyJob.fulfilled, (state, action) => {
      state.appliedJob = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(applyJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { increaseQty } = storeSlices.actions;

export default storeSlices.reducer;
