'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { IconUser, IconMail, IconPhone, IconMapPin, IconCalendar, IconShield } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

// Mock user data - replace with your own user management
const mockUser = {
  fullName: 'Admin User',
  emailAddresses: [{ emailAddress: 'admin@zouanga.com' }],
  imageUrl: undefined,
  phone: '+509 1234 5678',
  address: 'Port-au-Prince, Haiti',
  role: 'Administrateur',
  joinDate: '15/01/2024',
  lastLogin: 'Il y a 2 heures'
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: mockUser.fullName,
    email: mockUser.emailAddresses[0].emailAddress,
    phone: mockUser.phone,
    address: mockUser.address
  });

  const handleSave = () => {
    toast.success('Profil mis a jour avec succes');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: mockUser.fullName,
      email: mockUser.emailAddresses[0].emailAddress,
      phone: mockUser.phone,
      address: mockUser.address
    });
    setIsEditing(false);
  };

  const initials = getInitials(mockUser.fullName);

  return (
    <div className='space-y-6'>
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <IconUser className='h-5 w-5' />
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center gap-6'>
            <div className='relative flex shrink-0 overflow-hidden rounded-full h-24 w-24'>
              <div className='flex h-full w-full items-center justify-center rounded-full bg-muted text-2xl font-semibold'>
                {initials}
              </div>
            </div>
            <div className='flex-1 space-y-1'>
              <h2 className='text-2xl font-bold'>{mockUser.fullName}</h2>
              <p className='text-muted-foreground text-sm'>{mockUser.role}</p>
              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                <span className='flex items-center gap-1'>
                  <IconCalendar className='h-4 w-4' />
                  Membre depuis {mockUser.joinDate}
                </span>
                <span>•</span>
                <span>Derniere connexion: {mockUser.lastLogin}</span>
              </div>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>Modifier le profil</Button>
            )}
          </div>

          {isEditing && (
            <>
              <Separator />
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='fullName'>Nom complet</Label>
                  <Input
                    id='fullName'
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='phone'>Telephone</Label>
                  <Input
                    id='phone'
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='address'>Adresse</Label>
                  <Input
                    id='address'
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
              <div className='flex justify-end gap-2'>
                <Button variant='outline' onClick={handleCancel}>
                  Annuler
                </Button>
                <Button onClick={handleSave}>Enregistrer</Button>
              </div>
            </>
          )}

          {!isEditing && (
            <>
              <Separator />
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='flex items-center gap-3'>
                  <IconMail className='h-5 w-5 text-muted-foreground' />
                  <div>
                    <p className='text-sm font-medium'>Email</p>
                    <p className='text-muted-foreground text-sm'>{mockUser.emailAddresses[0].emailAddress}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <IconPhone className='h-5 w-5 text-muted-foreground' />
                  <div>
                    <p className='text-sm font-medium'>Telephone</p>
                    <p className='text-muted-foreground text-sm'>{mockUser.phone}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <IconMapPin className='h-5 w-5 text-muted-foreground' />
                  <div>
                    <p className='text-sm font-medium'>Adresse</p>
                    <p className='text-muted-foreground text-sm'>{mockUser.address}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <IconShield className='h-5 w-5 text-muted-foreground' />
                  <div>
                    <p className='text-sm font-medium'>Role</p>
                    <p className='text-muted-foreground text-sm'>{mockUser.role}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <IconShield className='h-5 w-5' />
            Securite
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium'>Mot de passe</p>
              <p className='text-muted-foreground text-sm'>Derniere modification il y a 30 jours</p>
            </div>
            <Button variant='outline' onClick={() => toast.info('Fonctionnalite a venir')}>
              Modifier le mot de passe
            </Button>
          </div>
          <Separator />
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium'>Authentification a deux facteurs</p>
              <p className='text-muted-foreground text-sm'>Ajoutez une couche de securite supplementaire</p>
            </div>
            <Button variant='outline' onClick={() => toast.info('Fonctionnalite a venir')}>
              Activer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
