import { parseISO, formatDistanceToNow } from 'date-fns';



const Time = ({time}) => {
    let timeAgo=""
    if (time){
const timestamp=parseISO(time);
 timeAgo=formatDistanceToNow(timestamp);
    }
  return (
    <span>
      <i className='accent-sc'> &nbsp; {`${timeAgo} ago`}</i>
    </span>
  )
}

export default Time