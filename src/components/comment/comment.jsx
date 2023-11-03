
const Comment = () => {
    return (
        <div className="mt-14 rounded-lg border bg-gray-800 border-gray-600">
            <h3 className="m-3 font-semibold">Bình luận</h3>
            <label htmlFor="message" className="block m-2  text-sm font-medium  text-white">
                Your message
            </label>
            <textarea id="message" rows="4" className="block p-2 w-full text-sm  rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Write your thoughts here...">
            </textarea>
            
        </div>
    )
}

export default Comment;