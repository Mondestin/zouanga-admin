'use client';

import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUsers } from '@/features/users/mock-data';
import { UserStatus, UserRole } from '@/features/users/types';
import { columns } from './user-tables/columns';
import { UserTable } from './user-tables';

export default function UserListingPage() {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');

  const filteredUsers = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return mockUsers.filter((user) => {
      const matchesSearch =
        search.length === 0 ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.phone.toLowerCase().includes(search);

      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [searchValue, statusFilter, roleFilter]);

  return (
    <div className='space-y-4'>
      <UserTable
        data={filteredUsers}
        totalItems={filteredUsers.length}
        columns={columns}
        onSearch={setSearchValue}
        toolbarRightSlot={
          <div className='flex gap-2'>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as 'all' | UserStatus)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filtrer par statut' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tous les statuts</SelectItem>
                <SelectItem value='active'>Actif</SelectItem>
                <SelectItem value='inactive'>Inactif</SelectItem>
                <SelectItem value='suspended'>Suspendu</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={roleFilter}
              onValueChange={(value) => setRoleFilter(value as 'all' | UserRole)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filtrer par role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tous les roles</SelectItem>
                <SelectItem value='Administrateur'>Administrateur</SelectItem>
                <SelectItem value='Moderateur'>Moderateur</SelectItem>
                <SelectItem value='Support'>Support</SelectItem>
                <SelectItem value='Utilisateur'>Utilisateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />
    </div>
  );
}

