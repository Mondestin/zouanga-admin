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

const kycQueue = [
  {
    driver: 'Frantz Moise',
    fleet: 'Flotte Metro',
    documents: 'Permis, Casier judiciaire',
    risk: 'Faible'
  },
  {
    driver: 'Anna Charles',
    fleet: 'Independant',
    documents: 'Permis uniquement',
    risk: 'Eleve'
  },
  {
    driver: 'Rony Joseph',
    fleet: 'CityRide Transport',
    documents: 'Permis, Assurance, Certificat medical',
    risk: 'Moyen'
  }
];

export default function KycReviewBoard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File de revision KYC</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chauffeur</TableHead>
              <TableHead>Flotte</TableHead>
              <TableHead>Documents soumis</TableHead>
              <TableHead>Risque</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kycQueue.map((row) => (
              <TableRow key={row.driver}>
                <TableCell>{row.driver}</TableCell>
                <TableCell>{row.fleet}</TableCell>
                <TableCell>{row.documents}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.risk === 'Eleve'
                        ? 'destructive'
                        : row.risk === 'Moyen'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {row.risk}
                  </Badge>
                </TableCell>
                <TableCell className='space-x-2'>
                  <Button size='sm' variant='outline'>
                    Demander une mise a jour
                  </Button>
                  <Button size='sm'>Approuver</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
