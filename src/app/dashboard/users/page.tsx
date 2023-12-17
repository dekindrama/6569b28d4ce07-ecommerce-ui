"use client";
import BaseTemplate from "@/components/BaseTemplate";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import routes from "@/routes/page";
import { asyncPreloadProcess } from "@/states/isPreload/action";
import { asyncPopulateUsers } from "@/states/users/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersPage = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const authUser = useSelector((states: any) => states.authUser);
  const isPreload = useSelector((states: any) => states.isPreload);
  const users = useSelector((states: any) => states.users);

  console.log("=============================");
  console.log("hit admin list/users page");
  console.log("authUser", authUser);
  console.log("preload", isPreload);

  //* do preload action
  useEffect(() => {
    if (isPreload) {
      dispatch(asyncPreloadProcess());
    }
  }, []);

  //* check user is logged in
  useEffect(() => {
    //* waiting preload
    if (isPreload) return;

    //* validate authentication
    if (authUser == null) return;

    //* validate role user
    if (authUser.role !== authUserRolesEnum.superAdmin) {
      router.push(routes.error.unauthorized);
    }
  }, [isPreload]);

  //* populate users list
  useEffect(() => {
    //* waiting preload
    if (isPreload) return;

    //* validate authentication
    if (authUser == null) return;

    //* validate role user
    if (authUser.role !== authUserRolesEnum.superAdmin) return;

    dispatch(asyncPopulateUsers());
  }, [isPreload, authUser]);

  //* return nothing when still preload
  if (isPreload) return;

  //* return nothing when unauthenticated
  if (authUser == null) return;

  //* return nothing when login as admin
  if (authUser) {
    if (authUser.role !== authUserRolesEnum.superAdmin) return;
  }

  let usersComponent = (
    <tr>
      <td className="border border-black p-5 text-center" colSpan={3}>
        data empty
      </td>
    </tr>
  );
  if (users.length > 0) {
    usersComponent = users.map((user: any) => {
      return (
        <tr key={user.id}>
          <td className="border border-black p-5">{user.id}</td>
          <td className="border border-black p-5">{user.name}</td>
          <td className="border border-black p-5">{user.email}</td>
        </tr>
      );
    });
  }

  //* render page
  return (
    <BaseTemplate>
      <h1>Admin List</h1>
      <div className="flex items-center justify-center">
        <table className="w-96 bg-red-100 md:w-1/2">
          <thead>
            <tr className="capitalize">
              <th className="border border-black p-5">id</th>
              <th className="border border-black p-5">name</th>
              <th className="border border-black p-5">email</th>
            </tr>
          </thead>
          <tbody>{usersComponent}</tbody>
        </table>
      </div>
    </BaseTemplate>
  );
};

export default UsersPage;
