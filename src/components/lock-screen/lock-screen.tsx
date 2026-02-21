'use client';

import { useState } from 'react';
import { Lock, ArrowRight, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
interface LockScreenProps {
  onUnlock: (password: string) => boolean | void;
  onUnlockComplete?: () => void;
  userName?: string;
  userRole?: string;
}

export function LockScreen({
  onUnlock,
  onUnlockComplete,
  userName = 'Admin User',
  userRole = 'Administrator'
}: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const currentTime = new Date();
  const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = currentTime.toLocaleDateString('fr-FR', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const handleUnlock = () => {
    if (!password.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    const ok = onUnlock(password);
    if (ok !== false) {
      setIsUnlocked(true);
      setPassword('');
      // Exit animation then notify parent to unmount lock screen
      setTimeout(() => onUnlockComplete?.(), 400);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleUnlock();
  };

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className='fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden'>
      {/* Background */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: 'linear-gradient(135deg, #043535 0%, #0a4d4d 50%, #043535 100%)'
        }}
      />
      <div className='absolute inset-0 bg-background/40 backdrop-blur-sm' />

      {/* Time display */}
      <div className='absolute left-0 right-0 top-12 z-10 text-center'>
        <div className='mb-1 flex items-center justify-center gap-2 text-white/80'>
          <Clock className='h-4 w-4' />
          <span className='text-sm uppercase tracking-widest'>{dateStr}</span>
        </div>
        <h1 className='text-7xl font-extralight tracking-tight text-white'>{timeStr}</h1>
      </div>

      {/* Lock card */}
      <div
        className={`lock-glass relative z-10 flex flex-col items-center gap-6 rounded-2xl px-8 py-8 transition-all duration-500 sm:flex-row sm:gap-8 sm:px-10 ${
          isUnlocked ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        } ${isShaking ? 'animate-shake' : ''}`}
      >
        {/* Avatar */}
        <div className='flex flex-col items-center gap-3'>
          <div className='lock-avatar-ring h-24 w-24 overflow-hidden rounded-full'>
            <div className='flex h-full w-full items-center justify-center bg-muted text-2xl font-semibold text-foreground'>
              {initials}
            </div>
          </div>
          <span className='text-sm font-medium text-foreground'>{userName}</span>
          <span className='text-xs text-muted-foreground'>{userRole}</span>
        </div>

        {/* Divider - visible on horizontal layout */}
        <div className='hidden h-20 w-px bg-border/50 sm:block' />

        {/* Input area */}
        <div className='flex min-w-[260px] flex-col gap-4'>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <Lock className='h-4 w-4' />
            <span className='text-sm'>Entrez le mot de passe pour deverrouiller</span>
          </div>

          <div className='lock-input-glow flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/50 px-3 transition-all'>
            <Input
              type='password'
              placeholder='Mot de passe'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className='border-0 bg-transparent px-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0'
            />
            <Button
              type='button'
              size='icon'
              variant='ghost'
              onClick={handleUnlock}
              className='h-8 w-8 shrink-0 text-primary hover:bg-primary/10 hover:text-primary'
              style={{ color: '#043535' }}
            >
              <ArrowRight className='h-4 w-4' />
            </Button>
          </div>

          <p className='text-center text-xs text-muted-foreground'>
            Appuyez sur Entree ou cliquez sur la fleche pour deverrouiller
          </p>
        </div>
      </div>

      {/* Bottom hint */}
      <div className='absolute bottom-8 left-0 right-0 z-10 text-center'>
        <p className='text-xs text-white/60'>Tableau de bord verrouille</p>
      </div>
    </div>
  );
}
