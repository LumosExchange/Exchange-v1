import { clusterApiUrl, Connection as Connect, Keypair } from "@solana/web3.js";
import { SOLANA_PROGRAM_ID } from "../lib/constants";
import * as anchor from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import FileWallet from "../devnet.json";

export class Connection {
  network;
  programId;

  constructor() {
    this.network = "devnet";
    this.programId = new anchor.web3.PublicKey(SOLANA_PROGRAM_ID);

    const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(FileWallet), {
      skipValidation: true,
    });
    const wallet = new NodeWallet(walletKeypair);

    anchor.setProvider(
      new anchor.Provider(this.connection(), wallet, {
        skipPreflight: true,
        commitment: "confirmed",
      })
    );
  }

  connection = (commitmentOrConfig) =>
    new Connect(clusterApiUrl(this.network), commitmentOrConfig);
}
