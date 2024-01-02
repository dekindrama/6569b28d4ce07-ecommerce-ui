import Link from "./Link";
import { LoadingBar } from "react-redux-loading-bar";
import Logo from "./Logo";
import routes from "@/routes/page";
import authUserRolesEnum from "@/enums/authUserRolesEnum";
import useAuth from "@/hooks/useAuth";

const BaseTemplateDashboard = ({ children }: any) => {
  //* check is auth
  const { session, status } = useAuth({ required: false });

  //* navigation
  let nav = <></>;
  if (session?.user) {
    if (session?.user?.role == authUserRolesEnum.superAdmin) {
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
        {session ? (
          <div className=" flex items-center justify-center gap-5 text-center">
            <div>name test</div>
            <div>
              <Link href={`/api/auth/signout?callbackUrl=${routes.index}`}>
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <Link
              href={`/api/auth/signin?callbackUrl=${routes.dashboard.index}`}
            >
              Login
            </Link>
          </div>
        )}
      </div>
      <div className="flex gap-5 overflow-scroll p-5">
        {session && (
          <>
            <div>
              <Link href={routes.dashboard.index}>Dashboard</Link>
            </div>
          </>
        )}

        {nav}
      </div>
      <LoadingBar />
      {children}
    </div>
  );
};

export default BaseTemplateDashboard;
