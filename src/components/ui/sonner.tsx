'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          success: 'bg-green-50 border-green-200 text-green-800 [&>svg]:text-green-600',
          error: 'bg-red-50 border-red-200 text-red-800 [&>svg]:text-red-600',
          info: 'bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600',
          warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 [&>svg]:text-yellow-600'
        }
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)'
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
