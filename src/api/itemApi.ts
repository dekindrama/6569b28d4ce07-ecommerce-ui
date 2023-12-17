import axios from "axios";

function itemApi(baseUrl: string, configs: any) {
  async function storeItem(params: {
    name: string;
    stock: number;
    picture: Blob;
    unit: string;
    unitPrice: number;
  }) {
    try {
      //* params
      const { name, stock, picture, unit, unitPrice } = params;
      console.log("picture", name, picture);
      let form = new FormData();
      form.append("name", name);
      form.append("stock", stock.toString());
      form.append("picture", picture);
      form.append("unit", unit);
      form.append("unit_price", unitPrice.toString());

      //* store item
      const response = await axios.post(baseUrl + "/items", form, configs());

      //* return response
      return response.data;
    } catch (error: any) {
      const { status, message } = error.response.data;
      if (status == false) {
        throw new Error(message);
      }

      throw error;
    }
  }

  async function updateItem(params: {
    id: string;
    name: string;
    stock: number;
    picture?: Blob;
    unit: string;
    unitPrice: number;
  }) {
    try {
      //* params
      const { id, name, stock, picture = "", unit, unitPrice } = params;
      console.log("picture", name, picture);
      let form = new FormData();
      form.append("name", name);
      form.append("stock", stock.toString());
      form.append("picture", picture);
      form.append("unit", unit);
      form.append("unit_price", unitPrice.toString());

      //* update item
      const response = await axios.post(
        `${baseUrl}/items/${id}`,
        form,
        configs(),
      );

      //* return response
      return response.data;
    } catch (error: any) {
      const { status, message } = error.response.data;
      if (status == false) {
        throw new Error(message);
      }

      throw error;
    }
  }

  async function getListItems() {
    try {
      const response = await axios.get(`${baseUrl}/items`, configs());
      return response.data.data.items;
    } catch (error: any) {
      const { status, message } = error.response.data;
      if (status == false) {
        throw new Error(message);
      }

      throw error;
    }
  }

  async function getItem(id: string) {
    try {
      const response = await axios.get(`${baseUrl}/items/${id}`, configs());
      return response.data.data.item;
    } catch (error: any) {
      const { status, message } = error.response.data;
      if (status == false) {
        throw new Error(message);
      }

      throw error;
    }
  }

  async function deleteItem(id: string) {
    try {
      const response = await axios.post(
        `${baseUrl}/items/${id}/delete`,
        {},
        configs(),
      );
      return response.data;
    } catch (error: any) {
      const { status, message } = error.response.data;
      if (status == false) {
        throw new Error(message);
      }

      throw error;
    }
  }

  return {
    storeItem,
    getListItems,
    updateItem,
    getItem,
    deleteItem,
  };
}

export default itemApi;
