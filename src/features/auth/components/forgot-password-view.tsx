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
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

const forgotSchema = z.object({
  email: z.string().email({ message: 'Adresse e-mail invalide' })
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordView() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' }
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with your password reset API
      await new Promise((r) => setTimeout(r, 1000));
      setSubmitted(true);
      toast.success('Si un compte existe pour cet e-mail, vous recevrez un lien de reinitialisation.');
    } catch {
      toast.error('Une erreur est survenue. Reessayez plus tard.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center px-6 py-12'>
        <div className='mx-auto w-full max-w-sm space-y-8 text-center'>
          <div className='flex flex-col items-center gap-3'>
            <div className='relative h-44 w-44 shrink-0 overflow-hidden'>
              <Image src='/logo.png' alt='Zouanga' width={176} height={176} className='object-contain' />
            </div>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-primary/10'>
              <CheckCircle2 className='h-8 w-8' style={{ color: '#4bc2b1' }} />
            </div>
          </div>
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-foreground'>
              Verifiez votre boite mail
            </h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              Si un compte est associe a <strong className='text-foreground'>{form.getValues('email')}</strong>, vous recevrez un lien pour reinitialiser votre mot de passe. Pensez a verifier les spams.
            </p>
          </div>
          <Button
            asChild
            className='w-full h-10 text-white hover:opacity-90'
            style={{ backgroundColor: '#043535', color: '#ffffff' }}
          >
            <Link href='/login' className='flex items-center justify-center gap-2'>
              <ArrowLeft className='h-4 w-4' />
              Retour a la connexion
            </Link>
          </Button>
          <p className='text-center text-xs text-muted-foreground'>
            © {new Date().getFullYear()} by phoenone
          </p>
        </div>
      </div>
    );
  }

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
              Mot de passe oublie
            </h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              Saisissez l&apos;e-mail associe a votre compte. Nous vous enverrons un lien pour reinitialiser votre mot de passe.
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
          <Button
            type='submit'
            className='w-full h-10 text-white hover:opacity-90'
            disabled={isLoading}
            style={{ backgroundColor: '#043535', color: '#ffffff' }}
          >
            {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
          </Button>
        </Form>

        <Button asChild variant='ghost' className='w-full'>
          <Link href='/login' className='flex items-center justify-center gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Retour a la connexion
          </Link>
        </Button>

        <p className='text-center text-xs text-muted-foreground'>
          © {new Date().getFullYear()} by phoenone
        </p>
      </div>
    </div>
  );
}
