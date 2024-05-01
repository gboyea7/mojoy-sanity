//component/carts.ta
"use client";
import React, { useState } from "react";
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
  const { productData, totalAmount } = useSelector(
    (state: StateProps) => state.mojoy
  );
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [checkoutData, setCheckoutData] = useState({
    products: productData,
    totalAmount: totalAmount, // Initialize totalAmount here
    phone: phone,
    address: address,
  });

  const handleReset = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    confirmed && dispatch(resetCart());
    toast.success("Cart resetted successfully!");
  };

  const createCheckout = async () => {
    // Check if phone number has 11 digits
    if (phone.length !== 11) {
      toast.error("Please enter a valid phone number with 11 digits");
      return;
    }

    // Check if address has at least 15 characters
    if (address.length < 15) {
      toast.error("Please enter an address with at least 15 characters");
      return;
    }

    // Proceed to checkout if phone number and address are valid
    if (session?.user) {
      const checkoutData = {
        products: productData,
        totalAmount: totalAmount,
        phone: phone,
        address: address,
      };

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(checkoutData),
        });

        if (response.ok) {
          const data = await response.json();
          window.location.href = data.redirect_url; // Redirect to Paystack checkout
        } else {
          throw new Error("Failed to create checkout");
        }
      } catch (error) {
        console.error("Error creating checkout:", error);
        toast.error("Failed to create checkout. Please try again later.");
      }
      // Log checkout data
      console.log("Checkout Data:", checkoutData);
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
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                />
                <textarea
                  id="address"
                  name="address"
                  className="border-[1px] border-gray-400 h-[100px] py-2 text-md px-4 font-medium"
                  placeholder="Enter your address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
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
                    <Price amount={totalAmount - 5000} />
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
                    <Price amount={totalAmount} />
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
