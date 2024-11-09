import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  associationName: string;
  associationAddress: string;
  siretNumber: string;
  donorAddress: string;
  donationAmount: string;
  donationDate: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  associationName,
  associationAddress,
  siretNumber,
  donorAddress,
  donationAmount,
  donationDate,
}) => (
  <div>
    <h1>Donation Receipt</h1>
    <p>Dear {firstName},</p>

    <p>Thank you for your generous donation! Below are the details of your contribution:</p>

    <h3>Receipt Details:</h3>
    <p><strong>Association:</strong> {associationName}</p>
    <p><strong>Association Address:</strong> {associationAddress}</p>
    <p><strong>SIRET Number:</strong> {siretNumber}</p>
    <p><strong>Donor Address:</strong> {donorAddress}</p>

    <h3>Donation Details:</h3>
    <p><strong>Amount Donated:</strong> {donationAmount}</p>
    <p><strong>Date of Donation:</strong> {donationDate}</p>

    <h3>Tax Information:</h3>
    <p>This donation entitles you to a tax reduction in accordance with Articles 200 and 238 bis of the CGI.</p>

    <p>Thank you again for your support!</p>

    <p>Best regards,</p>
    <p>{associationName} Team</p>
  </div>
);
