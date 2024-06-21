import { users } from "../users/userSlice";
import {  useSelector } from "react-redux";



const Author = ({userId}) => {
  const userArr=useSelector(users);
  const author=userArr.find(user=>user.id==userId)
  return (
    <span className="accent-sc">by:{author?author.name:"Unknown Author"}</span>
  )
}

export default Author