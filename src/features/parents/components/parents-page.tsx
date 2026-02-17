import { Heading } from '@/components/ui/heading';
import ParentListingPage from './parent-listing';

export default function ParentsPage() {
  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading
        title='Parents'
        description='Liste et suivi des comptes parents.'
      />
      <ParentListingPage />
    </div>
  );
}
