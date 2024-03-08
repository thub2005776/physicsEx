import { useState } from "react";
import { Comment, CommentItem } from '../../components';


const Comments = ({ auth, user, comItem, com, sended }) => {

    const [showComm, setShowComm] = useState(false);
    const [answer, setAnswer] = useState(false);
    const reply = com && com.filter(f => f.reply === comItem._id);
    const date = comItem.time;
    return (
        com && comItem &&
        <div className="ml-20 w-5/6 mb-3">
            <CommentItem com={comItem} user={user}/>
            <div className="flex justify-between">
                <div className="flex">
                    {reply && reply.length > 0 ?
                        <div className="ml-16 text-xs cursor-pointer hover:text-green-400" onClick={() => setShowComm(true)}>
                            {reply.length} Câu trả lời
                        </div>
                    :<div className="ml-16 text-xs cursor-pointer hover:text-green-400" onClick={() => setAnswer(true)}> Trả lời</div>}
                </div>
                <p className="text-xs float-right text-gray-400">{Date(date)}</p>
            </div>
            <div className="ml-5 my-1">
                {showComm &&
                    <div className="text-xs text-right text-gray-400 hover:text-white cursor-pointer"
                        onClick={() => setShowComm(false)}>Ẩn bình luận</div>}
                {showComm && reply && reply.map((e, i) => (
                    <CommentItem key={i} com={e} user={user}/>
                ))}

                {answer &&
                    <div className="flex">
                        <div className="flex-1">
                            <Comment auth={auth} eid={comItem.eid} sended={sended} reply={comItem._id} />
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