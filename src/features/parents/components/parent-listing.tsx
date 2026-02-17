'use client';

import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockParents } from '@/features/parents/mock-data';
import { ParentAccount } from '../types';
import { columns } from './parent-tables/columns';
import { ParentTable } from './parent-tables';

export default function ParentListingPage() {
  const [searchValue, setSearchValue] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState<
    'all' | ParentAccount['subscriptionStatus']
  >('all');

  const filteredParents = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return mockParents.filter((parent) => {
      const matchesSearch =
        search.length === 0 ||
        parent.name.toLowerCase().includes(search) ||
        parent.email.toLowerCase().includes(search) ||
        parent.phone.toLowerCase().includes(search) ||
        parent.linkedChildren
          .map((child) => child.name)
          .join(' ')
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        subscriptionFilter === 'all' ||
        parent.subscriptionStatus === subscriptionFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchValue, subscriptionFilter]);

  return (
    <div className='space-y-4'>
      <ParentTable
        data={filteredParents}
        totalItems={filteredParents.length}
        columns={columns}
        onSearch={setSearchValue}
        toolbarRightSlot={
          <Select
            value={subscriptionFilter}
            onValueChange={(value) =>
              setSubscriptionFilter(value as 'all' | ParentAccount['subscriptionStatus'])
            }
          >
            <SelectTrigger className='w-[240px]'>
              <SelectValue placeholder='Filtrer par abonnement' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tous les statuts</SelectItem>
              <SelectItem value='Actif'>Actif</SelectItem>
              <SelectItem value='En retard'>En retard</SelectItem>
              <SelectItem value='Suspendu'>Suspendu</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}
