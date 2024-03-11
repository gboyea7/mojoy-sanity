import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/lib/sanityClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const event = req.body;

    // Check if the event type is payment success
    if (event?.event === "charge.success") {
      const session = event.data;

      // Fulfill the order by creating an entry in the database
      await fulfillOrder(session);

      // Respond with a success message
      res.status(200).json({ status: "success" });
    } else {
      // If the event is not relevant or unrecognized, respond with success
      res.status(200).json({ status: "success" });
    }
  } catch (error) {
    console.error("Error processing webhook event:", error);
    res.status(400).json({ status: "error" });
  }
}

const fulfillOrder = async (session: any) => {
  try {
    await client.create({
      _type: "order",
      status: session.status,
      message: "Payment done",
      description: session?.description || "Test message from orders",
      title: session?.id || "Orders",
      method: session.confirmation_method,
      amount: session.amount / 100,
      // lineItem: lineItems,
    });
  } catch (error: any) {
    console.log("error", error?.message);
  }

  console.log("session", session);
  // Not sure what NextResponse.json() is supposed to do here, you might remove it
};
