'use client'

import { useState } from 'react'
import Confetti from 'react-confetti'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Users, DollarSign, ThumbsUp, Eye } from "lucide-react"
import Header from './Header'
import useWindowSize from 'react-use/lib/useWindowSize'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useRouter } from 'next/navigation'

// Mock data for crowdfunding campaigns
const initialCampaigns = [
  { 
    id: 1, 
    title: "Espoir",
    description: "Stanford - Computer Science MBA", 
    goal: 50000, 
    raised: 32500, 
    backers: 650,
    daysLeft: 15, 
    images: [
      "/profile-pic-1.JPG",
      "/placeholder.svg?height=200&width=400&text=Image+2",
      "/placeholder.svg?height=200&width=400&text=Image+3"
    ], 
    votes: 0 
  },
  { 
    id: 2, 
    title: "Jim",
    description: "MIT - Blockchain Engineering", 
    goal: 75000, 
    raised: 45000, 
    backers: 890, 
    daysLeft: 22, 
    images: [
      "/profile-pic-2.JPG",
      "/placeholder.svg?height=200&width=400&text=Image+2",
      "/placeholder.svg?height=200&width=400&text=Image+3"
    ], 
    votes: 0 
  },
  { 
    id: 3, 
    title: "Rahul",
    description: "UCLA - Digital Marketing", 
    daysLeft: 30, 
    images: [
      "/profile-pic-3.JPG",
      "/placeholder.svg?height=200&width=400&text=Image+2",
      "/placeholder.svg?height=200&width=400&text=Image+3"
    ], 
    votes: 0 
  },
]

export default function ModernCrowdfundingPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const router = useRouter()

  const handleVote = (id: number, increment: number) => {
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === id ? { ...campaign, votes: campaign.votes + increment } : campaign
      )
    )

    // Trigger confetti on upvote
    if (increment > 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1500) // Hide confetti after 1.5 seconds
    }
  }

  return (
    <div className="min-h-screen bg-viovio/25 dark:bg-gray-900">
      <style jsx global>{`
        :root {
          --primary: 261 100% 13%;
          --primary-foreground: 0 0% 100%;
          --secondary: 261 70% 40%;
          --secondary-foreground: 0 0% 100%;
        }
      `}</style>

      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={100} style={{ zIndex: 10, position: 'fixed' }}/>}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Trending Campaigns</h2>
          <Button variant="outline">
            <TrendingUp className="mr-2 h-4 w-4" />
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {campaigns.map((campaign) => (
            <Card key={campaign.id} className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {campaign.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <img src={image} alt={`${campaign.title} - Image ${index + 1}`} className="w-full h-[400px] object-cover rounded-lg" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
                {/* Upvote Button positioned at the top-right */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 p-5 w-8 h-8"
                  onClick={() => handleVote(campaign.id, 1)}
                  aria-label="Vote up"
                >
                  <div className="flex items-center justify-center h-full w-full gap-1">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    {campaign.votes}
                  </div>
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{campaign.title}</CardTitle>
                </div>
                <CardDescription className="mb-4">{campaign.description}</CardDescription>
                <Progress value={((campaign.raised ?? 0) / (campaign.goal ?? 1)) * 100} className="h-2 mb-4" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                    <span className="font-medium">${(campaign.raised ?? 0).toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">raised</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <Users className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="font-medium">{campaign.backers}</span>
                    <span className="text-muted-foreground ml-1">backers</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{campaign.daysLeft}</span>
                    <span className="text-muted-foreground ml-1">days left</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <DollarSign className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="font-medium">${(campaign.goal ?? 0).toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">goal</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-6 pt-0">
                <Button variant="outline" className="w-full mr-2"
                   onClick={
                    () => {
                      router.push(`/campaigns/${campaign.id}`);
                    }
                  }
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
