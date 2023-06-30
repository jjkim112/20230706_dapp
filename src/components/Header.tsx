"use client";

import { AppContext } from "@/app/layout";
import { MUMBAI_CHAIN_ID, ethereum, web3 } from "@/lib/web3.config";
import { FC, useContext } from "react";

const Header: FC = () => {
  const { account, setAccount } = useContext(AppContext);

  const onClickLogIn = async () => {
    try {
      const accounts = await ethereum?.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);

      if (parseInt(ethereum?.networkVersion) !== MUMBAI_CHAIN_ID) {
        await ethereum?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Mumbai",
              chainId: web3.utils.numberToHex(MUMBAI_CHAIN_ID),
              nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-green-100 py-4 pr-8 flex justify-end">
      {account ? (
        <div>
          {account.substring(0, 4)}...{account.substring(account.length - 4)}
        </div>
      ) : (
        <button onClick={onClickLogIn}>지갑로그인</button>
      )}
    </div>
  );
};

export default Header;
