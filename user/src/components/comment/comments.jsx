import { useState, useEffect } from "react";
import axios from "axios";
import image from '../../assets/Image.jpg';
import { Comment } from '../../components';

const Comments = ({ auth, com, sended }) => {
   
    const [showComm, setShowComm] = useState(false);
    const [answer, setAnswer] = useState(false);

    const CommentItem = ({ comm }) => {
        const [uid, setUid] = useState(comm.uid);
        const [user, setUser] = useState();
        useEffect(() => {
            axios.post(process.env.REACT_APP_SERVER_URL + "profile/find", { uid })
                .then(user => setUser(user.data))
                .catch(err => console.log(err))
        }, []);
        return (
            <div className="flex gap-4 m-2">
                {user ?
                    <img src={process.env.REACT_APP_SERVER_URL + comm.uimg} alt={uid} className="w-8 h-8 mt-2 rounded-full" />
                    : <img src={image} alt={uid} className="w-8 h-8 mt-2 rounded-full" />}

                <textarea id="message" rows="2"
                    className="block p-1 w-full text-sm  rounded-lg border bg-gray-700 border-gray-600 
                        placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={` ${comm.content}`}>
                </textarea>
            </div>
        )
    }

    return (
        com &&
        <div className="ml-20 w-5/6 mb-3">
            <CommentItem comm={com} />

            <div className="flex justify-between">
                <div className="flex">
                    {com && com.reply &&
                        <div className="ml-16 text-xs cursor-pointer hover:text-green-400" onClick={() => setShowComm(true)}>
                            {com.reply.length} Câu trả lời
                        </div>}

                    <div className="ml-16 text-xs cursor-pointer hover:text-green-400" onClick={() => setAnswer(true)}> Trả lời</div>
                </div>
                <p className="text-xs float-right text-gray-400">{com.time}</p>
            </div>
            <div className="ml-5 my-1">
            
                {showComm && 
                <div className="text-xs text-right text-gray-400 hover:text-white cursor-pointer"
                            onClick={() => setShowComm(false)}>Ẩn bình luận</div>}
                {showComm && com && com.reply.map((e, i) => (
                    <CommentItem key={i} comm={e}/>
                ))} 

                {answer &&
                    <div className="flex">
                        <div className="flex-1">
                            <Comment id={com._id} eid={com.eid} user={auth} sended={sended} reply={true} />
                        </div>
                        
                        <div className="text-xs pt-5 text-gray-400 hover:text-white cursor-pointer"
                            onClick={() => setAnswer(false)}>Hủy</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Comments;