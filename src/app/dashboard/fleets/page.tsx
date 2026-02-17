import PageContainer from '@/components/layout/page-container';
import FleetsPage from '@/features/fleets/components/fleets-page';

export const metadata = {
  title: 'Tableau de bord : Flottes'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <FleetsPage />
    </PageContainer>
  );
}
