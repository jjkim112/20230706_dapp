import { FC, FormEventHandler, useContext, useEffect, useState } from "react";
import NftCard from "./NftCard";
import { saleNftContract, web3 } from "@/lib/web3.config";
import { AppContext } from "@/app/layout";

interface MyNftCardProps {
  tokenId: number;
}

const MyNftCard: FC<MyNftCardProps> = ({ tokenId }) => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [saleToggle, setSaleToggle] = useState<boolean>(false);
  const [salePrice, setSalePrice] = useState<string>("");

  const { account } = useContext(AppContext);

  const getCurrentPrice = async () => {
    try {
      const response = await saleNftContract.methods
        .getNftPrice(tokenId)
        .call();

      setCurrentPrice(Number(web3.utils.fromWei(Number(response), "ether")));
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSaleToggle = () => {
    setSaleToggle(!saleToggle);
  };

  const onSumbitSalePrice: FormEventHandler = async (e) => {
    try {
      e.preventDefault();

      if (!salePrice || isNaN(parseInt(salePrice))) return;

      const response = await saleNftContract.methods
        .setSaleNft(tokenId, web3.utils.toWei(salePrice, "ether"))
        .send({
          from: account,
        });

      if (Number(response.status) === 1) {
        setCurrentPrice(Number(salePrice));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickCancelNft = async () => {
    try {
      const response = await saleNftContract.methods
        .cancelSaleNft(tokenId)
        .send({
          from: account,
        });

      if (Number(response.status) === 1) {
        setCurrentPrice(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentPrice();
  }, []);

  useEffect(() => console.log(salePrice), [salePrice]);

  return (
    <div>
      {currentPrice === 0 ? (
        <>
          <button onClick={onClickSaleToggle}>판매등록</button>
          {saleToggle && (
            <form onSubmit={onSumbitSalePrice}>
              <input
                type="text"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
              <input type="submit" value="승인" />
            </form>
          )}
        </>
      ) : (
        <div>
          현재 가격 : {currentPrice}Matic
          <button onClick={onClickCancelNft}>판매취소</button>
        </div>
      )}
      <NftCard tokenId={tokenId} />
    </div>
  );
};

export default MyNftCard;
