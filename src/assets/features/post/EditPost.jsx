import React from 'react'
import {useState} from 'react'
import {UpdatePost,DeletePost} from "./postSlice"
import { users } from '../users/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate, useParams } from 'react-router';


const EditPost = () => {
    const navigate=useNavigate()
    const {id} = useParams()
    const dispatch=useDispatch();
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const [userId,setUserId]=useState("");
    
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
        navigate("/")
    }
    catch (err) {
        console.error('Failed to delete the post', err)
    }
    finally{
      setResStatus("idle")
    }

    }
    const onSave=()=>{
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
            <>
                <section aria-labelledby='update'>
                    <h2 id='update'>Update Post</h2>
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
                                <select id="postAuthor"  onChange={onAuthorchanged}>
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
                                <button 
                                type="button"
                                onClick={onSave}
                                disabled={!(title&&body&&userId)}
                                >Save Post</button>
                                <button
                                className='btn-delete'
                                onClick={onDelete }>
                                <MdDeleteOutline />
                                </button>
                            
                    </form>
                </section>
            </>
  )
}

export default EditPost