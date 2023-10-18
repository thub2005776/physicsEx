import User from '../../assets/User-icon_.png'
import File from '../../assets/file.png'
import Exercise from '../../assets/exercise.png'
import { Link } from 'react-router-dom'

const AdminCard = () => {
    const Items = [
        {
            "img": User,
            "title": "Người dùng"
        },
        {
            "img": Exercise,
            "title": "Bài tập"
        },
        {
            "img": File,
            "title": "Tài liệu"
        }
    ];

    const FeatureCard = ({ index, item, data }) => {
        return (
            <div className="sm:w-1/3 w-fit">
                <Link to={`/admin/${index + 1}`}>
                    <div className="bg-slate-600 p-3 m-3 rounded-lg">
                        <img className='rounded-2xl w-fit p-px' src={item.img} alt="User" />
                        <div className='text-xs font-bold sm:text-lg md:text-lg'>{item.title}</div>
                        <div className=''>{data}</div>
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
                item={item}
                data={"123"} />
        ))
    )
}

export default AdminCard;