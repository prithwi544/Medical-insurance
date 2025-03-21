const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			}
		],
		"name": "ClaimFiled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum MedicalInsurance.ClaimStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "ClaimUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "claimCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "claims",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "enum MedicalInsurance.ClaimStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_diagnosis",
				"type": "string"
			}
		],
		"name": "fileClaim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_claimId",
				"type": "uint256"
			}
		],
		"name": "getClaim",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "patient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "diagnosis",
						"type": "string"
					},
					{
						"internalType": "enum MedicalInsurance.ClaimStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct MedicalInsurance.Claim",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "insurer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_claimId",
				"type": "uint256"
			},
			{
				"internalType": "enum MedicalInsurance.ClaimStatus",
				"name": "_status",
				"type": "uint8"
			}
		],
		"name": "updateClaimStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const contractAddress = "0x10d00357b168e5bc42ba4cf8007346b0774fce69";

async function connectWallet() {
    if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        document.getElementById("account").innerText = "Connected: " + (await signer.getAddress());
    } else {
        alert("Please install MetaMask");
    }
}

async function fileClaim() {
    const amount = document.getElementById("amount").value;
    const diagnosis = document.getElementById("diagnosis").value;

    if (!amount || !diagnosis) {
        alert("Please enter all details");
        return;
    }
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
    await contract.fileClaim(ethers.parseEther(amount.toString()), diagnosis);
    alert("Claim filed successfully!");
}

window.onload = connectWallet;
