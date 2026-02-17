import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { IconTrendingUp } from '@tabler/icons-react';
import {
  BadgeCheck,
  Bus,
  Car,
  CreditCard,
  Route,
  TriangleAlert,
  Users,
  Wallet
} from 'lucide-react';
import { PieGraph } from '@/features/overview/components/pie-graph';
import React from 'react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Tableau de bord</h1>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <CreditCard className='h-4 w-4' />
                Abonnements actifs
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                2,350
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +12.4%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-2 text-muted-foreground'>
                Hebdo : 15% | Bi-hebdo : 25% | Mensuel : 60%
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <Wallet className='h-4 w-4' />
                MRR
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                $45,231.89
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +20.1%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                +20.1% par rapport au mois dernier <IconTrendingUp className='size-4' />
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <Users className='h-4 w-4' />
                Total eleves actifs
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                12,234
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +6.8%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Evolution stable sur 30 jours <IconTrendingUp className='size-4' />
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <Car className='h-4 w-4' />
                Chauffeurs actifs
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                124
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +7
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Disponibilite temps reel operationnelle
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <Bus className='h-4 w-4' />
                Taux d utilisation flotte
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                81%
              </CardTitle>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Objectif minimum : 75%
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <Route className='h-4 w-4' />
                Volume de trajets (jour)
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                468
              </CardTitle>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>+9.2% par rapport a hier</div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <TriangleAlert className='h-4 w-4' />
                Alertes incidents
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                6
              </CardTitle>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>2 critiques | 4 moderees</div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-2'>
                <BadgeCheck className='h-4 w-4' />
                Approbations en attente
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                14
              </CardTitle>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>Chauffeurs : 11 | Flottes : 3</div>
            </CardFooter>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <div>{bar_stats}</div>
          <div>{area_stats}</div>
        </div>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
          <div className='lg:col-span-4'>
            <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
              <div>{pie_stats}</div>
              <div>
                <PieGraph />
              </div>
            </div>
          </div>
          <div className='lg:col-span-3'>
            {/* alertes incidents et validations en attente */}
            {sales}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
