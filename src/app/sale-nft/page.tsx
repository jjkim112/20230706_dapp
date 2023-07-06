"use client";

import SaleNftCard from "@/components/SaleNftCard";
import { saleNftContract } from "@/lib/web3.config";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const SaleNft: NextPage = () => {
  const [saleNfts, setSaleNfts] = useState<number[]>();

  const getSaleNfts = async () => {
    try {
      const response: bigint[] = await saleNftContract.methods
        .getOnSaleNft()
        .call();

      const tempArray = response.map((v) => Number(v));

      setSaleNfts(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSaleNfts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {saleNfts?.map((v, i) => (
        <SaleNftCard key={i} tokenId={v} getSaleNfts={getSaleNfts} />
      ))}
    </div>
  );
};

export default SaleNft;
