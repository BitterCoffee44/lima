import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { logOutAdmin } from "../../firebase/auth/firebaseAuthentication";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        const success = await logOutAdmin();
        if (success.status) {
          toast.success("User signed out.");
          router.push("/");
        }
      }}
    >
      Log out
    </Button>
  );
}
