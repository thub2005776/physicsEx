import User from '../assets/User-icon_.png'
import File from '../assets/file.png'
import Exercise from '../assets/exercise.png'
import { Link } from 'react-router-dom'

const AdminCard = ({users, exercises, docs}) => {

    const Items = [
        {
            "img": User,
            "title": "Người dùng",
            "count": users.length
        },
        {
            "img": Exercise,
            "title": "Bài tập",
            "count": exercises.length
        },
        {
            "img": File,
            "title": "Tài liệu",
            "count": docs.length
        }
    ];

    const FeatureCard = ({ index, item, data }) => {
        return (
            <div className="mt-20 sm:w-full w-2/3 ml-14 sm:ml-3">
                <Link to={`/admin/${index + 1}`}>
                    <div className="hover:bg-slate-500 bg-slate-600 p-3 m-3 rounded-xl border border-gray-400 ">
                        <img className='rounded-2xl w-fit p-px' src={item.img} alt="User" />
                        <div className='mt-5 flex justify-between'>
                            <div className='text-xs font-bold lg:text-lg hover:text-emerald-300'>{item.title}</div>
                        <div className='text-base text-right'>{item.count}</div>
                        </div>
                        
                    </div>
                </Link>
            </div>

        )
    }
    return (

        Items.map((item, index) => (
            <FeatureCard
                key={index}
                index={index}
                item={item}/>
        ))
    )
}

export default AdminCard;