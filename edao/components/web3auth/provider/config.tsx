/* eslint-disable @typescript-eslint/no-explicit-any */

import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { XrplPrivateKeyProvider } from "@web3auth/xrpl-provider";
import { AuthAdapter, WHITE_LABEL_THEME, WhiteLabelData } from "@web3auth/auth-adapter";

// Create the configuration dynamically when running on the client side
let web3AuthContextConfig: any = null;

if (typeof window !== 'undefined') {
  // The code here will run only on the client-side
  import('@web3auth/no-modal').then(({ Web3AuthNoModal }) => {
    const clientId = 'BEHBx80k-JYOdHLtRlv_M7jqtjQt1ttpBm8w5S9F0oZQnquwpd4Il_zXFYgToNzz9uJ7XVBa7SVfAjj1PA1A4m8';

    const chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.OTHER,
      chainId: "0x2",
      rpcTarget: "https://testnet-ripple-node.tor.us",
      wsTarget: "wss://s.altnet.rippletest.net",
      ticker: "XRP",
      tickerName: "XRPL",
      displayName: "xrpl testnet",
      blockExplorerUrl: "https://testnet.xrpl.org",
    };

    const privateKeyProvider = new XrplPrivateKeyProvider({ config: { chainConfig } });

    const web3Auth = new Web3AuthNoModal({
      clientId,
      web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
      chainConfig,
      privateKeyProvider,
    });

    const authAdapter = new AuthAdapter({
        loginSettings: {
          mfaLevel: "mandatory", // default, optional, mandatory, none
        },
        adapterSettings: {
          uxMode: "redirect",
          loginConfig: {
            email_passwordless: {
              verifier: "edao-social-login", // Pass your verifier name
              verifierSubIdentifier: "email",
              typeOfLogin: "email_passwordless",
              clientId, // Pass the Web3Auth `Client ID` here.
            },
            google: {
              verifier: "edao-social-login", // Pass your verifier name
              verifierSubIdentifier: "google",
              typeOfLogin: "google",
              clientId: "901888887461-q5ngnuojmvd8vbpol2v3g8id39mb13v6.apps.googleusercontent.com", // Pass the Google `Client ID` here.
            },
          //   jwt: {
          //     verifier: "edao-social-login", // Pass the Verifier name here
          //     typeOfLogin: "jwt", // Pass on the login provider of the verifier you've created
          //     clientId: "hUVVf4SEsZT7syOiL0gLU9hFEtm2gQ6O", // Pass on the Auth0 `Client ID` here
          //   },
          },
          whiteLabel: {
            appName: "eDAOcation",
            appUrl: "https://xxxxxxx.com",
            logoLight: "https://web3auth.io/images/web3auth-logo.svg",
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl, tr
            mode: "auto", // whether to enable dark mode. defaultValue: auto
            theme: {
              primary: "#7f56d9",
            } as WHITE_LABEL_THEME,
            useLogoLoader: true,
          } as WhiteLabelData,
        },
      });

    web3Auth.configureAdapter(authAdapter);
    web3Auth.init();

    // Now we can export the web3AuthContextConfig after initialization
    web3AuthContextConfig = {
      web3AuthOptions: {
        clientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        chainConfig,
      },
      adapters: [authAdapter],
    };
  });
}

export { web3AuthContextConfig };
