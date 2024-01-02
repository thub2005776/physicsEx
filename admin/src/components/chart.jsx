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
        <div className='mt-10 sm:mx-auto ml-10 sm:w-5/6 bg-slate-900 p-2 rounded-md border border-gray-600' >
            <div className='text-sm  sm:text-xl font-bold text-center mb-5'>Lượt yêu thích của các bài tập</div>
                <Chart
                    chartType="PieChart"
                    data={data}
                    width={"100%"}
                    height={"300px"}
                />
        </div>

    )
}

export default ChartItem;