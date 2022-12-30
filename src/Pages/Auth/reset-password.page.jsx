import React, { useContext, useState } from "react";

// 
import GreenSquareLogo from "./../../Assets/images/green_square_logo.png";
import { useNavigate } from "react-router-dom";
import Background from "./../../Assets/images/bg2.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword(props) {
  props.setShowNavBar(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  // const { email } = useContext(UserContext);
  let navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      // email: email,
      code: verificationCode,
      newPassword: newPassword,
      email: email
    });



    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://oyster-app-s8ura.ondigitalocean.app/reset-password", requestOptions)
      .then((response) => response.json())
      .then((result) => {

        if(result.success){
          toast.success(result.message);
        }else{
          toast.error(result.message);
        }
 
    
        if (result.success) {
          // redirect to the password reset page.
          navigate(`/login`);
        }

      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
 <div
        className={`justify-center  bg-no-repeat bg-cover bg-center md:h-screen sm:h-screen
    
    
    `}
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="wrapper mx-auto sm:pb-8 ">
          <div className="flex sm:justify-center md:justify-start ">
            {" "}
            <img src={GreenSquareLogo} className=" w-[200px]   " />
          </div>

          <h3 className="md:text-5xl text-center sm:text-4xl text-white">
            it all starts here.
          </h3>

            <div className="flex flex-row">
              <div className=" flex-col md:w-4/12 sm:w-12/12 mt-10  mx-auto    gap-3 rounded-md shadow-lg ">
                <div className="flex flex-col items-center justify-center "></div>

                <div className=" px-5 bg-white py-5 rounded-xl ">
                  <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div className=" flex flex-col   gap-2 ">
                    <h4 className="text-2xl mb-2 font-extrabold text-center text-[#69C080] ">
                        Reset Password
                      </h4>
                      <div className="flex justify-between flex-col ">
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          className=" w-full  p-2 text-center text-md text-black   bg-slate-200 "
                          name=""
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>

                    
                      <div className="flex justify-between flex-col ">
                        <input
                          type="text"
                          required
                          placeholder="Code"
                          className=" w-full  p-2 text-center text-md text-black   bg-slate-200 "
                          name=""
                          onChange={(e) => {
                            setVerificationCode(e.target.value);
                          }}
                        />
                      </div>

                      <div className="flex justify-between flex-col ">
                        <input
                          type="text"
                          required
                          placeholder="New Password"
                          className=" w-full  p-2 text-center text-md text-black   bg-slate-200 "
                          name=""
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          
                        />
                      </div>
                  
                      <div className="flex justify-between flex-col">
                        <label for="Label">
                        
                          <Link to="/login">
                            {" "}
                            <span className="text-md font-light text-[#69C080]">
                           Back to log in {" "}
                            </span>
                          </Link>
                        </label>
                      </div>

                      <input
                        className="text-xl mt-1 w-full py-2 bg-[#69C080] hover:bg-green-600 cursor-pointer font-bold text-white"
                        type="submit"
                        id=""
                        value="SUBMIT"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* <LoadingModal
        isOpen={loadingModalIsOpen}
        text={"Sending a reset code."}
      /> */}
    
    </>
  );
}

export default ResetPassword;
