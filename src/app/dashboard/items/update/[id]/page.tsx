"use client";
import BaseTemplate from "@/components/BaseTemplate";
import UpdateItemInput from "@/components/UpdateItemInput";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import routes from "@/routes/page";
import { asyncPreloadProcess } from "@/states/isPreload/action";
import { asyncGetItem, asyncUpdateItem } from "@/states/item/action";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdateItemPage = () => {
  //* params
  const router = useRouter();
  const params = useParams();
  const id = params.id.toString();
  const dispatch: any = useDispatch();
  const authUser = useSelector((states: any) => states.authUser);
  const isPreload = useSelector((states: any) => states.isPreload);
  const item = useSelector((states: any) => states.item);

  console.log("=============================");
  console.log("hit update item page");
  console.log("authUser", authUser);
  console.log("preload", isPreload);
  console.log("params", id);
  console.log("item", item);

  //* do preload action
  useEffect(() => {
    //* do action preload when preload is false
    if (isPreload) {
      dispatch(asyncPreloadProcess());
    }
  }, [isPreload]);

  //* check use is logged in
  useEffect(() => {
    //* waiting preload
    if (isPreload) return;

    //* check auth & check role
    if (authUser) {
      if (
        [authUserRolesEnum.admin, authUserRolesEnum.superAdmin].includes(
          authUser.role,
        ) == false
      ) {
        router.push(routes.error.unauthorized);
      }
    } else {
      router.push(routes.error.unauthenticated);
    }
  }, [isPreload]);

  //* load item
  useEffect(() => {
    if (isPreload) return;

    dispatch(asyncGetItem(id));
  }, [isPreload]);

  //* return nothing when still preload
  if (isPreload) return;

  //* return nothing when unauthenticated
  if (authUser == null) return;

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
    <BaseTemplate>
      <h1>Update Item Page</h1>
      <UpdateItemInput onUpdate={onUpdateHandler} item={item} />
    </BaseTemplate>
  );
};

export default UpdateItemPage;
