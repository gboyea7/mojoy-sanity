import { NextRequest, NextResponse } from "next/server";
import { ProductProps } from "../../../../type";
import { urlFor } from "@/lib/sanityClient";
import axios from "axios"; // Import axios for making HTTP requests

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { items, email } = reqBody;

    const transformedItems = items.map((item: ProductProps) => ({
      ...item,
      amount: (item.price * item.quantity + 2500) * 100, // Paystack requires amount in kobo
      name: item.title,
      description: item.description,
      images: [urlFor(item.image).url()],
    }));

    console.log("Transformed items:", transformedItems);

    // Create a payload for initializing the payment request
    const payload = {
      email,
      amount: transformedItems.reduce(
        (acc: any, item: any) => acc + item.amount,
        0
      ),
      currency: "NGN", // Paystack requires currency in Nigerian Naira
      reference: Math.floor(Math.random() * 1000000000 + 1).toString(), // Generate a unique reference
      callback_url: `${process.env.NEXTAUTH_URL}success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        email,
      },
    };

    console.log("Payload:", payload);

    // Make a POST request to Paystack's Initialize Transaction endpoint
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Include your Paystack secret key in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Paystack response:", response.data);

    return NextResponse.json({
      success: true,
      redirect_url: response.data.data.authorization_url,
    });
  } catch (error: any) {
    console.error("Error processing payment:", error);

    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
