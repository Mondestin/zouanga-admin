import PageContainer from '@/components/layout/page-container';
import SubscriptionsPage from '@/features/subscriptions/components/subscriptions-page';

export const metadata = {
  title: 'Tableau de bord : Abonnements'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <SubscriptionsPage />
    </PageContainer>
  );
}
