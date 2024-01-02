"use client";
import BaseTemplateDashboard from "@/components/BaseTemplateDashboard";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import useAuth from "@/hooks/useAuth";
import { asyncPopulateUsers } from "@/states/users/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersPage = () => {
  console.log("=============================");
  console.log("hit admin list/users page");
  console.log("=============================");

  //* params
  const dispatch: any = useDispatch();
  const users = useSelector((states: any) => states.users);

  //* check is auth
  const { session, status } = useAuth({ required: true });

  //* populate users list
  useEffect(() => {
    //* validate authentication
    if (status !== "authenticated") return;

    //* validate role user
    if (session?.user.role !== authUserRolesEnum.superAdmin) return;

    dispatch(asyncPopulateUsers());
  }, [session?.user]);

  //* return nothing when unauthenticated
  if (status !== "authenticated") return;

  //* return nothing when login as admin
  if (session?.user.role !== authUserRolesEnum.superAdmin) return;

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
    <BaseTemplateDashboard>
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
    </BaseTemplateDashboard>
  );
};

export default UsersPage;
