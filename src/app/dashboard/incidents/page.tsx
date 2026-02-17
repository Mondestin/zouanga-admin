import PageContainer from '@/components/layout/page-container';
import IncidentsPage from '@/features/safety/components/incidents-page';

export const metadata = {
  title: 'Tableau de bord : Incidents'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <IncidentsPage />
    </PageContainer>
  );
}
