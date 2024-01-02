"use client";
import BaseTemplateDashboard from "@/components/BaseTemplateDashboard";
import CreateItemInput from "@/components/CreateItemInput";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import useAuth from "@/hooks/useAuth";
import { asyncStoreItem } from "@/states/item/action";
import { useDispatch, useSelector } from "react-redux";

const CreateItemPage = () => {
  console.log("=============================");
  console.log("hit create item page");
  console.log("=============================");

  //* params
  const dispatch: any = useDispatch();

  //* check is auth
  const { session, status } = useAuth({ required: true });

  //* return nothing when still preload
  if (status == "unauthenticated") return;

  //* return nothing when unauthenticated
  if (session?.user == null) return;

  //* return nothing when unauthorized
  if (
    [authUserRolesEnum.admin, authUserRolesEnum.superAdmin].includes(
      session.user.role,
    ) == false
  ) {
    return;
  }

  //* create item handler
  function onCreateHandler(params: {
    name: string;
    stock: number;
    picture: Blob;
    unit: string;
    unitPrice: number;
  }) {
    dispatch(asyncStoreItem(params));
  }

  //* render page
  return (
    <BaseTemplateDashboard>
      <h1>Create Item Page</h1>
      <CreateItemInput onCreate={onCreateHandler} />
    </BaseTemplateDashboard>
  );
};

export default CreateItemPage;
