'use client';

import { CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ParentPaymentRecord } from '../../types';

interface ParentPaymentHistoryCardProps {
  payments: ParentPaymentRecord[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ParentPaymentHistoryCard({
  payments,
  currentPage,
  totalPages,
  onPageChange
}: ParentPaymentHistoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CreditCard className='h-5 w-5' />
          Historique paiements
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='rounded-lg border overflow-hidden'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Methode</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((record, index) => (
                <TableRow
                  key={record.id}
                  className={`hover:bg-muted/40 transition-colors ${
                    index % 2 === 0 ? 'bg-muted/20' : ''
                  }`}
                >
                  <TableCell className='font-medium'>{record.date}</TableCell>
                  <TableCell>{record.amount}</TableCell>
                  <TableCell>{record.method}</TableCell>
                  <TableCell>
                    <Badge
                      className='text-xs border-transparent hover:opacity-90'
                      style={
                        record.status === 'Reussi'
                          ? { backgroundColor: '#043535', color: '#ffffff' }
                          : record.status === 'En attente'
                            ? { backgroundColor: '#4bc2b1', color: '#043535' }
                            : undefined
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <p className='text-muted-foreground'>
            Page {currentPage} sur {totalPages}
          </p>

          <div className='flex gap-2'>
            <Button
              size='sm'
              variant='outline'
              disabled={currentPage === 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            >
              Precedent
            </Button>

            <Button
              size='sm'
              variant='outline'
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            >
              Suivant
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
