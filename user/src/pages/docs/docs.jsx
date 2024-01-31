import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import packageJson from '../../../package.json';
import { useState } from 'react';
import { BiSolidFilePdf } from "react-icons/bi";
import { Comment, Comments } from '../../components'

function Docs({ files, user, com }) {
    const comm = files && com && com.length > 0 && com.filter(f => f.eid === files.fid);

    const sended = (e) => {
        if (e) {
            document.location.reload();
        }
    }

    const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        setInitialTab: () => Promise.resolve(0),
    });

    const [active, setActive] = useState('12');
    const [filename, setFilename] = useState(' ');
    const [view, setView] = useState(false);

    const file12 = files.filter(f => f.grade === '12');
    const file11 = files.filter(f => f.grade === '11');
    const file10 = files.filter(f => f.grade === '10');

    const PDFFile = ({ file }) => {
        return (
            <div className='flex justify-center gap-5 p-3 bg-slate-500 rounded-md cursor-pointer mt-2 text-white text-lg'
                onClick={() => {
                    setFilename(file.name);
                    setView(true)
                }}>
                <div className='mt-1'><BiSolidFilePdf size={30} /> </div>
                <div>{file.name} </div>
            </div>
        )
    }


    return (
        files && file12 && file11 && file10 &&
        <div>
            <div className="mt-24 sm:mx-20 border rounded-md shadow  bg-gray-800 border-gray-700 pb-2">
                <div className=" flex justify-around text-white font-bold text-2xl text-center bg-slate-800">
                    <div className={`rounded-t-md p-3 w-full ${active === '12' ? "bg-gray-900 border-b-[1px]" : "hover:bg-slate-600 "}`}
                        onClick={() => {
                            setActive('12')
                            setView(false)
                        }}>
                        Lớp 12
                    </div>
                    <div className={`rounded-t-md w-full ${active === '11' ? "bg-gray-900 border-b-[1px]" : "hover:bg-slate-600  "}`}
                        onClick={() => {
                            setActive('11')
                            setView(false)
                        }}>
                        Lớp 11
                    </div>
                    <div className={`rounded-t-md w-full ${active === '10' ? "bg-gray-900 border-b-[1px]" : "hover:bg-slate-600  "}`}
                        onClick={() => {
                            setActive('10')
                            setView(false)
                        }}>
                        Lớp 10
                    </div>
                </div>

                {!view ?
                    (<div>
                        {active === '12' ?
                            Array.isArray(file12) ?
                                file12.map((f, i) => (
                                    <PDFFile key={i} file={f} />
                                )) : <PDFFile file={file12} />
                            : active === '11' ?
                                Array.isArray(file11) ?
                                    file11.map((f, i) => (
                                        <PDFFile key={i} file={f} />
                                    )) : <PDFFile file={file11} />
                                : Array.isArray(file10) ?
                                    file10.map((f, i) => (
                                        <PDFFile key={i} file={f} />
                                    )) : <PDFFile file={file10} />}
                    </div>

                    ) :
                    (<div className="flex justify-center">
                        <div className=" w-5/6 rounded-md p-3">
                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                                <div style={{ height: '900px' }}>
                                    <Viewer
                                        fileUrl={process.env.REACT_APP_SERVER_URL + filename}
                                        plugins={[
                                            defaultLayoutPluginInstance,
                                        ]}
                                    />
                                </div>
                            </Worker>
                        </div>
                    </div>
                    )}

            </div>
            <div className="mt-5 sm:mx-20 mx-2 text-white rounded-lg border bg-gray-800 border-gray-600 relative">
                <h3 className="m-5 font-semibold ">Bình luận </h3>
                <Comment eid={files.fid} user={user} sended={sended} />
                {comm && comm.length > 0 ?
                    <>
                        <label htmlFor="message" className="block m-5 ml-10 text-sm font-medium text-white">
                            Tất cả bình luận
                        </label>
                        {Array.isArray(comm) ?
                            comm.map((c, i) => (
                                <Comments key={i} auth={user} com={c} sended={sended} />
                            )) : <Comments auth={user} com={comm} sended={sended} />}
                    </> :
                    <p className="block m-5 ml-10 text-sm font-medium  text-white">
                        Chưa có bình luận nào
                    </p>
                }
            </div>
        </div>


    )
}

export default Docs;