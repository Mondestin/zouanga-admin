'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import type { Driver, DriverHistoryRecord, DriverTrip } from '../types';
import ConfirmationDialog from '@/components/ui/confirmation-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  Car,
  CheckCircle2,
  Clock3,
  FileBadge2,
  MapPinned,
  ShieldCheck,
  Star,
  UserCircle2,
  XCircle
} from 'lucide-react';

const PAGE_SIZE = 5;

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const parseFare = (fare: string) => {
  const numeric = Number.parseFloat(fare.replace(',', '.').replace(/[^\d.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
};

const statusPrimary = { backgroundColor: '#043535', color: '#ffffff' };

const DriverStatusBadge = ({ status }: { status: Driver['driverStatus'] }) => {
  if (status === 'Actif') {
    return (
      <Badge className='border-transparent' style={statusPrimary}>
        Actif
      </Badge>
    );
  }

  if (status === 'Suspendu') {
    return <Badge className='border-transparent bg-gray-100 text-gray-700'>Suspendu</Badge>;
  }

  return <Badge className='border-transparent bg-gray-100 text-gray-700'>Inactif</Badge>;
};

const KycBadge = ({ status }: { status: Driver['kycStatus'] }) => {
  if (status === 'Approuve') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent' style={statusPrimary}>
        <CheckCircle2 className='h-3 w-3' />
        Approuve
      </Badge>
    );
  }

  if (status === 'En attente') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent bg-amber-100 text-amber-700'>
        <Clock3 className='h-3 w-3' />
        En attente
      </Badge>
    );
  }

  if (status === 'Rejete') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent bg-red-100 text-red-700'>
        <XCircle className='h-3 w-3' />
        Rejete
      </Badge>
    );
  }

  return <Badge className='border-transparent bg-gray-100 text-gray-700'>Expire</Badge>;
};

const AvailabilityBadge = ({ status }: { status: Driver['availabilityStatus'] }) => {
  if (status === 'Disponible') {
    return (
      <Badge className='border-transparent' style={statusPrimary}>
        Disponible
      </Badge>
    );
  }

  if (status === 'En trajet') {
    return <Badge className='border-transparent bg-blue-100 text-blue-700'>En trajet</Badge>;
  }

  return <Badge className='border-transparent bg-gray-100 text-gray-700'>Hors ligne</Badge>;
};

const HistoryStatusBadge = ({ status }: { status: DriverHistoryRecord['status'] }) => {
  if (status === 'Reussi') {
    return (
      <Badge className='border-transparent text-xs' style={statusPrimary}>
        Reussi
      </Badge>
    );
  }
  if (status === 'Echoue') {
    return <Badge className='border-transparent bg-red-100 text-red-700 text-xs'>Echoue</Badge>;
  }
  return <Badge className='border-transparent bg-amber-100 text-amber-700 text-xs'>En attente</Badge>;
};

const TripStatusBadge = ({ status }: { status: DriverTrip['status'] }) => {
  if (status === 'Complete') {
    return (
      <Badge className='border-transparent text-xs' style={statusPrimary}>
        Complete
      </Badge>
    );
  }
  if (status === 'En cours') {
    return <Badge className='border-transparent bg-blue-100 text-blue-700 text-xs'>En cours</Badge>;
  }
  return <Badge className='border-transparent bg-red-100 text-red-700 text-xs'>Annule</Badge>;
};

const makeFallbackHistory = (driver: Driver): DriverHistoryRecord[] => [
  {
    id: `hist-${driver.id}-1`,
    action: 'Chauffeur enregistre',
    date: driver.joinedDate,
    time: '09:10',
    performedBy: 'Systeme',
    status: 'Reussi'
  },
  {
    id: `hist-${driver.id}-2`,
    action: 'KYC soumis',
    date: '10/03/2025',
    time: '11:42',
    performedBy: driver.name,
    status: 'Reussi'
  },
  {
    id: `hist-${driver.id}-3`,
    action: driver.kycStatus === 'Approuve' ? 'KYC approuve' : 'KYC rejete',
    date: '12/03/2025',
    time: '14:05',
    performedBy: 'Equipe KYC',
    details: 'Verification des documents',
    status: driver.kycStatus === 'Rejete' ? 'Echoue' : 'Reussi'
  },
  {
    id: `hist-${driver.id}-4`,
    action: 'Vehicule assigne',
    date: '13/03/2025',
    time: '09:25',
    performedBy: 'Operations',
    details: `${driver.vehiclePlate} (${driver.vehicleId})`,
    status: 'Reussi'
  },
  {
    id: `hist-${driver.id}-5`,
    action: 'Permis verifie',
    date: '16/03/2025',
    time: '15:31',
    performedBy: 'Conformite',
    status: 'Reussi'
  },
  {
    id: `hist-${driver.id}-6`,
    action: 'Trajet complete',
    date: '20/03/2025',
    time: '17:48',
    performedBy: driver.name,
    details: 'Trajet termine sans incident',
    status: 'Reussi'
  }
];

