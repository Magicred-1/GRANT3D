'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { DollarSign, Users, Clock, Heart, Share2, Facebook, Twitter, Linkedin, Mail, User, MapPin, Calendar, Award } from "lucide-react"
import Header from './Header'

// Mock data for the campaign
const campaign = {
  id: 1,
  title: "Eco-Friendly Water Bottle",
  description: "Our innovative design helps reduce plastic waste while keeping your drinks at the perfect temperature. Join us in making a difference for our planet!",
  longDescription: "Our eco-friendly water bottle is designed with sustainability and functionality in mind. Made from recycled materials, this bottle features double-wall insulation to keep your drinks cold for up to 24 hours or hot for up to 12 hours. The unique filtration system ensures your water stays pure and fresh-tasting, while the sleek design makes it perfect for on-the-go use. By choosing our bottle, you're not only investing in a high-quality product but also contributing to the reduction of single-use plastics. Let's work together to create a more sustainable future!",
  goal: 50000,
  raised: 32500,
  backers: 650,
  daysLeft: 15,
  images: [
    "/placeholder.svg?height=400&width=800&text=Product+Image+1",
    "/placeholder.svg?height=400&width=800&text=Product+Image+2",
    "/placeholder.svg?height=400&width=800&text=Product+Image+3",
    "/placeholder.svg?height=400&width=800&text=Product+Image+4",
  ],
  author: {
    name: "Sarah Green",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "San Francisco, CA",
    campaigns: 3,
    backedCampaigns: 12
  },
  school: {
    name: "Green Valley High School",
    location: "San Francisco",
    country: "United States",
    admin: {
      name: "Mr. James Smith",
      email: "james.smith@greenvalley.edu"
    }
  },
  updates: [
    { date: "2023-05-01", title: "Production Update", content: "We've finalized the design and are moving into the production phase!" },
    { date: "2023-04-15", title: "New Color Options", content: "Based on backer feedback, we're adding two new color options: Ocean Blue and Forest Green." }
  ],
  comments: [
    { user: "John D.", date: "2023-05-02", content: "Can't wait to get my hands on this bottle! Great initiative!" },
    { user: "Emma S.", date: "2023-04-30", content: "How durable is the material? Will it withstand accidental drops?" }
  ]
}

export function CampaignDetails({ id }: { id: number } = { id: 1 }) {
  const [isLiked, setIsLiked] = useState(false)

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Carousel className="w-full mb-6">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{campaign.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{campaign.description}</p>
            <Tabs defaultValue="story" className="w-full">
              <TabsList>
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
              <TabsContent value="story">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 dark:text-gray-300">{campaign.longDescription}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="updates">
                <Card>
                  <CardContent className="pt-6">
                    {campaign.updates.map((update, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h3 className="text-lg font-semibold">{update.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{update.date}</p>
                        <p>{update.content}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="comments">
                <Card>
                  <CardContent className="pt-6">
                    {campaign.comments.map((comment, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <p className="font-semibold">{comment.user}</p>
                        <p className="text-sm text-gray-500 mb-2">{comment.date}</p>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2 mb-4" />
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-2xl font-bold">${campaign.raised.toLocaleString()}</p>
                    <p className="text-gray-500">raised of ${campaign.goal.toLocaleString()} goal</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{campaign.backers}</p>
                    <p className="text-gray-500">backers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{campaign.daysLeft}</p>
                    <p className="text-gray-500">days left</p>
                  </div>
                </div>
                <Button className="w-full mb-4 bg-secondary hover:bg-secondary/90">Back This Project</Button>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setIsLiked(!isLiked)}>
                    <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>About the Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={campaign.author.avatar} alt={campaign.author.name} />
                    <AvatarFallback>{campaign.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{campaign.author.name}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {campaign.author.location}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{campaign.author.campaigns} Campaigns</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    <span>{campaign.author.backedCampaigns} Backed</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Contact Creator</Button>
              </CardFooter>
            </Card>

            {/* School Details */}
            <Card>
              <CardHeader>
                <CardTitle>School Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-semibold mb-2">School Name:</p>
                  <p>{campaign.school.name}</p>
                  <p className="font-semibold mb-2 mt-4">Location:</p>
                  <p>{campaign.school.location}, {campaign.school.country}</p>
                  <p className="font-semibold mb-2 mt-4">School Admin:</p>
                  <p>{campaign.school.admin.name}</p>
                  <p className="text-gray-500">{campaign.school.admin.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
