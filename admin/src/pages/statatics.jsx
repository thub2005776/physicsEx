import { ChartItem, Comments } from "../components";

const Statatics = ({auth, user, exe, comm}) => {
    return (
        <div className="mt-10 sm:mx-auto ml-10 sm:w-5/6">
        <ChartItem exercises={exe}/>
        <Comments comm={comm} user={user} auth={auth}/>
        </div>
    )
}

export default Statatics;