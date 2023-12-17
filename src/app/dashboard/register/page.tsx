"use client";

import BaseTemplate from "@/components/BaseTemplate";
import RegisterInput from "@/components/RegisterInput";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import routes from "@/routes/page";
import { asyncRegisterUser } from "@/states/authUser/action";
import { asyncPreloadProcess } from "@/states/isPreload/action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  //* params
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
    //* do action preload when preload is false
    if (isPreload) {
      dispatch(asyncPreloadProcess());
    } else {
    }
  }, [isPreload]);

  //* check user is logged in
  useEffect(() => {
    //* waiting until process is preload done
    if (isPreload) {
      return;
    }

    //* check auth user logged in
    if (authUser) {
      if (authUser.role !== authUserRolesEnum.superAdmin) {
        router.push(routes.error.unauthorized);
      }
    } else {
      router.push(routes.login);
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

  //* return nothing when login as admin
  if (authUser && authUser.role !== authUserRolesEnum.superAdmin) {
    return;
  }

  const onRegisterHandler = (params: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    role: string;
  }) => {
    dispatch(asyncRegisterUser(params));
  };

  return (
    <BaseTemplate>
      <h1>register page</h1>
      <RegisterInput onRegister={onRegisterHandler} />
    </BaseTemplate>
  );
};

export default RegisterPage;
