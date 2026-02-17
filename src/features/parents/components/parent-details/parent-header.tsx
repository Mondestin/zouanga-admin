'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ParentHeaderProps {
  accountStatus: 'Actif' | 'Suspendu';
  onSuspendClick: () => void;
}

export default function ParentHeader({
  accountStatus,
  onSuspendClick
}: ParentHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <Button asChild variant='ghost' size='sm'>
        <Link href='/dashboard/parents'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Retour
        </Link>
      </Button>

      <Button
        variant={accountStatus === 'Actif' ? 'destructive' : 'default'}
        size='sm'
        onClick={onSuspendClick}
      >
        {accountStatus === 'Actif' ? 'Suspendre le compte' : 'Reactiver le compte'}
      </Button>
    </div>
  );
}
