import { Heading } from '@/components/ui/heading';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconTrendingUp, IconUsers, IconUserCheck, IconUserX } from '@tabler/icons-react';
import UserListingPage from './user-listing';
import { mockUsers } from '../mock-data';

export default function UsersPage() {
  const activeUsers = mockUsers.filter((u) => u.status === 'active').length;
  const inactiveUsers = mockUsers.filter((u) => u.status === 'inactive').length;
  const totalUsers = mockUsers.length;
  const verifiedUsers = mockUsers.filter((u) => u.verified).length;

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
          <CardContent className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 text-muted-foreground'>
              Utilisateurs enregistres
            </div>
          </CardContent>
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
                +0.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 text-muted-foreground'>
              {((activeUsers / totalUsers) * 100).toFixed(1)}% du total
            </div>
          </CardContent>
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
          <CardContent className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 text-muted-foreground'>
              {((inactiveUsers / totalUsers) * 100).toFixed(1)}% du total
            </div>
          </CardContent>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconUsers className='h-4 w-4' />
              Utilisateurs verifies
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {verifiedUsers}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +1.2%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 text-muted-foreground'>
              Comptes verifies
            </div>
          </CardContent>
        </Card>
      </div>
      <UserListingPage />
    </div>
  );
}
