'use client';

import React, {useEffect} from 'react';
import FileTable from '@/app/_components/FileTable';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {MoveLeft} from 'lucide-react';
import CustomDialog from '@/components/ui/custom/CustomDialog';
import KeyForm from '@/app/_components/KeyForm';
import {FileContent, FileContentSerialized} from '@/types/uploaded-file';
import {useRouter} from 'next/navigation';
import {FILES_SESSION_KEY} from '@/consts';

const Page = () => {
    const [filesContent, setFilesContent] = React.useState<FileContentSerialized[]>([]);
    const [uniqueKeys, setUniqueKeys] = React.useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const value = sessionStorage.getItem(FILES_SESSION_KEY);

        if (!value) {
            router.back();
        }

        const fileContentCollection = (JSON.parse(value!) as FileContent[])
            .map(z => ({name: z.name.split('.')[0], content: JSON.parse(z.content!)}));

        setUniqueKeys(Array.from(new Set(fileContentCollection.flatMap(z => Object.keys(z.content)))));

        setFilesContent(fileContentCollection);
    }, []);

    const fileNames = filesContent.map(z => z.name);
    const contents = filesContent.map(z => z.content);

    const addNewKey = (model: FileContentSerialized) => {
        setFilesContent([...filesContent, model]);
        setUniqueKeys([...uniqueKeys, model.name]);
    }
    return (
        <>
            <div className={'flex justify-between items-center'}>
                <div className={'flex items-center gap-3 mb-6'}>
                    <Link color={'green'} href={'/'}>
                        <MoveLeft/>
                    </Link>
                    <h4 className={'text-3xl font-bold'}>Uploaded files</h4>
                </div>

                <CustomDialog title={'New Key'} trigger={
                    <Button variant={'default'}>Add new key</Button>
                }
                              content={<KeyForm fileNames={fileNames} alreadyCreatedKeys={uniqueKeys}
                                                onSubmit={addNewKey}/>}/>

            </div>

            <FileTable fileContentCollection={filesContent} uniqueKeys={uniqueKeys}/>
        </>

    );
};

export default Page;
