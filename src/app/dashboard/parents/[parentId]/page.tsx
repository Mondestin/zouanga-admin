import PageContainer from '@/components/layout/page-container';
import { mockParents } from '@/features/parents/mock-data';
import ParentDetailsView from '@/features/parents/components/parent-details-view';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ parentId: string }>;
};

export const metadata = {
  title: 'Tableau de bord : Details parent'
};

export default async function ParentDetailsPage(props: PageProps) {
  const { parentId } = await props.params;
  const parent = mockParents.find((item) => item.id === Number(parentId));

  if (!parent) {
    notFound();
  }

  return (
    <PageContainer scrollable={false}>
      <ParentDetailsView parent={parent} />
    </PageContainer>
  );
}
