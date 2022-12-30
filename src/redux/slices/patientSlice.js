import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};
axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const searchpbyidAction = createAsyncThunk(
  "patient/searchid",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`/patients/${payload}`);

      console.log(payload);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue("Error Fetching Data");
    }
  }
);

export const searchpbyNameAction = createAsyncThunk(
  "patient/searchname",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`/patients/search/${payload}`);

      console.log(payload);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue("Error Fetching Data");
    }
  }
);


export const addNewPatient = createAsyncThunk(
  "patient/add",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`/patients/`, payload );

      console.log(payload);
      toast.success("Records Added Successfully")
      return data;
 
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      toast.error("Error Adding Records")
      return rejectWithValue("Error creating Data");
    }
  }
);

const initialState = { 
  email: "",
  patient_id: "",
  first_name: "",
  last_name: "",
  other_name: "",
  contact1: "",
  contact2: "",
  address: "",
  sex: "",
  birth_date: "",
  relative_name: "",
  relative_contact: "",
  DataArray:[],
};
const patientSlices = createSlice({
  name: "patients",
  initialState: initialState,

  reducers: {
    setPatientInfo(state, action) {
      state.address = action.payload.address;
      state.sex = action.payload.sex;
      state.email = action.payload.email;
      state.patient_id = action.payload.patient_id;
      state.first_name = action.payload.first_name;
      state.other_name = action.payload.other_name;
      state.last_name = action.payload.last_name;
      state.contact1 = action.payload.contact1;
      state.contact2 = action.payload.contact2;
      state.birth_date = action.payload.birth_date;
      state.relative_name = action.payload.relative_name;
      state.relative_contact = action.payload.relative_contact;
    },

    getPatientInfo(state, action) {
     const p_data = {
     address:  state.address ,
     sex: state.sex ,
     email: state.email ,
     patient_id: state.patient_id ,
     first_name: state.first_name ,
     last_name: state.last_name ,
     contact1: state.contact1 ,
     contact2: state.contact2 ,
     birth_date :state.birth_date ,
     relative_name: state.relative_name ,
     relative_contact: state.relative_contact ,
     }
     return p_data;
     
    },
    setDataArray(state, action) {
     state.DataArray = action.payload
    },
  

  },

  extraReducers: (builder) => {
    builder.addCase(searchpbyidAction.pending, (state, action) => {
      state.loading = true;
      state.loaded = false;
    });
    builder.addCase(searchpbyidAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.searchpbyid = action.payload;
      state.loaded = true;
    });
    builder.addCase(searchpbyidAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loaded = undefined;
    });

    builder.addCase(searchpbyNameAction.pending, (state, action) => {
      state.loading = true;
      state.loaded = false;
    });
    builder.addCase(searchpbyNameAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.searchpbyid = action.payload;
      state.loaded = true;
    });
    builder.addCase(searchpbyNameAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loaded = undefined;
    });

    builder.addCase(addNewPatient.pending, (state, action) => {
      state.loading = true;
      state.newpatient = undefined;

    });
    builder.addCase(addNewPatient.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.newpatient = action.payload;

    });
    builder.addCase(addNewPatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loaded = undefined;
    });
  },
});
export const {
  setPatientInfo,
  setDataArray,
  getPatientInfo,

} = patientSlices.actions;

export default patientSlices.reducer;
