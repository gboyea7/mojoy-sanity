//component/carts.ta
"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../type";
import CartItem from "./CartItem";
import { resetCart } from "@/redux/mojoySlice";
import toast from "react-hot-toast";
import emptyCart from "@/assets/emptyCart.png";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Price from "./Price";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { productData } = useSelector((state: StateProps) => state.mojoy);
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const calculateTotal = () => {
      let price = 0;
      productData.forEach((item) => {
        price += item?.price * item?.quantity;
      });
      return price;
    };

    const total = calculateTotal();
    setTotalAmt(total);
  }, [productData]);

  const [cartData, setCartData] = useState({
    products: productData,
    totalAmount: totalAmt, // Initialize totalAmount here
    phone: "",
    address: "",
  });

  const handlePhoneChange = (e: { target: { value: any } }) => {
    setCartData((prevCartData) => ({ ...prevCartData, phone: e.target.value })); // Update cartData while maintaining totalAmount
  };

  const handleAddressChange = (e: { target: { value: any } }) => {
    setCartData((prevCartData) => ({
      ...prevCartData,
      address: e.target.value,
    })); // Update cartData while maintaining totalAmount
  };

  const handleReset = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    confirmed && dispatch(resetCart());
    toast.success("Cart resetted successfully!");
  };

  const createCheckout = async () => {
    if (session?.user) {
      // ... your existing logic for sending cartData to the backend ...

      // Save cart data (You might want to use a database or local storage)
      localStorage.setItem("cartData", JSON.stringify(cartData));

      // Log cart data
      console.log("Cart Data:", cartData);
    } else {
      // ... error handling for users who are not logged in ...
      toast.error("Please sign in to make Checkout");
    }
  };
  return (
    <Container className="">
      {productData?.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#f5f7f7] text-primary hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {productData.map((item) => (
              <div key={item?._id}>
                <CartItem item={item} />
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          <div className="max-w-7xl gap-4 flex flex-col lg:flex-row lg:items-start items-center lg:justify-between mt-4">
            <div className="w-96 flex flex-col  gap-4">
              <h1 className="text-2xl font-semibold text-right lg:text-left">
                Delivery details
              </h1>
              <div className=" flex flex-col justify-center">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="border-[1px] border-gray-400  py-2 text-md px-4 font-medium"
                  placeholder="Enter your phone number"
                  onChange={handlePhoneChange}
                  value={cartData.phone}
                  required
                />
                <textarea
                  id="address"
                  name="address"
                  className="border-[1px] border-gray-400 h-[100px] py-2 text-md px-4 font-medium"
                  placeholder="Enter your address"
                  onChange={handleAddressChange}
                  value={cartData.address}
                  required
                />
              </div>
            </div>
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal{" "}
                  <span>
                    <Price amount={totalAmt} />
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <div className="flex flex-col items-end">
                    <span className="font-semibold tracking-wide font-titleFont">
                      {/*price on state*/}
                      <Price amount={5000} />
                    </span>
                    <span className="text-xs font-normal">
                      Delivery only in Lagos
                    </span>
                  </div>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    <Price amount={totalAmt + 5000} />
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={createCheckout}
                  className="w-52 h-10 bg-primary text-black bg-yellow-400 hover:text-yellow-400 hover:bg-black duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <Image
              src={emptyCart}
              alt="emptyCart"
              className="w-80 rounded-lg p-4 mx-auto"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col gap-4 items-center rounded-md shadow-lg">
            <h1 className="text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link
              href={"/shop"}
              className="bg-primary rounded-md cursor-pointer hover:bg-yellow-400 active:bg-yellow-500 px-8 py-2 font-semibold text-lg text-gray-200 hover:text-white duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      )}
    </Container>
  );
};

export default Cart;
