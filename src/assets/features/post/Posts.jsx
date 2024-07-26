import React from 'react'
import {  useSelector ,useDispatch} from 'react-redux'
import { selectPost} from "./postSlice"
import Author from './Author'
import Time from './Time'
import ReactionBtns from "./ReactionBtns"
import { Link } from 'react-router-dom'

const Posts = () => {
const postarr= useSelector(selectPost)

const arr=postarr.filter(p=>p.id!=undefined||null)//remove first empty element in array

     const PostsRendered=arr.map(post=>(
        <article key={post.id} className='post'>
            <h2> {post.title} </h2>
            <p>{post.body}...</p> 
            <Link to={`\/post/${post.id}`} className='link'>View This Post</Link>
            <br></br>
            <Author  userId={post.userId}/> 
            <Time  time={post.date} />
            <ReactionBtns id={post.id} reactions={post.reactions}/>
            
        </article>))


  return (
    <section aria-label='articles' className='container'>
       {PostsRendered}
    </section>
  )
}

export default Posts