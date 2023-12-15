import { ActionType } from "./action";

function usersReducer(users: Array<object> = [], action: any = {}) {
  switch (action.type) {
    case ActionType.SET_USERS:
      return action.payload.users;
    case ActionType.UNSET_USERS:
      return [];
    default:
      return users;
  }
}

export default usersReducer;
