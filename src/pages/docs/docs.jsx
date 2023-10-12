import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import packageJson from '../../../package.json';
import { useState } from 'react';

function Docs() {

    const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        setInitialTab: () => Promise.resolve(0),
    });
    const bg = " bg-gray-900";
    const [active12, setActive12] = useState(bg);
    const [active11, setActive11] = useState('');
    const [active10, setActive10] = useState('');
    const [fileURL, setFileURL] = useState("grade12.pdf");
    
    const handleGrade12 = () => {
        setFileURL("grade12.pdf");
        if(active12 === ''){
            setActive12(bg);
            setActive11('');
            setActive10('');
        }
    }

    const handleGrade11 = () => {
        setFileURL("grade11.pdf");
        if(active11 === '') {
            setActive12('')
            setActive11(bg);
            setActive10('')
        }
           
    }

    const handleGrade10 = () => {
        setFileURL("grade10.pdf");
        if(active10 === '') {
            setActive10(bg);
            setActive11('');
        }
            
    }
    return (
        <div className="container mt-5">
            <div className="flex justify-center text-white font-bold text-2xl div-2 ml-20">
                    <button className={`w-3/12 rounded-t-md` + active12}
                        onClick={handleGrade12}
                    >Lớp 12</button>
                    <button className={`w-3/12 rounded-t-md` + active11}
                        onClick={handleGrade11}
                    >Lớp 11</button>
                {console.log('11' + active11)}
                <button className={`w-3/12 rounded-t-md` + active10}
                    onClick={handleGrade10}>Lớp 10
                </button>
                {console.log('10' + active10)}
            </div>

            <div className="flex justify-center">
                <div className="bg-gray-900 w-5/6 rounded-md p-3">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                        <div style={{ height: '900px' }}>
                            <Viewer
                                fileUrl={process.env.REACT_APP_SERVER_URL + fileURL}
                                plugins={[
                                    defaultLayoutPluginInstance,
                                ]}
                            />
                        </div>
                    </Worker>
                </div>
            </div>

        </div>
    )
}

export default Docs;