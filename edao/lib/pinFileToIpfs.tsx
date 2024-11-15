/* eslint-disable @typescript-eslint/no-explicit-any */

export function convertObjectToFile(object: any): File {
  const blob = new Blob([JSON.stringify(object)], {
    type: "application/json",
  });
  return new File([blob], "metadata.json");
}

async function pinFileToIPFS(file: File): Promise<string> {
  if (!process.env.NEXT_PUBLIC_PINATA_JWT_TOKEN) {
    throw new Error(
      "NEXT_PUBLIC_PINATA_JWT_TOKEN key not defined in .env file"
    );
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT_TOKEN}`,
    },
    body: formData,
  });
  const jsonres = await res.json();
  const url =
    "https://tomato-impossible-bass-656.mypinata.cloud/ipfs/" +
    jsonres.IpfsHash;

  return url;
}

export default pinFileToIPFS;
