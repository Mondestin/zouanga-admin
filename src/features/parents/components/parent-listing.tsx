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
  const [planFilter, setPlanFilter] = useState<'all' | ParentAccount['subscriptionPlan']>('all');
  const [accountStatusFilter, setAccountStatusFilter] = useState<
    'all' | ParentAccount['accountStatus']
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

      const matchesPlan = planFilter === 'all' || parent.subscriptionPlan === planFilter;

      const matchesAccountStatus =
        accountStatusFilter === 'all' || parent.accountStatus === accountStatusFilter;

      return matchesSearch && matchesStatus && matchesPlan && matchesAccountStatus;
    });
  }, [searchValue, subscriptionFilter, planFilter, accountStatusFilter]);

  return (
    <div className='space-y-4'>
      <ParentTable
        data={filteredParents}
        totalItems={filteredParents.length}
        columns={columns}
        onSearch={setSearchValue}
        toolbarRightSlot={
          <div className='flex gap-2'>
            <Select
              value={subscriptionFilter}
              onValueChange={(value) =>
                setSubscriptionFilter(value as 'all' | ParentAccount['subscriptionStatus'])
              }
            >
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Statut abonnement' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tous les statuts</SelectItem>
                <SelectItem value='Actif'>Actif</SelectItem>
                <SelectItem value='En retard'>En retard</SelectItem>
                <SelectItem value='Suspendu'>Suspendu</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={planFilter}
              onValueChange={(value) =>
                setPlanFilter(value as 'all' | ParentAccount['subscriptionPlan'])
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Type abonnement' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tous les plans</SelectItem>
                <SelectItem value='Weekly'>Weekly</SelectItem>
                <SelectItem value='Bi-Weekly'>Bi-Weekly</SelectItem>
                <SelectItem value='Monthly'>Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={accountStatusFilter}
              onValueChange={(value) =>
                setAccountStatusFilter(value as 'all' | ParentAccount['accountStatus'])
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Statut compte' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tous les comptes</SelectItem>
                <SelectItem value='Actif'>Actif</SelectItem>
                <SelectItem value='Suspendu'>Suspendu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />
    </div>
  );
}
