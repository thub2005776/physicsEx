import { useLocation } from 'react-router';
import { LessionItem } from '../../components';
import { useState } from 'react';
import axios from 'axios';
import Toast from '../../components/toast';

const CourseDetail = ({ auth, courses, lessions }) => {
    const [open, setOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const course = courses.find((p) => p._id === id);
    const lession = lessions && lessions.filter(f => f.cid === id);
    
    const [able, setAble] = useState(auth && auth.courses && auth.courses.find(f => f.cid === id));

    var dur = 0;
    if(lession) {
        lession.forEach(element => {
            dur += parseInt(element.duration);
        });
    }

    const handleClosed = (e) => {
        setOpen(!open);
    }

    const handleEnroll = () => {
        if(auth) {
            const values = {
                "cid": course._id,
                "time": Date()
            }
            axios.post(process.env.REACT_APP_SERVER_URL + `users/${auth._id}/course`, values)
                .then(res => {
                    if(res.status === 200) { 
                        setAble(true);
                        setOpen(true);
                        const timer = setTimeout(() => {
                            setIsVisible(false);
                        }, 3000);
                        return () => clearTimeout(timer);
                    }
                })
                .catch(err => console.log(err))
        } else {
            alert('Vui lòng đăng nhập trước khi tham gia!');
        }
    }

    return (
        course && lession &&
        <div className="pt-20 lg:mx-10">
            <p className="text-center text-3xl font-bold text-green-500 mb-6">Thông tin chi tiết khóa học</p>
            <div className="flex justify-between mx-5 text-white p-4 bg-gray-800 border border-gray-600 rounded-t-md">
                {/* course info  */}
                <div className='ms-5'>
                    <p className='text-2xl font-bold mb-6'>{course.name}</p>
                    <p className='ms-3 text-gray-400'>{course.content}</p>
                    <div className="ms-3">
                        <p className='text-gray-400'>Lớp {course.grade}</p>
                        <div className="inline-flex items-center">
                            <p className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded 
                                ${course.level === 'easy' ? 'bg-green-900 text-green-300' :
                                    course.level === 'medium' ? 'bg-blue-900 text-blue-300' :
                                        course.level === 'hard' ? 'bg-yellow-900 text-yellow-300' :
                                            'bg-pink-900 text-pink-300'}`}>
                                {course.level}
                            </p>
                        </div>
                        <p className="ms-3 font-normal text-gray-400">{course.enroll} lượt học</p>
                    </div>
                    <button type='button' className={`m-1 p-2.5 rounded-lg text-white ${able? "pointer-events-none hover:cursor-no-drop bg-gray-400 text-gray-500": "bg-green-600 hover:bg-green-400"}`}
                    onClick={handleEnroll}>
                        Tham gia khóa học
                    </button>
                </div>
                <img className='w-52  rounded-md' src={process.env.REACT_APP_SERVER_URL + course.img} alt={course.name} />

            </div>
            <div className='p-2 mx-5 bg-gray-800 border border-gray-600 rounded-b-md text-white'>
                <p className='text-xl font-semibold mb-3'>Nội dung khóa học</p>
                <div className='ms-5 mb-2 flex gap-4 text-gray-400'>
                    <p><span className='text-green-500 font-bold'>{lession.length}</span> bài học</p>
                    <p>* Thời lượng <span className='text-blue-500 font-bold'>{dur}</span> phút</p>
                </div>
                <div className={able? "":"pointer-events-none hover:cursor-none text-gray-400"}>
                   {lession.map((l, i) => (
                    <LessionItem key={i} auth={auth} lession={l}/>
                ))} 
                </div>
                
            </div>     
            {open && isVisible && <Toast content={"Cảm ơn bạn đã tham gia khóa học."} closed={handleClosed}/>}
        </div>
    )
}

export default CourseDetail;