import axios from "axios";
import { ChartItem, EnrollChart } from "../components";
import { useState } from "react";

const Statatics = ({ auth, exe, enrollCourse, enrollTest }) => {
    

    return (
        auth &&
        <div className="mt-10">
            <ChartItem exercises={exe} />
            <EnrollChart title={"Top 3 khóa học"} enroll={enrollCourse} />
            <EnrollChart title={"Top 3 bài kiểm tra"} enroll={enrollTest} />
        </div>
    )
}

export default Statatics;