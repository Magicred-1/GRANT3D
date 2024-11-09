import { CampaignDetails } from '@/components/campaign-details'
 
export default async function Page({
    params,
  }: {
    params: { slug: number }
  }) {
    const slug = params.slug

    // if (!slug) {
    //   return null
    // }

    return <CampaignDetails id={slug} />;
}