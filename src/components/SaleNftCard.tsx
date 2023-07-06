import { FC, useEffect, useState } from "react";
import NftCard from "./NftCard";
import { saleNftContract, web3 } from "@/lib/web3.config";

interface SaleNftCardProps {
  tokenId: number;
}

const SaleNftCard: FC<SaleNftCardProps> = ({ tokenId }) => {
  const [salePrice, setSalePrice] = useState<number>(0);

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

  useEffect(() => {
    getSalePrice();
  }, []);

  return (
    <div>
      <div>{salePrice}Matic</div>
      <NftCard tokenId={tokenId} />
    </div>
  );
};

export default SaleNftCard;
