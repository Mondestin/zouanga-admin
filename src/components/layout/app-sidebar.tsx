'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { navItems } from '@/constants/data';
import { Badge } from '@/components/ui/badge';
import { IconChevronsDown, IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';
import Image from 'next/image';

// Mock user data - replace with your own user management
const mockUser = {
  fullName: 'satnaing',
  emailAddresses: [{ emailAddress: 'satnaingdev@gmail.com' }],
  imageUrl: undefined
};

function LogoSection() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size='lg' tooltip={isCollapsed ? 'Zouanga Admin' : undefined}>
          <div className={cn(
            'flex aspect-square items-center justify-center rounded-lg overflow-hidden shrink-0',
            isCollapsed ? 'size-8' : 'size-16'
          )}>
            <Image
              src='/logo.png'
              alt='Zouanga Admin'
              width={isCollapsed ? 32 : 64}
              height={isCollapsed ? 32 : 64}
              className='object-contain'
            />
          </div>
          {!isCollapsed && (
            <div className='flex flex-col text-start leading-tight'>
              <span className='truncate font-semibold text-base'>Zouanga</span>
              <span className='truncate text-xs text-muted-foreground'>Admin</span>
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible='icon'
      variant='floating'
      className='[&_[data-sidebar=sidebar]]:bg-white'
    >
      <SidebarHeader>
        <LogoSection />
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden pt-3'>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              const isItemActive =
                pathname === item.url ||
                (item.url !== '/dashboard/overview' &&
                  pathname.startsWith(`${item.url}/`));
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isItemActive}
                    className={cn(
                      'border-l-2 border-l-transparent rounded-l-md',
                      isItemActive && 'font-semibold'
                    )}
                    style={
                      isItemActive
                        ? {
                            borderLeftColor: '#4bc2b1',
                            backgroundColor: '#043535',
                            color: '#ffffff'
                          }
                        : undefined
                    }
                  >
                    <Link href={item.url}>
                      {item.icon && <Icon />}
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className='ml-auto rounded-full px-1 py-0 text-xs'>
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  <UserAvatarProfile
                    className='h-8 w-8 rounded-lg'
                    showInfo
                    user={mockUser}
                  />
                  <IconChevronsDown className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='px-1 py-1.5'>
                    <UserAvatarProfile
                      className='h-8 w-8 rounded-lg'
                      showInfo
                      user={mockUser}
                    />
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <IconLogout className='mr-2 h-4 w-4' />
                  Se deconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
