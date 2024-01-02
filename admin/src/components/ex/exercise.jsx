// import '../../pages/exercises/exercises.css';
import Latex from 'react-latex';
import { Link } from 'react-router-dom';

function Exercise({ exercise }) {

    return (
        <div className='sm:mx-10 m-1 hover:bg-slate-700 rounded-lg flex justify-between'>
            <Link to={`/detail/` + exercise.no}>
                <div className='p-5 rounded-md flex' id={exercise.subThematic}>
                    <div className='flex-none pr-3 '>
                        <p className='text-sm text-gray-500 '>{exercise.no}</p>
                    </div>
                    <div className='flex-1 pl-3 lg:text-lg  text-base text-white font-semibold text-ellipsis overflow-hidden'>
                        <Latex >{exercise.question}</Latex>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Exercise;