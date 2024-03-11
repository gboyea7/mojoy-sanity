"use client";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import Link from "next/link";
import { FaRegUser, FaOpencart } from "react-icons/fa6";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const NavIcon = () => {
  const { productData } = useSelector((state: StateProps) => state.mojoy);
  const { data: session } = useSession();
  return (
    <div className="flex gap-8 lg:gap-12 ">
      <Link href={"/cart"} className="relative group">
        <FaOpencart className="cursor-pointer text-2xl text-gray-800 hover:text-yellow-400" />
        <p className="absolute bottom-5 left-5 bg-gray-800 group-hover:bg-yellow-400 text-white text-xs w-4 h-4 rounded-full flex justify-center items-center">
          {productData ? productData?.length : 0}
        </p>
      </Link>
      <button
        onClick={() =>
          !session?.user ? signIn() : toast.success("Your are signed in")
        }
      >
        {session?.user ? (
          <Image
            src={session?.user?.image!}
            alt="user image"
            width={35}
            height={35}
            className="rounded-full lg:w-16 "
          />
        ) : (
          <FaRegUser className="cursor-pointer text-2xl text-gray-800 hover:text-yellow-400" />
        )}
      </button>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default NavIcon;
