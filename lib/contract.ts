// On-chain Guestbook contract config.
// Replace GUESTBOOK_ADDRESS with your deployed contract address on Sepolia.

export const GUESTBOOK_ADDRESS = "0x0000000000000000000000000000000000000000" as const

// Expected Solidity interface:
//
// struct Entry { address sender; string message; uint256 timestamp; }
// function sign(string calldata message) external;
// function getEntries() external view returns (Entry[] memory);
export const GUESTBOOK_ABI = [
  {
    type: "function",
    name: "sign",
    stateMutability: "nonpayable",
    inputs: [{ name: "message", type: "string" }],
    outputs: [],
  },
  {
    type: "function",
    name: "getEntries",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "sender", type: "address" },
          { name: "message", type: "string" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
  {
    type: "event",
    name: "Signed",
    inputs: [
      { name: "sender", type: "address", indexed: true },
      { name: "message", type: "string", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
] as const

export type GuestbookEntry = {
  sender: `0x${string}`
  message: string
  timestamp: bigint
}
