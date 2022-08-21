import axios from "axios";


const API_URL="https://react-app-bay-rho.vercel.app/api/users";

// register user
const register=async(userData)=>{
    console.log("before axios")

    const response= await axios.post(API_URL,userData)
    console.log("after axios")
    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data))
    }

    return response.data
}

// login user
const login=async(userData)=>{
    console.log("before axios")

    const response= await axios.post(API_URL+"/login",userData)
    console.log("after axios")
    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data))
    }

    return response.data
}
// ...............................logut user
const logout=()=>{
    localStorage.removeItem('user')
}
const authService={
    register,
    login,
    logout
}

export default authService;