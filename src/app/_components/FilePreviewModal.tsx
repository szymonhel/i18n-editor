import React, {FC} from 'react';
import {FileContentSerialized} from '@/types/uploaded-file';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";

export type FilePreviewModalProps = {
    filesContent: any[];
    uniqueKeys: string[];
}
const FilePreviewModal: FC<FilePreviewModalProps> = ({filesContent, uniqueKeys}) => {
    const { toast } = useToast()
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

    function convertNumericKeysToArray(obj: any) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (typeof obj[key] === 'object' && !Object.keys(obj[key]).every(k => !isNaN(Number(k)))) {
                    obj[key] = convertNumericKeysToArray(obj[key]);
                } else {
                    const numericKeys = Object.keys(obj[key]).every(k => !isNaN(Number(k)));
                    if (numericKeys && typeof obj[key] !== 'string') {
                        obj[key] = Object.values(obj[key]);
                    }
                }
            }
        }
        return obj;
    }

    function downloadFile(text: string) {
        const blob = new Blob([text], { type: 'text/json' });
        return window.URL.createObjectURL(blob);
    }

    const copyToClipboard = (str: string) => {
        const el = document.createElement("textarea");
        el.value = str;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        toast({
            description: "Content copied",
        });
    };



    function allKeys() {
        return uniqueKeys.reduce((acc, item, index) => {
            acc[item] = ``;
            return acc;
        }, {} as Record<string, string>);
    }

    const copyVal = filesContent.map(z => ({...z, content: unflattenObject({...allKeys(), ...z.content})})).map(z => ({...z, content: convertNumericKeysToArray(z.content)}));
    return (
        <>
        <Tabs defaultValue="account" className=" w-[100%]">
            <TabsList className={'sticky top-0 float-right w-100'}>
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
                        <div className="sticky right-0 bottom-[1.5rem] w-full flex flex-col items-end gap-4">
                            <Button variant={'default'}>
                                <a className={'float-right'} download={`${name}.json`}
                                   href={downloadFile(JSON.stringify(content, null, 2))}>Download</a>
                            </Button>

                            <Button variant={'secondary'} onClick={_ => copyToClipboard(JSON.stringify(content, null, 2))}>Copy content</Button>
                        </div>


                    </TabsContent>
                )
            }
        </Tabs>
        </>
    );
};

export default FilePreviewModal;
