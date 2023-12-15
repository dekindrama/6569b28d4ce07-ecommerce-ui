import { asyncUnsetAuthUser } from "@/states/authUser/action";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import Link from "./Link";
import { LoadingBar } from "react-redux-loading-bar";

const BaseTemplate = ({ children }: any) => {
  //* params
  const dispatch: any = useDispatch();
  const authUser = useSelector((states: any) => states.authUser);

  //* handle logout
  const onLogoutHandler = () => {
    dispatch(asyncUnsetAuthUser());
  };

  //* render component
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 bg-blue-50 p-5 md:flex-row md:gap-0">
        <h1 className="text-2xl font-bold">Logo</h1>
        {authUser ? (
          <div className=" flex items-center justify-center gap-5 text-center">
            <div>{authUser.name}</div>
            <div>
              <Link href="/register">
                <span>
                  Register
                  <br />
                  New
                  <br />
                  Admin
                </span>
              </Link>
            </div>
            <div>
              <Button onClick={onLogoutHandler}>Logout</Button>
            </div>
          </div>
        ) : (
          <div>
            <Link href="/login">Login</Link>
          </div>
        )}
      </div>
      <LoadingBar />
      {children}
    </div>
  );
};

export default BaseTemplate;
