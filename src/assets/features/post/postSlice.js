import { createSlice, nanoid,createAsyncThunk ,createEntityAdapter} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const postURL="https://jsonplaceholder.typicode.com/posts";
const Adapter=createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})
const initialState = Adapter.getInitialState({
    status:"idle",
    error:null
})
 export const fetchURL=createAsyncThunk("posts/fetchURL",async()=>{
    const res= await axios.get(postURL);
    return res.data
 })

 export const AddNewPost=createAsyncThunk("posts/AddNewPost",async(NewPost)=>{
   try{ 
    const res=await axios.post(postURL,NewPost);
    return res.data
   }
   catch(err){
    console.error('error:', err)
   }
 })
 export const UpdatePost=createAsyncThunk("posts/UpdatePosts",async(NewPost)=>{
    const {id}= NewPost
    try{
     const res=await axios.put(`${postURL}/${id}`,NewPost)
     return res.data
    }
    catch(err){
      console.log(err)
      return NewPost
    }
 })
 export const DeletePost=createAsyncThunk("posts/DeletePosts",async(post)=>{
    const {id}= post
    try{
     const res=await axios.delete(`${postURL}/${id}`)
     if (res?.status === 200) return post;
     return `${res?.status}: ${res?.statusText}`;
    }
    catch(err){
      return err.message
    }
 })
 const postSlice=createSlice({
    name: 'posts',
    initialState,
    reducers: {
      reactionAdded(state,action){
            const {postId,reaction}=action.payload;
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction]++
            }

        }

        
 },extraReducers:(builder)=>{
    builder.addCase(fetchURL.pending,(state)=>{
        state.status="loading"
    })
    .addCase(fetchURL.fulfilled,(state,action)=>{
        state.status="successful"
        let min=2
        const postWithCompleteData=action.payload.map(post=>{
            post.id=nanoid()
            post.date=sub(new Date(),{minutes:min++}).toISOString();
            post.reactions={
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
            return post;
    })
   Adapter.upsertMany(state,postWithCompleteData)

    })
    .addCase(fetchURL.rejected,(state,action)=>{
        state.status="failed"
        state.error=action.error.message
        console.log(state.error)
    })
    .addCase(AddNewPost.fulfilled,(state,action)=>{

        action.payload.date=new Date().toISOString()
        action.payload.reactions={
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
       Adapter.addOne(state,action.payload)
    })
    .addCase(UpdatePost.fulfilled,(state,action)=>{
       const {id}=action.payload
        if(!id) {
            console.log(action.payload)
            return;
        }

        action.payload.date=new Date().toISOString()
        action.payload.reactions={
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    
        Adapter.upsertOne(state,action.payload)


    }).addCase(DeletePost.fulfilled,(state,action)=>{
        const {id}=action.payload
        if(!id) {
            console.log(action.payload)
            return;
        }
       Adapter.removeOne(state,id)
    })
 }})
 export const {
    selectAll:selectPost,
    selectById: selectPostById, 
} = Adapter.getSelectors(state => state.posts)

 export const status=state=>state.posts.status
 export const error=state=>state.posts.error



 export const {postAdded,reactionAdded}=postSlice.actions
 export default postSlice.reducer
