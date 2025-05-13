"use client";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import firebaseApp from "../../../../firebase/clientApp";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(getAuth(firebaseApp), (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push("/");
      }
    });
  }, []);

  return <>{!loading && children}</>;
}
