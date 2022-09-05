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
import { version } from "chai";

export default function NFTList() {
  const contractAddress = "0xEed79CEf952584822EDbEe7732c25032Ea3714af";
  const contract = useNFTDrop(contractAddress);
  const {
    data: nfts,
    isLoading,
    error,
  } = useNFTs(contract, { start: 0, count: 3 });

  if (!nfts) {
    return <div>LOADING</div>;
  }

  const imageList = nfts.map((nft) => (
    <div>
      <img src={nft.metadata.image} width="500" height="600" />
      <h2>{nft.name}</h2>
    </div>
  ));

  return <div>{imageList}</div>;
}
