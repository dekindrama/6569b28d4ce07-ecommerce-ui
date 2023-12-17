const routes = {
  //* public
  index: "/",
  login: "/login",
  error: {
    unauthorized: "/error/unauthorized",
    unauthenticated: "/error/unauthenticated",
  },

  //* dashboard
  dashboard: {
    index: "/dashboard",
    register: "/dashboard/register",
    users: "/dashboard/users",
    items: {
      index: "/dashboard/items",
      create: "/dashboard/items/create",
    },
  },
};

export default routes;
