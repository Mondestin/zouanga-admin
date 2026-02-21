import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { DashboardWithInactivityLock } from '@/components/lock-screen/dashboard-with-inactivity-lock';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tableau de bord Zuanga',
  description: 'Tableau de bord d administration Zuanga'
};

export default async function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <DashboardWithInactivityLock userName='Admin User' userRole='Administrateur'>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </DashboardWithInactivityLock>
  );
}
