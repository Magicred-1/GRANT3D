'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
import { User, MapPin, Award, LucideVerified, DollarSign, Users, Clock, PiggyBank } from "lucide-react"
import Header from './Header'
import { ShareDialog } from './dialogs/ShareDialog'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Campaign type definition for better type safety
type Campaign = {
  id: number;
  firstname: string;
  lastname: string;
  age: string;
  location: string;
  description: string;
  longDescription: string;
  uniPic: string;
  linkVideo: string;
  goal: number;
  raised: number;
  backers: number;
  daysLeft: number;
  author: {
    id: number;
    name: string;
    avatar: string;
    location: string;
    campaigns: number;
    backedCampaigns: number;
  };
  school: {
    name: string;
    cursus: string;
    location: string;
    country: string;
    admin: {
      name: string;
      email: string;
    };
  };
};

// Mock data for the campaign
const campaigns: { [key: number]: Campaign } = {
  1:{
  id: 1,
  firstname:"Joyce",
  lastname:"DIABE",
  age:"17 years-old",
  location:"Kenya",
  description: "Our innovative design helps reduce plastic waste while keeping your drinks at the perfect temperature. Join us in making a difference for our planet!",
  longDescription: "My name is Espoir, and I’m a 17-year-old from a small village in Kenya with a big dream. Growing up, I fell in love with science and technology, often walking miles to reach the nearest library and learn all I could. My hard work has paid off—I’ve been accepted to Stanford University. This opportunity feels like a dream, but without financial support, I won’t be able to make it a reality. I’m reaching out for help to make this journey possible. With a Stanford education, I hope to return to Kenya and develop sustainable energy solutions, improve healthcare, and create opportunities for others in my community. Your support can help me bridge the gap between where I am and where I dream to be, turning my vision into real change for my community.",
  uniPic: "/uni-1.png",
  linkVideo: "https://www.youtube.com/embed/1ljXYsX6r0c",
  goal: 50000,
  raised: 32500,
  backers: 650,
  daysLeft: 15,
  author: {
    id: 1,
    name: "Sarah Green",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "San Francisco, CA",
    campaigns: 3,
    backedCampaigns: 12
  },
  school: {
    name: "Stanford University",
    cursus: "Computer Science MBA",
    location: "San Francisco",
    country: "United States",
    admin: {
      name: "Mr. James Smith",
      email: "james.smith@greenvalley.edu"
    }
  }
},

2:{
  id: 2,
  firstname:"Jim",
  lastname:"YUANG",
  age:"21 years-old",
  location:"China",
  description: "Our innovative design helps reduce plastic waste while keeping your drinks at the perfect temperature. Join us in making a difference for our planet!",
  longDescription: "My name is Jim, a 21-year-old from a small town in China, and I have a dream to study at MIT to become a blockchain engineer. Growing up, I became fascinated with technology and how it can transform entire communities. I spent every moment I could learning about blockchain, even teaching myself to code at a local internet cafe. Now, my dedication has opened an incredible door—I've been accepted to MIT. But without financial support, this once-in-a-lifetime opportunity will remain out of reach. I’m asking for your support to help me get there. With an education from MIT, I aim to return to China and develop blockchain applications that create economic opportunities, improve transparency, and empower people in underserved communities. Your support will turn my dream into real impact, helping me bring innovation back to where it's needed most.",
  uniPic: "/uni-2.jpg",
  linkVideo: "https://www.youtube.com/embed/4rj0U1_6oQc",
  goal: 50000,
  raised: 32500,
  backers: 650,
  daysLeft: 15,
  author: {
    id: 1,
    name: "Sarah Green",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "San Francisco, CA",
    campaigns: 3,
    backedCampaigns: 12
  },
  school: {
    name: "Massachusetts Institute of Technology",
    cursus:"Blockchain Engineering",
    location: "San Francisco",
    country: "United States",
    admin: {
      name: "Mr. James Smith",
      email: "james.smith@greenvalley.edu"
    }
  }
},

3:{
  id: 3,
  firstname:"Rahul",
  lastname:"Agarwal",
  age:"25 years-old",
  location:"India",
  description: "Our innovative design helps reduce plastic waste while keeping your drinks at the perfect temperature. Join us in making a difference for our planet!",
  longDescription: "My name is Rahul, I’m 25 years old, and I come from a small town in India with a dream to study Digital Marketing at UCLA. Photography has always been my passion—it’s my way of capturing stories and connecting with people. Over the years, I’ve worked hard to teach myself the fundamentals of marketing, knowing it could help me turn my love for photography into a meaningful career. Being accepted to UCLA is an incredible opportunity, but without financial support, it feels just out of reach. I’m reaching out for help to make this dream a reality. With a UCLA education in Digital Marketing, I hope to bring new ideas back to India, helping local artists and entrepreneurs reach larger audiences and tell their stories. Your support would not only help me pursue my passion but also empower me to uplift others through the power of storytelling and marketing.",
  uniPic: "/uni-3.svg",
  linkVideo: "https://www.youtube.com/embed/RltBPWLn8wo",
  goal: 50000,
  raised: 32500,
  backers: 650,
  daysLeft: 15,
  author: {
    id: 1,
    name: "Sarah Green",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "San Francisco, CA",
    campaigns: 3,
    backedCampaigns: 12
  },
  school: {
    name: "UCLA",
    cursus: "Digital Marketing",
    location: "San Francisco",
    country: "United States",
    admin: {
      name: "Mr. James Smith",
      email: "james.smith@greenvalley.edu"
    }
  }
},

}


