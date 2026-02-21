'use client';

import { Heading } from '@/components/ui/heading';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconUsers, IconCreditCard, IconCircleCheck, IconAlertTriangle, IconTrendingUp } from '@tabler/icons-react';
import ParentListingPage from './parent-listing';
import { mockParents } from '../mock-data';

export default function ParentsPage() {
  const totalParents = mockParents.length;
  const activeSubscriptions = mockParents.filter((p) => p.subscriptionStatus === 'Actif').length;
  const overdueSubscriptions = mockParents.filter((p) => p.subscriptionStatus === 'En retard').length;
  const verifiedParents = mockParents.filter((p) => p.verified).length;

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading
        title='Parents'
        description='Liste et suivi des comptes parents.'
      />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconUsers className='h-4 w-4' />
              Total parents
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {totalParents}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +2.1%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 text-muted-foreground'>
              Comptes enregistres
            </div>
          </CardContent>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCircleCheck className='h-4 w-4' />
              Abonnements actifs
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {activeSubscriptions}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +1.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 text-muted-foreground'>
              {((activeSubscriptions / totalParents) * 100).toFixed(1)}% du total
            </div>
          </CardContent>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconAlertTriangle className='h-4 w-4' />
              En retard
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {overdueSubscriptions}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 text-muted-foreground'>
              Requiert une action
            </div>
          </CardContent>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCreditCard className='h-4 w-4' />
              Parents verifies
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {verifiedParents}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                {((verifiedParents / totalParents) * 100).toFixed(0)}%
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
      <ParentListingPage />
    </div>
  );
}
