"use client";
import BaseTemplateDashboard from "@/components/BaseTemplateDashboard";
import RegisterInput from "@/components/RegisterInput";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import useAuth from "@/hooks/useAuth";
import { asyncRegisterUser } from "@/states/authUser/action";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  console.log("=============================");
  console.log("hit register page");
  console.log("=============================");

  //* params
  const dispatch: any = useDispatch();

  //* check is auth
  const { session, status } = useAuth({ required: true });

  //* return nothing when unauthenticated
  if (status !== "authenticated") return;

  //* return nothing when login not as super admin
  if (session?.user && session?.user?.role !== authUserRolesEnum.superAdmin) {
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
    <BaseTemplateDashboard>
      <h1>register page</h1>
      <RegisterInput onRegister={onRegisterHandler} />
    </BaseTemplateDashboard>
  );
};

export default RegisterPage;
