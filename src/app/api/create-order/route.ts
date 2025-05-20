import { NextResponse } from "next/server";
import { sClient } from "../../../lib/sanityClient";

interface RequestBody {
  userEmail: string;
  amount: number;
  reference: string;
  status: string;
  state: string;
  lga: string;
  deliveryType: string;
}

export async function POST(request: Request) {
  const { userEmail, amount, reference, status, state, lga, deliveryType } =
    (await request.json()) as RequestBody;

  if (
    !userEmail ||
    !amount ||
    !reference ||
    !status ||
    !state ||
    !lga ||
    !deliveryType
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    console.log("Creating order with data:", {
      userEmail,
      amount,
      reference,
      status,
      state,
      lga,
      deliveryType,
    });
    const order = await sClient.create({
      _type: "order",
      userEmail,
      amount,
      state,
      lga,
      deliveryType,
      reference,
      status,
      createdAt: new Date().toISOString(),
    });
    console.log("Order created:", order);
    return NextResponse.json({ order }, { status: 200 });
  } catch (err: any) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { error: "Failed to create order", details: err.message },
      { status: 500 }
    );
  }
}
