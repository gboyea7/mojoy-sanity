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
    <div className="flex gap-8 lg:gap-6">
      <Link href={"/cart"} className="relative group">
        <div className="flex justify-between items-center md:w-[62px]">
          <FaOpencart className="cursor-pointer text-2xl text-gray-800 text-[#FACA15]" />
          {productData && productData.length > 0 && (
            <p className="absolute bottom-5 left-5 bg-[#FACA15] text-[#3633112] text-xs w-4 h-4 rounded-full flex justify-center items-center">
              {productData.length}
            </p>
          )}
          <div className="text-sm hover:text-[#FACA15] -mb-3 cursor-pointer md:block hidden">
            Cart
          </div>
        </div>
      </Link>

      {/* Account */}
      <div className="flex justify-between items-center">
        <button
          className="flex justify-between items-center md:w-[87px]"
          onClick={() =>
            !session?.user ? signIn() : toast.success("Your are signed in")
          }
        >
          {session?.user ? (
            <Image
              src={session?.user?.image!}
              alt="user image"
              width={30}
              height={30}
              className="rounded-full "
            />
          ) : (
            <FaRegUser className="cursor-pointer text-xl text-gray-800 hover:text-yellow-400 md:-mb-1" />
          )}
          <div className="text-sm hover:text-[#FACA15] cursor-pointer -mb-3 md:block hidden">
            Account
          </div>
        </button>
      </div>

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
