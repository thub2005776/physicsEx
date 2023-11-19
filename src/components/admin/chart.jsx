import { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { Chart } from "react-google-charts";

const ChartItem = ({exercises}) => {
    var like = 0;
    var dislike = 0;
    exercises.forEach(e => {
        like += e.like;
        dislike += e.dislike;
    })

    const w = useRef(window.innerWidth);
    const h = useRef(window.innerHeight);

    const data = [
        ["status", "count"],
        ["like", like],
        ["dislike", dislike],
    ];

    return (
        exercises &&
        <div className='m-5 bg-slate-900 p-3 rounded-xl' >
            <div className='text-sm  sm:text-2xl font-bold text-center mb-5'>Lượt yêu thích của các bài tập</div>
                <Chart
                    chartType="PieChart"
                    data={data}
                    width={"100%"}
                    height={"400px"}
                />
        </div>

    )
}

export default ChartItem;