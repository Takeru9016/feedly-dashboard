"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripeClient";

export default function ManageSubscription() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToCustomer = async () => {
    setLoading(true);
    try {
      const { url } = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      console.log(url);
      router.push(url.url);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <Button
      onClick={redirectToCustomer}
      className="bg-indigo-700"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 size={20} className="mr-2 animate-spin" />
          Please Wait
        </>
      ) : (
        "Modify Subscription"
      )}
    </Button>
  );
}
