'use client';

import React, {useState} from 'react';
import {Upload} from "lucide-react";
import {FileContent} from "@/app/types/uploaded-file";


const FileUploader = () => {
    const [files, setFiles] = useState([]);
    async function uploadFiles(event: React.ChangeEvent<HTMLInputElement>) {
        const { files } = event.target;

        if (!files || !files.length) {
            return;
        }

        const result = await loadFiles(files) ?? [];
        console.log(result[0].name, JSON.parse(result[0].content));
    }

    async function loadFiles(files: FileList){
        if (files.length > 0) {
            const fileReaders = Array.from(files).map((file) => {
                const reader = new FileReader();

                return new Promise((resolve) => {
                    reader.onload = (e) => {
                        resolve({name: file.name, content: e.target.result} as FileContent);
                    };

                    reader.readAsText(file);
                });
            });

            return await Promise.all(fileReaders) as FileContent[];
        }
    }

    return (
        <div className={'flex flex-col gap-5 items-center'}>
            <input type="file" id="fileInput" className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer" onChange={uploadFiles} multiple={true} accept={'.json'}/>
            <Upload size={'5rem'}/>
            <h1 className={'text-4xl font-bold mb-4 text-blue-500"'}>Upload your files</h1>
        </div>
    );
};

export default FileUploader;