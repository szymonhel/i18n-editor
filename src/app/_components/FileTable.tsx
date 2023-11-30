'use client';

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import React from 'react';
import {useRouter} from 'next/navigation';
import {FILES_SESSION_KEY} from '@/consts';
import {FileContent, FileContentSerialized} from '@/types/uploaded-file';

export type FileTableProps = {
    fileContentCollection: FileContentSerialized[];
    uniqueKeys: string[];
}
const FileTable = ({fileContentCollection, uniqueKeys}: FileTableProps) => {


    return (
        <>
            <Table className={''}>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead className="w-[100px]">Key</TableHead>
                        {fileContentCollection.map((fileContent: FileContentSerialized) =>
                            <TableHead key={fileContent.name}>{fileContent.name}</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {uniqueKeys.map((key: string, index: number) =>
                        <TableRow key={key}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{key}</TableCell>
                            {fileContentCollection.map(({content}: any, index: number) =>
                                <TableCell key={index}>{content[key]}</TableCell>
                            )}
                        </TableRow>)
                    }

                </TableBody>
            </Table>

        </>
    );
};

export default FileTable;
