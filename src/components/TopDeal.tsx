"use client";
import Container from "./Container";
import { motion } from "framer-motion";
import { ProductProps } from "../../type";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import ListProduct from "./ListProduct";

interface Props {
  products: ProductProps[];
}

const TopDeal = ({ products }: Props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <Container className="w-full pb-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, duration: 0.9 },
        }}
        viewport={{ once: true }}
        className="my-2 lg:my-4 ml-5 lg:ml-10 group"
      >
        <h1 className="text-2xl text-center lg:text-3xl font-medium">
          Top Deals
        </h1>
        <div className="h-2 my-4 lg:mx-24 mx-8 bg-slate-200 group-hover:bg-yellow-400"></div>
      </motion.div>
      <div>
        <Slider {...settings}>
          {products?.map((item: ProductProps) => (
            <div key={item?._id} className="px-2">
              <ListProduct product={item} />
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default TopDeal;
