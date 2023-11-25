'use client';

import React, {useState} from 'react';
import {Upload} from "lucide-react";

const FileUploader = () => {
    const [files, setFiles] = useState([]);
    function uploadFiles(event: React.ChangeEvent<HTMLInputElement>) {
        const { files } = event.target;

        if (!files || !files.length) {
            return;
        }


        console.log(event.target.files);
    }

    return (
        <div className={'flex flex-col gap-5 items-center'}>
            <input type="file" id="fileInput" className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer" onChange={uploadFiles}/>
            <Upload size={'5rem'}/>
            <h1 className={'text-4xl font-bold mb-4 text-blue-500"'}>Upload your files</h1>
        </div>
    );
};

export default FileUploader;