import TrendingScreen from "../components/TrendingScreen";
import PopularScreen from "../components/PopularScreen";
import TopRatedScreen from "../components/TopRatedScreen";
import FavouritesScreen from "../components/FavouritesScreen";
import {
  fetchAdvPaginatedAnimeData,
  fetchAnimeDataBasic,
} from "../utils/fetch";
import styles from "../styles/Screens.module.css";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

const Home = ({ trending, popular, topRated, favourites }) => {
  return (
    <Flex
      minH="90vh"
      direction="column"
      gap="2em"
      p={{ base: "1em", md: "2em" }}
      bgColor="blackAlpha.900"
    >
      <TrendingScreen data={trending} />
      <Tabs variant="solid-rounded" colorScheme="green">
        <TabList className={styles.tablist}>
          <Tab
            _selected={{ color: "white", bg: "green.900" }}
            className={styles.tab}
          >
            <p>Popular</p>
          </Tab>
          <Tab
            _selected={{ color: "white", bg: "red.900" }}
            className={styles.tab}
          >
            <p>Top rated</p>
          </Tab>
          <Tab
            _selected={{ color: "white", bg: "yellow.900" }}
            className={styles.tab}
          >
            <p>Favourites</p>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PopularScreen data={popular} />
          </TabPanel>
          <TabPanel>
            <TopRatedScreen data={topRated} />
          </TabPanel>
          <TabPanel>
            <FavouritesScreen data={favourites} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const trending = await fetchAnimeDataBasic("TRENDING_DESC");
  const popular = await fetchAdvPaginatedAnimeData("POPULARITY_DESC", 1);
  const topRated = await fetchAdvPaginatedAnimeData("SCORE_DESC", 1);
  const favourites = await fetchAdvPaginatedAnimeData("FAVOURITES_DESC", 1);

  return {
    props: {
      trending,
      popular,
      topRated,
      favourites,
    },
  };
};
