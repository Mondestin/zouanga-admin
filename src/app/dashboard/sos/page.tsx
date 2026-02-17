import PageContainer from '@/components/layout/page-container';
import SosPage from '@/features/safety/components/sos-page';

export const metadata = {
  title: 'Tableau de bord : Journaux SOS'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <SosPage />
    </PageContainer>
  );
}
