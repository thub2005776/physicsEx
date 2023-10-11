import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import packageJson from '../../../package.json';

function Docs() {

    const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        setInitialTab: () => Promise.resolve(0),
    });
    
    return (
        <div className="container mt-5">
            <div className="flex justify-evenly text-white font-bold text-2xl div-2 ml-20 mb-10">
                <button className=" hover:text-emerald-500 p-2 rounded-md">
                    Lớp 12
                </button>
                <button className="hover:text-emerald-500 p-2 rounded-md">Lớp 11</button>
                <button className="hover:text-emerald-500 p-2 rounded-md">Lớp 10</button>
            </div>
            <div className="flex justify-center">
                <div className="bg-black w-5/6 rounded-md">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                        <div style={{ height: '900px' }}>
                            <Viewer
                                fileUrl={`${process.env.REACT_APP_SERVER_URL}grade12.pdf`}
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