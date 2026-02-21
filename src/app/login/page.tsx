import type { Metadata } from 'next';
import LoginView from '@/features/auth/components/login-view';

export const metadata: Metadata = {
  title: 'Connexion | Zouanga Admin',
  description: 'Connectez-vous a votre compte administrateur Zouanga.'
};

export default function LoginPage() {
  return <LoginView />;
}
