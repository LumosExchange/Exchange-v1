import React, { useState, useContext, useMemo, useEffect } from "react";

const Web3Context = React.createContext(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  if (!web3Context) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, please declare it at a higher level."
    );
  }
  const { onChainProvider } = web3Context;
  return useMemo(() => {
    return { ...onChainProvider };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Context]);
};

export const Web3ContextProvider = ({ children }) => {
  const [publickey, setPublickey] = useState("");
  const [provider, setProvider] = useState(null);

  const walletConnect = () => {
    if ("solana" in window) {
      const solanaProvider = window.solana;
      setProvider(solanaProvider);
      solanaProvider.connect().catch((err) => {
        console.error("connect ERROR:", err);
      });
    } else {
      window.open("https://www.phantom.app/", "_blank");
    }
  };

  const walletDisconnect = () => {
    provider?.disconnect().catch((err) => {
      console.error("disconnect ERROR:", err);
    });
  };

  useEffect(() => {
    if ("solana" in window) {
      provider?.on("connect", async (publicKey) => {
        console.log("===>connect");
        setPublickey(publicKey.toString());
      });

      provider?.on("disconnect", async () => {
        console.log("===>disconnect");
        setPublickey("");
      });
    }
  }, [provider]);

  const onChainProvider = useMemo(
    () => ({
      walletConnect,
      walletDisconnect,
      provider,
      publickey,
    }),
    [walletConnect, walletDisconnect, provider, publickey]
  );
  return (
    <Web3Context.Provider value={{ onChainProvider }}>
      {children}
    </Web3Context.Provider>
  );
};
