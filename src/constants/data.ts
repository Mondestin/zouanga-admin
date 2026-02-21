import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: "Vue d'ensemble",
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['o', 'v'],
    items: []
  },
  {
    title: 'Parents',
    url: '/dashboard/parents',
    icon: 'parents',
    shortcut: ['p', 'a'],
    isActive: false,
    items: []
  },
  {
    title: 'Utilisateurs',
    url: '/dashboard/users',
    icon: 'users',
    shortcut: ['u', 's'],
    isActive: false,
    items: []
  },
  {
    title: 'Chauffeurs',
    url: '/dashboard/drivers',
    icon: 'driver',
    shortcut: ['d', 'r'],
    isActive: false,
    badge: 'KYC',
    items: []
  },
  {
    title: 'Flottes',
    url: '/dashboard/fleets',
    icon: 'fleet',
    shortcut: ['f', 'l'],
    isActive: false,
    items: []
  },
  {
    title: 'Ecoles',
    url: '/dashboard/schools',
    icon: 'school',
    shortcut: ['s', 'c'],
    isActive: false,
    items: []
  },
  {
    title: 'Trajets',
    url: '/dashboard/logistics/trips',
    icon: 'trip',
    shortcut: ['t', 'r'],
    isActive: false,
    items: []
  },
  {
    title: 'Itineraires',
    url: '/dashboard/logistics/routes',
    icon: 'route',
    shortcut: ['r', 'o'],
    isActive: false,
    items: []
  },
  {
    title: 'Abonnements',
    url: '/dashboard/subscriptions',
    icon: 'subscription',
    shortcut: ['s', 'u'],
    isActive: false,
    items: []
  },
  {
    title: 'Paiements',
    url: '/dashboard/payments',
    icon: 'billing',
    shortcut: ['p', 'y'],
    isActive: false,
    items: []
  },
  {
    title: 'Incidents',
    url: '/dashboard/incidents',
    icon: 'warning',
    shortcut: ['i', 'n'],
    isActive: false,
    items: []
  },
  {
    title: 'Journaux SOS',
    url: '/dashboard/sos',
    icon: 'sos',
    shortcut: ['s', 'o'],
    isActive: false,
    items: []
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
