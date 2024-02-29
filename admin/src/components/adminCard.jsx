import User from '../assets/User-icon_.png';
import File from '../assets/file.png';
import Exercise from '../assets/exercise.png';
import Course from '../assets/course.jpg';
import Testing from '../assets/testing.jpg';
import Statitics from '../assets/statitics.jpg'
import { Link } from 'react-router-dom';

const AdminCard = ({ users, exercises, docs, courses }) => {

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
        },
        {
            "img": Course,
            "title": "Khóa học",
            "count": courses.length
        },
        {
            "img": Testing,
            "title": "Kiểm tra",
            "count": docs.length
        },
        {
            "img": Statitics,
            "title": "Thống kê",
            "count": docs.length
        }
    ];

    const FeatureCard = ({ index, item, data }) => {
        return (
            <div className="mt-2 w-3/4 mb-2">
                <Link to={`/admin/${index + 1}`}>
                    <div className="hover:bg-slate-500 bg-slate-600 p-2 rounded-3xl border border-gray-400 ">
                        <img className='rounded-3xl w-fit p-px' src={item.img} alt="User" />
                    </div>
                    <div className='flex justify-center gap-4 mt-1'>
                        <div className='text-xs font-bold lg:text-lg hover:text-emerald-300'>{item.title}</div>
                        <div className='inline-flex items-center justify-center text-sm text-right rounded-full lg:w-7 lg:h-7 w-5 h-5 bg-green-400'>{item.count}</div>
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
                item={item} />
        ))
    )
}

export default AdminCard;