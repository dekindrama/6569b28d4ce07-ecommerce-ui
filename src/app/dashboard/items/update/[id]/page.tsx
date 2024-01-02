"use client";
import BaseTemplateDashboard from "@/components/BaseTemplateDashboard";
import UpdateItemInput from "@/components/UpdateItemInput";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import useAuth from "@/hooks/useAuth";
import routes from "@/routes/page";
import { asyncGetItem, asyncUpdateItem } from "@/states/item/action";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdateItemPage = () => {
  console.log("=============================");
  console.log("hit update item page");
  console.log("=============================");

  //* params
  const router = useRouter();
  const params = useParams();
  const id = params.id.toString();
  const dispatch: any = useDispatch();
  const item = useSelector((states: any) => states.item);

  //* check is auth
  const { session, status } = useAuth({ required: true });

  //* load item
  useEffect(() => {
    //* return nothing when still preload
    if (status == "unauthenticated") return;

    dispatch(asyncGetItem(id));
  }, [status]);

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

  //* return nothing when item is null
  if (item == null) return;

  //* create item handler
  function onUpdateHandler(params: {
    id: string;
    name: string;
    stock: number;
    picture?: Blob;
    unit: string;
    unitPrice: number;
  }) {
    dispatch(asyncUpdateItem(params));
    router.push(routes.dashboard.items.index);
  }

  //* render page
  return (
    <BaseTemplateDashboard>
      <h1>Update Item Page</h1>
      <UpdateItemInput onUpdate={onUpdateHandler} item={item} />
    </BaseTemplateDashboard>
  );
};

export default UpdateItemPage;
