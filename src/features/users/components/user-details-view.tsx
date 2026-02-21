'use client';

import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { User, UserHistoryRecord } from '../types';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconShield,
  IconCalendar,
  IconSettings,
  IconHistory
} from '@tabler/icons-react';
import { CheckCircle2, XCircle, PauseCircle, BadgeCheck, Shield, UserCog, HeadphonesIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import ConfirmationDialog from '@/components/ui/confirmation-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const RoleBadge = ({ role }: { role: User['role'] }) => {
  const roleConfig: Record<User['role'], { icon: React.ComponentType<{ className?: string }>; color: string }> = {
    Administrateur: { icon: Shield, color: 'bg-purple-100 text-purple-700' },
    Moderateur: { icon: UserCog, color: 'bg-blue-100 text-blue-700' },
    Support: { icon: HeadphonesIcon, color: 'bg-green-100 text-green-700' },
    Utilisateur: { icon: IconUser, color: 'bg-gray-100 text-gray-700' }
  };

  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <Badge className={`inline-flex items-center gap-1 border-transparent ${config.color}`}>
      <Icon className='h-3 w-3' />
      {role}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: User['status'] }) => {
  if (status === 'active') {
    return (
      <Badge
        className='inline-flex items-center gap-1 border-transparent'
        style={{ backgroundColor: '#043535', color: '#ffffff' }}
      >
        <CheckCircle2 className='h-3 w-3' />
        Actif
      </Badge>
    );
  }
  if (status === 'suspended') {
    return (
      <Badge className='inline-flex items-center gap-1 border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200'>
        <PauseCircle className='h-3 w-3' />
        Suspendu
      </Badge>
    );
  }
  return (
    <Badge className='inline-flex items-center gap-1 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200'>
      <XCircle className='h-3 w-3' />
      Inactif
    </Badge>
  );
};

// Mock history data generator
const generateUserHistory = (userId: number, userName: string, registrationDate: string): UserHistoryRecord[] => {
  const history: UserHistoryRecord[] = [
    {
      id: `hist-${userId}-1`,
      action: 'Compte cree',
      date: registrationDate,
      time: '10:30',
      performedBy: 'Systeme',
      status: 'Reussi'
    },
    {
      id: `hist-${userId}-2`,
      action: 'Connexion reussie',
      date: '15/05/2025',
      time: '14:22',
      performedBy: userName,
      status: 'Reussi'
    },
    {
      id: `hist-${userId}-3`,
      action: 'Email modifie',
      date: '18/05/2025',
      time: '09:15',
      performedBy: 'Admin User',
      details: 'Email mis a jour',
      status: 'Reussi'
    },
    {
      id: `hist-${userId}-4`,
      action: 'Connexion reussie',
      date: '20/05/2025',
      time: '16:45',
      performedBy: userName,
      status: 'Reussi'
    },
    {
      id: `hist-${userId}-5`,
      action: 'Role modifie',
      date: '22/05/2025',
      time: '11:30',
      performedBy: 'Admin User',
      details: 'Role change',
      status: 'Reussi'
    },
    {
      id: `hist-${userId}-6`,
      action: 'Connexion reussie',
      date: '25/05/2025',
      time: '08:20',
      performedBy: userName,
      status: 'Reussi'
    },
    {
      id: `hist-${userId}-7`,
      action: 'Telephone modifie',
      date: '28/05/2025',
      time: '13:10',
      performedBy: 'Admin User',
      details: 'Numero de telephone mis a jour',
      status: 'Reussi'
    },
    {
      id: `hist-${userId}-8`,
      action: 'Connexion reussie',
      date: '30/05/2025',
      time: '15:55',
      performedBy: userName,
      status: 'Reussi'
    }
  ];
  return history;
};

