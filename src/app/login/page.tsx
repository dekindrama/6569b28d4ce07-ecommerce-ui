"use client";

import BaseTemplateDashboard from "@/components/BaseTemplateDashboard";
import LoginInput from "@/components/LoginInput";
import { asyncSetAuthUser } from "@/states/authUser/action";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const LoginPage = () => {
  console.log("=============================");
  console.log("hit login page");
  console.log("=============================");

  //* params
  const dispatch: any = useDispatch();

  //* check is auth
  const { session, status } = useAuth({ required: true });

  //* handle login
  const onLoginHandler = async (params: {
    email: string;
    password: string;
  }) => {
    dispatch(asyncSetAuthUser(params));
  };

  //* return nothing when unauthenticated
  if (status == "unauthenticated") return;

  //* render page
  return (
    <BaseTemplateDashboard>
      <div className="flex min-h-screen w-full flex-col items-center justify-center ">
        <h1 className="font-bold">Login Page</h1>
        <LoginInput onLogin={onLoginHandler} />
      </div>
    </BaseTemplateDashboard>
  );
};

export default LoginPage;
