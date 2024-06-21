import {useState} from 'react'
import {postAdded,AddNewPost} from "./postSlice"
import { users } from '../users/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


const PostForm = () => {
const navigate=useNavigate()
const dispatch=useDispatch();
const [title,setTitle]=useState("");
const [body,setBody]=useState("");
const [userId,setUserId]=useState("");
const[honeyPot,setHoneyPot]=useState("")

const userArr=useSelector(users);
const [resStatus,setResStatus]=useState("idle");
const onTitleChanged=e=>setTitle(e.target.value);
const onBodyChanged=e=>setBody(e.target.value);
const onAuthorchanged =e=>setUserId(e.target.value)


const onSave=()=>{
  if (honeyPot) return console.warn("bot detected")
  if(title && body &&userId&&resStatus==="idle") {
  try{
   
    dispatch(AddNewPost({title,body,userId})).unwrap();
    setResStatus("pending")
    setBody("");
    setTitle("");
    navigate("/")
    }

  catch (err) {
    console.error('Failed to save the post', err)
}
finally{
  setResStatus("idle")
}
  }}

const userRendered=userArr.map(user=>(
  <option key={user.id} value={user.id}>
      {user.name}
  </option>
)

)
  return (
  <section aria-labelledby='title'>
    <h2 id='title'>Add New Post</h2>
    <form>
    <label htmlFor="postTitle">Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder='write your title'
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorchanged}>
                      {userRendered}    
                </select>
                  <label htmlFor="postContent"> Content:</label>
                <textarea
                    type="text"
                    id="postContent"
                    name="postContent"
                    placeholder='type yout post here'
                    value={body}
                    onChange={onBodyChanged}
                />
                <div className="hide">
                  <label htmlFor="honeypot">user will not fill this out</label>
                  <input 
                    type='text'
                    name='honeypot'
                    onChange={(e)=>setHoneyPot(e.target.value)}
                    value={honeyPot}
                  />
                </div>
                <button 
                type="button"
                onClick={onSave}
                disabled={!(title&&body&&userId)}
                >Save Post</button>
             
    </form>
  </section>
  )
}

export default PostForm