import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { QuestionItem, QuestNum, ResultModal, CountdownTimer, LeaveConfirmation } from '../../components';
import { useState } from 'react';

const Testing = ({ auth, tests, questions }) => {
    const location = useLocation();
    const id = location.pathname.split('/')[3]
    const test = tests.find((p) => p._id === id);
    const question = questions && questions.filter(f => f.tid === id);
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [selected, setSelected] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [showExplain, setShowExplain] = useState(false);

    const handleAns = (resulted) => {
        const temp = [...selected];
        temp.push(resulted.index);
        setSelected(temp);

        const res = [...result];
        res[resulted.index] = resulted.trueAns;
        setResult(res);
    }

    var trueAns = 0;
    for (let i = 1; i <= question.length; i++) {
        if (result[i]) {
            trueAns++;
        }
    }

    const handleGoBack = (e) => {
        if (!showExplain ) {
            if (window.confirm("Bạn có chắc muốn rời khỏi trang này? Thay đổi của bạn có thể không được lưu.")) {
                 navigate(-1);
            }
        } else {
             const values = {
                "tid": test._id,
                "name": test.name,
                "trueAns": trueAns + '/' + question.length,
                "time": Date()
            }
            axios.post(process.env.REACT_APP_SERVER_URL + `users/${auth._id}/test`, values)
                .then(res => {
                    if (res.status === 200) {
                        navigate(`/tests/${id}`);
                        window.location.reload();
                    }
                })
                .catch(err => console.log(err))
        }
           
    }

    const handleTimeout = (e) => {
        setShowResult(e);
    }

    return (
        auth && tests && test && question &&
        <div className="relative pt-20 lg:mx-10 m-5">
            <LeaveConfirmation/>
            <p className="text-center text-3xl font-bold text-green-500 mb-6">{test.name}</p>
            <div className='sm:flex gap-4 text-lg'>
                {/* questions  */}
                <div className='sm:w-[78%] bg-gray-700 border border-gray-600 rounded-md mb-2'>
                    {question.map((q, i) => (
                        <QuestionItem
                            key={i}
                            quest={q}
                            index={i + 1}
                            answered={handleAns}
                            show={showExplain} />
                    ))}
                </div>
                {/* questions - end  */}

                <div className='sm:fixed right-5 h-fit md:w-[20%]  bg-gray-800 border border-gray-600 rounded-md'>
                    <div className='m-2'>
                        <CountdownTimer 
                            duration={question.length}
                            stop={showResult}
                            timeout={handleTimeout}/>
                        <div>
                            {question.map((q, i) => (
                                <QuestNum key={i} index={i + 1} selected={selected} />
                            ))}
                        </div>
                        <div className='flex justify-center mt-2 gap-2'>
                            <button type="button"
                                className="h-fit p-2.5 hover:cursor-pointer text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm text-center"
                                onClick={() => setShowResult(true)}>
                                {showExplain ? "Xem lại kết quả" : "Nộp bài"}
                            </button>
                            <button type='button'
                                className="h-fit p-2.5 hover:cursor-pointer text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-pink-800 font-medium rounded-lg text-sm text-center"
                                onClick={handleGoBack}>
                                Thoát
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showResult &&
                <ResultModal
                    result={trueAns}
                    total={question.length}
                    show={(e) => {
                        setShowExplain(e)
                        setShowResult(false)
                    }}
                    goback={handleGoBack} />}
        </div>
    )
}

export default Testing;