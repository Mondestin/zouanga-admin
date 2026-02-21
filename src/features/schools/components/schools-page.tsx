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
import { IconTrendingUp, IconSchool, IconUsers, IconMapPin, IconCheck } from '@tabler/icons-react';
import SchoolListingPage from './school-listing';
import { mockSchools } from '../mock-data';

export default function SchoolsPage() {
  const activeSchools = mockSchools.filter((s) => s.status === 'Actif').length;
  const totalStudents = mockSchools.reduce((sum, s) => sum + s.students, 0);
  const totalPickupPoints = mockSchools.reduce((sum, s) => sum + s.pickupPoints, 0);
  const integrationSchools = mockSchools.filter((s) => s.status === 'Integration').length;

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading
        title='Ecoles'
        description='Liste et suivi des ecoles partenaires.'
      />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconSchool className='h-4 w-4' />
              Ecoles actives
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {activeSchools}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +{activeSchools}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Sur {mockSchools.length} ecoles total
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconUsers className='h-4 w-4' />
              Total eleves
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {totalStudents.toLocaleString()}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +{Math.round(totalStudents * 0.15)}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Eleves inscrits
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconMapPin className='h-4 w-4' />
              Points de ramassage
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {totalPickupPoints}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Points actifs
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconCheck className='h-4 w-4' />
              En integration
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {integrationSchools}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              En cours d&apos;integration
            </div>
          </CardFooter>
        </Card>
      </div>
      <SchoolListingPage />
    </div>
  );
}
