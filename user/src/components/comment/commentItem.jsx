
const CommentItem = ({ com, user }) => {
    const uid = com && com.uid;
    const uimg = com && user && user.find(f => f._id === com.uid);
    return (
        com && user && uimg &&
        <div className="flex gap-4 m-2">
            <img src={process.env.REACT_APP_SERVER_URL + uimg.img} alt={uid} className="w-8 h-8 mt-2 rounded-full" />
            <textarea id="message" rows="2"
                className="block p-1 w-full text-sm  rounded-lg border bg-gray-700 border-gray-600 
                    placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" value={com.content} readOnly></textarea>
        </div>
    )
}

export default CommentItem;