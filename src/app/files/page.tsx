'use client';

import React from 'react';
import FileTable from '@/app/_components/FileTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {MoveLeft} from 'lucide-react';
import CustomDialog from '@/app/_components/CustomDialog';
import {DialogTrigger} from '@/components/ui/dialog';
import KeyForm from '@/app/_components/KeyForm';
import {FileContent} from '@/types/uploaded-file';
import {useRouter} from 'next/navigation';
import {FILES_SESSION_KEY} from '@/consts';

const Page = () => {


    const router = useRouter();
    const value = sessionStorage.getItem(FILES_SESSION_KEY);

    if (!value) {
        router.back();
    }

    const fileContentCollection = (JSON.parse(value!) as FileContent[])
        .map(z => ({...z, content: JSON.parse(z.content!)}));

    const uniqueKeys = Array.from(new Set(fileContentCollection.flatMap(z => Object.keys(z.content))));
    const fileNames = fileContentCollection.map(z => z.content);

    return (
        <>
            <div className={'flex justify-between items-center'}>
                <div className={'flex items-center gap-3 mb-6'}>
                    <Link color={'green'} href={'/'}>
                        <MoveLeft />
                    </Link>
                    <h4 className={'text-3xl font-bold'}>Uploaded files</h4>
                </div>

                <CustomDialog title={'New Key' } trigger={
                    <DialogTrigger ><Button variant={'default'}>Add new key</Button></DialogTrigger>
                } content={<KeyForm/>}/>



            </div>

            <FileTable fileContentCollection={fileContentCollection} fileNames={fileNames} uniqueKeys={uniqueKeys}/>

        </>

    );
};

export default Page;
