
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
        className={`justify-center items-center my-auto py-auto  bg-no-repeat bg-cover bg-emerald-200 bg-center h-screen 
    
    
       `}
      
      >
        <div className="wrapper mx-auto items-center py-auto  flex justify-center align-middle  my-auto  ">
          <p className="text-4xl align-middle " >Site Currentiy Under Maintenance ! </p>
        </div>
      </div>
    </>
  );
}

export default Home;
