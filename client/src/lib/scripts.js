import * as anchor from "@project-serum/anchor";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { SOLANA_PROGRAM_ID, ESCROW_SEED, VAULT_SEED } from "./constants";

export const createInitTx = async (userAddress, program) => {
  const [escrowAccount, escrow_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(ESCROW_SEED)],
    SOLANA_PROGRAM_ID
  );
  const [vaultAccount, vault_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(VAULT_SEED)],
    SOLANA_PROGRAM_ID
  );

  let tx = new Transaction();

  tx.add(
    program.instruction.init(escrow_bump, {
      accounts: {
        escrowAccount,
        vaultAccount,
        payer: userAddress,
        systemProgram: SystemProgram.programId,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createStakeTx = async (userAddress, amount, program) => {
  const [escrowAccount, escrow_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(ESCROW_SEED)],
    SOLANA_PROGRAM_ID
  );
  const [vaultAccount, vault_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(VAULT_SEED)],
    SOLANA_PROGRAM_ID
  );

  const escrowState = await getEscrowState(program);
  const escrowIndex = escrowState.index.toNumber();

  const [userEscrowAccount, user_escrow_bump] =
    await PublicKey.findProgramAddress(
      [userAddress.toBuffer(), Buffer.from(escrowIndex.toString())],
      SOLANA_PROGRAM_ID
    );

  let tx = new Transaction();

  tx.add(
    program.instruction.stake(new anchor.BN(amount), {
      accounts: {
        staker: userAddress,
        vaultAccount,
        escrowAccount,
        userEscrowAccount,
        systemProgram: SystemProgram.programId,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createCancelTx = async (userAddress, stakeIndex, program) => {
  const [escrowAccount, escrow_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(ESCROW_SEED)],
    SOLANA_PROGRAM_ID
  );
  const [vaultAccount, vault_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(VAULT_SEED)],
    SOLANA_PROGRAM_ID
  );

  const [userEscrowAccount, user_escrow_bump] =
    await PublicKey.findProgramAddress(
      [userAddress.toBuffer(), Buffer.from(stakeIndex.toString())],
      SOLANA_PROGRAM_ID
    );

  let tx = new Transaction();

  tx.add(
    program.instruction.cancel(new anchor.BN(stakeIndex), {
      accounts: {
        staker: userAddress,
        vaultAccount,
        userEscrowAccount,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createReleaseTx = async (
  userAddress,
  receiver,
  stakeIndex,
  program
) => {
  const [escrowAccount, escrow_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(ESCROW_SEED)],
    SOLANA_PROGRAM_ID
  );
  const [vaultAccount, vault_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(VAULT_SEED)],
    SOLANA_PROGRAM_ID
  );

  const [userEscrowAccount, user_escrow_bump] =
    await PublicKey.findProgramAddress(
      [userAddress.toBuffer(), Buffer.from(stakeIndex.toString())],
      SOLANA_PROGRAM_ID
    );

  let tx = new Transaction();

  tx.add(
    program.instruction.release({
      accounts: {
        staker: userAddress,
        receiver,
        escrowAccount,
        vaultAccount,
        userEscrowAccount,
        systemProgram: SystemProgram.programId,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const getEscrowState = async (program) => {
  const [escrowData, _] = await PublicKey.findProgramAddress(
    [Buffer.from(ESCROW_SEED)],
    SOLANA_PROGRAM_ID
  );
  try {
    let escrowState = await program.account.escrowAccount.fetch(escrowData);
    return escrowState;
  } catch {
    return null;
  }
};

export const getVaultState = async (program) => {
  const [vaultData, _] = await PublicKey.findProgramAddress(
    [Buffer.from(VAULT_SEED)],
    SOLANA_PROGRAM_ID
  );
  try {
    let vaultState = await program.account.vaultAccount.fetch(vaultData);
    return vaultState;
  } catch {
    return null;
  }
};

export const getUserEscrowState = async (staker, stakeIndex, program) => {
  const [userEscrowData, _] = await PublicKey.findProgramAddress(
    [staker.toBuffer(), Buffer.from(stakeIndex.toString())],
    SOLANA_PROGRAM_ID
  );
  try {
    let userEscrowState = await program.account.userEscrowAccount.fetch(
      userEscrowData
    );
    return userEscrowState;
  } catch {
    return null;
  }
};
