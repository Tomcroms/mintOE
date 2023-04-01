import { ethers } from "ethers";
import { RelayProvider } from "@opengsn/provider";
import Image from "next/image";
import style from "../styles/style.module.css";
import type { NextPage } from "next";
import { useState, useEffect } from 'react';


declare const window: any;

const ERC1155_contract_address = "0xE99F08c4823952E92056D2cf50f2ba86c154f160";
const ERC1155_contract_abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_forwarder",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "mintBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintFreeToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeBatchTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newuri",
				"type": "string"
			}
		],
		"name": "setURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			}
		],
		"name": "TransferBatch",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferSingle",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "value",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "URI",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "balanceOf",
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
				"internalType": "address[]",
				"name": "accounts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			}
		],
		"name": "balanceOfBatch",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "exists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTrustedForwarder",
		"outputs": [
			{
				"internalType": "address",
				"name": "forwarder",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "forwarder",
				"type": "address"
			}
		],
		"name": "isTrustedForwarder",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
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
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "totalSupply",
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
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "uri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


const Home: NextPage = () =>{
	class WrappedRelayProvider extends RelayProvider implements ethers.providers.ExternalProvider {

		send(request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void | undefined): void {
			super.send({
				jsonrpc: '2.0',
				method: request.method,
				params: request.params ?? []
			}, callback)
		}
	
	}
	const connect = async () => {
		if(typeof window !== "undefined" && window.ethereum){
			handleConnectWallet();
		}
		else{
			console.log("install metamask");
		}
	}
  	  //verification depuis la bdd
	async function checkQuestDone(walletAddress: string) {
		const response = await fetch('/api/check-quest', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ walletAddress }),
		});
		
		const data = await response.json();
		return data.authorized;
	}

	async function handleConnectWallet() {
		try {
			setMintInitiated(true);
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			const walletAddress = accounts[0];
		
			const isAuthorized = await checkQuestDone(walletAddress);
			if (!isAuthorized) {
				const baseProvider = new ethers.providers.Web3Provider(window.ethereum); 
				const gsnConfig = {
					paymasterAddress: "0xcdD20a800b740492361854110ee0886b308A9a17",
					// maxFeePerGas: ethers.utils.parseUnits("5", "gwei").toString(),
					// maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei").toString(),
					// gasLimit: 210000,
				};
		
				const gsnProvider = await RelayProvider.newProvider({
					provider: baseProvider,
					config: gsnConfig,
				}) as WrappedRelayProvider;
		
				await gsnProvider.init()
		
				const etherProvider = new ethers.providers.Web3Provider(gsnProvider) ;
		
				const signer = etherProvider.getSigner();
				const myContract = new ethers.Contract(ERC1155_contract_address, ERC1155_contract_abi, signer);
		
				const mintTx = await myContract.mintFreeToken();
				console.log("done:", mintTx)
			}
			else {
				console.log("Pas autorisé");
			}
		} catch (error) {
			console.log(error);
		}
	}


	//récupérer totalSupply()
	const [totalSupply, setTotalSupply] = useState(null);

	useEffect(() => {
	  async function fetchTotalSupply() {
		if (typeof window.ethereum !== 'undefined') {
		  const provider = new ethers.providers.Web3Provider(window.ethereum);
		  const contract = new ethers.Contract(ERC1155_contract_address, ERC1155_contract_abi, provider);
		  const totalSupply = await contract.totalSupply(0);
		  setTotalSupply(totalSupply.toString());
		}
	  }
	  fetchTotalSupply();
	}, []);

	const [mintInitiated, setMintInitiated] = useState(false);
	// function handleMintInitiated() {
	// 	setMintInitiated(true);
	// }


	return (
		<main className={style.mainContainer}>
			<section className={style.left}>
				<h2>The Key to Speedy&apos;s Mona Lisa Collection</h2>
				<h4>by Speedy Graphito</h4>
				<p className={style.pDescription}>Enter the vibrant world of Speedy Graphito, recognised as the French street art pioneer. Own a dynamic animated digital artwork, granting access to his Mona Lisa art collection. Let the NFT be your key to the dynamic universe of Speedy Graphito&apos;s art.</p>
				<div className={style.blocInfo}>
					<h3>OPEN EDITION</h3>
				</div>
				<div className={style.blocInfo}>
					<div className={style.info}>
						<p className={style.pInfo}>Price</p>
						<h3>Free Aidrop</h3>
					</div>
					<div className={style.info}>
						<p className={style.pInfo}>Total Minted</p>
						<h3>{totalSupply === null ? "Loading..." : totalSupply}</h3>
					</div>
				</div>
				<div className={style.btnClaim} onClick={handleConnectWallet}>
					<h3>Claim Now</h3>
				</div>
				<div className={style.blocTokenInfo}>
					<div className={style.tokenInfo}>
						<p className={style.pGrey}>TOKEN STANDARD</p>
						<p>ERC-1155</p>
					</div>
					<div className={style.tokenInfo}>
						<p className={style.pGrey}>BLOCKCHAIN</p>
						<p>POLYGON</p>
					</div>
					<div className={style.tokenInfo}>
						<p className={style.pGrey}>CONTRACT ADDRESS</p>
						<p>0xE99...c154f160</p>
					</div>
				</div>
			</section>
			<section className={style.right}>
				<Image className={!mintInitiated ? style.imageOE : style.imageOE_small} src="/img/openEdition.gif" width={300} height={300} alt="open edition"/>
				{mintInitiated ? (
					<div className={style.transactionContainer}>
						<h3>Please accept metamask request, your transaction should take a few seconds</h3>
					</div>
				) : null}
			</section>
			
		</main>
	)
} 

export default Home;
