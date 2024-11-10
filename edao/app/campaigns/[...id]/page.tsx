import { CampaignDetails } from '@/components/campaign-details'

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const id = (await params).id
  console.log('id', id)
  return <CampaignDetails id={1} />;
}
