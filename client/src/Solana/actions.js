import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Scripts } from "./scripts";

export const handleInit = async (publicKey) => {
  if ("solana" in window && publicKey) {
    const scripts = new Scripts(window.solana);
    await scripts.init();
  }
};

export const handleStake = async (publicKey, amount) => {
  if ("solana" in window && publicKey) {
    const scripts = new Scripts(window.solana);
    await scripts.stake(amount * LAMPORTS_PER_SOL);
  }
};

export const handleStakeCancel = async (publicKey, stakeIndex) => {
  if ("solana" in window && publicKey) {
    const scripts = new Scripts(window.solana);
    await scripts.cancel(stakeIndex);
  }
};

export const handleModifyStake = async (publicKey, stakeIndex, newAmount) => {
  if ("solana" in window && publicKey) {
    const scripts = new Scripts(window.solana);
    await scripts.modify(stakeIndex, newAmount);
  }
};

export const handleStakeRelease = async (
  publicKey,
  receiver,
  stakeIndex,
  releaseAmount
) => {
  if ("solana" in window && publicKey) {
    const scripts = new Scripts(window.solana);
    await scripts.release(new PublicKey(receiver), stakeIndex, releaseAmount);
  }
};

export const getEscrowLastIndex = async () => {
  if ("solana" in window) {
    const scripts = new Scripts(window.solana);
    const { escrowIndex } = await scripts.getEscrowInfo();
    return escrowIndex;
  }
};

export const getVaultInfo = async () => {
  if ("solana" in window) {
    const scripts = new Scripts(window.solana);
    const vaultInfo = await scripts.getEscrowInfo();
    return vaultInfo;
  }
};

export const getUserEscrowInfo = async (staker, stakeIndex) => {
  if ("solana" in window) {
    const scripts = new Scripts(window.solana);
    const userEscrowInfo = await scripts.getUserEscrowInfo(
      new PublicKey(staker),
      stakeIndex
    );
    return userEscrowInfo;
  }
};
