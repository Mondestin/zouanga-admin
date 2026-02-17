'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { AlertTriangle, CircleHelp } from 'lucide-react';
import { ReactNode } from 'react';

interface ConfirmationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  trigger?: ReactNode;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  trigger,
  title = 'Etes-vous sur ?',
  description = 'Cette action ne peut pas etre annulee.',
  variant = 'default',
  confirmText = 'Confirmer',
  cancelText = 'Annuler'
}: ConfirmationDialogProps) => {
  const Icon = variant === 'destructive' ? AlertTriangle : CircleHelp;
  const iconBgClass =
    variant === 'destructive' ? 'bg-destructive/10' : 'bg-primary/10';
  const iconColorClass =
    variant === 'destructive' ? 'text-destructive' : 'text-primary';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent className='max-w-md p-6'>
        <div className='flex items-start gap-4'>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBgClass}`}>
            <Icon className={`h-5 w-5 ${iconColorClass}`} />
          </div>
          <div className='flex-1 space-y-1'>
            <AlertDialogHeader className='space-y-1 p-0'>
              <AlertDialogTitle className='text-base'>{title}</AlertDialogTitle>
              <AlertDialogDescription className='text-sm'>
                {description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='mt-4 justify-end gap-2 p-0'>
              <AlertDialogCancel className='mt-0'>{cancelText}</AlertDialogCancel>
              <AlertDialogAction
                onClick={onConfirm}
                className={
                  variant === 'destructive'
                    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    : ''
                }
              >
                {confirmText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
