import { CampaignDetails } from '@/components/campaign-details'

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const id = (await params).id
  return <CampaignDetails id={1} />;
}
