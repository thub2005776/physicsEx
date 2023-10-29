import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

const LikeStatus = ({ exercise }) => {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [none, setNone] = useState(true);
    var status = ' ';
    const Like = () => {
        if(!like) {
            setDislike(like);
            setNone(like);
        } else {
            setNone(like);
            setDislike(!like);
        }
        setLike(!like);

        if(none) {status = 'like'}
        else if(dislike) {status = 'likeSubDislike'}
        else {status = 'sublike'}

        axios.post(process.env.REACT_APP_SERVER_URL + "ex/like", { exercise, status })
        .then(() => console.log('updated'))
        .catch(err => console.log(err))
        
    }
    
    const disLike = () => {
       if(!dislike) {
        setLike(dislike);
        setNone(dislike);
       } else {
        setLike(!dislike);
        setNone(dislike);
       }
       setDislike(!dislike);

       if(none) {status = 'dislike'}
       else if(like) {status = 'dislikeSublike'}
       else {status = 'subDislike'}

        axios.post(process.env.REACT_APP_SERVER_URL + "ex/like", { exercise, status })
        .then(() => console.log('updated'))
        .catch(err => console.log(err))
    }
        

    return(
        <div className='flex'>
                <div className={`m-2 items-center flex 
                    ${like? "text-blue-500" : "text-white"}`}
                    onClick={Like}>
                    <div className='hover:bg-slate-400 p-2 rounded-md '>
                        <AiFillLike />
                    </div>
                    <div className={`text-sm font-semibold text-white`}>
                        {like?  exercise.like + 1 : exercise.like}
                    </div>
                </div>
                <div className={`flex items-center
                        ${dislike?  "text-red-600" : "text-white"}`}
                    onClick={disLike}>
                    <div className='hover:bg-slate-400 p-2 rounded-md '>
                        <AiFillDislike />
                    </div>
                    <div className='text-sm font-semibold text-white mr-1'>
                        {dislike? exercise.dislike + 1 : exercise.dislike}
                    </div>
                </div>
            </div>
    )
}

export default LikeStatus;