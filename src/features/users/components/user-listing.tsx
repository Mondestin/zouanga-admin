'use client';

import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUsers } from '@/features/users/mock-data';
import { User } from '@/features/users/types';
import { columns } from './user-tables/columns';
import { UserTable } from './user-tables';

export default function UserListingPage() {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');

  const filteredUsers = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return mockUsers.filter((user) => {
      const matchesSearch =
        search.length === 0 ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.phone.toLowerCase().includes(search);

      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchValue, statusFilter]);

  return (
    <div className='space-y-4'>
      <UserTable
        data={filteredUsers}
        totalItems={filteredUsers.length}
        columns={columns}
        onSearch={setSearchValue}
        toolbarRightSlot={
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}
          >
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Filtrer par statut' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tous les statuts</SelectItem>
              <SelectItem value='active'>Actif</SelectItem>
              <SelectItem value='inactive'>Inactif</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}

