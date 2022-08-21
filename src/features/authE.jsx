import {createSlice} from "@reduxjs/toolkit";


export const AuthE=createSlice({
    name:"authE",
    initialState:{
        authUser:true,
        authAdmin:false,
    },
    reducers:{
        authE:(state)=>{
const user=JSON.parse(localStorage.getItem("user"))
        if(user.person==="admin"){
            state.authAdmin=true
            state.authUser=false
        }else{
            state.authUser=true
            state.authAdmin=false
        }
    }}
})

export const {authE} =AuthE.actions
export default AuthE.reducer