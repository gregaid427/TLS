import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


axios.defaults.baseURL = process.env.REACT_APP_HOST;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";




export const UploadResumeAction = createAsyncThunk(
  "resume/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`/resume/update` ,
      payload);
      toast.success("Resume Updated Successfully")
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      toast.error("Error Updating Resume")
      return rejectWithValue("Error Fetching Data");
    }
  }
);

export const   deleteResume = createAsyncThunk(
  "resume/delete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(`/resume/delete` ,
      payload);
      toast.success("Resume Deleted Successfully")
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      toast.error("Error Deleting Resume")
      return rejectWithValue("Error Fetching Data");
    }
  }
);





const initialState = {
  cartItems: [],
  cartQuantity: 0,
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};
const storeSlices = createSlice({
  name: "stores",
  initialState: initialState,

  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.p_id === action.payload.p_id
      );
      if (itemIndex >= 0) {
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },

   

  },

  extraReducers: (builder) => {
    builder.addCase(UploadResumeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UploadResumeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.createVitals = action.payload;
     
    });
    builder.addCase(UploadResumeAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteResume.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteResume.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.createVitals = action.payload;
     
    });
    builder.addCase(deleteResume.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    
  },
});
export const {
  addToCart,

} = storeSlices.actions;

export default storeSlices.reducer;
