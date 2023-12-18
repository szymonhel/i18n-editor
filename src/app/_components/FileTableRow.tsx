import React, {FC} from 'react';
import {TableCell, TableRow} from '@/components/ui/table';
import CustomDialog from '@/components/ui/custom/CustomDialog';
import {Button} from '@/components/ui/button';
import {Pencil, Trash2} from 'lucide-react';
import KeyForm, {CreatedKey} from '@/app/_components/KeyForm';

export type TableRowProps = {
    currentKey: string;
    index: number;
    fileContentCollection: any[];
    editKey: (key: CreatedKey) => void;
    removeKey: (key: string) => void;
    uniqueKeys: string[];
    gptKey?: string | null;
    contents: Array<string | Record<string, string>>;

}
const FileTableRow: FC<TableRowProps> = ({
                                             currentKey,
                                             index,
                                             fileContentCollection,
                                             editKey,
                                             removeKey,
                                             uniqueKeys,
                                             contents,
                                             gptKey
                                         }: TableRowProps) => {
    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">{currentKey}</TableCell>
            {contents.map((content: any, index: number) =>
                <TableCell className={!content ? 'bg-red-300': ''}
                           key={index}> {content} </TableCell>
            )}
            <TableCell>
                <div className={'w-100 flex justify-end gap-2'}>
                    <CustomDialog fullScreen={true} title={'New Key'} trigger={
                        <Button variant={'outline'} size={'icon'} color={'warning'}><Pencil
                            className="h-4 w-4"/></Button>
                    }
                                  content={<KeyForm currentKey={currentKey}
                                                    gptKey={gptKey}
                                                    fileContentCollection={fileContentCollection}
                                                    fileNames={fileContentCollection.map(z => z.name)}
                                                    alreadyCreatedKeys={uniqueKeys}
                                                    onSubmit={editKey}/>}/>
                    <CustomDialog trigger={
                        <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4"/>
                        </Button>
                    } title={'Confirmation'} content={'Do you want to remove this key?'} footer={
                        <>
                            <Button variant="outline" onClick={_ => {
                            }}>
                                No
                            </Button>
                            <Button onClick={_ => removeKey(currentKey)} color="danger">
                                Yes
                            </Button>
                        </>
                    }/>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default FileTableRow;
