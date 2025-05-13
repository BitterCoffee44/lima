"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/navigation";
import firebaseApp from "../../../../firebase/clientApp";
import { toast } from "sonner";

const logInFormSchema = z.object({
  username: z.string().email({
    message: "Email is required.",
  }),
  password: z.string().min(8, {
    message: "Password is required.",
  }),
});

export function LoginForm() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof logInFormSchema>) {
    setLoading(true);
    setError("");

    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, values.username, values.password)
      .then((userCredential) => {
        toast.success(`${userCredential.user.displayName} has signed in.`);
        router.push("/books");
      })
      .catch((error) => {
        toast.success(error.message);
        setError(error.message);
      });

    console.log(values);
    setLoading(false);
  }

  return (
    <div className="flex justify-center">
      <div className="w-[350px] mt-10  shadow-md shadow-gray-700-md">
        <CardHeader>
          <CardTitle className="text-center border-b border-black text-xl font-bold ">
            Admin Log in
          </CardTitle>
        </CardHeader>
        <CardContent className="my-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center mx-5">
                <Button disabled={loading} type="submit" className="w-full ">
                  {loading ? "Logging in...." : "Login"}
                </Button>
                <p className="text-red-500">{error}</p>
              </div>
            </form>
          </Form>
        </CardContent>
      </div>
    </div>
  );
}
