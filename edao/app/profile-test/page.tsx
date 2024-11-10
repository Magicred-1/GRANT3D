'use client'


// import UserProfile from "@/hooks/user-profile";   
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {  Clock, Users, DollarSign, PiggyBank, Award, User, LucideVerified, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { ShareDialog } from "@/components/dialogs/ShareDialog";
import { useState } from "react";

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
      id: 1,
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

const ProfileTestPage = () => {
    const router = useRouter()
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
    return (
        <div className="bg-viovio/25 w-full h-full flex flex-col items-center gap-10 pb-20">
            

 
        

        <div className="flex flex-row gap-6 pt-32">

            <Image src="/profile-pic-1.JPG" alt="profile pic" height={150} width={220} style={{borderRadius:"10px"}}></Image>
            <div className="flex flex-col text-4xl p-4 pl-0">
                <div>Espoir <span className="font-bold">DIABE</span></div>
                <div className=" font text-2xl">17 years-old</div>
                <div className="flex flex-row text-2xl pt-3">
                    <Image src="/location.svg" alt="" height={30} width={30}></Image>
                    <div>Kenya</div>
                </div>
                
            </div>
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
                    <div className="flex items-center gap-1">
                      <p className="font-semibold">{campaign.author.name}</p>
                      <LucideVerified className='text-blue-500'/>
                    </div>
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
                <Button variant="outline" className="w-full"
                   onClick={() => {
                    router.push(`/profile/${campaign.author.id}`)
                  }
                  }
                >View Profile</Button>
              </CardFooter>
            </Card> 

        <div className="flex flex-col gap-4 justify-center p-5">
            <div className="bg-vioviologo text-white text-lgi text-center p-3 rounded-xl">
                Acceptance-letter-Stanford.pdf
            </div>
            <div className="bg-vioviologo text-white text-lgi text-center p-3 rounded-xl">
                Recommandation-letter-1.pdf
            </div>
            <div className="bg-vioviologo text-white text-lgi text-center p-3 rounded-xl">
                Recommandation-letter-2.pdf
            </div>
            <div className="bg-vioviologo text-white text-lgi text-center p-3 rounded-xl">
                Grades-files-2024.pdf
            </div>
        </div>            
        </div>

        <Card className="p-5 w-[80%]">
            <span className="text-2xl font-bold">Story</span> <br/><br/>
            My name is Espoir, and I’m a 17-year-old from a small village in Kenya with a big dream. Growing up, I fell in love with science and technology, often walking miles to reach the nearest library and learn all I could. My hard work has paid off—I’ve been accepted to Stanford University. This opportunity feels like a dream, but without financial support, I won’t be able to make it a reality.
          
            I’m reaching out for help to make this journey possible. With a Stanford education, I hope to return to Kenya and develop sustainable energy solutions, improve healthcare, and create opportunities for others in my community. Your support can help me bridge the gap between where I am and where I dream to be, turning my vision into real change for my community.
        </Card>

        <div className="flex md:flex-row flex-col w-[80%] justify-between">

        <Card className="flex flex-col p-5 pb-0 rounded-lg bg-white text-2xl">
            <div className="flex flex-row justify-between">
                <div>
                    Accepted to <br/>
                    <span className="font-bold">Stanford University</span> <br/> <br/>
                    in <span className="font-bold">Computer Science MBA</span>
                </div>
                <Image src="/stanford.png" alt="" height={150} width={150}></Image>
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
                    <ShareDialog id={campaign.id} open={isShareDialogOpen} onClose={() => setIsShareDialogOpen(false)} />
                  </div>
              </CardFooter>
        </Card>

        <Card className="flex flex-col p-5 rounded-lg bg-white text-2xl text-center">

            <div className="font-bold pb-5">
            Presentation
            </div>

         

            <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/1ljXYsX6r0c" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{borderRadius: '10px'}}
        ></iframe>
           
        </Card>

        </div>




        </div>
    );
}

export default ProfileTestPage;