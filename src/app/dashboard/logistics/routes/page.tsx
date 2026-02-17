import PageContainer from '@/components/layout/page-container';
import RoutesPage from '@/features/logistics/components/routes-page';

export const metadata = {
  title: 'Tableau de bord : Itineraires'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <RoutesPage />
    </PageContainer>
  );
}
