import { asyncUnsetAuthUser } from "@/states/authUser/action";
import { asyncPreloadProcess } from "@/states/isPreload/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import Link from "./Link";
import { LoadingBar } from "react-redux-loading-bar";

const BaseTemplate = ({ children }: any) => {
  //* params
  const dispatch: any = useDispatch();
  const authUser = useSelector((states: any) => states.authUser);
  const isPreload = useSelector((states: any) => states.isPreload);

  //* handle logout
  const onLogoutHandler = () => {
    dispatch(asyncUnsetAuthUser());
  };

  //* do preload action
  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);
  if (isPreload) {
    return;
  }

  //* render component
  return (
    <div>
      <div className="p-5 flex justify-between">
        <h1 className="font-bold text-2xl">Logo</h1>
        {authUser ? (
          <div>
            {authUser.name} |<Button onClick={onLogoutHandler}>Logout</Button>
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
