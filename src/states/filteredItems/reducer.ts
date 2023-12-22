import { ActionType } from "./action";

function filteredItemsReducer(filteredItems: any = [], action: any = {}) {
  switch (action.type) {
    case ActionType.SET_FILTERED_ITEMS:
      return action.payload.filteredItems;
    case ActionType.UNSET_FILTERED_ITEMS:
      return action.payload.filteredItems;
    default:
      return filteredItems;
  }
}

export default filteredItemsReducer;
