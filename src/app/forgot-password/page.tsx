import type { Metadata } from 'next';
import ForgotPasswordView from '@/features/auth/components/forgot-password-view';

export const metadata: Metadata = {
  title: 'Mot de passe oublie | Zouanga Admin',
  description: 'Reinitialisez votre mot de passe administrateur Zouanga.'
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
