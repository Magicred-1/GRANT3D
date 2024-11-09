"use client";

import React, { useState } from "react";
import pinFileToIPFS from "../../lib/pinFileToIpfs";

const UploadButton: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    try {
      const url = await pinFileToIPFS(selectedFile);
      setIpfsUrl(url);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {ipfsUrl && (
        <p className="mt-4">
          File uploaded to IPFS:{" "}
          <a
            href={ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            {ipfsUrl}
          </a>
        </p>
      )}
    </div>
  );
};

export default UploadButton;
