'use client';

import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockDrivers } from '@/features/drivers/mock-data';
import { Driver } from '../types';
import { columns } from './driver-tables/columns';
import { DriverTable } from './driver-tables';

export default function DriverListingPage() {
  const [searchValue, setSearchValue] = useState('');
  const [kycFilter, setKycFilter] = useState<'all' | Driver['kycStatus']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Driver['driverStatus']>('all');

  const filteredDrivers = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return mockDrivers.filter((driver) => {
      const matchesSearch =
        search.length === 0 ||
        driver.name.toLowerCase().includes(search) ||
        driver.email.toLowerCase().includes(search) ||
        driver.phone.toLowerCase().includes(search) ||
        driver.licenseNumber.toLowerCase().includes(search) ||
        driver.vehiclePlate.toLowerCase().includes(search);

      const matchesKYC = kycFilter === 'all' || driver.kycStatus === kycFilter;
      const matchesStatus = statusFilter === 'all' || driver.driverStatus === statusFilter;

      return matchesSearch && matchesKYC && matchesStatus;
    });
  }, [searchValue, kycFilter, statusFilter]);

  return (
    <div className='space-y-4'>
      <DriverTable
        data={filteredDrivers}
        totalItems={filteredDrivers.length}
        columns={columns}
        onSearch={setSearchValue}
        toolbarRightSlot={
          <div className='flex gap-2'>
            <Select value={kycFilter} onValueChange={(value) => setKycFilter(value as typeof kycFilter)}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Filtrer par KYC' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tous les KYC</SelectItem>
                <SelectItem value='Approuve'>Approuve</SelectItem>
                <SelectItem value='En attente'>En attente</SelectItem>
                <SelectItem value='Rejete'>Rejete</SelectItem>
                <SelectItem value='Expire'>Expire</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value='Inactif'>Inactif</SelectItem>
                <SelectItem value='Suspendu'>Suspendu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />
    </div>
  );
}
