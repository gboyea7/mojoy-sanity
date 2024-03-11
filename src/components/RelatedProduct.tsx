"use client";
import Container from "./Container";
import { ProductProps } from "../../type";
import Product from "./Product";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

interface Props {
  relatedProducts: ProductProps[]; // Change the prop name to relatedProducts
}

const RelatedProduct = ({ relatedProducts }: Props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <div className="w-full pb-20">
      <div>
        <Slider {...settings}>
          {relatedProducts?.map((item: ProductProps) => (
            <div key={item?._id} className="px-2">
              <Product product={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RelatedProduct;
