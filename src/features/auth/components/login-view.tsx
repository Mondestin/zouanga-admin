'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Adresse e-mail invalide' }),
  password: z.string().min(1, { message: 'Mot de passe requis' })
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with your authentication API
      await new Promise((r) => setTimeout(r, 800));
      toast.success('Connexion reussie');
      router.push('/dashboard/overview');
    } catch {
      toast.error('Identifiants incorrects. Verifiez votre e-mail et mot de passe.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 py-12'>
      <div className='mx-auto w-full max-w-sm space-y-8 text-center'>
        {/* Logo and title with tight spacing */}
        <div className='flex flex-col items-center gap-3'>
          <div className='relative h-44 w-44 shrink-0 overflow-hidden'>
            <Image src='/logo.png' alt='Zouanga' width={176} height={176} className='object-contain' />
          </div>
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-foreground'>
              Connexion
            </h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              Connectez-vous a votre compte pour continuer.
            </p>
          </div>
        </div>

        <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 text-left'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse e-mail</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='admin@zouanga.com'
                    autoComplete='email'
                    disabled={isLoading}
                    className='h-10'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel>Mot de passe</FormLabel>
                  <Link
                    href='/forgot-password'
                    className='text-xs font-medium hover:underline'
                    style={{ color: '#4bc2b1' }}
                  >
                    Mot de passe oublie ?
                  </Link>
                </div>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      autoComplete='current-password'
                      disabled={isLoading}
                      className='h-10 pr-10'
                      {...field}
                    />
                    <button
                      type='button'
                      tabIndex={-1}
                      onClick={() => setShowPassword((prev) => !prev)}
                      className='absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring'
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full h-10 text-white hover:opacity-90'
            disabled={isLoading}
            style={{ backgroundColor: '#043535', color: '#ffffff' }}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </Form>

        <p className='text-center text-xs text-muted-foreground'>
          Acces reserve aux administrateurs. En cas de probleme, contactez le support.
        </p>

        <p className='text-center text-xs text-muted-foreground'>
          © {new Date().getFullYear()} by phoenone
        </p>
      </div>
    </div>
  );
}
