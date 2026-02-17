import PageContainer from '@/components/layout/page-container';
import PaymentsPage from '@/features/payments/components/payments-page';

export const metadata = {
  title: 'Tableau de bord : Paiements'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <PaymentsPage />
    </PageContainer>
  );
}
