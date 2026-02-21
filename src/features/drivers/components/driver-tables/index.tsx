'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ReusableTableWrapper } from '@/components/ui/table/reusable-table-wrapper';
import type { ReactNode } from 'react';

interface DriverTableProps<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
  onSearch: (value: string) => void;
  toolbarRightSlot?: ReactNode;
}

export function DriverTable<TData, TValue>({
  data,
  totalItems,
  columns,
  onSearch,
  toolbarRightSlot
}: DriverTableProps<TData, TValue>) {
  return (
    <ReusableTableWrapper
      data={data}
      totalItems={totalItems}
      columns={columns}
      defaultPageSize={20}
      searchPlaceholder='Rechercher un chauffeur...'
      exportButtonText='Exporter les chauffeurs'
      exportButtonColor='#043535'
      onSearch={onSearch}
      toolbarRightSlot={toolbarRightSlot}
      paginationText={{
        showing: 'Montrant',
        to: 'a',
        of: 'sur',
        results: 'resultats'
      }}
    />
  );
}
