'use client';

import Link from 'next/link';
import { Calendar, Clock, ExternalLink, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ParentAccount, ParentChild, SubscriptionPlan } from '../../types';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

interface ParentSubscriptionCardProps {
  parent: ParentAccount;
  subscriptionPlan: SubscriptionPlan;
  onPlanChange: (plan: SubscriptionPlan) => void;
  onUpdateClick: () => void;
}

export default function ParentSubscriptionCard({
  parent,
  subscriptionPlan,
  onPlanChange,
  onUpdateClick
}: ParentSubscriptionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Calendar className='h-5 w-5' />
          Gestion abonnement
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-medium text-muted-foreground'>Plan actuel</p>

            <Select value={subscriptionPlan} onValueChange={(value) => onPlanChange(value as SubscriptionPlan)}>
              <SelectTrigger className='w-[220px]'>
                <SelectValue placeholder='Selectionner un plan' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Weekly'>Weekly</SelectItem>
                <SelectItem value='Bi-Weekly'>Bi-Weekly</SelectItem>
                <SelectItem value='Monthly'>Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={onUpdateClick}>Mettre a jour</Button>
        </div>

        <div>
          <p className='mb-3 text-sm font-medium text-muted-foreground'>
            Enfants lies ({parent.linkedChildren.length})
          </p>

          <div className='space-y-3'>
            {parent.linkedChildren.map((child: ParentChild) => (
              <div
                key={child.id}
                className='flex items-center justify-between rounded-xl border bg-muted/20 p-4 hover:bg-muted/40 transition-colors'
              >
                <div className='flex items-center gap-4'>
                  <span className='relative flex shrink-0 overflow-hidden rounded-full h-12 w-12'>
                    <span className='flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-semibold'>
                      {getInitials(child.name)}
                    </span>
                  </span>
                  <div>
                    <p className='font-medium'>{child.name}</p>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <span>{child.age} ans</span>
                      <span>•</span>
                      <span className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3' />
                        {child.school}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-6 text-sm'>
                  <div className='flex items-center gap-1.5 text-muted-foreground'>
                    <Clock className='h-3.5 w-3.5' />
                    <span>{child.pickUpTime}</span>
                  </div>

                  <Link
                    href={`/dashboard/drivers/${child.driverId}`}
                    className='text-primary hover:underline inline-flex items-center gap-1 font-medium'
                  >
                    {child.driverName}
                    <ExternalLink className='h-3.5 w-3.5' />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
