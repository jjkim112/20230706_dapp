"use client";

import { INft, PINATA_URL, mintNftContract } from "@/lib/web3.config";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { AppContext } from "../layout";
import axios from "axios";
import Image from "next/image";

const Mint: NextPage = () => {
  const { account } = useContext(AppContext);

  const [myNewNft, setMyNewNft] = useState<INft>();

  const onClickMint = async () => {
    try {
      const mintResponse = await mintNftContract.methods
        .mintNft()
        .send({ from: account });

      if (Number(mintResponse.status) === 1) {
        const myNftResponse = await mintNftContract.methods
          .getLatestNft(account)
          .call();

        const metadataResponse = await axios.get(
          `${PINATA_URL}/${Number(myNftResponse)}.json`
        );

        setMyNewNft({
          name: metadataResponse.data.name,
          description: metadataResponse.data.description,
          image: metadataResponse.data.image,
          attributes: metadataResponse.data.attributes,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBalanceOf = async () => {
    try {
      const response = await mintNftContract.methods.balanceOf(account).call();

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-start">
      {account && <button onClick={onClickMint}>민팅하기</button>}
      <button onClick={onClickBalanceOf}>BalanceOf</button>
      {myNewNft && (
        <div>
          <Image
            src={myNewNft.image}
            width={200}
            height={200}
            alt="NFT"
            loading="lazy"
          />
          <div>이름 : {myNewNft.name}</div>
          <div>설명 : {myNewNft.description}</div>
          {myNewNft.attributes.map((v, i) => {
            return (
              <div key={i}>
                {v.trait_type} : {v.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Mint;
