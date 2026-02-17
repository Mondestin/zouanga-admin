import PageContainer from '@/components/layout/page-container';
import SchoolsPage from '@/features/schools/components/schools-page';

export const metadata = {
  title: 'Tableau de bord : Ecoles'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <SchoolsPage />
    </PageContainer>
  );
}
