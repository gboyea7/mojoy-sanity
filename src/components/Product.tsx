"use client";
import Link from "next/link";
import { ProductProps } from "../../type";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import { BsArrowsFullscreen } from "react-icons/bs";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/mojoySlice";
import toast, { Toaster } from "react-hot-toast";
import Price from "./Price";

interface Props {
  product: ProductProps;
  bg?: string;
}

const Product = ({ product, bg }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full relative group border-[1px] border-gray-300 hover:shadow-lg duration-200 shadow-gray-500 rounded-lg overflow-hidden group">
      <div className="w-full h-80 flex items-center justify-center bg-white overflow-hidden">
        <div className={`relative ${bg}`}>
          <div>
            <Image
              src={urlFor(product?.image).url()}
              alt="product image"
              width={700}
              height={700}
              className="w-72 h-72 object-contain"
            />
          </div>
          <div className="bottom-0 flex items-center gap-5 justify-center translate-y-[110%] group-hover:-translate-y-2 transition-transform duration-300">
            <button
              onClick={() => {
                dispatch(addToCart(product));
                toast.success(
                  `${product?.title.substring(0, 12)}... added to cart`
                );
              }}
              className="bg-gray-800 w-[100px] justify-center text-gray-200 px-4 py-2 text-xs rounded-full flex items-center gap-4 hover:bg-yellow-400 hover:text-white duration-200"
            >
              <span>
                <AiOutlineShopping />
              </span>
              Cart
            </button>
            <Link
              href={`/product/${product?.slug?.current}`}
              className="bg-gray-800 w-[100px] justify-center  text-gray-200 px-4 py-2 text-xs rounded-full flex items-center gap-4 hover:bg-yellow-400 hover:text-white duration-200"
            >
              <span>
                <BsArrowsFullscreen />
              </span>
              Preview
            </Link>
          </div>
          {product?.quantity && product?.quantity < 5 && (
            <p className="absolute top-4 left-3 text-sm text-red-500">
              Only {product?.quantity} left!
            </p>
          )}
          {product?.isnew && (
            <div className="absolute top-2 right-2 z-50">
              <p className="bg-yellow-400 px-4 py-1 text-primary flex justify-center items-center text-sm font-semibold hover:bg-gray-800 hover:text-yellow-400 duration-300 cursor-pointer rounded-md">
                New
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-primary font-bold">
            {product?.title.substring(0, 15)}
          </h2>
          <div className="flex flex-col items-center justify-center">
            <p className="font-medium line-through decoration-red-500 text-xs">
              <Price amount={product?.rowprice} />
            </p>
            <p className="font-bold">
              <Price amount={product?.price} />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#767676] text-sm">
            a product by{" "}
            <span className="font-semibold text-gray-950">
              {product?.brand}
            </span>
          </p>
          <div className="flex items-center gap-1">
            <MdOutlineStarPurple500 className="text-lg text-yellow-500" />
            <span className="font-medium text-sm">{product?.ratings}</span>
          </div>
        </div>
      </div>
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

export default Product;
