"use client";

import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  Heart,
  ThumbsUp,
  PiggyBank,
  Save,
  Car,
  View,
} from "lucide-react";
import Header from "./Header";
import useWindowSize from "react-use/lib/useWindowSize";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useRouter } from "next/navigation";

const fetchCampaigns = async () => {
  const response = await fetch("/api/campaigns/get");
  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }
  const data = await response.json();
  return data.data;
};

export default function ModernCrowdfundingPage() {
  console.log("ModernCrowdfundingPage");
  interface Campaign {
    id: number;
    title: string;
    description: string;
    ipfsImages: string[];
    raised: number;
    goal: number;
    deadline: string;
  }

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const router = useRouter();

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const campaignsData = await fetchCampaigns();
        setCampaigns(campaignsData);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setCampaigns([]); // Set campaigns to an empty array on error
      }
    };
    console.log("");
    console.log("");
    console.log("");
    console.log("campaigns", campaigns);
    console.log("");
    console.log("");
    console.log("");

    loadCampaigns();
  }, []);

  const [voteCount, setVoteCount] = useState(0);
  const handleVote = (id: number, increment: number) => {
    setVoteCount((prevCount) => prevCount + 1);
    console.log("voteCount", voteCount);

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500); // Hide confetti after 1.5 seconds
  };

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
        {campaigns && campaigns.length > 0 ? (
          <>
            {showConfetti && (
              <Confetti
                width={width}
                height={height}
                numberOfPieces={100}
                style={{ zIndex: 10, position: "fixed" }}
              />
            )}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Trending Campaigns
              </h2>
              <Button variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader className="p-0">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {campaign.ipfsImages &&
                        campaign.ipfsImages.length > 0 ? (
                          campaign.ipfsImages.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="p-1">
                                <img
                                  src={image}
                                  alt={`${campaign.title} - Image ${index + 1}`}
                                  className="w-full h-[200px] object-cover rounded-lg"
                                />
                              </div>
                            </CarouselItem>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 p-5 w-8 h-8"
                      aria-label="Vote up"
                      onClick={() => handleVote(campaign.id, 1)}
                    >
                      <div className="flex items-center justify-center h-full w-full gap-1">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        {voteCount}
                      </div>
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">
                        {campaign.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="mb-4">
                      {campaign.description}
                    </CardDescription>
                    {/* <Progress
                      value={(campaign.raised / campaign.goal) * 100}
                      className="h-2 mb-4"
                    /> */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                        <span className="font-medium">0</span>
                        <span className="text-muted-foreground ml-1">
                          raised
                        </span>
                      </div>
                      <div className="flex items-center justify-end">
                        <Users className="mr-2 h-4 w-4 text-blue-500" />
                        <span className="font-medium">0</span>
                        <span className="text-muted-foreground ml-1">
                          backers
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                        <span className="font-medium">
                          {new Date(campaign.deadline).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )}
                        </span>{" "}
                        <span className="text-muted-foreground ml-1">
                          deadline
                        </span>
                      </div>
                      <div className="flex items-center justify-end">
                        <DollarSign className="mr-2 h-4 w-4 text-purple-500" />
                        <span className="font-medium">${campaign.goal}</span>
                        <span className="text-muted-foreground ml-1">goal</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-6 pt-0">
                    <Button variant="outline" className="w-full mr-2"
                      onClick={() => {
                        router.push(`/campaigns/${campaign.id}`);
                      }}
                    >
                      <View className="mr-2 h-4 w-4" />
                      View More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p>Loading campaigns...</p>
          </div>
        )}
      </main>
    </div>
  );
}
