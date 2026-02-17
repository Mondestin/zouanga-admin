'use client';

import { AlertCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParentAccount } from '../../types';

interface ParentSidebarProps {
  parent: ParentAccount;
}

export default function ParentSidebar({ parent }: ParentSidebarProps) {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <AlertCircle className='h-5 w-5' />
            Resume
          </CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='rounded-xl border bg-muted/20 p-4'>
            <p className='text-xs text-muted-foreground'>Mode paiement</p>
            <p className='mt-1 font-medium'>{parent.paymentMode}</p>
          </div>

          <div className='rounded-xl border bg-muted/20 p-4'>
            <p className='text-xs text-muted-foreground'>Prix abonnement</p>
            <p className='mt-1 font-medium'>{parent.subscriptionPrice}</p>
          </div>

          <div className='rounded-xl border bg-muted/20 p-4'>
            <p className='text-xs text-muted-foreground'>Statut abonnement</p>
            <Badge className='mt-2' variant='outline'>
              {parent.subscriptionStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <FileText className='h-5 w-5' />
            Notes support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm leading-relaxed'>{parent.supportNotes}</p>
        </CardContent>
      </Card>
    </div>
  );
}
