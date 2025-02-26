"use client";
import { ABI, CONTRACT_ADDRESS } from "@/config/config";
import { useState } from "react";
import Web3 from "web3";

export default function Counter() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        const contractInstance = new web3Instance.eth.Contract(
          ABI,
          CONTRACT_ADDRESS
        );
        setWeb3(web3Instance);
        setContract(contractInstance);

        // Fetch counter value
        const currentCount = await contractInstance.methods.getCount().call();
        setCount(Number(currentCount));
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      alert("Please install MetaMask to use this app!");
    }
  };

  // Function to increment counter
  const incrementCounter = async () => {
    if (!contract || !account) {
      alert("Please connect your wallet first.");
      return;
    }
    setLoading(true);
    try {
      await contract.methods.increment().send({ from: account });
      const updatedCount = await contract.methods.getCount().call();
      setCount(Number(updatedCount));
    } catch (error) {
      console.error("Transaction failed:", error);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Counter Dapp</h1>
      {!account ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="text-xl mt-4">Connected as: {account}</p>
          <p className="text-xl mt-4">
            Current Count: {count !== null ? count : "Loading..."}
          </p>
          <button
            className={`mt-2 px-4 py-2 bg-green-500 text-white rounded ${
              loading ? "opacity-50" : ""
            }`}
            onClick={incrementCounter}
            disabled={loading}
          >
            {loading ? "Processing..." : "Increment"}
          </button>
        </>
      )}
    </main>
  );
}
