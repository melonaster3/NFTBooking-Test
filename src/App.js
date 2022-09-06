import {
  useMetamask,
  useDisconnect,
  useAddress,
  useNFTCollection,
  useContract,
  useMintNFT,
} from "@thirdweb-dev/react";

import standard from "./NFTBooking.jpg";

export default function Home() {
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const contractAddress = "0x1eAFd10657d9dB71EB5663eF3942b1C0ec62E966";
  const nftCollection = useNFTCollection(contractAddress);
  const { contract } = useContract(contractAddress);

  const { mutate: mintNft, isLoading, error } = useMintNFT(nftCollection);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    console.error("failed to mint nft", error);
  }

  const mint = (
    <div>
      <img src={standard} />
      <button
        disabled={isLoading}
        onClick={() =>
          mintNft({
            metadata: {
              name: "NFTBooking Standard Lounge Collection",
              image: standard,
              description: "Standard Lounge Collection",
            },
            to: address,
          })
        }
      >
        Mint!
      </button>
    </div>
  );

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
      {mint}
    </div>
  );
}
