import {
  useMetamask,
  useDisconnect,
  useAddress,
  useSignatureDrop,
  useNFTDrop,
  useContractMetadata,
  useClaimedNFTSupply,
  useNFT,
  useNFTs,
} from "@thirdweb-dev/react";

import NFTList from "./NFTList";
import { version } from "chai";

export default function Home() {
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const address = useAddress();

  const contractAddress = "0xEed79CEf952584822EDbEe7732c25032Ea3714af";
  const contractMetadata = useContractMetadata(contractAddress);
  const contract = useNFTDrop(contractAddress);

  if (!contractMetadata) {
    return <div>LOADING</div>;
  }

  const mint = async () => {
    try {
      await contract?.claim(1);
      alert("mint succesfuly");
    } catch (error) {
      alert("ERROR!");
    }
  };

  return (
    <div>
      {address ? (
        <div>
          <h4>Connected as {address}</h4>
          <button onClick={disconnectWallet}>Disconnect Metamask Wallet</button>
          <button onClick={() => mint()}>Mint NFT</button>
        </div>
      ) : (
        <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
      )}
      <NFTList />
    </div>
  );
}
