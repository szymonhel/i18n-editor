import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import {useForm} from 'react-hook-form';
import { z } from 'zod';
import {Textarea} from '@/components/ui/textarea';

export type KeyFormProps = {
    fileNames: string[];
    alreadyCreatedKeys: string[];
}




const KeyForm = ({alreadyCreatedKeys, fileNames}: KeyFormProps) => {

    const keyFormSchema = z.object({
        key: z.string().min(1),
        definitions: z.record(z.string()).refine((value) => {
            const keys = Object.keys(value);
            return keys.every(key => !alreadyCreatedKeys.includes(key));
        })
    });

    const form
        = useForm<z.infer<typeof keyFormSchema>>({
        resolver: zodResolver(keyFormSchema)
    });

    function submit(values: z.infer<typeof keyFormSchema>) {
        console.log(keyFormSchema.parse(values));

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Key</FormLabel>
                            <FormControl>
                                <Input placeholder="Key" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
