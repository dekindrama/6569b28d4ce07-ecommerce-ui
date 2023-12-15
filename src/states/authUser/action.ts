import api from "@/api/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser: object) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser(params: { email: string; password: string }) {
  return async (dispatch: any) => {
    dispatch(showLoading());

    try {
      const token = await api.login(params);
      api.putAccessToken(token);

      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return async (dispatch: any) => {
    dispatch(showLoading());

    dispatch(unsetAuthUserActionCreator());
    await api.logout();
    api.putAccessToken("");

    dispatch(hideLoading());
  };
}

function asyncRegisterUser(params: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
}) {
  return async (dispatch: any) => {
    dispatch(showLoading());

    try {
      await api.register(params);
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  //* state actions
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,

  //* thunk function
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
};
