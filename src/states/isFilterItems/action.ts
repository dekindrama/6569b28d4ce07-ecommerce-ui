const ActionType = {
  SET_IS_FILTER_ITEMS: "SET_IS_FILTER_ITEMS",
  UNSET_IS_FILTER_ITEMS: "UNSET_IS_FILTER_ITEMS",
};

function setIsFilterItemsActionCreator(isFilterItems: boolean) {
  return {
    type: ActionType.SET_IS_FILTER_ITEMS,
    payload: {
      isFilterItems,
    },
  };
}

function unsetIsFilterItemsActionCreator() {
  return {
    type: ActionType.UNSET_IS_FILTER_ITEMS,
    payload: {
      isFilterItems: false,
    },
  };
}

export {
  ActionType,
  setIsFilterItemsActionCreator,
  unsetIsFilterItemsActionCreator,
};
