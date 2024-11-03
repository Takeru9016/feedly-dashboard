import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { stripe } from "@/lib/stripe";

export default async function POST(req: Request) {
  const { price, quantity = 1 } = await req.json();
  const { userId } = auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const userSubscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  let customer;

  if (userSubscription) {
    // If the user has a subscription, update the plan and quantity
  } else {
    // If the user doesn't have a subscription, create a new one
    const customerData: {
      metadata: {
        dbId: string;
      };
    } = {
      metadata: {
        dbId: userId,
      },
    };

    const response = await stripe.customers.create(customerData);
    customer = { id: response.id };
  }
}
