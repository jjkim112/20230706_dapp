"use client";

import { SALE_NFT_ADDRESS, mintNftContract } from "@/lib/web3.config";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../layout";
import { redirect } from "next/navigation";
import NftCard from "@/components/NftCard";

const MyNft: NextPage = () => {
  const [tokenIds, setTokenIds] = useState<number[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const { account } = useContext(AppContext);

  const getMyNfts = async () => {
    try {
      const response: bigint[] = await mintNftContract.methods
        .getAllNft(account)
        .call();

      const tempArray = response.map((v) => {
        return Number(v);
      });

      setTokenIds(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getSaleStatus = async () => {
    try {
      const response: boolean = await mintNftContract.methods
        .isApprovedForAll(account, SALE_NFT_ADDRESS)
        .call();

      setSaleStatus(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSaleStatus = async () => {
    try {
      const response = await mintNftContract.methods
        .setApprovalForAll(SALE_NFT_ADDRESS, !saleStatus)
        .send({ from: account });

      if (Number(response.status) === 1) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) {
      redirect("/");
    }

    getSaleStatus();
    getMyNfts();
  }, [account]);

  return (
    <div>
      <div className="mb-20">
        판매 상태 : {saleStatus ? "승인" : "거부"}
        <button
          className="border-2 border-black p-1"
          onClick={onClickSaleStatus}
        >
          판매상태변경
        </button>
      </div>
      {tokenIds?.reverse().map((v, i) => {
        return <NftCard key={i} tokenId={v} />;
      })}
    </div>
  );
};

export default MyNft;
