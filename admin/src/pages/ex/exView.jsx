import { useLocation } from 'react-router';
import { ExList } from '../../components';


const ExView = ({ auth, exercises }) => {
    const location = useLocation();
    const path = location.pathname.split('/')[4];
    const exercise = exercises && exercises.filter(f => f.themid === path);

    return (
        auth && auth.permission === 'admin' && exercise &&
        <div className="lg:mx-32 mx-20">
            <div className='p-5 text-green-500 lg:text-2xl text-lg text-center font-bold'>
                Bài tập của chuyên đề 
            </div>
            <div className="relative p-3 bg-gray-800 border border-gray-600 rounded-md">
                {Array.isArray(exercise) ?
                    exercise.map((ex, i) => (
                        <ExList
                            key={i}
                            ex={ex} />
                    )) : <ExList ex={exercise} />}
            </div>
        </div>
    )
}

export default ExView;