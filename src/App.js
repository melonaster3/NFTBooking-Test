import {
  useMetamask,
  useDisconnect,
  useAddress,
  useNFTCollection,
  useContract,
  useMintNFT,
  useEditionDrop,
  useClaimNFT,
} from "@thirdweb-dev/react";

import standard from "./NFTBooking.jpg";
import silver from "./2.jpg";
import gold from "./3.jpg";

export default function Home() {
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const contractAddress = "0x050E86c51107dc696d2d73052BCE390C8034f04C";
  const editionDrop = useEditionDrop(contractAddress);

  const { mutate: claimNft, isLoading, error } = useClaimNFT(editionDrop);

  if (error) {
    console.error("failed to claim nft", error);
  }

  const mint1 = (
    <div>
      {standard}
      <button
        disabled={isLoading}
        onClick={() => claimNft({ to: address, quantity: 1, tokenId: 0 })}
      >
        Claim NFT!
      </button>
    </div>
  );

  const mint2 = (
    <div>
      {silver}
      <button
        disabled={isLoading}
        onClick={() => claimNft({ to: address, quantity: 1, tokenId: 1 })}
      >
        Claim NFT!
      </button>
    </div>
  );

  const mint3 = (
    <div>
      {gold}
      <button
        disabled={isLoading}
        onClick={() => claimNft({ to: address, quantity: 1, tokenId: 2 })}
      >
        Claim NFT!
      </button>
    </div>
  );

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    console.error("failed to mint nft", error);
  }

  return (
    <div>
      {address ? (
        <div>
          <h4>Connected as {address}</h4>
          <button onClick={disconnectWallet}>Disconnect Metamask Wallet</button>
        </div>
      ) : (
        <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
      )}
      {mint1}
      {mint2}
      {mint3}
    </div>
  );
}
