import ApexCharts from 'apexcharts';
import { useEffect } from 'react';

const ChartItem = ({ exercises }) => {
    var like = 0;
    var dislike = 0;

    exercises && exercises.forEach(e => {
        like += parseInt(e.like);
        dislike += parseInt(e.dislike);
    })

    const getChartOptions = () => {

        return {
            series: [like, dislike],
            colors: ["#1C64F2", "#E74694"],
            chart: {
                height: 320,
                width: "100%",
                type: "donut",
            },
            stroke: {
                colors: ["transparent"],
                lineCap: "",
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: 20,
                            },

                            value: {
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: -20,
                                formatter: function (value) {
                                    return value
                                },
                            },
                        },
                        size: "80%",
                    },
                },
            },
            grid: {
                padding: {
                    top: -2,
                },
            },
            labels: ["like", "dislike"],
            dataLabels: {
                enabled: false,
            },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value) {
                        return value
                    },
                },
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
        }
    }

    useEffect(() => {
        if (document.getElementById("donut-chart") && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
            chart.render();
        }
    }, [])

    return (
        exercises &&
        <div className='mb-6'>
          <h5 className="text-xl mb-3 text-center font-bold leading-none text-white pe-1">Lượt yêu thích</h5>
        <div className="ml-10 w-full rounded-lg shadow bg-gray-800 p-4">
            
            <div className="py-6" id="donut-chart"></div>
        </div>  
        </div>
        
    )
}

export default ChartItem;