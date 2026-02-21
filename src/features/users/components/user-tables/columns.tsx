'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User } from '@/features/users/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  CheckCircle2,
  XCircle,
  PauseCircle,
  BadgeCheck,
  Shield,
  UserCog,
  HeadphonesIcon,
  User as UserIcon
} from 'lucide-react';
import { IconDotsVertical } from '@tabler/icons-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function UserActionsCell({ user }: { user: User }) {
  const router = useRouter();
  const isSuspended = user.status === 'suspended';
  const isInactive = user.status === 'inactive';
  const label = isSuspended ? 'Reactiver' : isInactive ? 'Activer' : 'Suspendre';
  const Icon = isSuspended || isInactive ? CheckCircle2 : PauseCircle;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Ouvrir le menu</span>
          <IconDotsVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => router.push(`/dashboard/users/${user.id}`)}>
          <CheckCircle2 className='mr-2 h-4 w-4' />
          Voir details utilisateur
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toast.success(`${label} le compte de ${user.name} (action de demonstration)`)
          }
        >
          <Icon className='mr-2 h-4 w-4' />
          {label}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info(`Modifier utilisateur ${user.name}`)}>
          <UserIcon className='mr-2 h-4 w-4' />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toast.error(`Supprimer utilisateur ${user.name} (action de demonstration)`)
          }
          className='text-destructive focus:text-destructive'
        >
          <XCircle className='mr-2 h-4 w-4' />
          Supprimer
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

const StatusBadge = ({ status }: { status: User['status'] }) => {
  if (status === 'active') {
    return (
      <Badge
        className='inline-flex items-center gap-1 border-transparent'
        style={{ backgroundColor: '#043535', color: '#ffffff' }}
      >
        <CheckCircle2 className='h-3 w-3' />
        Actif
      </Badge>
    );
  }
  if (status === 'suspended') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200'>
        <PauseCircle className='h-3 w-3' />
        Suspendu
      </Badge>
    );
  }
  return (
    <Badge className='inline-flex items-center gap-1 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200'>
      <XCircle className='h-3 w-3' />
      Inactif
    </Badge>
  );
};

const RoleBadge = ({ role }: { role: User['role'] }) => {
  const roleConfig = {
    Administrateur: { icon: Shield, color: 'bg-purple-100 text-purple-700' },
    Moderateur: { icon: UserCog, color: 'bg-blue-100 text-blue-700' },
    Support: { icon: HeadphonesIcon, color: 'bg-green-100 text-green-700' },
    Utilisateur: { icon: UserIcon, color: 'bg-gray-100 text-gray-700' }
  };

  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <Badge className={`inline-flex items-center gap-1 border-transparent ${config.color}`}>
      <Icon className='h-3 w-3' />
      {role}
    </Badge>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => {
      const initials = getInitials(row.original.name);
      return (
        <span className='relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full'>
          <span className='flex h-full w-full items-center justify-center rounded-full bg-muted text-xs'>
            {initials}
          </span>
        </span>
      );
    }
  },
  {
    accessorKey: 'name',
    header: 'Utilisateur',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Link
          href={`/dashboard/users/${row.original.id}`}
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
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='font-medium'>{row.original.email}</span>
        <span className='text-muted-foreground text-xs'>{row.original.phone}</span>
      </div>
    )
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <RoleBadge role={row.original.role} />
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => <StatusBadge status={row.original.status} />
  },
  {
    accessorKey: 'lastLogin',
    header: 'Derniere connexion',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='text-sm'>{row.original.lastLogin}</span>
        <span className='text-muted-foreground text-xs'>
          {row.original.loginCount} connexions
        </span>
      </div>
    )
  },
  {
    accessorKey: 'registrationDate',
    header: "Date d'inscription",
    cell: ({ row }) => (
      <span className='text-muted-foreground text-sm'>{row.original.registrationDate}</span>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <UserActionsCell user={row.original} />
  }
];

