// Import necessary libraries and modules
import * as waxjs from "@waxio/waxjs/dist";
import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";
import { clearMyNfts } from "./GlobalState/NftsSlice/nftsSlice";
import { store } from "./GlobalState/Store";
import { setWaxData, setWaxLogout } from "./GlobalState/UserReducer";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

// Class to manage user data; it will be saved on Login and deleted on Logout
// Switching testnet from true to false you will turn on mainnet
export class User {
  // Application name
  appName = "Trilium Marketplace";

  // Static instance of the User class
  static instance;
  
  // Testnet flag; switch to true for testnet, false for mainnet
  static testnet = false;

  // WAX blockchain configuration

  // Testnet and mainnet RPC endpoints
  static rpcEndpoint = User.testnet
    ? "https://testnet.wax.pink.gg"
    : 'https://wax.cryptolions.io';

  // AnchorLink configuration
  static transport = new AnchorLinkBrowserTransport();
  static anchorLink = new AnchorLink({
    transport: User.transport,
    chains: [
      {
        chainId: User.testnet
          ? "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12"
          : "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
        nodeUrl: User.testnet
          ? "https://wax-testnet.eosphere.io"
          : "https://wax.eosphere.io",
      },
    ],
  });

  // WaxJS configuration
  static wax = new waxjs.WaxJS({
    rpcEndpoint: User.rpcEndpoint,
    tryAutoLogin: true,
  });

  

  // Wax session and Anchor session
  waxSession = undefined;
  static anchorSession = null;

  // Method to perform Wax login
  async waxLogin() {
    try {
      User.wax = new waxjs.WaxJS({ rpcEndpoint: User.rpcEndpoint, tryAutoLogin: false });
      //console.log("WaxJS instance created:", User.wax);
      //let userAccount = await User.wax?.login() || '';
      User.wax.login().then(res => {
        console.log("User account:", res);

        if (!res) {
          throw new Error("Login failed or user account not available.");
        }

        return res;
      });
      
    } catch (error) {
      console.error("Error in waxLogin:", error.message);
      throw error;
    }
  }

  // Method to perform Anchor connect
  async anchorConnect() {
    try {
      // Perform the login, which returns the user's identity
      const identity = await User.anchorLink.login("mydapp");
      User.anchorSession = identity.session;
      console.log("Anchor connection successful. User identity:", identity);
      return identity;
    } catch (error) {
      console.error("Error in anchorConnect:", error.message);
      throw error;
    }
  }

  // Logout method
  logout() {
    User.wax = undefined;
    store.dispatch(setWaxLogout());
    store.dispatch(clearMyNfts());
    return true;
  }

  // Method to get Wax account balance
  async getWaxBalance(waxAccount) {
    if (waxAccount === undefined) {
      return null;
    } else {
      const balance = await User.wax?.rpc?.get_account(waxAccount);
      return balance?.core_liquid_balance;
    }
  }

  // Static method to restore Wax session
  static restoreWaxSession = async () => {
    if (store.getState().user.waxConnected) {
      User.wax = new waxjs.WaxJS({
        rpcEndpoint: User.rpcEndpoint,
        tryAutoLogin: true,
      });
      await User.wax.isAutoLoginAvailable().then(async (autoLogin) => {
        if (autoLogin) {
          store.dispatch(
            setWaxData({
              name: User.wax.userAccount,
              isLogged: true,
              balance: await UserService.getWaxBalance(User.wax.userAccount),
            })
          );
        }
      });
    }
  };

  // Static method to restore Anchor session
  static restoreAnchorSession = async () => {
    if (store.getState().user.anchorConnected) {
      User.wax = new waxjs.WaxJS({
        rpcEndpoint: User.rpcEndpoint,
        tryAutoLogin: false,
      });
      User.anchorSession = await User.anchorLink.restoreSession("mydapp");
      if (User.anchorSession?.auth) {
        let waxAddress = User.anchorSession.auth.actor.toString();
        store.dispatch(
          setWaxData({
            name: waxAddress,
            isLogged: true,
            balance: await UserService.getWaxBalance(waxAddress),
          })
        );
      }
    }
  };

  // UserService init called to prepare UAL Login.
  static async init() {
    try {
      User.restoreWaxSession();
      User.restoreAnchorSession();
    } catch (error) {
      console.log(error);
    }
  }

  // Static method to create a new instance of User
  static new() {
    if (!User.instance) {
      User.instance = new User();
    }

    return User.instance;
  }
}

// Create a singleton instance of the User class
export const UserService = User.new();
