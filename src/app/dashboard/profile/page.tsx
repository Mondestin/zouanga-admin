import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import ProfileView from '@/features/profile/components/profile-view';

export const metadata = {
  title: 'Tableau de bord : Mon profil'
};

export default function ProfilePage() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Mon profil'
          description='Gerez vos informations personnelles et vos parametres de compte.'
        />
        <ProfileView />
      </div>
    </PageContainer>
  );
}
