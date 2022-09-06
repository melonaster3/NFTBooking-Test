import {
  useNFTDrop,
  useMintNFT,
  useNFTs,
  useNFTCollection,
  useClaimNFT,
  useNFT,
} from "@thirdweb-dev/react";

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
        image: "../public/NFTBooking.jpg",
        to: props.address,
      });
      alert("Mint Succesful!");
    } catch (error) {
      alert("ERROR! :", error);
    }
  };

  return (
    <div>
      <img src="../public/NFTBooking.jpg" />
      <button disabled={isLoading} onClick={() => mintNFT()}>
        Mint!
      </button>
    </div>
  );
}
