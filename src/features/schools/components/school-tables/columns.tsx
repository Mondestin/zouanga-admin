'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { School } from '@/features/schools/types';
import { ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, XCircle } from 'lucide-react';
import { IconDotsVertical } from '@tabler/icons-react';
import { toast } from 'sonner';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const SchoolStatusBadge = ({ status }: { status: School['status'] }) => {
  if (status === 'Actif') {
    return (
      <Badge
        className='inline-flex items-center gap-1 border-transparent'
        style={{ backgroundColor: '#043535', color: '#ffffff' }}
      >
        <CheckCircle2 className='h-3 w-3' />
        {status}
      </Badge>
    );
  }
  if (status === 'Integration') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200'>
        <CheckCircle2 className='h-3 w-3' />
        {status}
      </Badge>
    );
  }
  return (
    <Badge className='inline-flex items-center gap-1 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200'>
      <XCircle className='h-3 w-3' />
      {status}
    </Badge>
  );
};

export const columns: ColumnDef<School>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => {
      const initials = getInitials(row.original.name);
      return (
        <span className='relative flex shrink-0 overflow-hidden rounded-full h-8 w-8'>
          <span className='flex h-full w-full items-center justify-center rounded-full bg-muted text-xs'>
            {initials}
          </span>
        </span>
      );
    }
  },
  {
    accessorKey: 'name',
    header: 'Ecole',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='font-medium'>{row.original.name}</span>
        <span className='text-muted-foreground text-xs'>{row.original.address}</span>
      </div>
    )
  },
  {
    accessorKey: 'contactPerson',
    header: 'Contact',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='text-sm'>{row.original.contactPerson}</span>
        <span className='text-muted-foreground text-xs'>{row.original.email}</span>
      </div>
    )
  },
  {
    accessorKey: 'phone',
    header: 'Telephone',
    cell: ({ row }) => <span className='text-sm'>{row.original.phone}</span>
  },
  {
    accessorKey: 'students',
    header: 'Eleves',
    cell: ({ row }) => <span className='text-sm font-medium'>{row.original.students}</span>
  },
  {
    accessorKey: 'pickupPoints',
    header: 'Points de ramassage',
    cell: ({ row }) => <span className='text-sm'>{row.original.pickupPoints}</span>
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => <SchoolStatusBadge status={row.original.status} />
  },
  {
    accessorKey: 'joinedDate',
    header: 'Date d\'adhesion',
    cell: ({ row }) => (
      <span className='text-muted-foreground text-sm'>{row.original.joinedDate}</span>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Ouvrir le menu</span>
              <IconDotsVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() =>
                toast.info(`Voir details de ${row.original.name} (action de demonstration)`)
              }
            >
              <CheckCircle2 className='mr-2 h-4 w-4' />
              Voir details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                toast.info(`Modifier ${row.original.name} (action de demonstration)`)
              }
            >
              <CheckCircle2 className='mr-2 h-4 w-4' />
              Modifier
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