const makeFallbackTrips = (driver: Driver): DriverTrip[] => [
  {
    id: `trip-${driver.id}-1`,
    date: '20/05/2025',
    time: '07:40',
    from: 'Petion-Ville',
    to: 'Delmas 32',
    passengers: 12,
    status: 'Complete',
    rating: 5,
    fare: '$45.00'
  },
  {
    id: `trip-${driver.id}-2`,
    date: '20/05/2025',
    time: '11:20',
    from: 'Delmas 60',
    to: 'Carrefour',
    passengers: 10,
    status: 'Complete',
    rating: 4.8,
    fare: '$38.00'
  },
  {
    id: `trip-${driver.id}-3`,
    date: '21/05/2025',
    time: '08:05',
    from: 'Tabarre',
    to: 'Pelerin',
    passengers: 8,
    status: 'En cours',
    fare: '$27.50'
  },
  {
    id: `trip-${driver.id}-4`,
    date: '21/05/2025',
    time: '15:15',
    from: 'Canape-Vert',
    to: 'Croix-des-Bouquets',
    passengers: 6,
    status: 'Annule',
    fare: '$0.00'
  },
  {
    id: `trip-${driver.id}-5`,
    date: '22/05/2025',
    time: '06:55',
    from: 'Carrefour-Feuilles',
    to: 'Delmas 19',
    passengers: 11,
    status: 'Complete',
    rating: 4.9,
    fare: '$42.00'
  },
  {
    id: `trip-${driver.id}-6`,
    date: '22/05/2025',
    time: '12:10',
    from: 'Petion-Ville',
    to: 'Tabarre',
    passengers: 9,
    status: 'Complete',
    rating: 4.7,
    fare: '$34.00'
  }
];

