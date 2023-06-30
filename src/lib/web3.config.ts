import { MetaMaskSDK } from "@metamask/sdk";
import Web3 from "web3";
import MINT_NFT_ABI from "@/lib/mintNftAbi.json";
import SALE_NFT_ABI from "@/lib/saleNftAbi.json";

const MMSDK = new MetaMaskSDK();
export const ethereum = MMSDK.getProvider();

export const web3 = new Web3(ethereum);

const MINT_NFT_ADDRESS = "0xE07675529794B77B193a42eb1375b6d8b4fAeA87";
export const SALE_NFT_ADDRESS = "0xb1A0388ee5BbB33ED1Bc08fFB30E1Dd0E59192b8";

export const mintNftContract = new web3.eth.Contract(
  MINT_NFT_ABI,
  MINT_NFT_ADDRESS
);
export const saleNftContract = new web3.eth.Contract(
  SALE_NFT_ABI,
  SALE_NFT_ADDRESS
);

export const MUMBAI_CHAIN_ID = 80001;

export const PINATA_URL =
  "https://olbm.mypinata.cloud/ipfs/QmU52T5t4bXtoUqQYStgx39DdXy3gLQq7KDuF1F9g3E9Qy";

export interface INft {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}
