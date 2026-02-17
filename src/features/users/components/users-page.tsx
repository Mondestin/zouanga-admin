import { Heading } from '@/components/ui/heading';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconTrendingUp, IconUsers, IconUserCheck, IconUserX } from '@tabler/icons-react';
import UserListingPage from './user-listing';
import { mockUsers } from '../mock-data';

export default function UsersPage() {
  const activeUsers = mockUsers.filter((u) => u.status === 'active').length;
  const inactiveUsers = mockUsers.filter((u) => u.status === 'inactive').length;
  const totalUsers = mockUsers.length;

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading
        title='Utilisateurs'
        description='Liste et suivi des utilisateurs.'
      />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconUsers className='h-4 w-4' />
              Total utilisateurs
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {totalUsers}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +{Math.round(totalUsers * 0.12)}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Utilisateurs enregistres
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconUserCheck className='h-4 w-4' />
              Utilisateurs actifs
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {activeUsers}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +{activeUsers}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              {((activeUsers / totalUsers) * 100).toFixed(1)}% du total
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconUserX className='h-4 w-4' />
              Utilisateurs inactifs
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {inactiveUsers}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              {((inactiveUsers / totalUsers) * 100).toFixed(1)}% du total
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconUsers className='h-4 w-4' />
              Nouveaux ce mois
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {Math.round(totalUsers * 0.08)}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Inscriptions recentes
            </div>
          </CardFooter>
        </Card>
      </div>
      <UserListingPage />
    </div>
  );
}
