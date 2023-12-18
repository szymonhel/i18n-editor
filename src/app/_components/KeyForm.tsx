import {Button} from '@/components/ui/button';
import {Form, FormControl   , FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Textarea} from '@/components/ui/textarea';
import TextInput from '@/components/ui/custom/TextInput';
import {FileContentSerialized} from '@/types/uploaded-file';
import { Info } from 'lucide-react';
import {toast} from "@/components/ui/use-toast";

export type CreatedKey = {
    key: string;
    definitions: Record<string, string>
};
export type KeyFormProps = {
    currentKey?: string;
    fileContentCollection?: FileContentSerialized[];
    fileNames: string[];
    gptKey?: string | null;
    alreadyCreatedKeys: string[];
    onSubmit: (model: CreatedKey) => void;
}

const KeyForm = ({currentKey, fileContentCollection, alreadyCreatedKeys, fileNames, onSubmit, gptKey}: KeyFormProps) => {
    const keyFormSchema = z.object({
        key: z.string().min(1).refine((value) => !alreadyCreatedKeys.filter(z => z !== currentKey).map(z => z.toLowerCase()).includes(value.toLowerCase()), {
            message: 'Key already exists'
        }),
        definitions: z.record(z.string().optional())
    });

const [suggestions, setSuggestions] = useState<Record<string, string>>();
    const form
        = useForm<z.infer<typeof keyFormSchema>>({
        resolver: zodResolver(keyFormSchema),
        defaultValues: {
            key: currentKey,
            definitions: fileContentCollection?.reduce((acc, curr) => {
                acc[curr.name] = !!curr.content ? curr.content[currentKey!] : '';
                return acc;
            }, {} as Record<string, string>)
        }
    });

    function submit(values: z.infer<typeof keyFormSchema>) {
        onSubmit({
            key: values.key,
            definitions: values.definitions as Record<string, string>
        });
    }

    async function getGptSuggestions() {
        try {
            var result = await fetch('/api/chat-gpt', {
                method: 'POST',
                body: JSON.stringify({
                    apiKey: gptKey,
                    languages: fileContentCollection?.map(z => z.name),
                    definitions: form.getValues().definitions
                })
            });
            setSuggestions(JSON.parse(await result.json()));
        } catch (ex) {
            toast({
                variant: "destructive",
                description: "Failed to get text suggestions",

            });
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
                <TextInput key={'key'} control={form.control} name={'key'} placeholder={'Key'} label={'Key'}/>

                {fileNames.map((fileName: any, index: number) =>
                    <>
                    <FormField
                        key={fileName + index}
                        control={form.control}
                        name={`definitions.${fileName}`}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{fileName}</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                        {suggestions && suggestions[fileName] && <span className={'flex gap-3 items-center'}><Button variant={'outline'} type={'button'} onClick={_ => form.setValue(`definitions.${fileName}`, suggestions[fileName])}>Apply</Button> {suggestions[fileName]}</span>}
                    </>
                )}
                <div className={'flex justify-between flex-row-reverse'}>
                    <Button type="submit">Submit</Button>
                    {!!gptKey && <Button variant={'secondary'} type="button" onClick={getGptSuggestions}>Get Suggestions</Button>}
                </div>

            </form>
        </Form>
    );
};

export default KeyForm;
