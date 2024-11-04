import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import ManageSubscription from "./ManageSubscription";

export default async function Payment() {
  const { userId } = auth();

  if (!userId) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  const plan = subscription && subscription.subscribed ? "premium" : "free";

  return (
    <div className="p-4 border rounded-md">
      <h1 className="text-4xl mb-3">Subscription Details</h1>
      <p className="mb-2 text-lg">Your Current Plan is: {plan}</p>
      <ManageSubscription />
    </div>
  );
}
