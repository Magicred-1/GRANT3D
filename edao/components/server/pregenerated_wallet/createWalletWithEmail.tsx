"use server";

const createWalletWithEmail = async (email: string) => {
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