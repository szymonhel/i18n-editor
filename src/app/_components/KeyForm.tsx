import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import {useForm} from 'react-hook-form';
import { z } from 'zod';
import {Textarea} from '@/components/ui/textarea';
import TextInput from '@/components/ui/custom/TextInput';
import {FileContentSerialized} from '@/types/uploaded-file';

export type CreatedKey = {
    key: string;
    definitions: Record<string, string>
};
export type KeyFormProps = {
    fileNames: string[];
    alreadyCreatedKeys: string[];
    onSubmit: ( model: CreatedKey) => void;
}

const KeyForm = ({alreadyCreatedKeys, fileNames, onSubmit}: KeyFormProps) => {
    const keyFormSchema = z.object({
        key: z.string().min(1).refine((value) => !alreadyCreatedKeys.map(z => z.toLowerCase()).includes(value.toLowerCase()), {
            message: 'Key already exists'
        }),
        definitions: z.record(z.string().optional())
    });

    const form
        = useForm<z.infer<typeof keyFormSchema>>({
        resolver: zodResolver(keyFormSchema)
    });

    function submit(values: z.infer<typeof keyFormSchema>) {
        onSubmit({
            key: values.key,
            definitions: values.definitions as Record<string, string>
        });
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
                <TextInput key={'key'} control={form.control} name={'key'} placeholder={'Key'} label={'Key'}/>

                {fileNames.map((fileName: any, index: number) =>
                        <FormField
                            key={fileName + index}
                            control={form.control}
                            name={`definitions.${fileName}`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{fileName}</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Translation' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default KeyForm;
