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
import { IconTrendingUp, IconAlertTriangle, IconCheck, IconX, IconClock } from '@tabler/icons-react';

export default function IncidentsPage() {
  const openIncidents = 12;
  const criticalIncidents = 5;
  const resolvedToday = 8;
  const avgResolutionTime = '2.5h';

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading
        title='Incidents'
        description='Liste et suivi des incidents.'
      />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconAlertTriangle className='h-4 w-4' />
              Incidents ouverts
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {openIncidents}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                {criticalIncidents} critiques
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Requiert intervention
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconX className='h-4 w-4' />
              Incidents critiques
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {criticalIncidents}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Priorite elevee
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCheck className='h-4 w-4' />
              Resolus aujourd'hui
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {resolvedToday}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Incidents fermes
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconClock className='h-4 w-4' />
              Temps moyen resolution
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {avgResolutionTime}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Performance SLA
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
