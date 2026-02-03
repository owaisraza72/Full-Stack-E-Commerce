import { apiSlice } from "../../app/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ===== GET ALL USERS (ADMIN) ===== */
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        credentials: "include",
      }),
      providesTags: ["AdminUsers"],
    }),

    /* ===== ADD USER (ADMIN) ===== */
    addUserAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/users",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["AdminUsers"],
    }),

    /* ===== UPDATE USER ROLE ===== */
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: { role },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    /* ===== DELETE USER ===== */
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    /* ===== GET ALL PRODUCTS (ADMIN) ===== */
    getAllProductsAdmin: builder.query({
      query: () => ({
        url: "/admin/products",
        credentials: "include",
      }),
      providesTags: ["AdminProducts"],
    }),

    /* ===== ADD PRODUCT (ADMIN) ===== */
    addProductAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/products",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["AdminProducts"],
    }),

    /* ===== UPDATE PRODUCT (ADMIN) ===== */
    updateAnyProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/products/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["AdminProducts"],
    }),

    /* ===== DELETE PRODUCT (ADMIN) ===== */
    deleteAnyProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["AdminProducts"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAddUserAdminMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetAllProductsAdminQuery,
  useUpdateAnyProductMutation,
  useDeleteAnyProductMutation,
  useAddProductAdminMutation,
} = adminApi;
