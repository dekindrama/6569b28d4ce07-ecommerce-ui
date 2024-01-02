"use client";
import api from "@/api/api";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function useAuth({ required = false }: { required?: boolean }): {
  session: Session | null;
  status: "authenticated" | "unauthenticated" | "loading";
} {
  //* check is auth
  const { data: session, status } = useSession({
    required: required,
  });

  //* update localstorage token
  useEffect(() => {
    //* set token to localstorage if authenticated
    if (status == "authenticated") {
      api.putAccessToken(session.user.token);
    }
  }, [session?.user]);

  return { session, status };
}

export default useAuth;
