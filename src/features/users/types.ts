export type UserRole = 'Administrateur' | 'Moderateur' | 'Support' | 'Utilisateur';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export type UserHistoryAction = 
  | 'Compte cree'
  | 'Connexion reussie'
  | 'Connexion echouee'
  | 'Statut modifie'
  | 'Role modifie'
  | 'Email modifie'
  | 'Telephone modifie'
  | 'Compte verifie'
  | 'Compte suspendu'
  | 'Compte reactive';

export interface UserHistoryRecord {
  id: string;
  action: UserHistoryAction;
  date: string;
  time: string;
  performedBy: string;
  details?: string;
  status: 'Reussi' | 'Echoue' | 'En attente';
}

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  role: UserRole;
  verified: boolean;
  registrationDate: string;
  lastLogin: string;
  loginCount: number;
  history?: UserHistoryRecord[];
};

