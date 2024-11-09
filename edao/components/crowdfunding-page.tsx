'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { LogOut, Settings, User, Search, TrendingUp, Clock, Users, DollarSign, Heart } from "lucide-react"

// Mock data for crowdfunding campaigns
const campaigns = [
  { id: 1, title: "Eco-Friendly Water Bottle", description: "Reduce plastic waste with our innovative design", goal: 50000, raised: 32500, backers: 650, daysLeft: 15, image: "/placeholder.svg?height=200&width=400" },
  { id: 2, title: "Educational App for Kids", description: "Making learning fun and interactive for children", goal: 75000, raised: 45000, backers: 890, daysLeft: 22, image: "/placeholder.svg?height=200&width=400" },
  { id: 3, title: "Community Garden Project", description: "Creating green spaces in urban areas", goal: 30000, raised: 28500, backers: 420, daysLeft: 5, image: "/placeholder.svg?height=200&width=400" },
  { id: 4, title: "Renewable Energy Startup", description: "Developing affordable solar solutions", goal: 100000, raised: 75000, backers: 1200, daysLeft: 30, image: "/placeholder.svg?height=200&width=400" },
  { id: 5, title: "Indie Film Production", description: "Supporting local artists and storytellers", goal: 60000, raised: 18000, backers: 300, daysLeft: 45, image: "/placeholder.svg?height=200&width=400" },
]

export default function ModernCrowdfundingPage() {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "https://github.com/shadcn.png",
  })

  const handleSignOut = () => {
    // Implement sign out logic here
    console.log("User signed out")
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
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">CrowdFund</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input type="search" placeholder="Search campaigns" className="pl-8 w-64" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
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
            <Card key={campaign.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0">
                <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{campaign.title}</CardTitle>
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
              <CardFooter className="flex justify-between p-6 pt-0">
                <Button variant="outline" className="w-full mr-2">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button className="w-full ml-2 bg-secondary hover:bg-secondary/90">
                  Back Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}