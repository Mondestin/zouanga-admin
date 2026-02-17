export type KYCStatus = 'Approuve' | 'En attente' | 'Rejete' | 'Expire';
export type DriverStatus = 'Actif' | 'Inactif' | 'Suspendu';
export type AvailabilityStatus = 'Disponible' | 'En trajet' | 'Hors ligne';

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
  totalTrips: number;
  rating: number;
  joinedDate: string;
  lastActive: string;
}
