import React  from 'react'
import {  useSelector } from 'react-redux'
import {status } from "./postSlice"
import Posts from './Posts'
import { ColorRing } from 'react-loader-spinner'


const PostList = () => {
const STATUS=useSelector(status)
if (STATUS==="loading") return(<ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#1ce9ca', '#ad78f2', '#f6fefd', '#e44eef','#010e0d']}
  />)

  return (
        <div className='container'>
              <Posts  />
        
       </div>
  )
}

export default PostList