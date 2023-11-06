
const Comment = ({eid, user}) => {
    return (
        <div className="mx-8">
            <label htmlFor="message" className="block m-2  text-sm font-medium  text-white">
                Bình luận của bạn
            </label>
            <textarea id="message" rows="2" className="block p-2 w-full text-sm  rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Viết bình luận tại đây...">
            </textarea>
        </div>
    )
}

export default Comment;