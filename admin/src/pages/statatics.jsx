import { ChartItem, Comments, EnrollChart } from "../components";

const Statatics = ({auth, user, exe, comm}) => {
    return (
        <div className="mt-10 sm:mx-auto ml-10 sm:w-5/6">
        <ChartItem exercises={exe}/>
        <Comments comm={comm} user={user} auth={auth}/>
        <EnrollChart users={user}/>
        </div>
    )
}

export default Statatics;