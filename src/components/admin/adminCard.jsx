import User from '../../assets/User-icon_.png'
import File from '../../assets/file.png'
import Exercise from '../../assets/exercise.png'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const AdminCard = () => {
    const [users, setUsers] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [docs, setDocs] = useState([]);
        useEffect(() => {
            axios.post(process.env.REACT_APP_SERVER_URL + "profile")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
        }, []);

        useEffect(() => {
            axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(res => setExercises(res.data))
            .catch(err => console.log(err))
        }, []);

        useEffect(() => {
            axios.get(process.env.REACT_APP_SERVER_URL + "docs")
            .then(res => setDocs(res.data))
            .catch(err => console.log(err))
        }, []);

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
            <div className="sm:w-full w-2/3 ml-14 sm:ml-3">
                <Link to={`/admin/${index + 1}`}>
                    <div className="bg-slate-600 p-3 m-3 rounded-xl">
                        <img className='rounded-2xl w-fit p-px' src={item.img} alt="User" />
                        <div className='mt-5 flex justify-between'>
                            <div className='text-xs font-bold sm:text-lg md:text-lg'>{item.title}</div>
                        <div className='text-right'>{item.count}</div>
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