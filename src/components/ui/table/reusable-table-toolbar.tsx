'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconSearch, IconDownload } from '@tabler/icons-react';
import type { Table } from '@tanstack/react-table';
import { useState, type ReactNode } from 'react';

interface ReusableTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  exportButtonText?: string;
  exportButtonColor?: string;
  onSearch?: (value: string) => void;
  onExport?: () => void;
  rightSlot?: ReactNode;
}

export function ReusableTableToolbar<TData>({
  table,
  searchPlaceholder = 'Rechercher...',
  exportButtonText = 'Exporter ce tableau',
  exportButtonColor = '#01631b',
  onSearch,
  onExport,
  rightSlot
}: ReusableTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = useState('');
  void table; // required by interface for API compatibility

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
    // Default search behavior can be added here
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <div className='relative max-w-sm flex-1'>
        <IconSearch className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className='pl-8'
        />
      </div>
      {rightSlot}
      <div className='flex gap-2 ml-auto'>
        <Button
          onClick={handleExport}
          className='text-white mr-4'
          style={{
            backgroundColor: exportButtonColor
          }}
          onMouseEnter={(e) => {
            if (exportButtonColor) {
              e.currentTarget.style.backgroundColor = `${exportButtonColor}90`;
            }
          }}
          onMouseLeave={(e) => {
            if (exportButtonColor) {
              e.currentTarget.style.backgroundColor = exportButtonColor;
            }
          }}
        >
          <IconDownload className='h-4 w-4 mr-2' />
          {exportButtonText}
        </Button>
      </div>
    </div>
  );
}

