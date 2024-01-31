import { useState } from "react";
import { CommItem } from '../components';

const Comments = ({ auth, user, comm }) => {
    const [more, setMore] = useState(false);
    const com5 = [];
    const len = comm && comm.length > 5? 5:comm.length;
    for(let i = 0; i < len; i++) {
        com5.push(comm[i]);
    }

    return (
        <>
            
            <div className="mt-10 w-full">
                <div className="relative  w-full p-4  mb-3 border  rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700">
                    <div className='m-2 text-sm  sm:text-xl font-bold text-center'>Bình luận mới nhất</div>
                    {!more && 
                    <p className="text-green-500 text-lg font-semibold cursor-pointer hover:underline"
                        onClick={() => setMore(true)}>Xem thêm</p>}
                    <div className="flow-root">
                        <div role="list" className=" divide-y  divide-gray-700">
                            {!more && com5? com5.map((c, i) => (
                                <CommItem key={i} auth={auth} com={c}/>
                            )): comm.map((c, i) => (
                                <CommItem key={i} auth={auth} com={c}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Comments;