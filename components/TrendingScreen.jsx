import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "../styles/Screens.module.css";
import stylesC from "../styles/Card.module.css";
import { Box, HStack, Heading } from "@chakra-ui/react";

const TrendingScreen = ({ data }) => {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={0}
      centeredSlides={true}
      loop={true}
      loopedSlides={10}
      grabCursor={true}
      effect="coverflow"
      autoplay={{
        delay: 5000,
      }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      }}
      modules={[Autoplay, EffectCoverflow]}
      style={{ width: "100%" }}
    >
      {data.map(({ title, coverImage, meanScore, id }, index) => (
        <SwiperSlide
          key={index}
          style={{
            width: "280px",
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
      ))}
    </Swiper>
  );
};

export default TrendingScreen;
