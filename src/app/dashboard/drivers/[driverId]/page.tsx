import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import DriverDetailsView from '@/features/drivers/components/driver-details-view';
import { mockDrivers } from '@/features/drivers/mock-data';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ driverId: string }>;
};

export const metadata = {
  title: 'Tableau de bord : Details chauffeur'
};

export default async function DriverDetailsPage(props: PageProps) {
  const { driverId } = await props.params;
  const driver = mockDrivers.find((d) => d.id === parseInt(driverId));

  if (!driver) {
    notFound();
  }

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Details chauffeur'
          description='Informations completes et gestion du compte chauffeur.'
        />
        <DriverDetailsView driver={driver} />
      </div>
    </PageContainer>
  );
}
