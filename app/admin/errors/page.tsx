"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ErrorsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/devtools");
  }, [router]);
  return null;
}
