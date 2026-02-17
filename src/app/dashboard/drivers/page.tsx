import PageContainer from '@/components/layout/page-container';
import DriversPage from '@/features/drivers/components/drivers-page';

export const metadata = {
  title: 'Tableau de bord : Chauffeurs'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <DriversPage />
    </PageContainer>
  );
}
