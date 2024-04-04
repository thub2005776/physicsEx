import ApexCharts from 'apexcharts';

const EnrollChart = ({users}) => {
const userHasCourse = users && users.filter(f => f.courses.length > 0);
console.log(userHasCourse);
userHasCourse && userHasCourse.forEach(element => {
    element.courses.forEach(e => {
        const d = new Date(e.time);
        const now = new Date();
        console.log(now.getDate() - d.getDate());
    })
});
    
const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0
      },
    },
    series: [
      {
        name: "New users",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  }
  
  if (document.getElementById("area-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("area-chart"), options);
    chart.render();
  }
  
    return (
        <div>
            <div className="max-w-sm w-full  rounded-lg shadow bg-gray-800 p-4 md:p-6">
                <div className="flex justify-between">
                    <div>
                        <h5 className="leading-none text-3xl font-bold  text-white pb-2">32.4k</h5>
                        <p className="text-base font-normal  text-gray-400">Users this week</p>
                    </div>
                    <div
                        className="flex items-center px-2.5 py-0.5 text-base font-semibold  text-green-500 text-center">
                        12%
                        <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                        </svg>
                    </div>
                </div>
                <div id="area-chart"></div>
                <div className="grid grid-cols-1 items-center  border-t border-gray-700 justify-between">
                    <div className="flex justify-between items-center pt-5">
                        
                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="lastDaysdropdown"
                            data-dropdown-placement="bottom"
                            className="text-sm font-medium  text-gray-400  text-center inline-flex items-center hover:text-white"
                            type="button">
                            Last 7 days
                            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        
                        <div id="lastDaysdropdown" className="z-10 hidden  divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700">
                            <ul className="py-2 text-sm  text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Yesterday</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Today</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Last 7 days</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Last 30 days</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-600 hover:text-white">Last 90 days</a>
                                </li>
                            </ul>
                        </div>
                        <a
                            href="#"
                            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600  hover:text-blue-500  hover:bg-gray-700 focus:ring-gray-700 border-gray-700 px-3 py-2">
                            Users Report
                            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EnrollChart;