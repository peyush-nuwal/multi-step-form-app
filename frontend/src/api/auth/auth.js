import { apiPost } from "../api"

const handleSignup=async(user)=>{
 try {
     const res = await apiPost("/auth/signup", {
         name: user.name,
         email: user.email,
         password: user.password,
     })
     console.log("sign up successfull",res)
     return res

 } catch (error) {
    console.error("sign up failed ",error)
 }
}



const handlelogin = async (user) => {
    try {
        const res = await apiPost("/auth/login", {
            email: user.email,
            password: user.password,
        })
        console.log("login  successfull", res)
        return res

    } catch (error) {
        console.error("login  failed ", error)
    }
   }


export {handleSignup,handlelogin}