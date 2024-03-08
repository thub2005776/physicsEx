
import { useLocation } from "react-router";
import { Exercise } from "../../components";

const ExOfThem = ({thematics, exercises}) => {
    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const exercise = exercises.filter(f => f.themid === id);
    const thematic = thematics.find(f => f._id === id);
    return(
        exercises && exercise && thematics && thematic &&
        <div className="text-white mt-24">
            <h3 className="text-center sm:text-3xl text-lg font-bold text-green-500 mb-5">
                {thematic.code}: {thematic.thematic}
            </h3>
            <div className="bg-slate-800 lg:mx-40 mx-10 rounded-lg border-[1px]">
                {Array.isArray(exercise)? exercise.map((ex, i) => (
                    <Exercise 
                        key={i}
                        exercise={ex}/>
                )): <Exercise exercise={exercise}/>}
            </div>
        </div>
    )
}

export default ExOfThem;