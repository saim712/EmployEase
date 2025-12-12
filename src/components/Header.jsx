import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

function Header({data}) {
  const [username, setusername] = useState("")
  // console.log(data)
  let user=data.slice(0,data.indexOf("@"));
  // console.log(user)
  const navigate=useNavigate();
  useEffect(() => {
      setusername(user);
  }, [data])
  const handleLogOut=()=>{
    localStorage.removeItem("loggedin")
    navigate('/')
  }
  
  return (
    <div className="flex justify-between p-8 w-full h-auto font-mono bg-slate-500">
      <p className="text-[#5cdf29] font-bold text-xl ">
        Hello <br />
        <span className="text-3xl ">{username}🙌</span>
      </p>
      <button onClick={handleLogOut} className="border-2 text-[#fff] hover:bg-slate-900 hover:scale-110 duration-300 ease-in border-[#ded8df] w-fit px-5 bg-slate-400 rounded-md text-center  h-[40px]">Log Out</button>
    </div>
  );
}

export default Header;
