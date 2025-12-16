import React, { useState,useEffect, createContext } from 'react'
import { getEmployeeData } from '../utils/localStorage';

export const AuthDataContext=createContext();

function AuthContext({children}) {
  const [auth, setauthData] = useState(null);
  useEffect(() => {
    let authdata=getEmployeeData();
    setauthData(authdata);
    console.log(typeof auth)
    console.log(auth)
  }, [])
  // console.log(auth)
  return (
    <>
      <div>
      <AuthDataContext.Provider value={auth}>
        {children}
      </AuthDataContext.Provider>
      </div>
    </>
  )
}

export default AuthContext
