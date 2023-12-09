import React from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle, DialogClose, DialogFooter,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";

export type DialogProps = {
    trigger: React.ReactNode,
    title: string;
    content: React.ReactNode;
    footer?: React.ReactNode;
    fullScreen?: boolean;
}
const CustomDialog = (props: DialogProps) => {
    return (
        <Dialog >
            <DialogTrigger asChild>{props.trigger}</DialogTrigger>
            <DialogContent className={props.fullScreen ?  'min-w-full h-screen overflow-auto': 'overflow-auto'}>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>{props.content}
                    </DialogDescription>
                </DialogHeader>
            { !!props.footer && <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                    {props.footer}
                </DialogClose>
            </DialogFooter> }
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;
