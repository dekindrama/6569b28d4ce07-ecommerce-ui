const routes = {
  //* public
  index: "/",
  login: "/login",
  error: {
    unauthorized: "/error/unauthorized",
    unauthenticated: "/error/unauthenticated",
    notFound: "/error/not-found",
  },

  //* dashboard
  dashboard: {
    index: "/dashboard",
    register: "/dashboard/register",
    users: "/dashboard/users",
    items: {
      index: "/dashboard/items",
      create: "/dashboard/items/create",
      update: (id: string) => {
        return `/dashboard/items/update/${id}`;
      },
    },
  },
};

export default routes;
