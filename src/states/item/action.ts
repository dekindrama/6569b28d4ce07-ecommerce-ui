import api from "@/api/api";

const ActionType = {
  SET_ITEM: "SET_ITEM",
  UNSET_ITEM: "UNSET_ITEM",
};

function setItemActionCreator(item: object) {
  return {
    type: ActionType.SET_ITEM,
    payload: {
      item,
    },
  };
}

function unsetItemActionCreator() {
  return {
    type: ActionType.UNSET_ITEM,
    payload: {
      item: null,
    },
  };
}

function asyncStoreItem(params: {
  name: string;
  stock: number;
  picture: Blob;
  unit: string;
  unitPrice: number;
}) {
  return async (dispatch: any) => {
    try {
      const { message } = await api.storeItem(params);
      alert(message);
    } catch (error: any) {
      alert(error.message);
    }
  };
}

export {
  //* state actions
  ActionType,
  setItemActionCreator,
  unsetItemActionCreator,

  //* thunk function
  asyncStoreItem,
};
