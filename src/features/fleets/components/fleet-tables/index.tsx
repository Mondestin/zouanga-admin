'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ReusableTableWrapper } from '@/components/ui/table/reusable-table-wrapper';
import type { ReactNode } from 'react';

interface FleetTableProps<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
  onSearch: (value: string) => void;
  toolbarRightSlot?: ReactNode;
}

export function FleetTable<TData, TValue>({
  data,
  totalItems,
  columns,
  onSearch,
  toolbarRightSlot
}: FleetTableProps<TData, TValue>) {
  return (
    <ReusableTableWrapper
      data={data}
      totalItems={totalItems}
      columns={columns}
      defaultPageSize={20}
      searchPlaceholder='Rechercher une flotte...'
      exportButtonText='Exporter les flottes'
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
