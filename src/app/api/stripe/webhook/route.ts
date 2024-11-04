import Stripe from "stripe";

import { cancelSubscription, createSubscription } from "@/actions";
import { stripe } from "@/lib/stripe";

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  const webHookSecret =
    process.env.NODE_ENV === "production"
      ? process.env.STRIPE_WEBHOOK_SECRET
      : process.env.STRIPE_WEBHOOK_LOCAL_SECRET;

  if (!webHookSecret) {
    return new Response("No webhook secret provided", { status: 400 });
  }

  if (!sig) {
    return new Response("No signature provided", { status: 400 });
  }

  const event = stripe.webhooks.constructEvent(body, sig, webHookSecret);

  const data = event.data.object as Stripe.Subscription;

  if (relevantEvents.has(event.type)) {
    if (event.type === "customer.subscription.created") {
      const { customer } = data;
      await createSubscription({ stripeCustomerId: customer as string });
    } else if (event.type === "customer.subscription.deleted") {
      const { customer } = data;
      await cancelSubscription({ stripeCustomerId: customer as string });
    }
  }

  return new Response(
    JSON.stringify({
      received: true,
    }),
    { status: 200 }
  );
}
