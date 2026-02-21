export type KYCStatus = 'Approuve' | 'En attente' | 'Rejete' | 'Expire';
export type DriverStatus = 'Actif' | 'Inactif' | 'Suspendu';
export type AvailabilityStatus = 'Disponible' | 'En trajet' | 'Hors ligne';

export type DriverHistoryAction =
  | 'Chauffeur enregistre'
  | 'KYC soumis'
  | 'KYC approuve'
  | 'KYC rejete'
  | 'Permis verifie'
  | 'Vehicule assigne'
  | 'Statut modifie'
  | 'Compte suspendu'
  | 'Compte reactive'
  | 'Trajet complete';

export interface DriverHistoryRecord {
  id: string;
  action: DriverHistoryAction;
  date: string;
  time: string;
  performedBy: string;
  details?: string;
  status: 'Reussi' | 'Echoue' | 'En attente';
}

export interface DriverTrip {
  id: string;
  date: string;
  time: string;
  from: string;
  to: string;
  passengers: number;
  status: 'Complete' | 'En cours' | 'Annule';
  rating?: number;
  fare: string;
}

export interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  kycStatus: KYCStatus;
  driverStatus: DriverStatus;
  availabilityStatus: AvailabilityStatus;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel?: string;
  vehicleYear?: number;
  totalTrips: number;
  rating: number;
  joinedDate: string;
  lastActive: string;
  history?: DriverHistoryRecord[];
  trips?: DriverTrip[];
}
