"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AuthContext } from "@/contexts/Auth.context";

const AutoLogin = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext?.isAuthenticated) router.push("/");
  }, [authContext?.isAuthenticated]);

  const autoEmailLogin = async (): Promise<void> => {
    if (!email) {
      toast.info("Please enter email ID");
      return;
    }
    try {
      setLoading(true);
      const res: any = await authContext.autoLogin("", email, null);
      if (res.status === 200) {
        router.push("/");
        toast.success("Login successful!");
      } else if (res.status === 403) {
        toast.error(
          "We regret to inform you that your account has been temporarily deactivated. Please contact the Administrator."
        );
      } else if (res.status === 404) {
        toast.error("User not found. Please sign up.");
      } else toast.error("Login failed. Please try again.");

      if (res?.response?.status === 401) {
        toast.error("Incorrect Password/Username.");
      } else if (res?.response?.status === 404) {
        toast.error("User not Found, check your Account Credentials");
      }
    } catch (error) {
      console.error("Auto Email Login Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex h-screen items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 font-marcellus">
            Login
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={autoEmailLogin}>
          <div className="rounded-md -space-y-px">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm font-sora"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="group cursor-pointer relative w-full flex justify-center py-6 px-4 border border-transparent text-lg font-medium rounded-xl text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default AutoLogin;
