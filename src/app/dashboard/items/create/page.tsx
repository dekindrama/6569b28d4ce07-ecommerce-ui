"use client";
import BaseTemplate from "@/components/BaseTemplate";
import CreateItemInput from "@/components/CreateItemInput";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import routes from "@/routes/page";
import { asyncPreloadProcess } from "@/states/isPreload/action";
import { asyncStoreItem } from "@/states/item/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateItemPage = () => {
  //* params
  const router = useRouter();
  const dispatch: any = useDispatch();
  const authUser = useSelector((states: any) => states.authUser);
  const isPreload = useSelector((states: any) => states.isPreload);

  console.log("=============================");
  console.log("hit update item page");
  console.log("authUser", authUser);
  console.log("preload", isPreload);

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
  });

  //* return nothing when still preload
  if (isPreload) return;

  //* return nothing when unauthenticated
  if (authUser == null) return;

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
    <BaseTemplate>
      <h1>Create Item Page</h1>
      <CreateItemInput onCreate={onCreateHandler} />
    </BaseTemplate>
  );
};

export default CreateItemPage;
