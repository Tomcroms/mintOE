import { ethers } from "ethers";
import { RelayProvider } from "@opengsn/provider";
import Image from "next/image";
import style from "../styles/style.module.css";
import type { NextPage } from "next";
import { useState, useEffect } from 'react';
import confetti from "canvas-confetti";
import { useRouter } from 'next/router';


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
	const tryHandleMintRequest = async () => {
		if(typeof window !== "undefined" && window.ethereum){
			handleMintRequest();
		}
		else{
			alert("Unable to find metamask, please make sure you have metamask installed on your current browser.");
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
	async function handleMintRequest() {
		try {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			const walletAddress = accounts[0];
		
			const isAuthorized = await checkQuestDone(walletAddress);
			if (isAuthorized) {
				setMintInitiated(true);
				setChallengeCompleted(true);

				const baseProvider = new ethers.providers.Web3Provider(window.ethereum); 
				const accounts = await baseProvider.send("eth_requestAccounts", []);


				const gsnConfig = {
					paymasterAddress: "0xcdD20a800b740492361854110ee0886b308A9a17",
					gasPriceFactorPercent: 50
				};
		
				const gsnProvider = await RelayProvider.newProvider({
					provider: baseProvider,
					config: gsnConfig,
				}) as WrappedRelayProvider;
		
				await gsnProvider.init()
		
				const etherProvider = new ethers.providers.Web3Provider(gsnProvider) ;
		
				const signer = etherProvider.getSigner();
				setRelayAccepted(true);

				const myContract = new ethers.Contract(ERC1155_contract_address, ERC1155_contract_abi, signer);
		
				const transaction = await myContract.mintFreeToken();
				const receipt = await etherProvider.getTransactionReceipt(transaction);
				console.log(receipt);


				await transaction.wait();
				//rediriger vers art-sense.studio --> hasMinted dans la bdd
				window.location.assign("https://art-sense.studio/actions/hasMinted.php");
			}
			else {
				setMintInitiated(true);
			}
		} 
		catch (error) {
			console.log(error);
		}
	}
	async function switchToPolygon(){
		interface CustomError extends Error {
			code?: number;
		}
		try{
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x89' }],
			});
		} catch(switchError){
			//l'utilisateur n'a pas polygon sur metamask
			const error = switchError as CustomError;
			if (error.code === 4902) {
				try {
				  // Ajoute le réseau Polygon à MetaMask et passe à ce réseau
					const result = await window.ethereum.request({
						method: "wallet_addEthereumChain",
						params: [{
						chainId: "0x89",
						rpcUrls: ["https://polygon-rpc.com/"],
						chainName: "Matic Mainnet",
						nativeCurrency: {
							name: "MATIC",
							symbol: "MATIC",
							decimals: 18
						},
						blockExplorerUrls: ["https://polygonscan.com/"]
						}]
					});
				} catch (addError) {
				  console.error("Erreur lors de l'ajout du réseau Polygon:", addError);
				}
			}else {
				console.error("Erreur lors du passage au réseau Polygon:",error);
			}
		}
		checkNetwork();
		window.location.reload();
	}
	function redirectToChallenge(){
		window.location.assign("https://art-sense.studio/challenge_speedy.php");
	}
	async function checkNetwork(){
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const network = await provider.getNetwork();
		if(network.chainId === 137){
			setNetworkIsPolygon(true);
		}
		else{
			setNetworkIsPolygon(false);
		}
	}
	async function fetchTotalSupply() {
		if (typeof window.ethereum !== 'undefined') {
			try{
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const contract = new ethers.Contract(ERC1155_contract_address, ERC1155_contract_abi, provider);
				const totalSupply = await contract.totalSupply(0);
				setTotalSupply(totalSupply.toString());
			}catch(error){
				console.error(error);
			}
		}
	}
	//récupérer totalSupply()
	const [totalSupply, setTotalSupply] = useState(null);
	const [networkIsPolygon, setNetworkIsPolygon] = useState(true);
	useEffect(() => {
		function displayConfettis() {
			for(let i=0; i<Math.floor(Math.random()*(25-10) + 10); i++){
				confetti({
					origin: {
						x: Math.random() * (0.95 - 0.05) + 0.05,
						y: Math.random() * (0.9 - 0.2) + 0.2
					}
				}); 
			}
		}
		displayConfettis();
		checkNetwork();
		fetchTotalSupply();
	}, []);

	const [mintInitiated, setMintInitiated] = useState(false);
	const [challengeCompleted, setChallengeCompleted] = useState(false);
	const [relayAccepted, setRelayAccepted] = useState(false);
	let popUp;
	let bgOpaque;
	if(!networkIsPolygon){
		popUp = (
			<div className={style.popUp}>
				<h2>Great news!</h2>
				<p className={style.pPopUp}>You don&apos;t need to have any token on your wallet to claim the airdrop.</p>
				<Image className={style.polygonImg} src="/img/polygonImg.jpg" width={200} height={200} alt="polygon"/>
				<p className={style.pPopUp}>You are not connected to the polygon network.<br/>Please switch to polygon network by clicking on the button below.</p>
				<div className={style.switchBtn} onClick={switchToPolygon}>
					<h6>Switch to polygon</h6>
				</div>
			</div>
		);
		bgOpaque = (
			<div className={style.bgOpaque}></div>
		);
	}else{
		popUp = null;
		bgOpaque = null;
	}

	let content = null;
	let info;
	if (mintInitiated) {
		if (challengeCompleted) {
		  if (networkIsPolygon) {
			if (relayAccepted) {
			  content = (
				<div className={style.transactionContainer}>
					<div className={style.transactionProgress}>
						<div className={style.transactionStep}>
							<Image className={style.stepValidate} src="/img/validate.png" width={15} height={11} alt="ok"/>
							<h5 className={style.transactionStepTxt}>Claim your token</h5>
						</div>
						<div className={style.transactionLineDone}></div>
						<div className={style.transactionStep}>
							<Image className={style.stepValidate} src="/img/validate.png" width={15} height={11} alt="ok"/>
							<h5 className={style.transactionStepTxt}>Switch to polygon network</h5>
						</div>
						<div className={style.transactionLineDone}></div>
						<div className={style.transactionStep}>
							<Image className={style.stepValidate} src="/img/validate.png" width={15} height={11} alt="ok"/>
							<h5 className={style.transactionStepTxt}>Accept relay request</h5>
						</div>
						<div className={style.transactionLineDone}></div>
						<div className={style.transactionStep}>
							<Image className={style.stepValidate} src="/img/spinner.gif" width={20} height={20} alt="ok"/>
							<h5 className={style.transactionStepTxt}>Wait for transaction</h5>
						</div>
						<div className={style.transactionLineNext}></div>                                 
						<div className={style.transactionStep}>
							<h5 className={style.transactionStepTxt}>Done</h5>
						</div>
					</div>
				</div>
			  );
			  info=(
				<div className={style.infoTransaction}>
					<p>Please do not refresh, you will be redirected after the transaction.</p>
				</div>
			  );
			} else {
			  content = (
				<div className={style.transactionContainer}>
					<div className={style.transactionProgress}>
						<div className={style.transactionStep}>
							<Image className={style.stepValidate} src="/img/validate.png" width={15} height={11} alt="ok"/>
							<h5 className={style.transactionStepTxt}>Claim your token</h5>
						</div>
						<div className={style.transactionLineDone}></div>
						<div className={style.transactionStep}>
							<Image className={style.stepValidate} src="/img/validate.png" width={15} height={11} alt="ok"/>
							<h5 className={style.transactionStepTxt}>Switch to polygon network</h5>
						</div>
						<div className={style.transactionLineDone}></div>
						<div className={style.transactionStep}>
							<Image className={style.stepValidate} src="/img/spinner.gif" width={20} height={20} alt="ok"/>
							<h5 className={style.transactionStepTxt}>Accept relay request</h5>
						</div>
						<div className={style.transactionLineNext}></div>
						<div className={style.transactionStep}>
							<h5 className={style.transactionStepTxt}>Wait for transaction</h5>
						</div>
						<div className={style.transactionLineNext}></div>                                 
						<div className={style.transactionStep}>
							<h5 className={style.transactionStepTxt}>Done</h5>
						</div>
					</div>
				</div>
			  );
			}
		  } else {
			content = (
			  <div className={style.transactionContainer}>
				<div className={style.transactionProgress}>
					<div className={style.transactionStep}>
						<Image className={style.stepValidate} src="/img/validate.png" width={15} height={11} alt="ok"/>
						<h5 className={style.transactionStepTxt}>Claim your token</h5>
					</div>
					<div className={style.transactionLineDone}></div>
					<div className={style.transactionStep}>
						<Image className={style.stepValidate} src="/img/spinner.gif" width={20} height={20} alt="ok"/>
						<h5 className={style.transactionStepTxt}>Switch to polygon network</h5>
					</div>
					<div className={style.transactionLineNext}></div>
					<div className={style.transactionStep}>
						<h5 className={style.transactionStepTxt}>Accept relay request</h5>
					</div>
					<div className={style.transactionLineNext}></div>
					<div className={style.transactionStep}>
						<h5 className={style.transactionStepTxt}>Wait for transaction</h5>
					</div>
					<div className={style.transactionLineNext}></div>                                 
					<div className={style.transactionStep}>
						<h5 className={style.transactionStepTxt}>Done</h5>
					</div>
				</div>
			  </div>
			);
		  }
		} else {
		  content = (
			<div className={style.transactionContainer}>
				<h3>You must have completed the challenge first.</h3>
				<p>Please make sure you are connected with the wallet associated with your ArtSense profile</p>
				<div className={style.challengeBtn} onClick={redirectToChallenge}>
					<h6>Complete the challenge</h6>
				</div>
			</div>
		  );
		}
	  } else {
		content = null;
	}
	return (
		<main className={style.fullScreen}>
			{ popUp }
			{ bgOpaque }
			<section className={style.mainContainer}>
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
							<h4>Free Aidrop</h4>
						</div>
						<div className={style.info}>
							<p className={style.pInfo}>Total Minted</p>
							<h4>{totalSupply === null ? "Loading..." : totalSupply}</h4>
						</div>
					</div>
					<div className={style.btnClaim} onClick={tryHandleMintRequest}>
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
					{ content }
					{ info }
				</section>
			</section>		
		</main>
	)
} 

export default Home;
