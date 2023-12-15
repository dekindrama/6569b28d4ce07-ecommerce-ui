"use client";

import BaseTemplate from "@/components/BaseTemplate";
import RegisterInput from "@/components/RegisterInput";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import { asyncPreloadProcess } from "@/states/isPreload/action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  //* params
  const [count, setCount] = useState(0);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const authUser = useSelector((states: any) => states.authUser);
  const isPreload = useSelector((states: any) => states.isPreload);

  console.log("=============================");
  console.log("hit register page");
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
  }, [isPreload]);

  //* check user is logged in
  useEffect(() => {
    console.log("useEffect authUser");

    //* waiting until process is preload done
    if (isPreload) {
      return;
    }

    //* check auth user logged in
    if (authUser) {
      console.log("authUser is found");

      if (authUser.role == authUserRolesEnum.superAdmin) {
        console.log("super admin is logged");
      } else {
        console.log("admin is logged");
      }
    } else {
      console.log("authUser is not found");

      router.push("/login");
    }
  }, [authUser]);

  //* return nothing when still preload
  if (isPreload) {
    return;
  }

  //* return nothing when unauthenticated
  if (authUser == null) {
    return;
  }

  const onRegisterHandler = (params: any) => {
    console.log("hit on register handler");
    setCount((value) => value + 1);
  };

  return (
    <BaseTemplate>
      <div>{count}</div>
      <h1>register page</h1>
      <RegisterInput onRegister={onRegisterHandler} />
    </BaseTemplate>
  );
};

export default RegisterPage;
