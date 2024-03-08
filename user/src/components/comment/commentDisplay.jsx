import { Comments, Comment } from "../../components";

const CommentDisplay = ({ auth, comm, user, id }) => {
    const com = comm && comm.filter(f => f.eid === id && f.reply === null);
    const sended = (e) => {
        if (e) {
            document.location.reload();
        }
    }
    return (
        comm && user &&
        <div>
            <div className="lg:mt-14 mt-5 rounded-lg border bg-gray-800 border-gray-600 relative">
                <h3 className="m-5 font-semibold">Bình luận </h3>
                {/* add comment  */}
                <Comment eid={id} auth={auth} sended={sended}/>
                {/* show comments  */}
                {com &&
                    <label htmlFor="message" className="block m-5 ml-10 text-sm font-medium text-white">
                        Tất cả bình luận ({com.length})
                    </label>}
                {Array.isArray(com) ? com.map((c, i) => (
                        <Comments key={i} auth={auth} user={user} comItem={c} com={comm} sended={sended} />
                    ))
                : <p className="block m-5 ml-10 text-sm font-medium  text-white">
                    Chưa có bình luận nào
                </p>}
            </div>
        </div>
    )
}

export default CommentDisplay;