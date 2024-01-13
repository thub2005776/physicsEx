import { useState } from "react";
import { CommItem } from '../components';

const FilterComm = ({auth, user}) => {
    const [open, setOpen] = useState(false)
    return (
        user.permission === 'user' && user.comments.length > 0 &&
        <>
            <div id="accordion-arrow-icon" data-accordion="open">
                <h2 id="accordion-arrow-icon-heading-1">
                    <button type="button" className="flex items-center justify-between w-full p-2 font-medium text-base rtl:text-right border border-b-0 rounded-t-xl focus:ring-4  focus:ring-gray-800 border-gray-700 text-white bg-gray-800 hover:bg-gray-800 gap-3"
                        data-accordion-target="#accordion-arrow-icon-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-arrow-icon-body-1"
                        onClick={() => setOpen(!open)}>
                        <div className="flex gap-4 ">
                            <img className="w-8 h-8 rounded-full" src={process.env.REACT_APP_SERVER_URL + user.img} alt="user" />
                            <p>{user.name}</p>
                        </div>
                        <span>{user.comments && user.comments.length} bình luận</span>
                        
                    </button>
                </h2>
                {open &&
                    <div id="accordion-arrow-icon-body-1" aria-labelledby="accordion-arrow-icon-heading-1">
                        <div className="p-5 border border-b-0  border-gray-700 bg-gray-900">
                            {user.comments.map((c, i) => (
                                <CommItem key={i} auth={auth} com={c}/>
                            ))}
                            
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default FilterComm;