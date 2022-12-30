import React, { useState } from "react";
import GreenSquareLogo from "./../../Assets/images/green_square_logo.png";
import { Link, useNavigate } from "react-router-dom";

import Background from "./../../Assets/images/bg3.jpg";
import { toast } from "react-toastify";

function JobSeekerSignup(props) {
  props.setShowNavBar(false);
  let navigate = useNavigate();

  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setmodalMessage] = useState(false);
  const [modalMessage1, setmodalMessage1] = useState(false);
  const [modalMessage2, setmodalMessage2] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // show loading modal
    reset();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: `${fname} ${lname}`,
      email: email,
      gender: "Male",
      number: number,
      password: password,
      role: "user",
    });

  


    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_HOST}/register`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let message = "";
     
        if ("errors" in result) {
          setmodalMessage(result?.errors.name);
          setmodalMessage2(result?.errors.password);
          setmodalMessage1(result?.errors.email);

          setShowModal(true);
          // alert(result?.errors.name);
        } else {
          message += result.message;
          if(result?.email){
            setmodalMessage1(result?.email);
            setShowModal(true);
          }
          
         

          
          if (result.success) {
            toast.success("Account Created Successfully");
            setTimeout(() => navigate(`/login`), 3000);
          }
        }
        return;
      })
      .catch((error) => {
        // alert(error.message);
        setShowModal(true);
      });
  };
  function reset(e) {

    setShowModal(false);
    setmodalMessage(undefined);
    setmodalMessage1(undefined);
    setmodalMessage2(undefined);
  }

  return (
    <>
      <div
        className={`justify-center  bg-no-repeat bg-cover bg-center md:h-screen sm:sm:h-max
    
    
    `}
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="wrapper mx-auto sm:pb-[100px] md:pb-[70px] ">
          <div className="flex sm:justify-center md:justify-start ">
            {" "}
            <img src={GreenSquareLogo} className=" w-[200px]   " />
          </div>

          <h3 className="md:text-5xl text-center sm:text-4xl text-white">
            it all starts here.
          </h3>

          <div className="flex flex-row">
            <div className=" flex-col md:w-4/12 sm:w-11/12 mt-2  mx-auto    gap-3 rounded-md shadow-lg ">
              <div className="flex flex-col items-center justify-center "></div>

              <div className=" px-5 bg-white py-5 rounded-xl ">
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <div className=" flex flex-col   gap-2 ">
                    <h4 className="text-2xl mb-2 font-extrabold text-center text-[#69C080] ">
                      Sign Up
                    </h4>
                    <div className="flex flex-wrap  ">
                      <div className="flex w-6/12 pr-1 justify-between flex-col ">
                        <input
                          type="text"
                          required
                          placeholder="Last Name"
                          className=" w-full py-2 px-1 text-center text-md  text-black bg-slate-200 "
                          name=""
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex  w-6/12 pl-1 justify-between flex-col">
                        <input
                          type="text"
                          required
                          placeholder="First Name"
                          className="w-full py-2 px-1 text-center text-md  text-black bg-slate-200  "
                          name=""
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        />
                          <h3 className="text-sm   text-red-600 ">{modalMessage}</h3>
                      </div>
                    </div>
                    <div className="flex justify-between flex-col">
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        className="w-full p-2 text-center text-md  text-black bg-slate-200  "
                        name=""
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        
                      />
        <h3 className="text-sm   text-red-600 ">{modalMessage1}</h3>
                    </div>
                  
                    <div className="flex justify-between flex-col">
                      <input
                        type="text"
                        required
                        placeholder="Phone Number"
                        className="w-full p-2 text-center text-md  text-black bg-slate-200  "
                        name=""
                        onChange={(e) => {
                          setNumber(e.target.value);
                        }}
                      />
                        
                     
                          
                    </div>

                    <div className="flex justify-between flex-col">
                      <input
                        type="password"
                        required
                        placeholder="Password"
                        className="w-full p-2 text-center text-md  text-black bg-slate-200  "
                        name=""
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                         <h3 className="text-sm   text-red-600 ">{modalMessage2}</h3>
                    </div>

                    <input
                      className="text-xl mt-3 w-full py-2 bg-[#FFBE24] hover:bg-bg-[#FFBE23] cursor-pointer font-bold text-white"
                      type="submit"
                      id=""
                      value="SIGN UP"
                    />
                    <div className="flex justify-between flex-col">
                      <label for="Label" className="flex justify-center ">
                      <p>  <span className="text-md font-light mr-2 ">
                          Already Registered?
                        </span>
                        <Link to="/login">
                          {" "}
                          <span className="text-md font-light text-[#69C080] ">
                           log in{" "}
                          </span>
                        </Link></p>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}

export default JobSeekerSignup;
