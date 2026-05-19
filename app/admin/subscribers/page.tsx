"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubscribersRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/operators?filter=paid");
  }, [router]);
  return null;
}
