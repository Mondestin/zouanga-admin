export type SchoolStatus = 'Actif' | 'Integration' | 'Suspendu';

export interface School {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  students: number;
  pickupPoints: number;
  status: SchoolStatus;
  contactPerson: string;
  joinedDate: string;
}
