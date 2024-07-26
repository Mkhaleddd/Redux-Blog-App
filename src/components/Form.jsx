import {useState} from 'react';
import {AddNewPost,UpdatePost,DeletePost} from "../assets/features/post/postSlice";
import { users } from '../assets/features/users/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router';
import { MdDeleteOutline } from "react-icons/md";


const Form = ({text,btnText,edit}) => {

const {id} = useParams()
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

const onDelete=()=>{
  try{
  dispatch(DeletePost({id})).unwrap()
  setResStatus("pending")
  setBody("");
  setTitle("");
  setUserId("")
  navigate("/Redux-Blog-App")
  console.log("hi")
}
catch (err) {
  console.error('Failed to delete the post', err)
}
finally{
setResStatus("idle")
}

}
const onSumbit=()=>{
  if (honeyPot) return console.warn("bot detected")
  if(title && body &&userId&&resStatus==="idle") {
  try{
    dispatch(AddNewPost({title,body,userId})).unwrap();
    setResStatus("pending")
    setBody("");
    setTitle("");
    navigate("/Redux-Blog-App")
    console.log("add")
    }

  catch (err) {
    console.error('Failed to save the post', err)
}
finally{
  setResStatus("idle")
}
  }}
  const onEdit=()=>{
    if(title && body &&userId&&resStatus==="idle") {
    try{
      dispatch(UpdatePost({id,title,body,userId})) .unwrap();
      setResStatus("pending")
      setBody("");
      setTitle("");
      setUserId("");
      navigate(`/post/${id}`)
      }
  
    catch (err) {
      console.error('Failed to update the post', err)
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
  <section aria-labelledby='Add New Post'>
    <h2 id='Add New Post'>{text}</h2>
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
                {!edit&&<div className="hide">
                  <label htmlFor="honeypot">user will not fill this out</label>
                  <input 
                    type='text'
                    name='honeypot'
                    onChange={(e)=>setHoneyPot(e.target.value)}
                    value={honeyPot}
                  />
                </div>}
                <button
                type="button"
                onClick={edit?onEdit:onSumbit}
                disabled={!(title&&body&&userId)}
                >{btnText}</button>
                {edit&&
                  <button
                  className='btn-delete'
                  onClick={onDelete }>
                  <MdDeleteOutline />
                  </button>
                }
             
    </form>
  </section>
  )
}

export default Form