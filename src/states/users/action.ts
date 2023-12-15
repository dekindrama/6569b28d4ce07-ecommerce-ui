import api from "@/api/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  SET_USERS: "SET_USERS",
  UNSET_USERS: "UNSET_USERS",
};

function setUsersActionCreator(users: Array<object>) {
  return {
    type: ActionType.SET_USERS,
    payload: {
      users,
    },
  };
}

function unsetUsersActionCreator() {
  return {
    type: ActionType.SET_USERS,
    payload: {
      users: [],
    },
  };
}

function asyncPopulateUsers() {
  return async (dispatch: any) => {
    dispatch(showLoading());

    try {
      const users = await api.getListUsers();

      dispatch(setUsersActionCreator(users));
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  //* state actions
  ActionType,
  setUsersActionCreator,
  unsetUsersActionCreator,

  //* thunk function
  asyncPopulateUsers,
};
