import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Nav from "./Components/NavBar/nav.component";
import JobSeekerSignup from "./Pages/Auth/job-seeker-signup.page";
import CompanySignup from "./Pages/Auth/company-signup.page";
import Login from "./Pages/Auth/login.page";
import Home from "./Pages/Home/home.page";
import ForgotPassword from "./Pages/Auth/forgot-password.page";
import ResetPassword from "./Pages/Auth/reset-password.page";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from "./redux/store/store";
import { Provider } from "react-redux";
import ScrollToTop from "./ScrollToTop";




function App() {
  // use state
  const [showNavBar, setShowNavBar] = useState(true);
  return (
    <>
      <Router>
      <ToastContainer />
   
      <Provider store={ store   }>
      <ScrollToTop>
            <Routes>
           
              <Route
                path="/"
                element={<Home setShowNavBar={setShowNavBar} />}
              />
              <Route
                path="/login"
                element={<Login setShowNavBar={setShowNavBar} />}
              />{" "}
              <Route
                path="/forgot-password"
                element={<ForgotPassword setShowNavBar={setShowNavBar} />}
              />{" "}
              <Route
                path="/reset-password"
                element={<ResetPassword setShowNavBar={setShowNavBar} />}
              />{" "}
              <Route
                path="/company-signup"
                element={<CompanySignup setShowNavBar={setShowNavBar} />}
              />{" "}
              <Route
                path="/job-seeker-signup"
                element={<JobSeekerSignup setShowNavBar={setShowNavBar} />}
              />{" "}
               
              <Route
                path="*"
                element={<Home setShowNavBar={setShowNavBar} />}
              />

            </Routes>
            </ScrollToTop>
            </Provider>
      </Router>
    </>
  );
}

export default App;
