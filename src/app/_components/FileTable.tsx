'use client';

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import React from 'react';
import {FileContent, FileContentSerialized} from '@/types/uploaded-file';
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import CustomDialog from "@/components/ui/custom/CustomDialog";

export type FileTableProps = {
    fileContentCollection: FileContentSerialized[];
    uniqueKeys: string[];
    removeKey: (key: string) => void;
}
const FileTable = ({fileContentCollection, uniqueKeys, removeKey}: FileTableProps) => {


    return (
        <>
            <Table className={''}>
                { !uniqueKeys.length  && <TableCaption>No keys</TableCaption>}
                <TableHeader>
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
                    {uniqueKeys.map((key: string, index: number) =>
                        <TableRow key={key}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{key}</TableCell>
                            {fileContentCollection.map(({content}: any, index: number) =>
                                <TableCell key={index}>{content[key] ?? '-'} </TableCell>
                            )}
                            <TableCell>
                                <div className={'w-100 flex justify-end'}>
                                <CustomDialog trigger={
                                    <Button variant="outline" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                } title={'Confirmation'} content={'Do you want to remove this key?'} footer={
                                    <>
                                    <Button variant="outline" onClick={_ => {}}>
                                        No
                                    </Button>
                                    <Button onClick={_ => removeKey(key)} color="danger">
                                        Yes
                                    </Button>
                                    </>
                                }/>
                                </div>
                            </TableCell>
                        </TableRow>)
                    }

                </TableBody>
            </Table>

        </>
    );
};

export default FileTable;
