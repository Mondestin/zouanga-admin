'use client';

import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ParentAccount } from '../../types';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

interface ParentHeroSectionProps {
  parent: ParentAccount;
  accountStatus: 'Actif' | 'Suspendu';
}

export default function ParentHeroSection({
  parent,
  accountStatus
}: ParentHeroSectionProps) {
  const initials = getInitials(parent.name);

  return (
    <div className='rounded-2xl border bg-card p-6'>
      <div className='flex items-center justify-between gap-6'>
        <div className='flex items-center gap-5'>
          <span className='relative flex shrink-0 overflow-hidden rounded-full h-20 w-20'>
            <span className='flex h-full w-full items-center justify-center rounded-full bg-muted text-lg font-semibold'>
              {initials}
            </span>
          </span>

          <div className='space-y-1'>
            <div className='flex items-center gap-3'>
              <h1 className='text-3xl font-bold tracking-tight'>{parent.name}</h1>

              {parent.verified && (
                <Badge
                  className='gap-1 border-transparent'
                  style={{ backgroundColor: '#043535', color: '#ffffff' }}
                >
                  <CheckCircle2 className='h-3 w-3' />
                  Verifie
                </Badge>
              )}
            </div>

            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <span>{parent.email}</span>
              <span>•</span>
              <span>{parent.phone}</span>
              <span>•</span>
              <Badge
                className='border-transparent'
                style={
                  accountStatus === 'Actif'
                    ? { backgroundColor: '#043535', color: '#ffffff' }
                    : { backgroundColor: '#4bc2b1', color: '#043535' }
                }
              >
                {accountStatus}
              </Badge>
            </div>
          </div>
        </div>

        <div className='hidden md:flex items-center gap-8 text-center'>
          <div>
            <p className='text-xs text-muted-foreground'>Enfants</p>
            <p className='text-xl font-semibold'>{parent.linkedChildren.length}</p>
          </div>
          <div>
            <p className='text-xs text-muted-foreground'>Paiements reussis</p>
            <p className='text-xl font-semibold'>
              {parent.paymentRecords.filter(
                (p: { status: string }) => p.status === 'Reussi'
              ).length}
            </p>
          </div>
          <div>
            <p className='text-xs text-muted-foreground'>Incidents ouverts</p>
            <p className='text-xl font-semibold'>
              {parent.incidentRecords.filter(
                (i: { status: string }) => i.status === 'Ouvert'
              ).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
