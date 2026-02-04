import React,{useState,useContext,useEffect} from 'react'
import { BsPerson } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthDataContext } from '../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate=useNavigate();

    let authdata=useContext(AuthDataContext);
      useEffect(() => {
        if(authdata){
          // console.log(authdata); 
        }
      }, [authdata])


    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(email)
        // console.log("form Submitted:", email)
         if(email==="admin@gmail.com" && password==="123"){
            navigate('/admin')
        }

        if(!authdata) return
        let user=authdata.find((elem)=>
          elem.email===email && elem.password===password
        )

        if(user){
          console.log("logged in successfully")
          localStorage.setItem("loggedin",JSON.stringify({id:user.id,email:user.email}))
          navigate('/employ')
        }else{
          console.log("incorrect password")
        }
        setemail("")
        setpassword("")
    }

        


        



  return (
    <>
      <div className='w-full h-screen bg-emerald-400 flex justify-center items-center'>
            <div className="w-[35%] rounded-sm overflow-hidden h-auto bg-[#f8f5f5] border-3 border-emerald-300">
                    <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col gap-4 text-center'>
                        <div className='text-3xl font-semibold bg-emerald-700 text-white font-sans py-4 rounded-sm'>Login Form</div>
                        <div className='flex items-center justify-center p-4 h-[70px]'>
                            <BsPerson className='text-3xl w-[35px] h-auto text-white bg-emerald-700 p-1 rounded-sm '/>
                            <input required value={email} onChange={(e)=>setemail(e.target.value)} className='border-2 border-gray-300 p-1  outline-none rounded-md' type="email" placeholder='Email or Phone' />
                        </div>
                        <div className='flex items-center justify-center'>
                            <RiLockPasswordFill className='text-3xl w-[35px] h-auto text-white bg-emerald-700 p-1 rounded-sm '/>
                            <input required  value={password} onChange={(e)=>setpassword(e.target.value)} className='border-2 border-gray-300 p-1  outline-none rounded-md' type="password" placeholder='Password' />
                        </div>
                        <a href="" className='mr-[110px] font-semibold text-lg text-emerald-500'>Forgot Password?</a>
                        <button  className='w-[80%] cursor-pointer items-center ml-[30px] rounded-md text-[#fff] py-1 text-lg bg-emerald-500'>Login</button>
                        <div className='text-center flex justify-evenly p-2 mb-5'>
                            <p className='ml-[48px] font-semibold'>Not a Member?</p>
                            <a href="#"  className='mr-[48px] text-[16px] text-emerald-600 font-semibold' >Signup now</a>
                        </div>
                    </form>
            </div>
      </div>
    </>
  )
}

export default Login
