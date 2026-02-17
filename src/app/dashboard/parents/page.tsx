import PageContainer from '@/components/layout/page-container';
import ParentsPage from '@/features/parents/components/parents-page';

export const metadata = {
  title: 'Tableau de bord : Parents'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <ParentsPage />
    </PageContainer>
  );
}
