'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, Calendar, DollarSign, Award, Edit2, Save, Wallet, QrCode } from "lucide-react"
import { useXRPL } from '@/components/web3auth/XRPLProvider/useXRPL'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Header from '@/components/Header'
import { QRCodeDialog } from '@/components/dialogs/WalletDialog'

const userData = {
  name: "Alice Johnson",
  email: "djasongadiou@gmail.com",
  avatar: "/placeholder.svg?height=128&width=128",
  location: "New York, NY",
  joinDate: "January 2022",
  bio: "Passionate about technology and sustainability.",
  campaignsCreated: 3,
  campaignsBacked: 15,
  totalAmountBacked: 2500,
  recentActivity: [
    { type: "backed", name: "Eco-Friendly Water Bottle", date: "2023-05-15", amount: 50 },
    { type: "created", name: "Urban Gardening Kit", date: "2023-04-20" },
    { type: "backed", name: "Sustainable Fashion Line", date: "2023-03-10", amount: 100 },
  ]
}

const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(userData)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false)
  const [userInformations, setUserInformations] = useState(null)

  const { getAccounts, getUserInfo } = useXRPL()

  useEffect(() => {
    const fetchWalletAddress = async () => {
      const address = await getAccounts()
      console.log(address)
      setWalletAddress(address.account)
    }
    fetchWalletAddress()
  }, [getAccounts])

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo()
      setUserInformations(userInfo)
    }
    fetchUserInfo()
  }, [getUserInfo])

  const handleEdit = () => setIsEditing(true)

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving user data:", editedUser)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
  }

  const openQRCodeDialog = () => walletAddress && setIsQRCodeOpen(true)
  const closeQRCodeDialog = () => setIsQRCodeOpen(false)

  return (
    <div className="min-h-screen bg-viovio/25 dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Profile</CardTitle>
                  {isEditing ? (
                    <Button onClick={handleSave} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  ) : (
                    <Button onClick={handleEdit} size="sm" variant="outline">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src={editedUser.avatar} alt={editedUser.name || userData.name} />
                    <AvatarFallback>{(editedUser.name || userData.name).split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={editedUser.name}
                      onChange={handleChange}
                      className="text-center text-2xl font-bold mb-2"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold mb-2">{editedUser.name || userData.name}</h2>
                  )}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {isEditing ? (
                      <Input
                        name="location"
                        value={editedUser.location}
                        onChange={handleChange}
                        className="text-center"
                      />
                    ) : (
                      editedUser.location || userData.location
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {editedUser.joinDate || userData.joinDate}
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium">Bio</span>
                  </div>
                  {isEditing ? (
                    <Input
                      name="bio"
                      value={editedUser.bio}
                      onChange={handleChange}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{editedUser.bio || userData.bio}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Wallet className="w-8 h-8 text-primary mb-2" />
                    <p className="text-2xl font-bold">{shortenAddress(walletAddress || "")}</p>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={openQRCodeDialog}>
                        <QrCode className="w-4 h-4" />
                        Show QR Code
                      </Button>
                      {isQRCodeOpen && (
                        <QRCodeDialog
                          walletAddress={walletAddress || ""}
                          isOpen={isQRCodeOpen}
                          onClose={closeQRCodeDialog}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
              </TabsList>
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(editedUser.recentActivity || userData.recentActivity).map((activity, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <p className="font-semibold">
                          {activity.type === 'backed' ? 'Backed' : 'Created'} {activity.name}
                        </p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                        {activity.amount && (
                          <p className="text-sm text-gray-600">Amount: ${activity.amount}</p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Crowdfunding Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Award className="w-8 h-8 text-primary mb-2" />
                        <p className="text-2xl font-bold">{editedUser.campaignsCreated || userData.campaignsCreated}</p>
                        <p className="text-sm text-gray-600">Campaigns Created</p>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <User className="w-8 h-8 text-primary mb-2" />
                        <p className="text-2xl font-bold">{editedUser.campaignsBacked || userData.campaignsBacked}</p>
                        <p className="text-sm text-gray-600">Campaigns Backed</p>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <DollarSign className="w-8 h-8 text-primary mb-2" />
                        <p className="text-2xl font-bold">${editedUser.totalAmountBacked || userData.totalAmountBacked}</p>
                        <p className="text-sm text-gray-600">Total Amount Backed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
