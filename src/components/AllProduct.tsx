"use client";
import Container from "./Container";
import { motion } from "framer-motion";
import { ProductProps } from "../../type";
import Product from "./Product";

interface Props {
  products: ProductProps[];
}

const AllProduct = ({ products }: Props) => {
  return (
    <Container className="w-full pb-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, duration: 0.9 },
        }}
        viewport={{ once: true }}
        className="my-2 lg:my-4 ml-5 lg:ml-10"
      >
        <h1 className="text-2xl text-center lg:text-3xl font-medium">
          All Hp Items
        </h1>
      </motion.div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mr-5">
        {products?.map((item: ProductProps) => (
          <Product key={item._id} product={item} />
        ))}
      </div>
    </Container>
  );
};

export default AllProduct;
