import { ActionType } from "./action";

function itemReducer(item: any = null, action: any = {}) {
  switch (action.type) {
    case ActionType.SET_ITEM:
      return action.payload.item;
    case ActionType.UNSET_ITEM:
      return action.payload.item;
    default:
      return item;
  }
}

export default itemReducer;
