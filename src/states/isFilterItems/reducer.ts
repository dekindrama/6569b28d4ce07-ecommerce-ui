import { ActionType } from "./action";

function isFilterItemsReducer(
  isFilterItems: boolean = false,
  action: any = {},
) {
  switch (action.type) {
    case ActionType.SET_IS_FILTER_ITEMS:
      return action.payload.isFilterItems;
    case ActionType.UNSET_IS_FILTER_ITEMS:
      return action.payload.isFilterItems;
    default:
      return isFilterItems;
  }
}

export default isFilterItemsReducer;
