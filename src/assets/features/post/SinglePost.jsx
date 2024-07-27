import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postSlice'
import { useSelector } from 'react-redux'
import Author from './Author'
import Time from './Time'
import { CiEdit } from "react-icons/ci";


const SinglePost = () => {
    const { id }=useParams()
    const post=useSelector((state)=>selectPostById(state,id))

  return (
    <>
<section className='single-post'>   
            <Link to="/Redux-Blog-App" className='link'>back to posts</Link>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>
                <Author userId={post.userId} />
                <Time time={post.date} />
            </p>
            <Link to={`/post/${post.id}/edit`} className=' link edit' >
            <p>Edit this post</p>
            <CiEdit />
            </Link>

        </section>
    </>
  )
}

export default SinglePost