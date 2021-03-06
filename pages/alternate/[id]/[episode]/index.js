import { useRouter } from "next/router";
import { request, gql } from "graphql-request";
import { magic } from "../../../../utils/scrapper";
import stylesAI from "../../../../styles/Animeinfo.module.css";


import { Flex, Heading, Text, Button, AspectRatio } from "@chakra-ui/react";

const AnimeWatch = ({ data, videoLink, episode, id }) => {
  const router = useRouter();

  return (
    <Flex
      minH="90vh"
      p={{ base: "1em", md: "2em" }}
      direction="column"
      gap="2em"
      bgColor="blackAlpha.900"
    >
      <Heading
        className={stylesAI.heading}
        as="h3"
        size="2xl"
        fontFamily="bold"
        textColor="white"
      >
        <p>{data?.title?.english}</p>
      </Heading>
      <Heading
        className={stylesAI.description}
        as="h4"
        size="lg"
        fontFamily="semibold"
        textColor="white"
      >
        <p> Episode {episode} </p>
      </Heading>

      {videoLink ? (
        <AspectRatio maxW="100%" ratio={16 / 9}>
          <iframe
            src={videoLink}
            style={{
              border: 0,
              height: "100%",
              left: 0,
              position: "absolute",
              top: 0,
              width: "100%",
            }}
            allowFullScreen
          ></iframe>
        </AspectRatio>
      ) : (
        <Text
          fontSize={{ base: "1em", md: "1.2em" }}
          fontWeight="semibold"
          textColor="white"
        >
          Sorry, can&apos;t get the episode
        </Text>
      )}

      <Flex direction="row" justify="space-between">
        <Button
          isDisabled={parseInt(episode) != 1 ? false : true}
          mr="auto"
          variant="solid"
          colorScheme="green"
          onClick={() =>
            router.push(`/animeWatch/${id}/${parseInt(episode) - 1}`)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
          </svg>
          Previous
        </Button>

        <Button
          isDisabled={parseInt(episode) != data.episodes ? false : true}
          ml="auto"
          variant="solid"
          colorScheme="green"
          onClick={() =>
            router.push(`/animeWatch/${id}/${parseInt(episode) + 1}`)
          }
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
          </svg>
        </Button>
      </Flex>

      <Button
        variant="link"
        colorScheme="green"
        onClick={() => router.push(`/alternate/${id}/${parseInt(episode)}`)}
      >
        Not available? Try this
      </Button>
    </Flex>
  );
};

export default AnimeWatch;

export const getServerSideProps = async (context) => {
  const { id, episode } = context.params;

  const query = gql`
      {
        info: Media(id: ${id}) {
          title {
            english
          }
        }
      }
    `;
  const data = await request("https://graphql.anilist.co", query);
  let videoLink;
  videoLink = await magic(data?.info?.title?.english, episode);
  return {
    props: {
      data: data.info,
      videoLink,
      episode,
      id,
    },
  };
};
