import {
  useMetamask,
  useDisconnect,
  useAddress,
  useNFTCollection,
  useContract,
  useMintNFT,
  useEditionDrop,
  useClaimNFT,
  useNFTs,
  useNFTBalance,
  useNFT,
  useTotalCount,
  useOwnedNFTs
} from "@thirdweb-dev/react";

import "./App.css";

import standard from "./NFTBooking.jpg";
import gold from "./2.jpg";
import silver from "./3.jpg";

export default function Home() {
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const contractAddress = "0x050E86c51107dc696d2d73052BCE390C8034f04C";
  const editionDrop = useEditionDrop(contractAddress);
const { data: nfts, isLoadingNFT, errorNFT } = useNFTs(editionDrop);
const { mutate: claimNft, isLoading, error } = useClaimNFT(editionDrop);
const { data: ownedNFTs, isLoadingOwner, errorOwner } = useOwnedNFTs(editionDrop,address);
const { data: totalCount, isLoadingTotalCount, errorTotalCount } = useTotalCount(editionDrop);



if (isLoading || !nfts ) {
  return <div>LOADING</div>;
}

console.log(nfts);
console.log(nfts[0].metadata.id.toNumber());
console.log(totalCount.toNumber())
console.log(ownedNFTs)

const nftList = nfts.map((nft) => (
  <div>
  <img
  src = {nft.metadata.image}
  width = "250px"
  length = "250px"
  />
   <button
     disabled={isLoading}
     onClick={() => claimNft({ to: address, quantity: 1, tokenId: nft.metadata.id.toNumber()})}
   >
     Claim NFT!
   </button>
 </div>

))


  if (error) {
    console.error("failed to claim nft", error);
  }


  return (
    <div>
      <h1>NFTBooking Test Drop </h1>
      {address ? (
        <div>
          <h4>Connected as : <br/> <br/> <br/> {address}</h4>
          <button onClick={disconnectWallet}>Disconnect Metamask Wallet</button>
        </div>
      ) : (
        <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
      )}

      {nftList}
    </div>
  );
}
