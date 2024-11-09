'use client'

import { useState } from 'react'
import Confetti from 'react-confetti'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Users, DollarSign, Heart, ThumbsUp, PiggyBank, Save, Car } from "lucide-react"
import Header from './Header'
import useWindowSize from 'react-use/lib/useWindowSize'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'

// Mock data for crowdfunding campaigns
const initialCampaigns = [
  { 
    id: 1, 
    title: "Eco-Friendly Water Bottle", 
    description: "Reduce plastic waste with our innovative design", 
    goal: 50000, 
    raised: 32500, 
    backers: 650, 
    daysLeft: 15, 
    images: [
      "/placeholder.svg?height=200&width=400",
      "/placeholder.svg?height=200&width=400&text=Image+2",
      "/placeholder.svg?height=200&width=400&text=Image+3"
    ], 
    votes: 0 
  },
  { 
    id: 2, 
    title: "Educational App for Kids", 
    description: "Making learning fun and interactive for children", 
    goal: 75000, 
    raised: 45000, 
    backers: 890, 
    daysLeft: 22, 
    images: [
      "/placeholder.svg?height=200&width=400",
      "/placeholder.svg?height=200&width=400&text=Image+2",
      "/placeholder.svg?height=200&width=400&text=Image+3"
    ], 
    votes: 0 
  },
  { 
    id: 3, 
    title: "Community Garden Project", 
    description: "Creating green spaces in urban areas", 
    goal: 30000, 
    raised: 28500, 
    backers: 420, 
    daysLeft: 5, 
    images: [
      "/placeholder.svg?height=200&width=400",
      "/placeholder.svg?height=200&width=400&text=Image+2",
      "/placeholder.svg?height=200&width=400&text=Image+3"
    ], 
    votes: 0 
  },
  { 
    id: 4, 
    title: "Renewable Energy Startup", 
    description: "Developing affordable solar solutions", 
    goal: 100000, 
    raised: 75000, 
    backers: 1200, 
    daysLeft: 30, 
    images: [
      "/placeholder.svg?height=200&width=400",
      "/placeholder.svg?height=200&width=400&text=Image+2",
      "/placeholder.svg?height=200&width=400&text=Image+3"
    ], 
    votes: 0 
  },
  { 
    id: 5, 
    title: "Indie Film Production", 
    description: "Supporting local artists and storytellers", 
    goal: 60000, 
    raised: 18000, 
    backers: 300, 
    daysLeft: 45, 
    images: [
      "/placeholder.svg?height=200&width=400",
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                {showConfetti && <Confetti width={width} height={height} numberOfPieces={100}/>}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 p-0 w-8 h-8"
                  onClick={() => handleVote(campaign.id, 1)}
                  aria-label="Vote up"
                >
                  <div className="flex items-center justify-center h-full w-full gap-1">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    {campaign.votes}
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-10 p-0 w-8 h-8"
                  onClick={() => handleVote(campaign.id, -1)}
                  aria-label="Vote down"
                >
                  <div className="flex items-center justify-center h-full w-full gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                  </div>
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{campaign.title}</CardTitle>
                </div>
                <CardDescription className="mb-4">{campaign.description}</CardDescription>
                <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2 mb-4" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                    <span className="font-medium">${campaign.raised.toLocaleString()}</span>
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
                    <span className="font-medium">${campaign.goal.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">goal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
