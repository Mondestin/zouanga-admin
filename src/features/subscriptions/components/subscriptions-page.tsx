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
import { IconTrendingUp, IconCreditCard, IconCheck, IconAlertTriangle, IconUsers } from '@tabler/icons-react';

const plans = [
  { plan: 'Hebdomadaire', discount: '0%', subscribers: 312, targetMix: '15%' },
  { plan: 'Bi-hebdomadaire', discount: '5%', subscribers: 498, targetMix: '25%' },
  { plan: 'Mensuel', discount: '10%', subscribers: 1211, targetMix: '60%' }
];

export default function SubscriptionsPage() {
  const totalSubscribers = plans.reduce((sum, p) => sum + p.subscribers, 0);
  const successfulRenewals = 92.4;
  const failedPayments = 4.1;
  const manualRecovery = 37;

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading
        title='Abonnements'
        description='Liste et suivi des abonnements.'
      />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconUsers className='h-4 w-4' />
              Total abonnes
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {totalSubscribers.toLocaleString()}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +{Math.round(totalSubscribers * 0.08)}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Abonnements actifs
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCheck className='h-4 w-4' />
              Renouvellements reussis
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {successfulRenewals}%
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +2.1%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Sur les 7 derniers jours
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconAlertTriangle className='h-4 w-4' />
              Autopaiements echoues
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {failedPayments}%
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Sur les 7 derniers jours
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCreditCard className='h-4 w-4' />
              Recouvrement manuel
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {manualRecovery}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Comptes en retard
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
