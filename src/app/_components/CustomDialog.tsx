import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from '@/components/ui/button';

export type DialogProps = {
    trigger: React.ReactNode,
    title: string;
    content: React.ReactNode;
}
const CustomDialog = (props: DialogProps) => {
    return (
        <Dialog>
            {props.trigger}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>{props.content}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;
