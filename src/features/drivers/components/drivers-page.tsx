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
import { IconTrendingUp, IconUsers, IconShieldCheck, IconClock, IconAlertTriangle } from '@tabler/icons-react';
import DriverListingPage from './driver-listing';
import { mockDrivers } from '../mock-data';

export default function DriversPage() {
  const activeDrivers = mockDrivers.filter((d) => d.driverStatus === 'Actif').length;
  const pendingKYC = mockDrivers.filter((d) => d.kycStatus === 'En attente').length;
  const expiringSoon = mockDrivers.filter((d) => {
    const expiryDate = new Date(d.licenseExpiry.split('/').reverse().join('-'));
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  }).length;
  const rejectedKYC = mockDrivers.filter((d) => d.kycStatus === 'Rejete' || d.kycStatus === 'Expire').length;

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading
        title='Chauffeurs'
        description='Liste et suivi des chauffeurs.'
      />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconUsers className='h-4 w-4' />
              Chauffeurs actifs
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {activeDrivers}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                +{activeDrivers}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Sur {mockDrivers.length} chauffeurs total
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconShieldCheck className='h-4 w-4' />
              KYC en attente
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {pendingKYC}
            </CardTitle>
            <CardAction>
              <Badge variant='outline'>
                <IconTrendingUp />
                {pendingKYC}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Requiert une action
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconClock className='h-4 w-4' />
              Permis expirant bientot
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {expiringSoon}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Dans les 30 prochains jours
            </div>
          </CardFooter>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <CardDescription className='flex items-center gap-2'>
              <IconAlertTriangle className='h-4 w-4' />
              KYC rejetes/expires
            </CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {rejectedKYC}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Action requise
            </div>
          </CardFooter>
        </Card>
      </div>
      <DriverListingPage />
    </div>
  );
}
