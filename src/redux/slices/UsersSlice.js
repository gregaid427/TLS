import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


axios.defaults.baseURL = process.env.REACT_APP_HOST;
console.log(process.env.REACT_APP_HOST)
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const CreateUserAction = createAsyncThunk(
  "new/user",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/users`, payload);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      toast.error("Error Creating User");
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUserAction = createAsyncThunk(
  "login/User",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`/login`, payload);
      if (data.success == false) {
        toast.error("Wrong Credentials");
      }
      return data;
    } catch (error) {
      // if (!error?.response) {
      //   throw error;
      // }
      toast.error("Incorrect Username or Password");
      return rejectWithValue(error.response.data);
    }
  }
);


export const logoutAction = createAsyncThunk(
  "logout/User",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`/logout`, payload);
      if (data) {
       console.log("true")
      }
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      
      return rejectWithValue(error.response.data);
    }
  }
);

export const passwordsendmail = createAsyncThunk(
  "password/reset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`/users/mailPasswordreset`, payload);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const passwordResetAction = createAsyncThunk(
  "password/Confirm",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`/users/resetPassword`, payload);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyuser = createAsyncThunk(
  "verfy/user",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`/users/verify`, payload);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  email: "",
  user_id: "",
  name: "",
  token: "",
  role: "",
  isAdmin: false,
  token: "",
  expiresIn: "",
  isLoggedIn: false,
  isCompany: false,
  message: "",
  success: false
};
const UsersSlices = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUserInfo(state, action) {
      state.email = action?.payload?.email;
      state.user_id = action?.payload?.user_id;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAdmin = action.payload.isAdmin;
      state.expiresIn = action.payload.expiresIn;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isCompany = action.payload.isCompany
      state.message = action.payload.message
      state.success = action.payload.success
      console.log("called")
    },
    reset() {
      return {
        ...initialState
      }
    },
    setvisitorstatus(state, action) {
      state.isCompany = action.payload
    }
   
  },

  extraReducers: (builder) => {

   

    builder.addCase(CreateUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(CreateUserAction.fulfilled, (state, action) => {
      state.CreateUser = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(CreateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.CreateUser = undefined;
    });



    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.loginUser = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loginUser = action?.payload;
      state.loading = false;
      state.error = undefined;
      state.email = action.payload.email;
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAdmin = action.payload.isAdmin;
      state.expiresIn = action.payload.expiresIn;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isCompany = action.payload.isCompany
      state.message = action.payload.message
      state.success = action.payload.success
   

    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loginUser = undefined;
    });



 
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
      state.passwordReset = undefined;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.passwordReset = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.passwordReset = undefined;
    });


    builder.addCase(passwordsendmail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(passwordsendmail.fulfilled, (state, action) => {
      state.passwordsend = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(passwordsendmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.passwordsend = undefined;
    });


    builder.addCase(verifyuser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyuser.fulfilled, (state, action) => {
      state.verify = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(verifyuser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.verify = undefined;
    });
  },
});

export const { setUserInfo,reset,setvisitorstatus } = UsersSlices.actions;

export default UsersSlices.reducer;
