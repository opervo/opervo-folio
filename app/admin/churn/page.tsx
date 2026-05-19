"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChurnRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/operators?filter=churn_risk");
  }, [router]);
  return null;
}
