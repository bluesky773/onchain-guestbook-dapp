// On-chain Guestbook contract config.
// Replace GUESTBOOK_ADDRESS with your deployed contract address on Sepolia.

export const GUESTBOOK_ADDRESS = "0x68E3668a999958161eC4D64FC623A643ab3499e1" as const

// Expected Solidity interface:
//
// struct Entry { address sender; string message; uint256 timestamp; }
// function sign(string calldata message) external;
// function getEntries() external view returns (Entry[] memory);
export const GUESTBOOK_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "author",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "NewEntry",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "sign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getEntries",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "author",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Guestbook.Entry[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "total",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export type GuestbookEntry = {
  sender: `0x${string}`
  message: string
  timestamp: bigint
}
