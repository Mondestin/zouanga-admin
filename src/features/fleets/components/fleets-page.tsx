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
import { IconTrendingUp, IconBus, IconCar, IconAlertTriangle, IconCheck } from '@tabler/icons-react';
import FleetListingPage from './fleet-listing';
import { mockFleets } from '../mock-data';

export default function FleetsPage() {
  const healthyFleets = mockFleets.filter((f) => f.status === 'Saine').length;
  const totalVehicles = mockFleets.reduce((sum, f) => sum + f.vehicles, 0);
  const avgOccupancy = Math.round(
    mockFleets.reduce((sum, f) => sum + parseInt(f.occupancy), 0) / mockFleets.length
  );
  const surveillanceFleets = mockFleets.filter((f) => f.status === 'Surveillance').length;

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading
        title='Flottes'
        description='Liste et suivi des flottes partenaires.'
      />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconBus className='h-4 w-4' />
              Flottes actives
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {mockFleets.length}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +{healthyFleets}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Flottes partenaires
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCar className='h-4 w-4' />
              Total vehicules
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {totalVehicles}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +{Math.round(totalVehicles * 0.12)}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Vehicules disponibles
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCheck className='h-4 w-4' />
              Occupation moyenne
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {avgOccupancy}%
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Taux d&apos;utilisation
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconAlertTriangle className='h-4 w-4' />
              En surveillance
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {surveillanceFleets}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Requiert attention
            </div>
          </CardFooter>
        </Card>
      </div>
      <FleetListingPage />
    </div>
  );
}
