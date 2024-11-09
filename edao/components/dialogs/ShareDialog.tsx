import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Link } from "lucide-react"
import { toast } from 'sonner'

type ShareDialogProps = {
  id: number
  open: boolean
  onClose: () => void
}

export function ShareDialog({ id, open, onClose }: ShareDialogProps) {
  const campaignLink = `https://example.com/campaign/${id}`

  const handleCopyLink = () => {
    toast.success("Link copied to clipboard!")
    navigator.clipboard.writeText(campaignLink)
  }

  useEffect(() => {
    if (!open) onClose()
  }, [open, onClose])

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogOverlay className="fixed inset-0 bg-gray-500 opacity-50" />
      <DialogContent className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto p-6 overflow-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Share this Campaign</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 overflow-auto max-h-[60vh]">
          <p className="text-gray-600 dark:text-gray-400">Share this campaign with your friends and followers!</p>
          <div className="flex flex-wrap space-x-4 justify-center">
            <Button variant="outline" className="flex items-center space-x-2">
              <Facebook className="text-blue-600" />
              <span>Facebook</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Twitter className="text-blue-400" />
              <span>Twitter</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Linkedin className="text-blue-700" />
              <span>LinkedIn</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2" onClick={handleCopyLink}>
              <Link />
              <span>Copy Link</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
