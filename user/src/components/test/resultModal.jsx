
const ResultModal = ({ result, total, goback, show }) => {
    return (
        <div className="fixed top-32 left-[30%]">
            <div className="p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">

                    <div className="relative rounded-lg shadow bg-gray-800 border border-gray-600">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                            <h3 className="text-center text-xl font-semibold  text-white">
                                Kết quả
                            </h3>
                        </div>

                        <div className="p-4 md:p-5 space-y-4 text-white">
                            <p>Số câu đúng:
                                <span className="font-bold text-green-500"> {result}</span>
                                / {total}
                            </p>
                            <p>Tổng điểm:
                                <span className="font-bold text-blue-600"> {result * 10}</span>
                            </p>
                            <p></p>
                        </div>

                        <div className="flex items-center p-4 md:p-5 border-t rounded-b border-gray-600">
                            <button data-modal-hide="default-modal" type="button" className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                onClick={() => show(true)}>
                                Xem đáp án
                            </button>
                            <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none rounded-lg border  focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
                                onClick={() => goback(true)}>
                                Trở về
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultModal;