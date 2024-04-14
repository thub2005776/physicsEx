const EnrollChart = ({ title, enroll }) => {

  return (
    enroll && enroll.length > 0 &&
    <div className="mb-6 text-center">
      <p className="text-white text-center text-lg font-bold">{title}</p>
      <div className="mt-5 mx-5 sm:flex justify-center lg:gap-5 gap-2 bg-gray-800 p-10 rounded-lg">
      <div>
        <img className="mx-auto w-32 h-32 rounded-full border border-gray-600 p-2"
        src={process.env.REACT_APP_SERVER_URL + enroll[1].img} alt="enrollTop2" />
        <p className="mt-5 text-white text-center text-sm">{enroll[1].name}</p>
        <p className="text-base text-gray-600">{enroll[1].enroll}</p>
        <p className="mx-auto w-fit px-2 py-4 text-sm font-bold bg-gray-500 rounded-full">Top 2</p>
      </div>
      <div>
        <img className="sm:-mt-8 mx-auto w-40 h-40  rounded-full border border-gray-600 p-2"
          src={process.env.REACT_APP_SERVER_URL + enroll[0].img} alt="enrollTop1" />
          <p className="mt-5 md:text-base text-green-400 font-bold text-center truncate">{enroll[0].name}</p>
          <p className="text-base text-gray-600">{enroll[0].enroll}</p>
          <p className="mx-auto w-fit px-3 py-5 text-sm font-bold bg-yellow-300 rounded-full">Top 1</p>
      </div>
      <div>
        <img className="mx-auto w-32 h-32 rounded-full border border-gray-600 p-2"
        src={process.env.REACT_APP_SERVER_URL + enroll[2].img} alt="enrollTop3" />
        <p className="mt-5 text-white text-center text-sm">{enroll[2].name}</p>
        <p className="text-base text-gray-600">{enroll[2].enroll}</p>
        <p className="mx-auto w-fit px-2 py-4 text-sm font-bold bg-amber-600 rounded-full">Top 3</p>
      </div>
    </div>
    </div>
    
  )
}

export default EnrollChart;