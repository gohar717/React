import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { User } from "../../UserService";
import styles from "./styles.module.scss";

import { getMyNfts, setMyNfts } from "../../GlobalState/NftsSlice/nftsSlice";

import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import NoDataMessage from "../../components/NoDataMessage/NoDataMessage";

// Lazily loaded component for rendering NFT cards
const MyNftCard = React.lazy(() =>
  import("../../components/Nft/MyNftCard/MyNftCard")
);

const MyNftsPage = () => {
  const dispatch = useDispatch();
  const { myNfts } = useSelector((state) => state.nfts);
  const { username, email } = useSelector((state) => state.player);
  const { waxConnected, anchorConnected } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(null);
  const [visibleNfts, setVisibleNfts] = useState(10);

  useEffect(() => {
    // Fetch user's NFTs on page load
    setLoader(true);
    dispatch(getMyNfts());
    setLoader(false);
  }, [dispatch]);

  useEffect(() => {
    // Reset user's NFTs on component unmount
    return () => dispatch(setMyNfts([]));
  }, [dispatch]);

  // Function to import an NFT based on the selected platform
  const importNft = (nft) => {
    if (!username && !email) {
      toast.warning("To import an NFT please login into your gaming account");
      return;
    }
    if (anchorConnected) {
      importWithAnchor(nft);
    } else if (waxConnected) {
      importWithWaxCloud(nft);
    }
  };

  // Function to import an NFT using Anchor wallet
  const importWithAnchor = (nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft.asset_id);
    User.anchorSession
      ?.transact(
        {
          actions: [
            {
              account: "atomicassets",
              name: "transfer",
              authorization: [
                {
                  actor: User.anchorSession?.auth?.actor.toString(),
                  permission: "active",
                },
              ],
              data: {
                from: User.anchorSession?.auth?.actor.toString(),
                to: "triliumquest",
                asset_ids: [nft.asset_id],
                memo: `staking%${username || email}`,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      )
      .then((_) => {
        toast.success(
          "NFT successfully imported. The list will be updated in a few seconds"
        );
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  // Function to import an NFT using Wax Cloud wallet
  const importWithWaxCloud = (nft) => {
    if (buttonLoader) return;

    setButtonLoader(nft.asset_id);
    User.wax.api
      .transact(
        {
          actions: [
            {
              account: "atomicassets",
              name: "transfer",
              authorization: [
                {
                  actor: User.wax?.userAccount,
                  permission: "active",
                },
              ],
              data: {
                from: User.wax?.userAccount,
                to: "triliumquest",
                asset_ids: [nft.asset_id],
                memo: `staking%${username || email}`,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      )
      .then((_) => {
        toast.success(
          "NFT successfully imported. The list will be updated in a few seconds"
        );
        setButtonLoader(null);
        dispatch(getMyNfts());
      })
      .catch((_) => {
        setButtonLoader(null);
        dispatch(getMyNfts());
      });
  };

  // Function to load more NFTs on button click
  const handleSeeMore = () => {
    setVisibleNfts((prevVisibleNfts) => prevVisibleNfts + 10);
  };

  return (
    <Container>
      <div className={styles.container}>
        <h2>My Nfts</h2>
        <p>
          Below are the NFTs you have on your Wallet. You can import them on
          Smart Contract.
        </p>
        <p>
          {!myNfts || loader ? "You don't have" : `You have ${myNfts.length}`}{" "}
          {myNfts.length > 1 ? "nfts" : "nft"}
        </p>
        {loader ? (
          <div className={styles.loader}>
            <Loader size={100} />
          </div>
        ) : !myNfts[0] ? (
          <NoDataMessage />
        ) : (
          <div className={styles.nfts_block}>
            {myNfts.slice(0, visibleNfts).map((nft) => (
              <React.Suspense
                fallback={<Loader size={250} />}
                key={nft.asset_id}
              >
                <MyNftCard
                  key={nft.asset_id}
                  nft={nft}
                  importNft={importNft}
                  buttonLoader={buttonLoader === nft.asset_id}
                />
              </React.Suspense>
            ))}
          </div>
        )}
        <div className={styles.see_more_wrapper}>
          {visibleNfts < myNfts.length && (
            <Button onClick={handleSeeMore} size="fit" color="blue">
              See More
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyNftsPage;
