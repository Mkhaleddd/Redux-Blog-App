import { useDispatch } from "react-redux"
import { reactionAdded } from "./postSlice"

const ReactionBtns = ({id,reactions}) => {
    const dispatch=useDispatch()
    const reactionEmoji = {
        thumbsUp: '👍',
        wow: '😮',
        heart: '❤️',
        rocket: '🚀',
        coffee: '☕'
    }
  
 
    const emojiBtns=Object.entries(reactionEmoji).map(([name, emoji])=>(
            <button 
            className="reactionsBtns"
            key={name}
            type='button'
            onClick={()=>dispatch(reactionAdded({postId:id,reaction:name}))}
            >
                    {emoji} {reactions[name]}
            </button>
    ))
  return (
    <div>{emojiBtns}</div>
  )
}

export default ReactionBtns