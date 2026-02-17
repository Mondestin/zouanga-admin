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
import { IconTrendingUp, IconRoute, IconMapPin, IconCheck, IconUsers } from '@tabler/icons-react';

const routeHealth = [
  { zone: 'Nord', routes: 14, avgOccupancy: '78%', serviceLevel: 'Bon' },
  { zone: 'Ouest', routes: 10, avgOccupancy: '64%', serviceLevel: 'A equilibrer' },
  { zone: 'Centre', routes: 17, avgOccupancy: '83%', serviceLevel: 'Bon' }
];

export default function RoutesPage() {
  const totalRoutes = routeHealth.reduce((sum, r) => sum + r.routes, 0);
  const avgOccupancy = Math.round(
    routeHealth.reduce((sum, r) => sum + parseInt(r.avgOccupancy), 0) / routeHealth.length
  );
  const goodServiceZones = routeHealth.filter((r) => r.serviceLevel === 'Bon').length;
  const totalZones = routeHealth.length;

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading
        title='Itineraires'
        description='Liste et suivi des itineraires.'
      />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconRoute className='h-4 w-4' />
              Total itineraires
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {totalRoutes}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +{Math.round(totalRoutes * 0.08)}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Itineraires actifs
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconUsers className='h-4 w-4' />
              Occupation moyenne
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {avgOccupancy}%
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Taux d'utilisation
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCheck className='h-4 w-4' />
              Zones optimales
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {goodServiceZones}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Sur {totalZones} zones
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconMapPin className='h-4 w-4' />
              Zones gerees
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {totalZones}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Zones operationnelles
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