export function CampaignDetails({ id }: { id: number } = { id: 1 }) {
  // const [isLiked, setIsLiked] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const router = useRouter()

  return (
    <div className="bg-viovio/25 w-full h-full flex flex-col items-center md:gap-10 gap-4 pb-20">
            
    <div className='w-full'>
    <Header/>
    </div>
        

    <div className="flex md:flex-row flex-col items-center md:gap-6 gap-2">

        <div className='flex flex-row md:gap-8 gap-2 py-4'>
        <Image 
          src={`/profile-pic-${id}.JPG`} 
          alt="profile pic" 
          height={75} 
          width={100} 
          className="md:h-[220px] md:w-[150px] rounded-[10px] object-cover"
        />
        <div className="flex flex-col md:text-4xl text-xl p-4 pl-0">
            <div>{campaigns[id].firstname} <span className="font-bold">{campaigns[id].lastname}</span></div>
            <div className=" font md:text-2xl text-lg">{campaigns[id].age} </div>
            <div className="flex flex-row md:text-2xl text-lg pt-3">
                <Image src="/location.svg" alt="" height={30} width={30}></Image>
                <div>{campaigns[id].location} </div>
            </div>
            
        </div>
        </div>


        <Card className="flex flex-col p-5 pb-0 rounded-lg bg-white md:text-2xl text-xl md:w-[40%] w-[80%]">
        <div className="flex flex-row justify-between">
            <div>
                Accepted to <br/>
                <span className="font-bold">{campaigns[id].school.name}</span> <br/> <br/>
                in <span className="font-bold">{campaigns[id].school.cursus}</span>
            </div>
            <Image src={campaigns[id].uniPic} alt="" height={150} width={150} style={{borderRadius:"10px", objectFit: "cover"}}></Image>
        </div>
        <CardContent className="p-6">
            <Progress value={70} className="h-2 mb-4" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-medium">$32500</span>
                <span className="text-muted-foreground ml-1">raised</span>
              </div>
              <div className="flex items-center justify-end">
                <Users className="mr-2 h-4 w-4 text-blue-500" />
                <span className="font-medium">650</span>
                <span className="text-muted-foreground ml-1">backers</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                <span className="font-medium">15</span>
                <span className="text-muted-foreground ml-1">days left</span>
              </div>
              <div className="flex items-center justify-end">
                <DollarSign className="mr-2 h-4 w-4 text-purple-500" />
                <span className="font-medium">$50000</span>
                <span className="text-muted-foreground ml-1">goal</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-6 pt-0">
            <Button variant="outline" className="w-full mr-2">
              <PiggyBank className="mr-2 h-4 w-4" />
              Support
            </Button>
            <div>
                <Button onClick={() => setIsShareDialogOpen(true)}>Share</Button>
                <ShareDialog id={campaigns[id].id} open={isShareDialogOpen} onClose={() => setIsShareDialogOpen(false)} />
              </div>
          </CardFooter>
    </Card>

    <Card className="md:py-5 flex flex-col md:gap-5 gap-0 md:w-[40%] w-[80%]">
          <CardHeader>
            <CardTitle>About the Creator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={campaigns[id].author.avatar} alt={campaigns[id].author.name} />
                <AvatarFallback>{campaigns[id].author.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-semibold">{campaigns[id].author.name}</p>
                  <LucideVerified className='text-blue-500'/>
                </div>
                <p className="text-sm text-gray-500 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {campaigns[id].author.location}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{campaigns[id].author.campaigns} Campaigns</span>
              </div>
              <div className="flex items-center">
                <Award className="mr-2 h-4 w-4" />
                <span>{campaigns[id].author.backedCampaigns} Supported</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full"
               onClick={() => {
                router.push(`/profile/${campaigns[id].author.id}`)
              }
              }
            >View Profile</Button>
          </CardFooter>
        </Card> 

          
    </div>

    <div className='flex md:flex-row flex-col gap-4 w-[90%]'>

    <Card className="py-5 px-8 md:text-lg text-sm">
        <span className="text-2xl font-bold">Story</span> <br/><br/>
        {campaigns[id].longDescription}
    </Card>

    <Card className="flex flex-col p-5 rounded-lg bg-white text-2xl text-center">

    <div className="font-bold pb-5">
    Presentation
    </div>

    <iframe 
        className="w-full md:w-[560px] h-[200px] md:h-[315px] rounded-[10px]"
        src={campaigns[id].linkVideo}
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
    />

</Card>

    </div>

    <div className="md:flex md:flex-row grid grid-cols-2 gap-8 justify-center items-center p-5">
        <div className="bg-vioviologo text-white text-lgi text-center p-4 rounded-xl cursor-pointer">
            Acceptance-letter.pdf
        </div>
        <div className="bg-vioviologo text-white text-lgi text-center p-4 rounded-xl cursor-pointer">
            Recommandation-letter-1.pdf
        </div>
        <div className="bg-vioviologo text-white text-lgi text-center p-4 rounded-xl cursor-pointer">
            Recommandation-letter-2.pdf
        </div>
        <div className="bg-vioviologo text-white text-lgi text-center p-4 rounded-xl cursor-pointer">
            Grades-files-2024.pdf
        </div>
    </div>  








    </div>
);
}
