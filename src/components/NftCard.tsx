import { INft, PINATA_URL } from "@/lib/web3.config";
import axios from "axios";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface NftCardProps {
  tokenId: number;
}

const NftCard: FC<NftCardProps> = ({ tokenId }) => {
  const [nft, setNft] = useState<INft>();

  const getNftMetadata = async () => {
    try {
      const response = await axios.get(`${PINATA_URL}/${tokenId}.json`);

      setNft({
        name: response.data.name,
        description: response.data.description,
        image: response.data.image,
        attributes: response.data.attributes,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, []);

  return (
    <>
      {nft ? (
        <div className="mb-8">
          <Image
            src={nft.image}
            width={200}
            height={200}
            alt="NFT"
            loading="lazy"
          />
          <div>이름 : {nft.name}</div>
          <div>설명 : {nft.description}</div>
          {nft.attributes.map((v, i) => {
            return (
              <div key={i}>
                {v.trait_type} : {v.value}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mb-40">로딩중 ...</div>
      )}
    </>
  );
};

export default NftCard;
