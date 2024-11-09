'use client'


// import UserProfile from "@/hooks/user-profile";   
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {  Clock, Users, DollarSign, Heart } from "lucide-react"

const ProfileTestPage = () => {
    return (
        <div className="bg-viovio/25 w-full h-full flex flex-col items-center gap-10 pb-20">

 
        

        <div className="flex flex-row gap-10 pt-32">
            <Image src="/profile-pic-1.png" alt="profile pic" height={150} width={150}></Image>
            <div className="flex flex-col text-4xl pt-4">
                <div>Espoir <span className="font-bold">DIABE</span></div>
                <div className=" font text-2xl">17 years-old</div>
                <div className="flex flex-row text-2xl pt-3">
                    <Image src="/location.svg" alt="" height={30} width={30}></Image>
                    <div>Kenya</div>
                </div>
            </div>
        </div>

        <div className="flex md:flex-row flex-col w-[80%] justify-between">

        <div className="flex flex-col p-5 rounded-lg bg-white text-2xl">
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
                  <Heart className="mr-2 h-4 w-4" />
                  Like
                </Button>
              </CardFooter>
        </div>

        <div className="flex flex-col p-5 rounded-lg bg-white text-2xl text-center">

            <div className="font-bold pb-5">
            Presentation
            </div>

         

            <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/L9J6jSXsFK8" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{borderRadius: '10px'}}
        ></iframe>
           
        </div>

        </div>

        <div className="md:grid md:grid-cols-2 flex flex-col w-[80%] gap-4">
            <div className="bg-vioviologo text-white text-xl text-center p-3 rounded-xl">
                Acceptance-letter-Stanford.pdf
            </div>
            <div className="bg-vioviologo text-white text-xl text-center p-3 rounded-xl">
                Recommandation-letters.pdf
            </div>
            <div className="bg-vioviologo text-white text-xl text-center p-3 rounded-xl">
                Grades-files-2024.pdf
            </div>
        </div>


        </div>
    );
}

export default ProfileTestPage;