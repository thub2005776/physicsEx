import { useState, useEffect } from "react";
import axios from "axios";
import image from '../../assets/Image.png';

const Comments = ({com}) => {
    const [user, setUser] = useState();
    const uid = com.uid;

    useEffect(() => {
        axios.post(process.env.REACT_APP_SERVER_URL + "profile/find",{uid})
            .then(user => setUser(user.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="mx-8 mb-3">
            <div className="flex gap-4">
                {user? 
                    <img src={process.env.REACT_APP_SERVER_URL + user.img} alt={uid} className="w-8 h-8 rounded-full" />
                : <img src={image} alt={uid} className="w-8 h-8 rounded-full" />}
                
                <textarea id="message" rows="2" 
                    className="block p-1 w-full text-sm  rounded-lg border bg-gray-700 border-gray-600 
                        placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        defaultValue={com.content}>
                </textarea>
            </div>
            <div className="flex">
                <div className="ml-16 text-xs cursor-pointer hover:text-green-400">
                    {com.reply.length} Câu trả lời
                </div>
            <div className="ml-16 text-xs cursor-pointer hover:text-green-400"> Trả lời</div>
            </div>
        </div>
    )
}

export default Comments;