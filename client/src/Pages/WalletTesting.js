import { useEffect } from 'react';
import {
  Program,
  Provider,
  BN,
  web3,
} from '@project-serum/anchor'
import {
  Connection,
  clusterApiUrl,
  PublicKey
} from '@solana/web3.js'

import idl from '../../package.json'



const opts = {
  preflightCommitment: "recent",
};

const { SystemProgram } = web3
const programID = new PublicKey("GAECQos3deHaqzB1EDvPJcqaGVvG9xqDuFYU239KAsXV")

function WalletTesting() {
  useEffect(() => {
    window.solana.on("connect", () => {
      console.log('updated...')
      console.log('public key: ', window.solana.publicKey.toString());
    })
    return () => {
      window.solana.disconnect();
    }
  }, [])

  async function sendTransaction() {    
    const wallet = window.solana
    const network = clusterApiUrl("devnet")
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
    )
    
    const program = new Program(idl, programID, provider);

    const localAccount = web3.Keypair.generate();

    await program.rpc.initialize(new BN(1234), {
      accounts: {
        myAccount: localAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [localAccount],
    })
    
    const acc = await program.account.myAccount.fetch(localAccount.publicKey)
    console.log('acc: ', acc)
  }

  async function read() {
    try {
      const wallet = window.solana;
      const network = clusterApiUrl("devnet")
      const connection = new Connection(network);

      const provider = new Provider(
        connection, wallet, { commitment: "processed" },
      )
      
    } catch (err) {
      console.log('error: ', err)
    }
  }
  async function getWallet() {
    try {
      const wallet = typeof window !== 'undefined' && window.solana;
      await wallet.connect()
    } catch (err) {
      console.log('err: ', err)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getWallet}>getWallet</button>
        <button onClick={sendTransaction}>sendTransaction</button>
        <button onClick={read}>read</button>
      </header>
    </div>
  );
}

export default WalletTesting;