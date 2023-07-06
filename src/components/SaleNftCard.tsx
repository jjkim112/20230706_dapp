import { FC, useContext, useEffect, useState } from "react";
import NftCard from "./NftCard";
import { mintNftContract, saleNftContract, web3 } from "@/lib/web3.config";
import { AppContext } from "@/app/layout";

interface SaleNftCardProps {
  tokenId: number;
  getSaleNfts: () => Promise<void>;
}

const SaleNftCard: FC<SaleNftCardProps> = ({ tokenId, getSaleNfts }) => {
  const [salePrice, setSalePrice] = useState<number>(0);
  const [isMyNft, setIsMyNft] = useState<boolean>(false);

  const { account } = useContext(AppContext);

  const getIsMyNft = async () => {
    try {
      const response: string = await mintNftContract.methods
        .ownerOf(tokenId)
        .call();

      setIsMyNft(response.toLowerCase() === account);
    } catch (error) {
      console.error(error);
    }
  };

  const getSalePrice = async () => {
    try {
      const response = await saleNftContract.methods
        .getNftPrice(tokenId)
        .call();

      setSalePrice(Number(web3.utils.fromWei(response, "ether")));
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPurchase = async () => {
    try {
      const response = await saleNftContract.methods
        .purchaseNft(tokenId)
        .send({ from: account, value: web3.utils.toWei(salePrice, "ether") });

      if (Number(response.status) === 1) {
        getSaleNfts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSalePrice();
  }, []);

  useEffect(() => {
    getIsMyNft();
  }, [account]);

  return (
    <div>
      <div>{salePrice}Matic</div>
      {isMyNft ? (
        <div>(My NFT)</div>
      ) : (
        account && (
          <div>
            <button onClick={onClickPurchase}>구매하기</button>
          </div>
        )
      )}
      <NftCard tokenId={tokenId} />
    </div>
  );
};

export default SaleNftCard;
