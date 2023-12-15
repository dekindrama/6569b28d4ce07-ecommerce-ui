"use client";
import BaseTemplate from "@/components/BaseTemplate";
import { asyncPreloadProcess } from "@/states/isPreload/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  //* params
  const dispatch: any = useDispatch();
  const router = useRouter();
  const authUser = useSelector((states: any) => states.authUser);
  const isPreload = useSelector((states: any) => states.isPreload);

  console.log("=============================");
  console.log("hit homes page");
  console.log("authUser", authUser);
  console.log("preload", isPreload);

  //* do preload action
  useEffect(() => {
    console.log("useEffect isPreload");

    //* do action preload when preload is false
    if (isPreload) {
      dispatch(asyncPreloadProcess());
      console.log("do preload");
    } else {
      console.log("already preload");
    }
  });

  //* check user is logged in
  useEffect(() => {
    //* waiting preload
    if (isPreload) {
      return;
    }

    //* redirect when is null
    if (authUser == null) {
      router.push("/login");
    }
  });

  //* return nothing when still preload
  if (isPreload) {
    return;
  }

  //* return nothing when unauthenticated
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