export default function DriverDetailsView({ driver }: { driver: Driver }) {
  const [driverStatus, setDriverStatus] = useState<Driver['driverStatus']>(driver.driverStatus);
  const [kycStatus, setKycStatus] = useState<Driver['kycStatus']>(driver.kycStatus);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isKycDialogOpen, setIsKycDialogOpen] = useState(false);
  const [tripPage, setTripPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);

  const initials = getInitials(driver.name);
  const trips = driver.trips && driver.trips.length > 0 ? driver.trips : makeFallbackTrips(driver);
  const history =
    driver.history && driver.history.length > 0
      ? driver.history
      : makeFallbackHistory(driver);

  const tripPageCount = Math.max(1, Math.ceil(trips.length / PAGE_SIZE));
  const historyPageCount = Math.max(1, Math.ceil(history.length / PAGE_SIZE));

  const visibleTrips = useMemo(() => {
    const start = (tripPage - 1) * PAGE_SIZE;
    return trips.slice(start, start + PAGE_SIZE);
  }, [trips, tripPage]);

  const visibleHistory = useMemo(() => {
    const start = (historyPage - 1) * PAGE_SIZE;
    return history.slice(start, start + PAGE_SIZE);
  }, [history, historyPage]);

  const completedTrips = trips.filter((item) => item.status === 'Complete').length;
  const completionRate = trips.length > 0 ? Math.round((completedTrips / trips.length) * 100) : 0;
  const totalRevenue = trips.reduce((acc, item) => acc + parseFare(item.fare), 0);
  const averageTripFare = trips.length > 0 ? totalRevenue / trips.length : 0;
  const averageRating =
    trips.filter((item) => item.rating).length > 0
      ? (
          trips.reduce((acc, item) => acc + (item.rating ?? 0), 0) /
          trips.filter((item) => item.rating).length
        ).toFixed(1)
      : driver.rating.toFixed(1);

  const handleStatusChange = () => {
    const nextStatus: Driver['driverStatus'] =
      driverStatus === 'Actif' ? 'Suspendu' : 'Actif';
    setDriverStatus(nextStatus);
    toast.success(`Statut du chauffeur mis a jour: ${nextStatus}`);
    setIsStatusDialogOpen(false);
  };

  const handleKycApprove = () => {
    setKycStatus('Approuve');
    toast.success('KYC approuve avec succes');
    setIsKycDialogOpen(false);
  };

  return (
    <div className='flex flex-1 flex-col space-y-6'>
      <div className='flex items-center justify-between'>
        <Button asChild variant='ghost' size='sm'>
          <Link href='/dashboard/drivers'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Retour
          </Link>
        </Button>

        <div className='flex items-center gap-2'>
          {kycStatus !== 'Approuve' && (
            <Button size='sm' onClick={() => setIsKycDialogOpen(true)}>
              Approuver KYC
            </Button>
          )}
          <Button
            size='sm'
            variant={driverStatus === 'Actif' ? 'destructive' : 'default'}
            onClick={() => setIsStatusDialogOpen(true)}
          >
            {driverStatus === 'Actif' ? 'Suspendre le compte' : 'Reactiver le compte'}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center gap-4'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-semibold'>
                {initials}
              </div>
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <h2 className='text-2xl font-bold tracking-tight'>{driver.name}</h2>
                  {kycStatus === 'Approuve' && (
                    <BadgeCheck className='h-6 w-6' style={{ color: '#4bc2b1' }} />
                  )}
                </div>
                <p className='text-sm text-muted-foreground'>
                  {driver.email} • {driver.phone}
                </p>
                <p className='text-xs text-muted-foreground'>
                  Inscrit le {driver.joinedDate} • Derniere activite: {driver.lastActive}
                </p>
              </div>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
              <DriverStatusBadge status={driverStatus} />
              <KycBadge status={kycStatus} />
              <AvailabilityBadge status={driver.availabilityStatus} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview' className='flex items-center gap-2'>
            <UserCircle2 className='h-4 w-4' />
            Vue d&apos;ensemble
          </TabsTrigger>
          <TabsTrigger value='trips' className='flex items-center gap-2'>
            <MapPinned className='h-4 w-4' />
            Trajets
          </TabsTrigger>
          <TabsTrigger value='history' className='flex items-center gap-2'>
            <FileBadge2 className='h-4 w-4' />
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <ShieldCheck className='h-5 w-5' />
                  Compte et conformite
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Statut du compte</span>
                  <DriverStatusBadge status={driverStatus} />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Statut KYC</span>
                  <KycBadge status={kycStatus} />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Permis</span>
                  <span className='text-sm font-medium'>{driver.licenseNumber}</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Expiration permis</span>
                  <span className='text-sm font-medium'>{driver.licenseExpiry}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Car className='h-5 w-5' />
                  Vehicule assigne
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Plaque</span>
                  <span className='text-sm font-medium'>{driver.vehiclePlate}</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Identifiant</span>
                  <span className='text-sm font-medium'>{driver.vehicleId}</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Modele</span>
                  <span className='text-sm font-medium'>{driver.vehicleModel ?? 'Non renseigne'}</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Annee</span>
                  <span className='text-sm font-medium'>{driver.vehicleYear ?? 'Non renseignee'}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5' />
                  Indicateurs de performance
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Trajets totaux</span>
                  <span className='text-sm font-medium'>{driver.totalTrips}</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Taux de completion</span>
                  <span className='text-sm font-medium'>{completionRate}%</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Tarif moyen</span>
                  <span className='text-sm font-medium'>${averageTripFare.toFixed(2)}</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Disponibilite</span>
                  <AvailabilityBadge status={driver.availabilityStatus} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Star className='h-5 w-5' />
                  Qualite de service
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Note moyenne</span>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='text-sm font-medium'>{averageRating}</span>
                  </div>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Revenu est. (table)</span>
                  <span className='text-sm font-medium'>${totalRevenue.toFixed(2)}</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Trajets completes</span>
                  <span className='text-sm font-medium'>{completedTrips}</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Derniere activite</span>
                  <span className='text-sm font-medium'>{driver.lastActive}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='trips' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MapPinned className='h-5 w-5' />
                Historique des trajets
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='overflow-hidden rounded-lg border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & heure</TableHead>
                      <TableHead>Parcours</TableHead>
                      <TableHead>Passagers</TableHead>
                      <TableHead>Tarif</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Note</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleTrips.map((trip, index) => (
                      <TableRow
                        key={trip.id}
                        className={`transition-colors hover:bg-muted/40 ${index % 2 === 0 ? 'bg-muted/20' : ''}`}
                      >
                        <TableCell>
                          <div className='flex flex-col'>
                            <span className='font-medium'>{trip.date}</span>
                            <span className='text-xs text-muted-foreground'>{trip.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='text-sm'>
                            {trip.from} <span className='text-muted-foreground'>{' -> '}</span> {trip.to}
                          </div>
                        </TableCell>
                        <TableCell className='text-sm'>{trip.passengers}</TableCell>
                        <TableCell className='text-sm font-medium'>{trip.fare}</TableCell>
                        <TableCell>
                          <TripStatusBadge status={trip.status} />
                        </TableCell>
                        <TableCell>
                          {trip.rating ? (
                            <div className='flex items-center gap-1'>
                              <Star className='h-3.5 w-3.5 fill-yellow-400 text-yellow-400' />
                              <span className='text-sm font-medium'>{trip.rating.toFixed(1)}</span>
                            </div>
                          ) : (
                            <span className='text-sm text-muted-foreground'>-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className='flex items-center justify-between text-sm'>
                <p className='text-muted-foreground'>
                  Page {tripPage} sur {tripPageCount}
                </p>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    disabled={tripPage === 1}
                    onClick={() => setTripPage(Math.max(1, tripPage - 1))}
                  >
                    Precedent
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    disabled={tripPage === tripPageCount}
                    onClick={() => setTripPage(Math.min(tripPageCount, tripPage + 1))}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='history' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FileBadge2 className='h-5 w-5' />
                Journal des actions
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='overflow-hidden rounded-lg border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & heure</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Effectue par</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleHistory.map((entry, index) => (
                      <TableRow
                        key={entry.id}
                        className={`transition-colors hover:bg-muted/40 ${index % 2 === 0 ? 'bg-muted/20' : ''}`}
                      >
                        <TableCell>
                          <div className='flex flex-col'>
                            <span className='font-medium'>{entry.date}</span>
                            <span className='text-xs text-muted-foreground'>{entry.time}</span>
                          </div>
                        </TableCell>
                        <TableCell className='font-medium'>{entry.action}</TableCell>
                        <TableCell className='text-sm text-muted-foreground'>{entry.performedBy}</TableCell>
                        <TableCell className='text-sm text-muted-foreground'>
                          {entry.details ?? '-'}
                        </TableCell>
                        <TableCell>
                          <HistoryStatusBadge status={entry.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className='flex items-center justify-between text-sm'>
                <p className='text-muted-foreground'>
                  Page {historyPage} sur {historyPageCount}
                </p>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    disabled={historyPage === 1}
                    onClick={() => setHistoryPage(Math.max(1, historyPage - 1))}
                  >
                    Precedent
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    disabled={historyPage === historyPageCount}
                    onClick={() => setHistoryPage(Math.min(historyPageCount, historyPage + 1))}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ConfirmationDialog
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        onConfirm={handleStatusChange}
        title={
          driverStatus === 'Actif'
            ? 'Confirmer la suspension'
            : 'Confirmer la reactivation'
        }
        description={
          driverStatus === 'Actif'
            ? `Voulez-vous suspendre le compte de ${driver.name} ?`
            : `Voulez-vous reactiver le compte de ${driver.name} ?`
        }
        variant={driverStatus === 'Actif' ? 'destructive' : 'default'}
        confirmText='Confirmer'
        cancelText='Annuler'
      />

      <ConfirmationDialog
        open={isKycDialogOpen}
        onOpenChange={setIsKycDialogOpen}
        onConfirm={handleKycApprove}
        title='Confirmer l approbation KYC'
        description={`Voulez-vous approuver les documents KYC de ${driver.name} ?`}
        variant='default'
        confirmText='Approuver'
        cancelText='Annuler'
      />
    </div>
  );
}
