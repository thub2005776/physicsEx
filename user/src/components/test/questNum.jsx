
const QuestNum = ({ index , selected}) => {
    return (
        <button 
            className={`${selected.includes(index) && 'bg-blue-500'} w-10 h-10 text-white text-center p-2 pt-1 border border-gray-600 rounded-lg m-1`}>
            {index}
        </button>
    )
}

export default QuestNum;