import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

export class Wallet {
  connection;
  constructor() {
    this.connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  }

  getWalletBalance = async (walletAddress) => {
    const balance = await this.connection.getBalance(
      new PublicKey(walletAddress)
    );

    return balance / 1000000000;
  };

  getWalletCustomTokenBalance = async (walletAddress, tokenAccount) => {
    const response = await this.connection.getParsedTokenAccountsByOwner(
      new PublicKey(walletAddress),
      { mint: new PublicKey(tokenAccount) }
    );

    const customTokenBalance =
      response.value[0].account.data.parsed.info.tokenAmount.uiAmount;
    return customTokenBalance;
  };
}
