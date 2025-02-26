// Smart contract details
export const CONTRACT_ADDRESS = "0xC112a36373Db043788a02Ca817b492f14FE3f1cb"; // Replace with your actual deployed contract address
export const ABI = [
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
