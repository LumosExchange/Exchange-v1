import { useEffect } from 'react';
import {
  Program,
  Provider,
  BN,
  web3,
} from '@project-serum/anchor'
import {
  PublicKey
} from '@solana/web3.js'


import idl from '../../package.json'

const {Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL} = require("@solana/web3.js");
const {sendAndConfirmTransaction, clusterApiUrl, Connection} = require("@solana/web3.js");

const opts = {
  preflightCommitment: "recent",
};


const programID = new PublicKey("GAECQos3deHaqzB1EDvPJcqaGVvG9xqDuFYU239KAsXV")

function WalletTesting() {
  useEffect(() => {
    window.solana && window.solana.on("connect", () => {
      console.log('updated...')
      console.log('public key: ', window.solana.publicKey.toString());
    })
    return () => {
      window.solana.disconnect();
    }
  }, [])

  useEffect(() => {}, []);

  async function sendTransaction() {    
    const wallet = window.solana
    const network = clusterApiUrl("devnet")
    let keypair = Keypair.generate();
const transaction = new Transaction();

 transaction.add(
    SystemProgram.transfer({
      fromPubkey: window.solana.publicKey,
      toPubkey: keypair.publicKey,
      lamports: LAMPORTS_PER_SOL
    })
  );


  let anotherKeypair = Keypair.generate();
let connection = new Connection(clusterApiUrl('devnet'));
  sendAndConfirmTransaction(
    connection,
    transaction,
    [keypair, anotherKeypair]
  );
  }





  async function read() {
    try {
      const wallet = window.solana;
      const network = clusterApiUrl("devnet")
      const connection = new Connection(network);

      const provider = new Provider(
        connection, wallet, { commitment: "processed" },

      )
      console.log('provider: ', provider);
      
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