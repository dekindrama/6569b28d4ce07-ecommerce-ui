import { ActionType } from "./action";

function itemsReducer(items: any = [], action: any = {}) {
  switch (action.type) {
    case ActionType.SET_ITEMS:
      return action.payload.items;
    case ActionType.UNSET_ITEMS:
      return action.payload.items;
    default:
      return items;
  }
}

export default itemsReducer;
