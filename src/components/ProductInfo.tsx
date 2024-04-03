"use client";
import { ProductProps } from "../../type";
import Price from "./Price";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/mojoySlice";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  product: ProductProps;
}
const ProudctInfo = ({ product }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold">{product?.title}</h2>
      <div className="flex flex-col lg:flex-row justify-start lg:items-center gap-4">
        <p className="text-lg font-normal text-gray-500 line-through">
          <Price amount={product?.rowprice} />
        </p>

        <Price amount={product?.price} className="text-lg font-bold" />

        <p className="text-sm">
          you saved{" "}
          <Price
            className="bg-green-700 text-white px-2 rounded-md"
            amount={product?.rowprice - product?.price}
          />
        </p>
      </div>
      <p className="text-sm tracking-wide text-gray-600">
        {product?.description}
      </p>
      <button
        onClick={() => {
          dispatch(addToCart(product));
          toast.success(`${product?.title.substring(0, 12)}... added to cart`);
        }}
        className="w-full py-4 bg-primary bg-yellow-400 hover:bg-black duration-300 text-white text-lg rounded-md"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium">Category:</span>
        <span className="mx-2 font-bold text-gray-950">
          {product?.category}
        </span>
      </p>
      <p className="font-normal text-sm">
        <span className="text-base font-medium">Brand:</span>
        <span className="mx-2 font-bold text-gray-950">{product?.brand}</span>
      </p>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#FFEE58",
          },
        }}
      />
    </div>
  );
};

export default ProudctInfo;
