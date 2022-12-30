import { configureStore } from "@reduxjs/toolkit";
import applications from "../slices/JobapplySlice";
import myusers from "../slices/UsersSlice";

const store = configureStore({
  reducer: {
    applications: applications,
    myusers: myusers,
    

  },
});

export default store;
