export type SubscriptionPlan = 'Weekly' | 'Bi-Weekly' | 'Monthly';
export type SubscriptionStatus = 'Actif' | 'En retard' | 'Suspendu';
export type AccountStatus = 'Actif' | 'Suspendu';
export type PaymentMode = 'Mobile Money' | 'Carte';

export interface ParentChild {
  id: string;
  name: string;
  photoUrl: string;
  school: string;
  age: number;
  pickUpTime: string;
  driverId: string;
  driverName: string;
}

export interface ParentPaymentRecord {
  id: string;
  date: string;
  amount: string;
  method: 'Mobile Money' | 'Carte';
  status: 'Reussi' | 'Echoue' | 'En attente';
}

export interface ParentIncidentRecord {
  id: string;
  date: string;
  type: string;
  severity: 'Faible' | 'Moyen' | 'Eleve';
  status: 'Ouvert' | 'Resolu';
}

export interface ParentAccount {
  id: number;
  name: string;
  verified: boolean;
  photoUrl: string;
  email: string;
  phone: string;
  paymentMode: PaymentMode;
  subscriptionPlan: SubscriptionPlan;
  subscriptionPrice: string;
  subscriptionStatus: SubscriptionStatus;
  paymentHistory: string;
  linkedChildren: ParentChild[];
  paymentRecords: ParentPaymentRecord[];
  incidentRecords: ParentIncidentRecord[];
  supportNotes: string;
  accountStatus: AccountStatus;
}
