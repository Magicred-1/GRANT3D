/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { Resend } from 'resend';
import { EmailTemplate } from './resend/sendReceiptModel';

// Initialize the Resend client with the API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendReceiptProps {
    recipientEmail: string;
    firstName: string;
    associationName: string;
    associationAddress: string;
    siretNumber: string;
    donorAddress: string;
    donationAmount: string;
    donationDate: string;
}

// Send a receipt to a customer
export async function sendReceipt({ firstName, associationName, associationAddress, siretNumber, donorAddress, donationAmount, donationDate }: SendReceiptProps): Promise<{ data: any; error: any;
}> {
  try {
    // Send the receipt
    const { data, error } = await resend.emails.send({
        from: 'Contact <contact@grant3d.xyz>',
        to: ["djason.gadiou.sio@gmail.com"],
        subject: 'Donation Receipt',
        react: EmailTemplate({
          firstName,
          associationName,
          associationAddress,
          siretNumber,
          donorAddress,
          donationAmount,
          donationDate,
        }),
      });

    return { data, error };
    } catch (error) {
        console.error('Error sending receipt:', error);
        return { data: null, error };
    }
}
