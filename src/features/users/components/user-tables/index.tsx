'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ReusableTableWrapper } from '@/components/ui/table/reusable-table-wrapper';
import type { ReactNode } from 'react';

interface UserTableParams<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
  onSearch: (value: string) => void;
  toolbarRightSlot?: ReactNode;
}

export function UserTable<TData, TValue>({
  data,
  totalItems,
  columns,
  onSearch,
  toolbarRightSlot
}: UserTableParams<TData, TValue>) {
  return (
    <ReusableTableWrapper
      data={data}
      totalItems={totalItems}
      columns={columns}
      defaultPageSize={20}
      searchPlaceholder='Rechercher un utilisateur...'
      exportButtonText='Exporter les utilisateurs'
      exportButtonColor='#01631b'
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
