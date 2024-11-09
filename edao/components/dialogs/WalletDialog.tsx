// components/QRCodeDialog.tsx
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QRCodeSVG } from "qrcode.react"

interface QRCodeDialogProps {
  isOpen: boolean
  onClose: () => void
  walletAddress: string | null
}

export const QRCodeDialog: React.FC<QRCodeDialogProps> = ({ isOpen, onClose, walletAddress }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>XRPL Deposit QR Code</DialogTitle>
          <DialogDescription>
            Scan the QR code to deposit to this wallet address.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mb-4">
          <QRCodeSVG value={walletAddress || ""} size={256} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
