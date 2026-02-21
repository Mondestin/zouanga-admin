'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import {
  AlertTriangle,
  CalendarRange,
  CircleDollarSign,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  BadgeCheck
} from 'lucide-react';
import { IconDotsVertical } from '@tabler/icons-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ParentAccount } from '@/features/parents/types';

function ParentActionsCell({ parent }: { parent: ParentAccount }) {
  const router = useRouter();
  const isSuspended = parent.accountStatus === 'Suspendu';
  const label = isSuspended ? 'Reactiver' : 'Suspendre';
  const Icon = isSuspended ? PlayCircle : PauseCircle;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Ouvrir le menu</span>
          <IconDotsVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => router.push(`/dashboard/parents/${parent.id}`)}>
          <CheckCircle2 className='mr-2 h-4 w-4' />
          Voir details parent
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toast.success(`${label} le compte de ${parent.name} (action de demonstration)`)
          }
        >
          <Icon className='mr-2 h-4 w-4' />
          {label}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info(`Notes support: ${parent.supportNotes}`)}>
          <CheckCircle2 className='mr-2 h-4 w-4' />
          Voir notes support
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toast.info(`Historique suivi de ${parent.name} (action de demonstration)`)
          }
        >
          <CheckCircle2 className='mr-2 h-4 w-4' />
          Historique suivi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const SubscriptionStatusBadge = ({
  status
}: {
  status: 'Actif' | 'En retard' | 'Suspendu';
}) => {
  if (status === 'Actif') {
    return (
      <Badge
        className='inline-flex items-center gap-1 border-transparent hover:opacity-90'
        style={{ backgroundColor: '#043535', color: '#ffffff' }}
      >
        <CheckCircle2 className='h-3 w-3' />
        {status}
      </Badge>
    );
  }
  if (status === 'En retard') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200'>
        <AlertTriangle className='h-3 w-3' />
        {status}
      </Badge>
    );
  }
  return (
    <Badge className='inline-flex items-center gap-1 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200'>
      <PauseCircle className='h-3 w-3' />
      {status}
    </Badge>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => {
      const initials = getInitials(row.original.name);
      return (
        <span className='relative flex shrink-0 overflow-hidden rounded-full h-8 w-8'>
          <span className='flex h-full w-full items-center justify-center rounded-full bg-muted'>
            {initials}
          </span>
        </span>
      );
    }
  },
  {
    accessorKey: 'name',
    header: 'Parent',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Link
          href={`/dashboard/parents/${row.original.id}`}
          className='font-medium hover:underline'
        >
          {row.original.name}
        </Link>
        {row.original.verified && (
          <BadgeCheck className='h-5 w-5' style={{ color: '#4bc2b1' }} />
        )}
      </div>
    )
  },
  {
    accessorKey: 'subscriptionStatus',
    header: 'Statut abonnement',
    cell: ({ row }) => (
      <SubscriptionStatusBadge status={row.original.subscriptionStatus} />
    )
  },
  {
    accessorKey: 'subscriptionPlan',
    header: "Type d'abonnement",
    cell: ({ row }) => (
      <Badge variant='outline' className='inline-flex items-center gap-1'>
        <CalendarRange className='h-3 w-3' />
        {row.original.subscriptionPlan}
      </Badge>
    )
  },
  {
    accessorKey: 'subscriptionPrice',
    header: 'Prix abonnement',
    cell: ({ row }) => (
      <span className='inline-flex items-center gap-1 font-medium'>
        <CircleDollarSign className='h-3.5 w-3.5 text-primary' />
        {row.original.subscriptionPrice}
      </span>
    )
  },
  {
    accessorKey: 'paymentHistory',
    header: 'Historique paiements',
    cell: ({ row }) => (
      <span className='text-muted-foreground text-sm'>{row.original.paymentHistory}</span>
    )
  },
  {
    accessorKey: 'linkedChildren',
    header: 'Enfants lies',
    cell: ({ row }) => (
      <div className='space-y-1'>
        <div className='flex items-center gap-1 font-medium'>
          <CheckCircle2 className='h-4 w-4 text-primary' />
          {row.original.linkedChildren.length} enfant(s)
        </div>
        <div className='text-muted-foreground line-clamp-1 text-xs'>
          {row.original.linkedChildren
            .map((child: { name: string }) => child.name)
            .join(', ')}
        </div>
      </div>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ParentActionsCell parent={row.original} />
  }
];
