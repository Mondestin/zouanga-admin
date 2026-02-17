import { Fleet } from './types';

export const mockFleets: Fleet[] = [
  {
    id: 1,
    name: 'Flotte Metro',
    vehicles: 42,
    occupancy: '81%',
    status: 'Saine',
    contactPerson: 'Jean Pierre',
    phone: '+509 3412 3344',
    email: 'contact@flottemetro.com',
    joinedDate: '10/01/2024'
  },
  {
    id: 2,
    name: 'CityRide Transport',
    vehicles: 31,
    occupancy: '68%',
    status: 'Surveillance',
    contactPerson: 'Marie Joseph',
    phone: '+509 3423 4455',
    email: 'info@cityride.com',
    joinedDate: '15/01/2024'
  },
  {
    id: 3,
    name: 'Mobilite Zone Nord',
    vehicles: 18,
    occupancy: '55%',
    status: 'Sous-utilisee',
    contactPerson: 'Luc Bernard',
    phone: '+509 3434 5566',
    email: 'contact@mobilitezn.com',
    joinedDate: '20/01/2024'
  },
  {
    id: 4,
    name: 'Transport Express',
    vehicles: 28,
    occupancy: '75%',
    status: 'Saine',
    contactPerson: 'Sophie Martin',
    phone: '+509 3445 6677',
    email: 'info@transportexpress.com',
    joinedDate: '25/01/2024'
  },
  {
    id: 5,
    name: 'Fleet Premium',
    vehicles: 35,
    occupancy: '88%',
    status: 'Saine',
    contactPerson: 'Thomas Dubois',
    phone: '+509 3456 7788',
    email: 'contact@fleetpremium.com',
    joinedDate: '05/02/2024'
  }
];
