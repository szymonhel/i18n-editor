import React, {FC} from 'react';
import {FileContentSerialized} from '@/types/uploaded-file';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

export type FilePreviewModalProps = {
    filesContent: any[];
    uniqueKeys: string[];
}
const FilePreviewModal: FC<FilePreviewModalProps> = ({filesContent, uniqueKeys}) => {

    function unflattenObject(obj: any) {
        const result = {};
        for (const key in obj) {
            const keys = key.split('.');
            let current: any = result;

            for (let i = 0; i < keys.length; i++) {
                const k = keys[i];

                if (i === keys.length - 1) {
                    current[k] = obj[key];
                } else {
                    if (!current[k]) {
                        current[k] = {};
                    }

                    current = current[k];
                }
            }
        }

        return result;
    }

    function allKeys() {
        return uniqueKeys.reduce((acc, item, index) => {
            acc[item] = ``;
            return acc;
        }, {} as Record<string, string>);
    }

    const copyVal = filesContent.map(z => ({...z, content: unflattenObject({...allKeys(), ...z.content})}));
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                {
                    copyVal.map(({name}: FileContentSerialized) =>
                        <TabsTrigger key={name} value={name}>{name}</TabsTrigger>
                    )
                }
            </TabsList>
            {
                copyVal.map(({name, content}: FileContentSerialized) =>
                    <TabsContent key={name} value={name}>
                        <pre>{JSON.stringify(content, null, 2)}</pre>
                    </TabsContent>
                )
            }
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
    );
};

export default FilePreviewModal;
