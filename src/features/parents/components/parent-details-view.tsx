'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { ParentAccount, SubscriptionPlan } from '../types';
import ConfirmationDialog from '@/components/ui/confirmation-dialog';
import ParentHeader from './parent-details/parent-header';
import ParentHeroSection from './parent-details/parent-hero-section';
import ParentSubscriptionCard from './parent-details/parent-subscription-card';
import ParentPaymentHistoryCard from './parent-details/parent-payment-history-card';
import ParentSidebar from './parent-details/parent-sidebar';

const PAGE_SIZE = 4;

export default function ParentDetailsView({ parent }: { parent: ParentAccount }) {
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>(
    parent.subscriptionPlan
  );
  const [accountStatus, setAccountStatus] = useState(parent.accountStatus);
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false);
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [paymentPage, setPaymentPage] = useState(1);
  const [incidentPage, setIncidentPage] = useState(1);

  const paymentPageCount = Math.max(
    1,
    Math.ceil(parent.paymentRecords.length / PAGE_SIZE)
  );
  const incidentPageCount = Math.max(
    1,
    Math.ceil(parent.incidentRecords.length / PAGE_SIZE)
  );

  const visiblePayments = useMemo(() => {
    const start = (paymentPage - 1) * PAGE_SIZE;
    return parent.paymentRecords.slice(start, start + PAGE_SIZE);
  }, [parent.paymentRecords, paymentPage]);

  const visibleIncidents = useMemo(() => {
    const start = (incidentPage - 1) * PAGE_SIZE;
    return parent.incidentRecords.slice(start, start + PAGE_SIZE);
  }, [parent.incidentRecords, incidentPage]);

  return (
    <div className='flex flex-1 flex-col space-y-8'>
      <ParentHeader
        accountStatus={accountStatus}
        onSuspendClick={() => setIsAccountDialogOpen(true)}
      />

      <ParentHeroSection parent={parent} accountStatus={accountStatus} />

      <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
        <div className='space-y-6 xl:col-span-2'>
          <ParentSubscriptionCard
            parent={parent}
            subscriptionPlan={subscriptionPlan}
            onPlanChange={setSubscriptionPlan}
            onUpdateClick={() => setIsSubscriptionDialogOpen(true)}
          />

          <ParentPaymentHistoryCard
            payments={visiblePayments}
            currentPage={paymentPage}
            totalPages={paymentPageCount}
            onPageChange={setPaymentPage}
          />
        </div>

        <ParentSidebar parent={parent} />
      </div>

      <ConfirmationDialog
        open={isSubscriptionDialogOpen}
        onOpenChange={setIsSubscriptionDialogOpen}
        onConfirm={() => {
          toast.success(`Abonnement mis a jour: ${subscriptionPlan}`);
          setIsSubscriptionDialogOpen(false);
        }}
        title='Confirmer la mise a jour'
        description={`Voulez-vous mettre a jour l'abonnement de ${parent.name} vers le plan ${subscriptionPlan} ?`}
        variant='default'
        confirmText='Confirmer'
        cancelText='Annuler'
      />

      <ConfirmationDialog
        open={isAccountDialogOpen}
        onOpenChange={setIsAccountDialogOpen}
        onConfirm={() => {
          const nextStatus = accountStatus === 'Actif' ? 'Suspendu' : 'Actif';
          setAccountStatus(nextStatus);
          toast.success(`Compte ${nextStatus.toLowerCase()} avec succes`);
          setIsAccountDialogOpen(false);
        }}
        title={
          accountStatus === 'Actif'
            ? 'Confirmer la suspension'
            : 'Confirmer la reactivation'
        }
        description={
          accountStatus === 'Actif'
            ? `Voulez-vous suspendre le compte de ${parent.name} ?`
            : `Voulez-vous reactiver le compte de ${parent.name} ?`
        }
        variant='destructive'
        confirmText='Confirmer'
        cancelText='Annuler'
      />
    </div>
  );
}
