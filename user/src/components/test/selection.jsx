import Latex from 'react-latex';

const Selection = ({ selection, index, name, answer, qChecked }) => {
    const handleAnswer = () => {
        const ans = {
            index: index,
            qid: name,
        }
        answer(ans);
    }
    
    return(
        <div id={index} className="flex items-center me-4 mb-2">
        <input id={index} type="radio" value={index} name={name} defaultChecked={qChecked && qChecked.qid === name && qChecked.index === index}
            className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-500"
            onClick={handleAnswer}/>
        <label htmlFor="radio" className="ms-2 text-sm font-medium text-gray-300">
        <Latex >{selection[index]}</Latex>
        </label>
    </div>
    )
}

export default Selection;