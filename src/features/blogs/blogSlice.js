import {createSlice ,createAsyncThunk} from  "@reduxjs/toolkit";
import blogService from "./blogService";
// Get user from local storage ..........

const initialState={
    blogs:[],
    isError:false,
    isSucess:false,
    isLoading:false,
    message:"" 
}
 
// create new blog
export const createBlog= createAsyncThunk('blogs/create',async(blogData,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token;
         const reponse= await blogService.createBlog(blogData,token)
    }catch(error){
        const message=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        console.log(message,"error occured")
        return thunkAPI.rejectWithValue(message);
    }
})
// get blogs
export const getBlogs=createAsyncThunk("blogs/getAll",async(_,thunkAPI)=>{
    try{
        return await blogService.getBlogs()
    }catch(error){
        const message=(error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})
// delete blog
export const deleteBlog= createAsyncThunk('blogs/delete',async(id,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token;
        return await blogService.deleteBlog(id,token)
    }catch(error){
        const message=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})
// update blog
export const updateBlogText= createAsyncThunk('blogs/update',async(obj,thunkAPI)=>{
    // console.log("from blogSlice updateblog",obj.id,obj.text,"text")
    try{
        const token=thunkAPI.getState().auth.user.token;
        // console.log(token)
        return await blogService.updateBlogText(obj,token)
    }catch(error){
        const message=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        console.log("error occured at blogSLice")
        return thunkAPI.rejectWithValue(message);
    }
})
// update blog
// update blog
export const updateBlog= createAsyncThunk('blogs/updateblog',async(data,thunkAPI)=>{
    // console.log("from blogSlice updateblog",obj.id,obj.text,"text")
    try{
        const token=thunkAPI.getState().auth.user.token;
        // console.log(token)
         await blogService.updateBlog(data,token)
        return window.location.reload()
    }catch(error){
        const message=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        console.log("error occured at blogSLice")
        return thunkAPI.rejectWithValue(message);
    }
})
export const blogSlice=createSlice({
    name:"blog",
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers: (builder)=>{
        builder
        // createblog
        .addCase(createBlog.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createBlog.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSucess=true;
            state.blogs.push(action.payload)

        })
        .addCase(createBlog.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        // getblogs
        .addCase(getBlogs.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getBlogs.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSucess=true
            state.blogs=action.payload

        })
        .addCase(getBlogs.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        // delete blogs
        .addCase(deleteBlog.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteBlog.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSucess=true
            state.blogs=state.blogs.filter((blog)=>blog._id !== action.payload)

        })
        .addCase(deleteBlog.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        // update blogs
        .addCase(updateBlog.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateBlog.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSucess=true
            state.blogs=state.blogs.filter((blog)=>blog._id !== action.payload)

        })
        .addCase(updateBlog.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
   
    }
})

export const {reset}=blogSlice.actions;
export default blogSlice.reducer;