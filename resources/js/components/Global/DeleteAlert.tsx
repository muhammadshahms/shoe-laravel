'use client';

import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteAlertProps {
    trigger?: React.ReactNode;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    confirmText?: string;
    onConfirm: () => void;
    isLoading?: boolean;

    // ✅ Extra classNames
    triggerClassName?: string;
    confirmButtonClassName?: string;
    cancelButtonClassName?: string;
}

export default function DeleteAlert({
    trigger,
    icon,
    title = 'Are you sure?',
    description = 'This action cannot be undone. Do you really want to delete this item?',
    confirmText = 'Yes, Delete',
    onConfirm,
    isLoading = false,

    triggerClassName = '',
    confirmButtonClassName = 'bg-red-600 hover:bg-red-700',
    cancelButtonClassName = '',
}: DeleteAlertProps) {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {trigger || (
                    <span
                        className={`cursor-pointer ${triggerClassName}`}
                    >
                        {icon || title}
                    </span>
                )}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading} className={cancelButtonClassName}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={handleConfirm}
                        className={confirmButtonClassName}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
