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
import { IconTrendingUp, IconCreditCard, IconCheck, IconAlertTriangle, IconWallet } from '@tabler/icons-react';

export default function PaymentsPage() {
  const totalTransactions = 1248;
  const successfulPayments = 1189;
  const failedPayments = 34;
  const pendingReview = 25;
  const successRate = Math.round((successfulPayments / totalTransactions) * 100);

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading
        title='Paiements'
        description='Liste et suivi des paiements.'
      />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCreditCard className='h-4 w-4' />
              Total transactions
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {totalTransactions.toLocaleString()}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +{Math.round(totalTransactions * 0.15)}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Ce mois-ci
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCheck className='h-4 w-4' />
              Paiements reussis
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {successRate}%
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +2.3%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              {successfulPayments} transactions
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconAlertTriangle className='h-4 w-4' />
              Paiements echoues
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {failedPayments}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Requiert attention
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconWallet className='h-4 w-4' />
              En revue
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {pendingReview}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              En attente de verification
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
