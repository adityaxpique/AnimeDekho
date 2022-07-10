import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { fetchAdvPaginatedAnimeData } from "../utils/fetch";
import styles1 from "../styles/Button.module.css";
import styles from "../styles/Screens.module.css";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

const PopularScreen = ({ data }) => {
  const [popularItems, addNewPopularItems] = useState(data);
  const [pageNo, incrPageNo] = useState(2);

  const getNewPopularItems = async () => {
    const popular = await fetchAdvPaginatedAnimeData("POPULARITY_DESC", pageNo);

    addNewPopularItems(popularItems.concat(popular));
    incrPageNo((prev) => prev + 1);
  };

  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="2em">
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr 1fr 1fr" }}
        gridGap="2em"
      >
        {popularItems.map(
          (
            { title, coverImage, season, seasonYear, episodes, meanScore, id },
            index
          ) => (
            <Link key={index} href={`/animeInfo/${id}`} passHref>
              <div className={styles.cardparent}>
                <div className={styles.subparentcard}>
                  <div className={styles.imgholder}>
                    <img
                      className={styles.coverImg}
                      src={coverImage.extraLarge}
                      alt=""
                    />
                  </div>
                  <div className={styles.content}>
                    <h1 className={styles.heading}>{title.english}</h1>
                    <div className={styles.rating}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="yellow"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                      <p>{meanScore / 10}</p>
                    </div>
                    <div className={styles.episodes}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="firebrick"
                      >
                        <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z" />
                        <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z" />
                      </svg>
                      <p>{episodes}</p>
                    </div>
                    <div className={styles.season}>
                      <span>{season}</span>
                      &nbsp;&nbsp;
                      <span>{seasonYear}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </Box>
      <Button
        width="8em"
        justifySelf="center"
        className={styles1.custombtn}
        onClick={getNewPopularItems}
      >
        Explore More
      </Button>
    </Box>
  );
};

export default PopularScreen;
