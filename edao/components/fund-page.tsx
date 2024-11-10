/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ShieldCheck, Clock, PiggyBank, DollarSign } from "lucide-react"
import Header from './Header'
import { QRCodeSVG } from 'qrcode.react'
import { toast } from 'sonner'
import { sendReceipt } from './server/sendReceipt'
import { useXRPL } from './web3auth/XRPLProvider/useXRPL'

// Sample XRP reserve data
const initialXRPData = {
  totalReserves: 2000000,  // Amount in XRP tokens
  totalLiabilities: 1800000,  // Liabilities in XRP tokens
  lastAudit: '2023-10-01',
  auditStatus: 'Verified'
}

// XRP Wallet Address (Example)
const xrpWalletAddress = process.env.NEXT_PUBLIC_XRPL_ADDRESS || ""

export default function FundPage() {
  const [reserveData, setReserveData] = useState(initialXRPData)
  const [selectedTab, setSelectedTab] = useState("XRP")
  const [currency, setCurrency] = useState("USD")
  const [fiatAmount, setFiatAmount] = useState<number | string>("")
  const { getUserInfo } = useXRPL()

  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo()
      setUserInfo(userInfo)
    }
    fetchUserInfo()
  }, [])

  // Function to simulate refreshing proof of reserve data
  const refreshData = () => {
    setReserveData(prev => ({
      ...prev,
      totalReserves: prev.totalReserves + 10000, // Simulate increase
      lastAudit: new Date().toISOString().split('T')[0], // Update to today's date
      auditStatus: 'Verified'
    }))
  }

  function handleFiatDeposit(): void {
    if (fiatAmount === "" || isNaN(Number(fiatAmount))) {
      alert("Please enter a valid amount.")
      return
    }

    toast.success(`Deposited ${fiatAmount} ${currency} successfully!`)

    // { recipientEmail, firstName, associationName, associationAddress, siretNumber, donorAddress, donationAmount, donationDate }
    sendReceipt({
      recipientEmail: userInfo.email,
      firstName: userInfo.name,
      associationName: "DAO Fund",
      associationAddress: "123 Main St, San Francisco, CA",
      siretNumber: "123456789",
      donorAddress: xrpWalletAddress,
      donationAmount: fiatAmount.toString(),
      donationDate: new Date().toISOString().split('T')[0]
  })
  }

  return (
    <main>
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Card className="mb-6 flex flex-col items-center justify-center p-10">
          <CardHeader className="flex flex-col items-center justify-center text-center">
            <Button variant="outline" onClick={refreshData} className="flex items-center mb-4">
              <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
              Refresh Proof
            </Button>
            <PiggyBank className="text-pink-500 h-40 w-40 mb-4" />
            <CardTitle className="text-4xl font-bold">DAO Fund Balance</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-5xl font-bold text-green-600 mb-4">{reserveData.totalReserves.toLocaleString()} XRP</div>
            <div className="flex items-center mb-6">
              <Clock className="mr-2 h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Last Audit: {reserveData.lastAudit}</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="flex items-center">
                  <DollarSign /> Deposit funds
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Deposit Funds</DialogTitle>
                  <DialogDescription>Select currency type to deposit.</DialogDescription>
                </DialogHeader>
                
                <div className="mt-4 flex space-x-4">
                  <Button variant={selectedTab === "XRP" ? "default" : "outline"} onClick={() => setSelectedTab("XRP")}>
                    XRP
                  </Button>
                  <Button variant={selectedTab === "FIAT" ? "default" : "outline"} onClick={() => setSelectedTab("FIAT")}>
                    FIAT
                  </Button>
                </div>
                
                {selectedTab === "XRP" && (
                  <div className="mt-4 flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-2">Deposit in XRP</h3>
                    <p className="text-sm text-gray-700 mb-4">Scan the QR code or use the wallet address below to deposit XRP.</p>
                    
                    {/* QR Code for XRP Wallet Address */}
                    <QRCodeSVG value={xrpWalletAddress} size={150} className="mb-4" />
                    <div className="text-xs text-gray-600 mb-4">
                      Wallet Address: {xrpWalletAddress}
                    </div>

                    <Button variant="default">Confirm XRP Deposit</Button>
                  </div>
                )}
                
                {selectedTab === "FIAT" && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Deposit in FIAT</h3>
                    <p className="text-sm text-gray-700 mb-4">Enter the amount and currency you would like to deposit.</p>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input
                        type="number"
                        value={fiatAmount}
                        onChange={(e) => setFiatAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <Button variant="default" onClick={handleFiatDeposit}>Confirm FIAT Deposit</Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}