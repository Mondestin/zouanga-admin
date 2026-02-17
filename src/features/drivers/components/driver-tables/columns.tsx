'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Driver } from '@/features/drivers/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Star,
  Car
} from 'lucide-react';
import { IconDotsVertical } from '@tabler/icons-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const KYCStatusBadge = ({ status }: { status: Driver['kycStatus'] }) => {
  if (status === 'Approuve') {
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
  if (status === 'En attente') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200'>
        <Clock className='h-3 w-3' />
        {status}
      </Badge>
    );
  }
  if (status === 'Rejete') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent bg-red-100 text-red-700 hover:bg-red-200'>
        <XCircle className='h-3 w-3' />
        {status}
      </Badge>
    );
  }
  return (
    <Badge className='inline-flex items-center gap-1 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200'>
      <AlertTriangle className='h-3 w-3' />
      {status}
    </Badge>
  );
};

const DriverStatusBadge = ({ status }: { status: Driver['driverStatus'] }) => {
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
  if (status === 'Suspendu') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200'>
        <XCircle className='h-3 w-3' />
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

const AvailabilityBadge = ({ status }: { status: Driver['availabilityStatus'] }) => {
  if (status === 'Disponible') {
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
  if (status === 'En trajet') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200'>
        <Car className='h-3 w-3' />
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

export const columns: ColumnDef<Driver>[] = [
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
    header: 'Chauffeur',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='font-medium'>{row.original.name}</span>
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
    accessorKey: 'licenseNumber',
    header: 'Permis',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='text-sm font-medium'>{row.original.licenseNumber}</span>
        <span className='text-muted-foreground text-xs'>
          Expire: {row.original.licenseExpiry}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'kycStatus',
    header: 'Statut KYC',
    cell: ({ row }) => <KYCStatusBadge status={row.original.kycStatus} />
  },
  {
    accessorKey: 'driverStatus',
    header: 'Statut',
    cell: ({ row }) => <DriverStatusBadge status={row.original.driverStatus} />
  },
  {
    accessorKey: 'availabilityStatus',
    header: 'Disponibilite',
    cell: ({ row }) => <AvailabilityBadge status={row.original.availabilityStatus} />
  },
  {
    accessorKey: 'vehiclePlate',
    header: 'Vehicule',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='text-sm font-medium'>{row.original.vehiclePlate}</span>
        <span className='text-muted-foreground text-xs'>ID: {row.original.vehicleId}</span>
      </div>
    )
  },
  {
    accessorKey: 'totalTrips',
    header: 'Trajets',
    cell: ({ row }) => <span className='text-sm'>{row.original.totalTrips}</span>
  },
  {
    accessorKey: 'rating',
    header: 'Note',
    cell: ({ row }) => (
      <div className='flex items-center gap-1'>
        <Star className='h-3.5 w-3.5 fill-yellow-400 text-yellow-400' />
        <span className='text-sm font-medium'>{row.original.rating}</span>
      </div>
    )
  },
  {
    accessorKey: 'lastActive',
    header: 'Derniere activite',
    cell: ({ row }) => (
      <span className='text-muted-foreground text-sm'>{row.original.lastActive}</span>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const router = useRouter();
      const isSuspended = row.original.driverStatus === 'Suspendu';
      const label = isSuspended ? 'Reactiver' : 'Suspendre';

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
                toast.info(`Voir details du chauffeur ${row.original.name} (action de demonstration)`)
              }
            >
              <CheckCircle2 className='mr-2 h-4 w-4' />
              Voir details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                toast.info(`KYC: ${row.original.kycStatus} pour ${row.original.name}`)
              }
            >
              <CheckCircle2 className='mr-2 h-4 w-4' />
              Voir KYC
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                toast.success(
                  `${label} le compte de ${row.original.name} (action de demonstration)`
                )
              }
            >
              <CheckCircle2 className='mr-2 h-4 w-4' />
              {label}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
