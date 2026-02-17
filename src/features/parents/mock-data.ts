import { ParentAccount } from './types';

export const mockParents: ParentAccount[] = [
  {
    id: 1,
    name: 'Marie Theodore',
    verified: true,
    photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Marie%20Theodore',
    email: 'marie.theodore@email.com',
    phone: '+509 3812 2233',
    paymentMode: 'Mobile Money',
    subscriptionPlan: 'Monthly',
    subscriptionPrice: '$120.00',
    subscriptionStatus: 'Actif',
    paymentHistory: 'Dernier paiement le 05/02/2026',
    linkedChildren: [
      {
        id: 'c-101',
        name: 'Nadia Theodore',
        photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Nadia%20Theodore',
        school: 'College Lumiere',
        age: 8,
        pickUpTime: '15:30',
        driverId: 'd-001',
        driverName: 'Marc Antoine'
      },
      {
        id: 'c-102',
        name: 'Liam Theodore',
        photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Liam%20Theodore',
        school: 'College Lumiere',
        age: 6,
        pickUpTime: '15:30',
        driverId: 'd-001',
        driverName: 'Marc Antoine'
      }
    ],
    paymentRecords: [
      {
        id: 'pay-1001',
        date: '05/02/2026',
        amount: '$120.00',
        method: 'Mobile Money',
        status: 'Reussi'
      },
      {
        id: 'pay-1002',
        date: '05/01/2026',
        amount: '$120.00',
        method: 'Carte',
        status: 'Reussi'
      }
    ],
    incidentRecords: [
      {
        id: 'inc-2101',
        date: '31/01/2026',
        type: 'Retard de prise en charge',
        severity: 'Faible',
        status: 'Resolu'
      }
    ],
    supportNotes: 'A demande un changement de point de ramassage.',
    accountStatus: 'Actif'
  },
  {
    id: 2,
    name: 'Jean Louis',
    verified: true,
    photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Jean%20Louis',
    email: 'jean.louis@email.com',
    phone: '+509 3721 1100',
    paymentMode: 'Mobile Money',
    subscriptionPlan: 'Bi-Weekly',
    subscriptionPrice: '$58.00',
    subscriptionStatus: 'En retard',
    paymentHistory: 'Facture de 2 semaines impayee',
    linkedChildren: [
      {
        id: 'c-201',
        name: 'Jules Louis',
        photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Jules%20Louis',
        school: 'Ecole Horizon',
        age: 10,
        pickUpTime: '16:00',
        driverId: 'd-002',
        driverName: 'Pierre Jean'
      }
    ],
    paymentRecords: [
      {
        id: 'pay-2001',
        date: '10/02/2026',
        amount: '$58.00',
        method: 'Mobile Money',
        status: 'Echoue'
      },
      {
        id: 'pay-2002',
        date: '24/01/2026',
        amount: '$58.00',
        method: 'Mobile Money',
        status: 'Reussi'
      }
    ],
    incidentRecords: [
      {
        id: 'inc-2201',
        date: '02/02/2026',
        type: 'Parent absent',
        severity: 'Moyen',
        status: 'Ouvert'
      }
    ],
    supportNotes: 'Relance envoyee le 10/02/2026.',
    accountStatus: 'Actif'
  },
  {
    id: 3,
    name: 'Nadene Pierre',
    verified: false,
    photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Nadene%20Pierre',
    email: 'nadene.pierre@email.com',
    phone: '+509 3455 8800',
    paymentMode: 'Carte',
    subscriptionPlan: 'Monthly',
    subscriptionPrice: '$120.00',
    subscriptionStatus: 'Actif',
    paymentHistory: 'Paiements reguliers (3 derniers mois)',
    linkedChildren: [
      {
        id: 'c-301',
        name: 'Mia Pierre',
        photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Mia%20Pierre',
        school: 'Academie Nouvelle',
        age: 9,
        pickUpTime: '15:45',
        driverId: 'd-003',
        driverName: 'Francois Michel'
      },
      {
        id: 'c-302',
        name: 'Enzo Pierre',
        photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Enzo%20Pierre',
        school: 'Academie Nouvelle',
        age: 7,
        pickUpTime: '15:45',
        driverId: 'd-003',
        driverName: 'Francois Michel'
      },
      {
        id: 'c-303',
        name: 'Noah Pierre',
        photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Noah%20Pierre',
        school: 'Academie Nouvelle',
        age: 6,
        pickUpTime: '15:45',
        driverId: 'd-003',
        driverName: 'Francois Michel'
      }
    ],
    paymentRecords: [
      {
        id: 'pay-3001',
        date: '01/02/2026',
        amount: '$180.00',
        method: 'Carte',
        status: 'Reussi'
      }
    ],
    incidentRecords: [],
    supportNotes: 'Aucun incident recent.',
    accountStatus: 'Actif'
  },
  {
    id: 4,
    name: 'Ruth Marcelin',
    verified: false,
    photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Ruth%20Marcelin',
    email: 'ruth.marcelin@email.com',
    phone: '+509 3255 9090',
    paymentMode: 'Mobile Money',
    subscriptionPlan: 'Weekly',
    subscriptionPrice: '$32.00',
    subscriptionStatus: 'Suspendu',
    paymentHistory: 'Compte suspendu apres 2 echecs de paiement',
    linkedChildren: [
      {
        id: 'c-401',
        name: 'Mael Marcelin',
        photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Mael%20Marcelin',
        school: 'College Lumiere',
        age: 11,
        pickUpTime: '16:15',
        driverId: 'd-004',
        driverName: 'Jacques Bernard'
      }
    ],
    paymentRecords: [
      {
        id: 'pay-4001',
        date: '28/01/2026',
        amount: '$32.00',
        method: 'Mobile Money',
        status: 'Echoue'
      },
      {
        id: 'pay-4002',
        date: '21/01/2026',
        amount: '$32.00',
        method: 'Mobile Money',
        status: 'Echoue'
      }
    ],
    incidentRecords: [
      {
        id: 'inc-2401',
        date: '27/01/2026',
        type: 'Absence de paiement',
        severity: 'Eleve',
        status: 'Ouvert'
      }
    ],
    supportNotes: 'Compte en attente de regularisation.',
    accountStatus: 'Suspendu'
  },
  {
    id: 5,
    name: 'Patrick Joseph',
    verified: true,
    photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Patrick%20Joseph',
    email: 'patrick.joseph@email.com',
    phone: '+509 4100 0012',
    paymentMode: 'Carte',
    subscriptionPlan: 'Monthly',
    subscriptionPrice: '$120.00',
    subscriptionStatus: 'Actif',
    paymentHistory: 'Dernier paiement le 01/02/2026',
    linkedChildren: [
      {
        id: 'c-501',
        name: 'Lina Joseph',
        photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Lina%20Joseph',
        school: 'Ecole Horizon',
        age: 8,
        pickUpTime: '15:30',
        driverId: 'd-005',
        driverName: 'Robert Denis'
      }
    ],
    paymentRecords: [
      {
        id: 'pay-5001',
        date: '01/02/2026',
        amount: '$120.00',
        method: 'Carte',
        status: 'Reussi'
      }
    ],
    incidentRecords: [],
    supportNotes: 'Besoin d assistance pour les notifications.',
    accountStatus: 'Actif'
  },
  {
    id: 6,
    name: 'Sonia Dorsainvil',
    verified: true,
    photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Sonia%20Dorsainvil',
    email: 'sonia.dorsainvil@email.com',
    phone: '+509 4899 7700',
    paymentMode: 'Mobile Money',
    subscriptionPlan: 'Bi-Weekly',
    subscriptionPrice: '$58.00',
    subscriptionStatus: 'Actif',
    paymentHistory: 'Paiement valide hier',
    linkedChildren: [
      {
        id: 'c-601',
        name: 'Jade Dorsainvil',
        photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Jade%20Dorsainvil',
        school: 'College Lumiere',
        age: 9,
        pickUpTime: '16:00',
        driverId: 'd-006',
        driverName: 'Claude Andre'
      },
      {
        id: 'c-602',
        name: 'Milan Dorsainvil',
        photoUrl: 'https://api.dicebear.com/9.x/initials/svg?seed=Milan%20Dorsainvil',
        school: 'College Lumiere',
        age: 7,
        pickUpTime: '16:00',
        driverId: 'd-006',
        driverName: 'Claude Andre'
      }
    ],
    paymentRecords: [
      {
        id: 'pay-6001',
        date: '12/02/2026',
        amount: '$58.00',
        method: 'Mobile Money',
        status: 'Reussi'
      }
    ],
    incidentRecords: [
      {
        id: 'inc-2601',
        date: '10/02/2026',
        type: 'Retard de trajet',
        severity: 'Faible',
        status: 'Resolu'
      }
    ],
    supportNotes: 'Historique support sans blocage.',
    accountStatus: 'Actif'
  }
];
