"use client";

import api from "@/api/api";
import BaseTemplate from "@/components/BaseTemplate";
import LoginInput from "@/components/LoginInput";
import { asyncSetAuthUser } from "@/states/authUser/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  //* params
  const dispatch: any = useDispatch();
  const router = useRouter();
  const authUser = useSelector((states: any) => states.authUser);

  //* check user is logged in
  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  });
  if (authUser) {
    return;
  }

  //* handle login
  const onLoginHandler = async ({ email, password }: any) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  //* render page
  return (
    <BaseTemplate>
      <h1 className="font-bold">Login Page</h1>
      <LoginInput onLogin={onLoginHandler} />
    </BaseTemplate>
  );
};

export default LoginPage;
