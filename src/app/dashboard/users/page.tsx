import PageContainer from '@/components/layout/page-container';
import UsersPage from '@/features/users/components/users-page';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { Suspense } from 'react';

export const metadata = {
  title: 'Tableau de bord : Utilisateurs'
};

export default async function Page() {
  return (
    <PageContainer scrollable={false}>
      <Suspense
        fallback={
          <DataTableSkeleton columnCount={7} rowCount={10} filterCount={0} />
        }
      >
        <UsersPage />
      </Suspense>
    </PageContainer>
  );
}
