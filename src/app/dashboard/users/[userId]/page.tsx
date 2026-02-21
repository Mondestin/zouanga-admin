import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import UserDetailsView from '@/features/users/components/user-details-view';
import { mockUsers } from '@/features/users/mock-data';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ userId: string }>;
};

export const metadata = {
  title: 'Tableau de bord : Details utilisateur'
};

export default async function UserDetailsPage(props: PageProps) {
  const { userId } = await props.params;
  const user = mockUsers.find((u) => u.id === parseInt(userId));

  if (!user) {
    notFound();
  }

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Details utilisateur'
          description='Informations completes et gestion du compte utilisateur.'
        />
        <UserDetailsView user={user} />
      </div>
    </PageContainer>
  );
}
