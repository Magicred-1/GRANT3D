/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Dialog
    , DialogTitle
    , DialogContent,
    DialogFooter
 } from "../ui/dialog";
import { Button } from "../ui/button";
import { useXRPL } from "../web3auth/XRPLProvider/useXRPL";
import { useEffect, useState } from "react";

// Define the KYC Dialog component
function KYCDialog({ open, onClose, onKYCComplete } : { open: boolean, onClose: () => void, onKYCComplete: (data: any) => void }) {
    const { getAccounts } = useXRPL(); // Get the XRPL provider
    const [setAccount, setAccountInfo] = useState<any>(null); // Define the account state

    useEffect(() => {
        // Fetch the account information
        const fetchAccount = async () => {
            const accountInfo = await getAccounts();
            setAccountInfo(accountInfo);
        };

        fetchAccount();
    }, []);

    // Function to handle KYC completion event from the external widget
    const handleKYCComplete = (walletAddress: any) => {
        onKYCComplete(setAccount); // Pass the KYC data to parent component or handler
        onClose(); // Close the dialog
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Verify Your Identity</DialogTitle>
            <DialogContent>
                {/* External KYC Widget */}
                {/* <ExternalKYCWidget onComplete={handleKYCComplete} /> */}
            </DialogContent>
            <DialogFooter>
                <Button onClick={onClose}>Cancel</Button>
            </DialogFooter>
        </Dialog>
    );
}

export default KYCDialog;
