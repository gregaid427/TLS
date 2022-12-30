
import { Link } from "react-router-dom";
import GreenSquareLogo from "./../../Assets/images/green_square_logo.png";
import Background from "./../../Assets/images/background1.jpg";
import { useDispatch } from "react-redux";
import { setvisitorstatus } from "../../redux/slices/UsersSlice";


function Home(props) {
  //   props.setShowNavBar(false);

  const dispatch = useDispatch();


  return (
    <>
      <div
        className={`justify-center  bg-no-repeat bg-cover bg-center h-screen 
    
    
       `}
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="wrapper mx-auto sm:pb-8 ">
          <div className="flex sm:justify-center md:justify-start  hh">
            {" "}
            <img src={GreenSquareLogo} className=" w-[200px]   " />
          </div>

          <div className="  md:mt-[170px] sm:mt-20 ">
            <div className="flex justify-center flex-col items-center md:gap-7 sm:gap-3ss my-auto ">
              <h3 className="md:text-7xl sm:text-4xl text-center text-white">
                It all starts here.
              </h3>
              <div className="grid grid-cols-2 md:grid-flow-col md:w-8/12 sm:w-12/12 gap-3  sm:flex sm:flex-col">
                <button >
                  <div onClick={() =>dispatch(setvisitorstatus(false))}  className="flex flex-col justify-between rounded-xl md:px-2 sm:px-4 md:py-9 sm:py-5 w-full row-span-1 bg-[#69C080] bg  content-center mx-auto  ">
                  <h4 className=" md:text-3xl sm:text-2xl u text-center text-white">
                    The career of <br /> your dreams.
                  </h4>{" "}
                  <Link to="/employee-guide">
                    <div
                      className=" justify-end w-8/12 md:p-3 sm:p-2 mt-2 align-bottom  rounded-md md:text-3xl sm:text-2xl mx-auto  text-center font-bold bg-[#FFBE24] text-black"

                      // onClick={(e) => set0(false)}
                    >
                      
                     Earner
                    </div>
                  </Link>
                  </div>
                  </button>
                  <div  onClick={() =>dispatch(setvisitorstatus(true))} className="flex flex-col justify-between rounded-xl md:px-2 sm:px-4 md:py-9 sm:py-5 w-full row-span-1 bg-[#69C080]   content-center mx-auto  " >
                <button >
                  <h4 className="md:text-3xl sm:text-2xl text-center text-white">
                    The team you've been<br></br>searching for
                  </h4>{" "}
                  
                  <Link to="/company-guide">
                    <div
                      className=" justify-end w-8/12 md:p-3 sm:p-2 p-4 mt-2 align-bottom  rounded-md md:text-3xl sm:text-2xl mx-auto  text-center font-bold bg-[#FFBE24] text-black"

                      // onClick={(e) => set0(true)}
                    >
                     Organisation
                    </div>
                  </Link>
               </button>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
