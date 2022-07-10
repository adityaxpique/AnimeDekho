import Link from "next/link";
import Image from "next/image";
import { request, gql } from "graphql-request";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import "swiper/css/pagination";
import { fetchRecommendationsByAnime } from "../../../utils/fetch";
import stylesC from "../../../styles/Card.module.css";
import "swiper/css";
import styles from "../../../styles/Screens.module.css";
import stylesAI from "../../../styles/Animeinfo.module.css";
import { Box, Flex, Heading, HStack, Text, Button } from "@chakra-ui/react";

const AnimeInfo = ({
  data: {
    id,
    title,
    description,
    episodes,
    status,
    genres,
    bannerImage,
    duration,
    meanScore,
  },
  recommend,
}) => {
  let episodeButtons = [];
  for (let i = 0; i < episodes; i++) {
    episodeButtons.push(
      <Link href={`/animeWatch/${id}/${i + 1}`} key={i + 1} passHref>
        <Button variant="solid" colorScheme="orange">
          {i + 1}
        </Button>
      </Link>
    );
  }

  return (
    <Flex
      minH="90vh"
      p={{ base: "1em", md: "2em" }}
      direction="column"
      gap="2em"
      bgColor="blackAlpha.900"
    >
      <Image
        src={bannerImage}
        alt={title.english}
        width={400}
        height={100}
        priority
        quality={85}
        layout="responsive"
        className={styles.imgShadow} 
      />

      <Flex direction="column" gap="2em">
        <Heading
          className={stylesAI.heading}
          as="h3"
          size="2xl"
          fontFamily="bold"
          textColor="white"
        >
          <p>{title.english}</p>
        </Heading>

        <Heading
          className={stylesAI.genres}
          as="h4"
          size="lg"
          fontFamily="semibold"
          textColor="white"
        >
          {genres.map((genre) => {
            return <p>{genre}</p>;
          })}
        </Heading>

        <HStack justify="space-between" wrap="wrap">
          <HStack spacing="1em">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              fill="yellow"
              viewBox="0 0 16 16"
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>
            <Text fontSize="1.2em" fontWeight="semibold" textColor="white">
              {meanScore / 10}
            </Text>
          </HStack>
          {episodes ? (
            <HStack spacing="1em">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                fill="firebrick"
                viewBox="0 0 16 16"
              >
                <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z" />
                <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z" />
              </svg>
              <Text fontSize="1.2em" fontWeight="semibold" textColor="white">
                {episodes} episodes
              </Text>
            </HStack>
          ) : null}
          {duration ? (
            <HStack spacing="1em">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                fill="lightblue"
                viewBox="0 0 16 16"
              >
                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
              </svg>
              <Text fontSize="1.2em" fontWeight="semibold" textColor="white">
                {duration} minutes
              </Text>
            </HStack>
          ) : null}
          <Text fontSize="1.2em" fontWeight="semibold" textColor="white">
            STATUS : {status}
          </Text>
        </HStack>

        <Box display="grid" gridTemplateColumns="1fr" gridGap="1em">
          <Heading
            className={stylesAI.description}
            as="h4"
            size="lg"
            fontFamily="semibold"
            textColor="white"
          >
            <p>Description</p>
          </Heading>
          <Text
            className={stylesAI.descriptionText}
            fontSize="1.2em"
            dangerouslySetInnerHTML={{ __html: description }}
            textColor="white"
          ></Text>
        </Box>
        <Box display="grid" gridTemplateColumns="1fr" gridGap="1em">
          <Heading
            className={stylesAI.description}
            as="h4"
            size="lg"
            fontFamily="semibold"
            textColor="white"
          >
            <p>Episodes</p>
          </Heading>
          <Box
            display="grid"
            gridTemplateColumns={{
              base: "repeat(5, 1fr)",
              md: "repeat(10, 1fr)",
            }}
            gridGap="1em"
          >
            {episodeButtons.map((button) => button)}
          </Box>
        </Box>
      </Flex>

      <Flex direction="column" gap="1em">
        <Heading
          className={stylesAI.description}
          as="h4"
          size="lg"
          fontFamily="semibold"
          textColor="white"
        >
          <p>RECOMMENDATIONS&nbsp; BASED &nbsp;ON &nbsp;{title.english}</p>
        </Heading>
        <Swiper
          slidesPerView="auto"
          spaceBetween={40}
          centeredSlides={true}
          loop={true}
          loopedSlides={10}
          grabCursor={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow]}
          style={{ width: "80%" }}
        >
          {recommend.map(
            ({ media: { title, coverImage, meanScore, id } }, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "240px",
                }}
              >
                <Link href={`/animeInfo/${id}`} passHref>
                  <div className={stylesC.cardparent}>
                    <div className={stylesC.subparentcard}>
                      <div className={stylesC.imgholder}>
                        <img
                          className={stylesC.coverImg}
                          src={coverImage.extraLarge}
                          alt=""
                        />
                      </div>
                      <div className={stylesC.content}>
                        <h1 className={stylesC.heading}>{title.english}</h1>
                        <div className={stylesC.rating}>
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
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </Flex>
    </Flex>
  );
};

export default AnimeInfo;

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const query = gql`
    {
      info: Media(id: ${id}) {
        id
        title {
          english
        }
        description
        episodes
        status
        genres
        bannerImage
        duration
        meanScore
      }
    }
  `;
  const data = await request("https://graphql.anilist.co", query);
  const recommend = await fetchRecommendationsByAnime(id);

  return {
    props: {
      data: data.info,
      recommend,
    },
  };
};
