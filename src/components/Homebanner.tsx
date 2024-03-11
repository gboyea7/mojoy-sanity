"use client";
import Image from "next/image";
import React from "react";
import bannerimg from "@/assets/bannerimg1.png";
import Link from "next/link";
import { motion } from "framer-motion";

const HomeBanner = () => {
  return (
    <div className="flex bg-gray-800 w-full py-20 lg:py-2">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between px-5 lg:px-20">
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.5, duration: 0.8 },
          }}
          viewport={{ once: true }}
          className="flex flex-col text-white lg:ml-28 items-center lg:items-start lg:text-left text-center gap-2 justify-center"
        >
          <h2 className="text-3xl font-semibold mb-2 lg:text-5xl text-yellow-500">
            Thinking of you!
          </h2>
          <p className="text-md lg:text-xl font-light">
            Get ready for unbeatable deals on your favorite tech gear!
          </p>
          <p className="text-md lg:text-xl font-medium">
            We are dedicated to bringing you the best offers on top-notch tech
            products.
          </p>

          <Link
            href="/shop"
            className="bg-white text-yellow-500 px-6 py-1 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-500 hover:text-white transition duration-300"
          >
            <p className="animate-pulse">Shop Now &#8594;</p>
          </Link>
        </motion.div>
        {/* Image side */}
        <div className="relative flex justify-center lg:justify-end">
          {/* White circular blur */}
          <div className="absolute bg-gray-500 mr-10 rounded-full h-[300px] w-[300px] filter blur-3xl opacity-30 "></div>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.5, duration: 0.8 },
            }}
            viewport={{ once: true }}
          >
            <Image
              src={bannerimg}
              alt="Banner Image"
              className="relative h-64 lg:h-auto w-full lg:w-96 object-cover lg:mr-32 outline-nonerounded-lg z-10 hover:scale-110"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
