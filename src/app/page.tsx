"use client";
import BaseTemplate from "@/components/BaseTemplate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  //* params
  const router = useRouter();
  const authUser = useSelector((states: any) => states.authUser);

  //* check user is logged in
  useEffect(() => {
    if (authUser == null) {
      router.push("/login");
    }
  });
  if (authUser == null) {
    return;
  }

  //* render page
  return (
    <BaseTemplate>
      <h1 className="font-bold">hello world</h1>
    </BaseTemplate>
  );
}