export default function UserDetailsView({ user }: { user: User }) {
  const [accountStatus, setAccountStatus] = useState<User['status']>(user.status);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);
  const initials = getInitials(user.name);

  const userHistory = useMemo(() => generateUserHistory(user.id, user.name, user.registrationDate), [user.id, user.name, user.registrationDate]);
  const PAGE_SIZE = 5;
  const historyPageCount = Math.max(1, Math.ceil(userHistory.length / PAGE_SIZE));

  const visibleHistory = useMemo(() => {
    const start = (historyPage - 1) * PAGE_SIZE;
    return userHistory.slice(start, start + PAGE_SIZE);
  }, [userHistory, historyPage]);

  const handleStatusChange = () => {
    const nextStatus =
      accountStatus === 'active'
        ? 'suspended'
        : accountStatus === 'suspended'
          ? 'active'
          : 'active';
    setAccountStatus(nextStatus);
    toast.success(`Statut du compte mis a jour avec succes`);
    setIsStatusDialogOpen(false);
  };

  const getStatusBadge = (status: UserHistoryRecord['status']) => {
    if (status === 'Reussi') {
      return (
        <Badge
          className='text-xs border-transparent'
          style={{ backgroundColor: '#043535', color: '#ffffff' }}
        >
          {status}
        </Badge>
      );
    }
    if (status === 'Echoue') {
      return (
        <Badge className='text-xs border-transparent bg-red-100 text-red-700'>
          {status}
        </Badge>
      );
    }
    return (
      <Badge className='text-xs border-transparent bg-amber-100 text-amber-700'>
        {status}
      </Badge>
    );
  };

  return (
    <div className='flex flex-1 flex-col space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <Button asChild variant='ghost' size='sm'>
          <Link href='/dashboard/users'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Retour
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between gap-6'>
            <div className='flex items-center gap-5'>
              <div className='relative flex shrink-0 overflow-hidden rounded-full h-20 w-20'>
                <div className='flex h-full w-full items-center justify-center rounded-full bg-muted text-2xl font-semibold'>
                  {initials}
                </div>
              </div>

              <div className='space-y-1'>
                <div className='flex items-center gap-3'>
                  <h1 className='text-3xl font-bold tracking-tight'>{user.name}</h1>
                  {user.verified && (
                    <BadgeCheck className='h-6 w-6' style={{ color: '#4bc2b1' }} />
                  )}
                </div>

                <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                  <span className='flex items-center gap-1'>
                    <IconMail className='h-4 w-4' />
                    {user.email}
                  </span>
                  <span>•</span>
                  <span className='flex items-center gap-1'>
                    <IconPhone className='h-4 w-4' />
                    {user.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <RoleBadge role={user.role} />
              <StatusBadge status={accountStatus} />
              <Button
                variant={accountStatus === 'active' ? 'destructive' : 'default'}
                onClick={() => setIsStatusDialogOpen(true)}
              >
                {accountStatus === 'active' ? 'Suspendre' : 'Reactiver'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview' className='flex items-center gap-2'>
            <IconUser className='h-4 w-4' />
            Vue d&apos;ensemble
          </TabsTrigger>
          <TabsTrigger value='settings' className='flex items-center gap-2'>
            <IconSettings className='h-4 w-4' />
            Parametres
          </TabsTrigger>
          <TabsTrigger value='history' className='flex items-center gap-2'>
            <IconHistory className='h-4 w-4' />
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <IconShield className='h-5 w-5' />
                  Informations du compte
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>Role</span>
                    <RoleBadge role={user.role} />
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>Statut</span>
                    <StatusBadge status={accountStatus} />
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>Verifie</span>
                    {user.verified ? (
                      <BadgeCheck className='h-5 w-5' style={{ color: '#4bc2b1' }} />
                    ) : (
                      <XCircle className='h-5 w-5 text-muted-foreground' />
                    )}
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>Date d&apos;inscription</span>
                    <span className='text-sm font-medium'>{user.registrationDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <IconCalendar className='h-5 w-5' />
                  Statistiques d&apos;activite
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>Derniere connexion</span>
                    <span className='text-sm font-medium'>{user.lastLogin}</span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>Nombre de connexions</span>
                    <span className='text-sm font-medium'>{user.loginCount}</span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>Taux d&apos;activite</span>
                    <Badge variant='outline'>
                      {user.loginCount > 100 ? 'Eleve' : user.loginCount > 50 ? 'Moyen' : 'Faible'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='settings' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Parametres du compte</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Role</label>
                <div className='flex items-center gap-2'>
                  <RoleBadge role={user.role} />
                  <Button variant='outline' size='sm' onClick={() => toast.info('Fonctionnalite a venir')}>
                    Modifier
                  </Button>
                </div>
              </div>
              <Separator />
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Statut du compte</label>
                <div className='flex items-center gap-2'>
                  <StatusBadge status={accountStatus} />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setIsStatusDialogOpen(true)}
                  >
                    Modifier
                  </Button>
                </div>
              </div>
              <Separator />
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Verification</label>
                <div className='flex items-center gap-2'>
                  {user.verified ? (
                    <>
                      <BadgeCheck className='h-5 w-5' style={{ color: '#4bc2b1' }} />
                      <span className='text-sm'>Compte verifie</span>
                    </>
                  ) : (
                    <>
                      <XCircle className='h-5 w-5 text-muted-foreground' />
                      <span className='text-sm'>Compte non verifie</span>
                      <Button variant='outline' size='sm' onClick={() => toast.info('Fonctionnalite a venir')}>
                        Verifier
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='history' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <IconHistory className='h-5 w-5' />
                Historique des actions
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='rounded-lg border overflow-hidden'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Heure</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Effectue par</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleHistory.map((record, index) => (
                      <TableRow
                        key={record.id}
                        className={`hover:bg-muted/40 transition-colors ${
                          index % 2 === 0 ? 'bg-muted/20' : ''
                        }`}
                      >
                        <TableCell>
                          <div className='flex flex-col'>
                            <span className='font-medium'>{record.date}</span>
                            <span className='text-muted-foreground text-xs'>{record.time}</span>
                          </div>
                        </TableCell>
                        <TableCell className='font-medium'>{record.action}</TableCell>
                        <TableCell className='text-muted-foreground'>{record.performedBy}</TableCell>
                        <TableCell className='text-muted-foreground text-sm'>
                          {record.details || '-'}
                        </TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
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
          accountStatus === 'active'
            ? 'Confirmer la suspension'
            : 'Confirmer la reactivation'
        }
        description={
          accountStatus === 'active'
            ? `Voulez-vous suspendre le compte de ${user.name} ?`
            : `Voulez-vous reactiver le compte de ${user.name} ?`
        }
        variant={accountStatus === 'active' ? 'destructive' : 'default'}
        confirmText='Confirmer'
        cancelText='Annuler'
      />
    </div>
  );
}
