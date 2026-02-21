'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { useRouter } from 'next/navigation';
import { IconUser, IconSettings, IconCreditCard, IconLogout } from '@tabler/icons-react';

// Mock user data - replace with your own user management
const mockUser = {
  fullName: 'Admin User',
  emailAddresses: [{ emailAddress: 'admin@zouanga.com' }],
  imageUrl: undefined
};

export function UserNav() {
  const router = useRouter();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <UserAvatarProfile user={mockUser} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>
              {mockUser.fullName}
            </p>
            <p className='text-muted-foreground text-xs leading-none'>
              {mockUser.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
            <IconUser className='mr-2 h-4 w-4' />
            Mon profil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile/settings')}>
            <IconSettings className='mr-2 h-4 w-4' />
            Parametres
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile/billing')}>
            <IconCreditCard className='mr-2 h-4 w-4' />
            Facturation
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/login')}>
          <IconLogout className='mr-2 h-4 w-4' />
          Se deconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
