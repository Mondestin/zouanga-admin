'use client';

import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockSchools } from '@/features/schools/mock-data';
import { School } from '../types';
import { columns } from './school-tables/columns';
import { SchoolTable } from './school-tables';

export default function SchoolListingPage() {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | School['status']>('all');

  const filteredSchools = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return mockSchools.filter((school) => {
      const matchesSearch =
        search.length === 0 ||
        school.name.toLowerCase().includes(search) ||
        school.address.toLowerCase().includes(search) ||
        school.contactPerson.toLowerCase().includes(search) ||
        school.email.toLowerCase().includes(search);

      const matchesStatus = statusFilter === 'all' || school.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchValue, statusFilter]);

  return (
    <div className='space-y-4'>
      <SchoolTable
        data={filteredSchools}
        totalItems={filteredSchools.length}
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
              <SelectItem value='Actif'>Actif</SelectItem>
              <SelectItem value='Integration'>Integration</SelectItem>
              <SelectItem value='Suspendu'>Suspendu</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}
