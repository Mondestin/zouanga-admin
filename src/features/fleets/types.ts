export type FleetStatus = 'Saine' | 'Surveillance' | 'Sous-utilisee';

export interface Fleet {
  id: number;
  name: string;
  vehicles: number;
  occupancy: string;
  status: FleetStatus;
  contactPerson: string;
  phone: string;
  email: string;
  joinedDate: string;
}
