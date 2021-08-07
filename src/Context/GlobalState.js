import React, {useState} from "react"
import EcommerceContext from "./EcommerceContext"
function GlobalState({children}){
    const [userLogin,setUserLogin] = useState(localStorage.getItem("login",false))
    const [userInfo,setUserInfo] = useState(() => {
        try {
          const item = localStorage.getItem("user");
          return item ? JSON.parse(item) : {};
        } catch (error) {
          console.log(error);
          return {};
        }
      });
    const loginUser = (user)=>{
        setUserLogin(true)
        localStorage.setItem("login",true)
        setUserInfo(user)
        localStorage.setItem("user",JSON.stringify(user))
    }
    const logoutUser = ()=>{
        setUserLogin(false)
        setUserInfo({})
        localStorage.removeItem("login")
        localStorage.removeItem("user")
    }
    return(
        <EcommerceContext.Provider
            value={{
                userLogin,
                userInfo,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </EcommerceContext.Provider>
    )
}
export default GlobalState