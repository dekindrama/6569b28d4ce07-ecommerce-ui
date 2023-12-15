import { ActionType } from "./action";

function isPreloadReducer(isPreload = true, action: any = {}) {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      console.log("set is preload", action.payload.isPreload);
      return action.payload.isPreload;
    default:
      return isPreload;
  }
}

export default isPreloadReducer;
