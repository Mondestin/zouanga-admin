'use client';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { UserNav } from './user-nav';
import { Button } from '../ui/button';
import { IconBell } from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

export default function Header() {
  return (
    <header className='z-50 h-16 shadow-none'>
      <div className='relative flex h-full items-center gap-3 p-4 sm:gap-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='h-6' />
        <div className='ms-auto flex items-center space-x-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='relative size-8'>
                <IconBell className='h-4 w-4' />
                <span className='bg-destructive absolute top-1.5 right-1.5 h-2 w-2 rounded-full' />
                <span className='sr-only'>Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-80'>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='flex flex-col items-start gap-1 py-2'>
                <span className='font-medium'>Alerte SOS - Itineraire DL-09</span>
                <span className='text-muted-foreground text-xs'>
                  Il y a 3 min - intervention requise.
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className='flex flex-col items-start gap-1 py-2'>
                <span className='font-medium'>KYC chauffeur en attente</span>
                <span className='text-muted-foreground text-xs'>
                  Frantz Moise - verification documents.
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className='flex flex-col items-start gap-1 py-2'>
                <span className='font-medium'>Paiement en retard</span>
                <span className='text-muted-foreground text-xs'>
                  5 comptes parents a relancer.
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Voir toutes les notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
