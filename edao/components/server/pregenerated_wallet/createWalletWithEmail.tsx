"use server";

export const createWalletWithEmail = async (email: string) => {
    try {
        // Construct the URL with the specified parameters
        const url = `https://lookup.web3auth.io/lookup?verifier=edao-social-login&verifierId=${encodeURIComponent(email)}&web3AuthNetwork=sapphire_devnet&clientId=BEHBx80k-JYOdHLtRlv_M7jqtjQt1ttpBm8w5S9F0oZQnquwpd4Il_zXFYgToNzz9uJ7XVBa7SVfAjj1PA1A4m8&`;

        // Send the GET request
        const response = await fetch(url);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response
        const walletData = await response.json();

        // Return the wallet data
        return walletData;
    } catch (error) {
        console.error("Failed to create wallet:", error);
        throw error; // Re-throw the error after logging it
    }
};

//example of response {
//     "data": {
//       "evmAddress": "0x617A5D1c2f32d92716052bA7766db5923f796068",
//       "X": "5debc3773e5be372174ffa912885cf347d37209c13421727b8bac8749562cbb6",
//       "Y": "9cf09b13efaac36d3a6cf5009bb2b8e86da47d02bdc68f5ca1c5defeb3390a45",
//       "isMfaEnabled": false
//     },
//     "success": true
//   }
  