import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const incidentAlerts = [
  {
    name: 'Alerte deviation',
    email: 'Itineraire PV-03',
    avatar: 'https://api.slingacademy.com/public/sample-users/1.png',
    fallback: 'OM',
    amount: 'Critique'
  },
  {
    name: 'Retard de prise en charge',
    email: 'Itineraire HT-01',
    avatar: 'https://api.slingacademy.com/public/sample-users/2.png',
    fallback: 'JL',
    amount: 'Moderee'
  },
  {
    name: 'Signalement parent',
    email: 'Itineraire DL-09',
    avatar: 'https://api.slingacademy.com/public/sample-users/3.png',
    fallback: 'IN',
    amount: 'Moderee'
  },
  {
    name: 'Validation KYC manquante',
    email: 'Chauffeur en attente',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: 'WK',
    amount: 'A traiter'
  },
  {
    name: 'Validation flotte',
    email: 'Documents incomplets',
    avatar: 'https://api.slingacademy.com/public/sample-users/5.png',
    fallback: 'SD',
    amount: 'A traiter'
  }
];

export function RecentSales() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Alertes et validations</CardTitle>
        <CardDescription>
          Incidents critiques et approbations chauffeurs/flottes en attente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {incidentAlerts.map((alert, index) => (
            <div key={index} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={alert.avatar} alt='Avatar' />
                <AvatarFallback>{alert.fallback}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>{alert.name}</p>
                <p className='text-muted-foreground text-sm'>{alert.email}</p>
              </div>
              <div className='ml-auto font-medium'>
                <Badge
                  variant={
                    alert.amount === 'Critique'
                      ? 'destructive'
                      : alert.amount === 'Moderee'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {alert.amount}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
