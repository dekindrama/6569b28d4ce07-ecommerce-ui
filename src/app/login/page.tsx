"use client";

import BaseTemplate from "@/components/BaseTemplate";
import BaseTemplatePublic from "@/components/BaseTemplatePublic";
import LoginInput from "@/components/LoginInput";
import routes from "@/routes/page";
import { asyncSetAuthUser } from "@/states/authUser/action";
import { asyncPreloadProcess } from "@/states/isPreload/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  //* params
  const dispatch: any = useDispatch();
  const router = useRouter();
  const authUser = useSelector((states: any) => states.authUser);
  const isPreload = useSelector((states: any) => states.isPreload);

  console.log("=============================");
  console.log("hit login page");
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

    //* redirect to index when already login
    if (authUser) {
      router.push(routes.dashboard.index);
    }
  });

  //* return nothing when still preload
  if (isPreload) {
    return;
  }

  //* return nothing when user is login
  if (authUser) {
    return;
  }

  //* handle login
  const onLoginHandler = async (params: {
    email: string;
    password: string;
  }) => {
    dispatch(asyncSetAuthUser(params));
  };

  //* render page
  return (
    <BaseTemplate>
      <div className="flex min-h-screen w-full flex-col items-center justify-center ">
        <h1 className="font-bold">Login Page</h1>
        <LoginInput onLogin={onLoginHandler} />
      </div>
    </BaseTemplate>
  );
};

export default LoginPage;
