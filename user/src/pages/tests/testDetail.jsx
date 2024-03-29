import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { CommentDisplay } from '../../components';
import axios from 'axios';

const TestDetail = ({ auth, user, com, tests, questions }) => {
    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const test = tests.find((p) => p._id === id);
    const question = questions && questions.filter(f => f.tid === id);
    const tested = auth && auth.tests && auth.tests.filter(f => f.tid === id);
    const navigate = useNavigate();

    const handleEnroll = () => {
        if (auth) {
            const enroll = test && test.enroll + 1;
            axios.post(process.env.REACT_APP_SERVER_URL + `tests/enroll/${test._id}`, { enroll })
                .then(res => {
                    if (res.status === 200) {
                        navigate(`/tests/testing/${test._id}`)
                    }
                })
                .catch(err => console.log(err))
        } else {
            alert('Vui lòng đăng nhập trước khi bắt đầu thi!');
        }
    }

    const TestItem = ({item, index}) => {
        const trueA = parseInt(item.trueAns.slice(0,1));
        
        return(
            <div className='flex justify-between p-2 border border-gray-400 rounded-md mb-1 bg-gray-600'>
                <div className='ms-3'>
                   <p className='text-lg font-semibold'>Lần {index + 1}</p>
                   <p className='text-gray-400'>{item.time}</p> 
                </div>
                <div className='font-semibold me-3'>
                   <p>Số câu đúng: <span className='text-green-400'>{item.trueAns}</span></p>
                <p>Tổng điểm: <span className='text-blue-500'>{trueA * 10}</span></p> 
                </div>
            </div>
        )
    }

    return (
        test && question &&
        <div className="pt-20 lg:mx-10 m-5">
            <p className="text-center text-3xl font-bold text-green-500 mb-6">Thông tin chi tiết khóa học</p>
            <div className="flex justify-between text-white p-4 bg-gray-800 border border-gray-600 rounded-t-md">
                {/* test info  */}
                <div className=''>
                    <p className='text-2xl font-bold mb-6'>{test.name}</p>
                    <p className='ms-3 text-gray-400'>{test.content}</p>
                    <div className="ms-3">
                        <p className='text-gray-400'>Lớp {test.grade}</p>
                        <div className="inline-flex items-center">
                            <p className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded 
                                ${test.level === 'easy' ? 'bg-green-900 text-green-300' :
                                    test.level === 'medium' ? 'bg-blue-900 text-blue-300' :
                                        test.level === 'hard' ? 'bg-yellow-900 text-yellow-300' :
                                            'bg-pink-900 text-pink-300'}`}>
                                {test.level}
                            </p>
                        </div>
                        <p className=" font-normal text-gray-400">{test.enroll} lượt làm</p>
                    </div>
                    <button type='button'
                        className="m-1 p-2.5 rounded-lg text-white border border-gray-600 bg-green-600 hover:bg-green-400"
                        onClick={handleEnroll}>
                        Bắt đầu làm
                    </button>
                </div>
                <img className='w-52  rounded-md' src={process.env.REACT_APP_SERVER_URL + test.img} alt={test.name} />

            </div>
            <div className='p-2 bg-gray-800 border border-gray-600 rounded-b-md text-white'>
                <p className='text-xl font-semibold mb-3'>Lưu ý</p>
                <div className='ms-5 mb-2 flex gap-4 text-gray-400'>
                    <p>* Thời gian làm bài
                        <span className='text-blue-500 font-bold'> {question.length} </span>
                        phút</p>
                    <p>* Mỗi câu hỏi đúng
                        <span className='text-blue-500 font-bold'> +10 </span>
                        điểm</p>
                </div>
                {auth && tested && tested.length > 0 &&
                <div>
                <p className='text-xl font-semibold mb-3'>Lịch sử làm bài</p>
                    {tested.length > 0 &&
                        auth.tests.map((t, i) => (
                            <TestItem key={i} 
                                item={t} index={i} />
                        ))
                }
                </div>}
            </div>
            <CommentDisplay auth={auth} user={user} comm={com} id={id} />
        </div>
    )
}

export default TestDetail;