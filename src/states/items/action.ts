import api from "@/api/api";

const ActionType = {
  SET_ITEMS: "SET_ITEMS",
  UNSET_ITEMS: "UNSET_ITEMS",
};

function setItemsActionCreator(items: Array<object>) {
  return {
    type: ActionType.SET_ITEMS,
    payload: {
      items,
    },
  };
}

function unsetItemsActionCreator() {
  return {
    type: ActionType.UNSET_ITEMS,
    payload: {
      items: [],
    },
  };
}

function asyncGetListItems() {
  return async (dispatch: any) => {
    try {
      const items = await api.getListItems();
      dispatch(setItemsActionCreator(items));
    } catch (error: any) {
      alert(error.message);
    }
  };
}

export {
  //* state actions
  ActionType,
  setItemsActionCreator,
  unsetItemsActionCreator,

  //* thunk functions
  asyncGetListItems,
};
