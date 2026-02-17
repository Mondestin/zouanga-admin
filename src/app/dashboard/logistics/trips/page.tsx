import PageContainer from '@/components/layout/page-container';
import TripsPage from '@/features/logistics/components/trips-page';

export const metadata = {
  title: 'Tableau de bord : Trajets en direct'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <TripsPage />
    </PageContainer>
  );
}
