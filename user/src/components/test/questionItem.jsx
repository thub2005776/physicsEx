import Latex from 'react-latex';
import { Selection } from '..';

const QuestionItem = ({ quest, index, answered, show , qChecked}) => {
   
    const answer = (ans) => {
        var t = false;
        if (quest.trueAns.includes(ans.index)) {
            t = true;
        }
        const result = {
            index: index,
            trueAns: t,
            qChecked: {
              qid: ans.qid,  
              index: ans.index,
            }
            
        }
        answered(result);
    }

    const checked = qChecked && quest && qChecked.find(f => f && f.qid === quest._id);
    
    return (
        quest && quest.selections &&
        <div className="p-4 mb-6">
            <p className="text-white font-bold text-md">
                {index}.
                <span> <Latex>{quest.question}</Latex></span>
            </p>
            {quest.img && <img src={process.env.REACT_APP_SERVER_URL + quest.img} alt={quest.img}
                className='mx-auto w-64 p-1 rounded-lg' />}
            {quest.selections.map((s, i) => (
                <Selection key={i} selection={s} index={i} name={quest._id} answer={answer} qChecked={checked}/>
            ))}
            {show &&
                <div>
                    <p className='text-gray-400'>Đáp án:
                        <span className='text-green-500'> {String.fromCharCode(parseInt(quest.trueAns) + 65)}</span>
                    </p>
                    <p className='text-gray-400'> Giải:
                        <span className='text-green-500'> <Latex >{quest.explain}</Latex></span>
                    </p>
                </div>}
        </div>
    )
}

export default QuestionItem;