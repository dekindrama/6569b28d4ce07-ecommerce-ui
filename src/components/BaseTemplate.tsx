import { asyncUnsetAuthUser } from "@/states/authUser/action";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import Link from "./Link";
import { LoadingBar } from "react-redux-loading-bar";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import Logo from "./Logo";
import routes from "@/routes/page";

const BaseTemplate = ({ children }: any) => {
  //* params
  const dispatch: any = useDispatch();
  const authUser = useSelector((states: any) => states.authUser);

  //* handle logout
  const onLogoutHandler = () => {
    dispatch(asyncUnsetAuthUser());
  };

  //* navigation
  let nav = <></>;
  if (authUser) {
    if (authUser.role == authUserRolesEnum.superAdmin) {
      nav = (
        <>
          <div>
            <Link href={routes.dashboard.register}>Register Admin</Link>
          </div>
          <div>
            <Link href={routes.dashboard.users}>Admin List</Link>
          </div>
          <div>
            <Link href={routes.dashboard.items.index}>Item List</Link>
          </div>
        </>
      );
    }
  }

  //* render component
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 bg-blue-50 p-5 md:flex-row md:items-center md:gap-0">
        <div className="flex">
          <Logo />
          dashboard
        </div>
        {authUser ? (
          <div className=" flex items-center justify-center gap-5 text-center">
            <div>{authUser.name}</div>
            <div>
              <Button onClick={onLogoutHandler}>Logout</Button>
            </div>
          </div>
        ) : (
          <div>
            <Link href={routes.login}>Login</Link>
          </div>
        )}
      </div>
      {authUser && (
        <div className="flex gap-5 overflow-scroll p-5">
          <div>
            <Link href={routes.dashboard.index}>Dashboard</Link>
          </div>
          {nav}
        </div>
      )}

      <LoadingBar />
      {children}
    </div>
  );
};

export default BaseTemplate;
