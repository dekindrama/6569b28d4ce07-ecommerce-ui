const ActionType = {
  SET_FILTERED_ITEMS: "SET_FILTERED_ITEMS",
  UNSET_FILTERED_ITEMS: "UNSET_FILTERED_ITEMS",
};

function setFilteredItemsActionCreator(filteredItems: Array<object>) {
  return {
    type: ActionType.SET_FILTERED_ITEMS,
    payload: {
      filteredItems,
    },
  };
}

function unsetFilteredItemsActionCreator() {
  return {
    type: ActionType.UNSET_FILTERED_ITEMS,
    payload: {
      filteredItems: [],
    },
  };
}

export {
  ActionType,
  setFilteredItemsActionCreator,
  unsetFilteredItemsActionCreator,
};
