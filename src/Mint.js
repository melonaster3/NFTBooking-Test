import {
  useNFTDrop,
  useMintNFT,
  useNFTs,
  useNFTCollection,
  useClaimNFT,
  useNFT,
} from "@thirdweb-dev/react";

import standardImage from "../public/NFTBooking.jpg";

export default function Mint(props) {
  const contractAddress = "0xEed79CEf952584822EDbEe7732c25032Ea3714af";
  const nftDrop = useNFTDrop(contractAddress);

  const { mutate: mintNft, isLoading, error } = useMintNFT(nftDrop);

  if (error) {
    console.error("failed to mint nft", error);
  }

  const mintNFT = async () => {
    try {
      mintNft({
        name: "NFT Booking Lounge Collection",
        description: "Standard NFT Booking Lounge Collection",
        image: { standardImage },
        to: props.address,
      });
      alert("Mint Succesful!");
    } catch (error) {
      alert("ERROR! :", error);
    }
  };

  return (
    <div>
      <img src={standardImage} />
      <button disabled={isLoading} onClick={() => mintNFT()}>
        Mint!
      </button>
    </div>
  );
}
