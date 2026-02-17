'use client';

import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockFleets } from '@/features/fleets/mock-data';
import { Fleet } from '../types';
import { columns } from './fleet-tables/columns';
import { FleetTable } from './fleet-tables';

export default function FleetListingPage() {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Fleet['status']>('all');

  const filteredFleets = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return mockFleets.filter((fleet) => {
      const matchesSearch =
        search.length === 0 ||
        fleet.name.toLowerCase().includes(search) ||
        fleet.contactPerson.toLowerCase().includes(search) ||
        fleet.email.toLowerCase().includes(search);

      const matchesStatus = statusFilter === 'all' || fleet.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchValue, statusFilter]);

  return (
    <div className='space-y-4'>
      <FleetTable
        data={filteredFleets}
        totalItems={filteredFleets.length}
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
              <SelectItem value='Saine'>Saine</SelectItem>
              <SelectItem value='Surveillance'>Surveillance</SelectItem>
              <SelectItem value='Sous-utilisee'>Sous-utilisee</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}
