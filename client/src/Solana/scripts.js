import * as anchor from "@project-serum/anchor";
import {
  createInitTx,
  createStakeTx,
  createCancelTx,
  createReleaseTx,
  getEscrowState,
  getVaultState,
  getUserEscrowState,
} from "../lib/scripts";
import { Connection } from "./connection";
import { IDL } from "../lib/IDL";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export class Scripts extends Connection {
  provider;
  program;
  wallet;

  constructor(wallet) {
    super();
    this.provider = new anchor.Provider(this.connection("processed"), wallet, {
      preflightCommitment: "processed",
    });
    this.program = new anchor.Program(IDL, this.programId);
    console.log("Wallet in class Script", wallet);
    this.wallet = wallet;
  }

  init = async () => {
    const tx = await createInitTx(this.wallet.publicKey, this.program);
    const { blockhash } = await this.connection().getRecentBlockhash(
      "finalized"
    );
    tx.feePayer = this.wallet.publicKey;
    tx.recentBlockhash = blockhash;
    // await this.wallet.signTransaction(tx);
    let txId = await this.wallet.signAndSendTransaction(tx);
    console.log("Your transaction signature", txId);
  };

  stake = async (amount) => {
    const tx = await createStakeTx(this.wallet.publicKey, amount, this.program);
    const { blockhash } = await this.connection().getRecentBlockhash(
      "finalized"
    );
    tx.feePayer = this.wallet.publicKey;
    tx.recentBlockhash = blockhash;
    // this.wallet.signTransaction(tx);
    let txId = await this.wallet.signAndSendTransaction(tx);
    console.log("Your transaction signature", txId);
  };

  cancel = async (stakeIndex) => {
    const tx = await createCancelTx(
      this.wallet.publicKey,
      stakeIndex,
      this.program
    );
    const { blockhash } = await this.connection().getRecentBlockhash(
      "finalized"
    );
    tx.feePayer = this.wallet.publicKey;
    tx.recentBlockhash = blockhash;
    // this.wallet.signTransaction(tx);
    let txId = await this.wallet.signAndSendTransaction(tx);
    console.log("Your transaction signature", txId);
  };

  release = async (receiver, stakeIndex) => {
    const tx = await createReleaseTx(
      this.wallet.publicKey,
      receiver,
      stakeIndex,
      this.program
    );
    const { blockhash } = await this.connection().getRecentBlockhash(
      "finalized"
    );
    tx.feePayer = this.wallet.publicKey;
    tx.recentBlockhash = blockhash;
    // this.wallet.signTransaction(tx);
    let txId = await this.wallet.signAndSendTransaction(tx);
    console.log("Your transaction signature", txId);
  };

  getEscrowInfo = async () => {
    const escrowData = await getEscrowState(this.program);
    return {
      escrowIndex: escrowData?.index.toNumber(),
    };
  };

  getVaultInfo = async () => {
    const vaultData = await getVaultState(this.program);
    return {
      vaultData: vaultData?.data.toNumber(),
    };
  };

  getUserEscrowInfo = async (staker, stakeIndex) => {
    const userEscrowData = await getUserEscrowState(
      staker,
      stakeIndex,
      this.program
    );
    return {
      index: userEscrowData?.index.toNumber(),
      amount: userEscrowData?.amount.toNumber() / LAMPORTS_PER_SOL,
      staker: userEscrowData?.staker.toBase58(),
      stakeTime: userEscrowData?.stakeTime.toNumber(),
    };
  };
}
