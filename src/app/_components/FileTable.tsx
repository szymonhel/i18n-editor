'use client';

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import React from 'react';
import {FileContent, FileContentSerialized} from '@/types/uploaded-file';
import KeyForm, {CreatedKey} from "@/app/_components/KeyForm";
import FileTableRow from '@/app/_components/FileTableRow';

export type FileTableProps = {
    fileContentCollection: FileContentSerialized[];
    uniqueKeys: string[];
    filterKey?: string;
    gptKey?: string;
    editKey: (model: CreatedKey) => void;
    removeKey: (key: string) => void;
}
const FileTable = ({fileContentCollection, filterKey, uniqueKeys, removeKey, editKey, gptKey}: FileTableProps) => {

    return (
        <>
            <Table className={''}>
                { !uniqueKeys.length  && <TableCaption>No keys</TableCaption>}
                <TableHeader className={'sticky top-0 bg-white'}>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead className="w-[100px]">Key</TableHead>
                        {fileContentCollection.map((fileContent: FileContentSerialized) =>
                            <TableHead key={fileContent.name}>{fileContent.name}</TableHead>
                        )}
                        <TableHead/>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {uniqueKeys.filter(z => !filterKey || z.toLowerCase().includes(filterKey.toLowerCase())).map((key: string, index: number) =>
                            <FileTableRow gptKey={gptKey} key={key} currentKey={key} contents={fileContentCollection.map(z => z.content![key])} index={index} fileContentCollection={fileContentCollection} editKey={editKey} removeKey={removeKey} uniqueKeys={uniqueKeys}>
                            </FileTableRow>)
                    }

                </TableBody>
            </Table>

        </>
    );
};

export default FileTable;
