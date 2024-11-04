import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
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
    customer = { id: userSubscription.stripeCustomerId };
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

    await db.insert(subscriptions).values({
      userId,
      stripeCustomerId: customer.id,
      subscribed: true,
    });
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://tsx7q7-3000.csb.app/";

  if (!customer?.id) {
    return new Response(
      JSON.stringify({ error: "Failed to get customer id" }),
      {
        status: 500,
      }
    );
  }

  try {
    const url = await stripe.billingPortal.sessions.create({
      customer: customer?.id,
      return_url: `${baseUrl}/payments`,
    });

    if (url) {
      return new Response(JSON.stringify({ url }), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Failed to create a portal" }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create a portal" }),
      {
        status: 500,
      }
    );
  }
}
