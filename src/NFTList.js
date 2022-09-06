import {
  useNFTDrop,
  useMintNFT,
  useNFTs,
  useNFTCollection,
  useClaimNFT,
  useNFT,
} from "@thirdweb-dev/react";
import { version } from "chai";

export default function NFTList(props) {
  const contractAddress = "0xEed79CEf952584822EDbEe7732c25032Ea3714af";
  const contract = useNFTDrop(contractAddress);
  const nftCollection = useNFTCollection(contractAddress);
  const { mutate: claimNft, isLoading1, error1 } = useClaimNFT(nftCollection);
  const { mutate: mintNft, isLoading2, error2 } = useMintNFT(nftCollection);
  const { mutate: allNFTS, isLoading3, error3 } = useNFT(nftCollection);
  const {
    data: nfts,
    isLoading,
    error,
  } = useNFTs(contract, { start: 0, count: 100 });

  if (error1) {
    console.error("failed to mint nft", error1);
  }

  if (!nfts || !props.address) {
    return <div>LOADING</div>;
  }

  console.log(allNFTS);

  let allStandardNFT = [];
  for (let nft of nfts) {
    console.log(nft);
    if (nft.metadata.attributes[0].value === "Blue") {
      allStandardNFT.push(nft);
    }
  }

  const mint = async (nftName) => {
    try {
      claimNft({ to: props.address, quantity: 1 });
      alert("mint succesfuly");
    } catch (error) {
      alert("ERROR! :", error);
    }
  };

  const imageList = nfts.map((nft) => (
    <div>
      <h2>{nft.metadata.name}</h2>
      <img src={nft.metadata.image} width="200" height="200" />

      <button disabled={isLoading} onClick={() => mint(nft.metadata.name)}>
        Mint!
      </button>
    </div>
  ));
  //props.address?.claim(tokenId :, quantitiy : 1)

  const standardNFT = allStandardNFT.map((standard) => (
    <div>
      <h2>{standard.metadata.name}</h2>
      <img src={standard.metadata.image} width="200" height="200" />
      <button disabled={isLoading} onClick={() => mint(standard.metadata.name)}>
        Mint!
      </button>
    </div>
  ));

  return (
    <div>
      {imageList}
      <h2>Standard NFTBookings</h2>
      {standardNFT}
    </div>
  );
}
