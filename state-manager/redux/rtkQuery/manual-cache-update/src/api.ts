import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store"; // Import RootState type if you have it defined in your store
import type Post from "./types/post";

type GetPostsResponse = Post[];
type GetPostArg = { id: number };
type GetPostResponse = Post | undefined;
type AddPostArg = void;
type AddPostResponse = Post;
type UpdatePostArg = { id: number; value: number };
type UpdatePostResponse = Post;
type DeletePostArg = { id: number };
type DeletePostResponse = { id: number };

let counter = 0;

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: async () => ({ data: null }), // Define a baseQuery or leave as is if using queryFn
  endpoints: (builder) => ({
    getPosts: builder.query<GetPostsResponse, void>({
      queryFn: (_, { getState }) => {
        const { data } = (getState() as RootState).posts.queries[
          "getPosts(undefined)"
        ] as { data: Post[] };
        console.log("getPosts data:", data)
        if(!data) return {data: []}
        // return { data: [{ id: counter++, value: Date.now() }] };
        return { data };
      },
      onCacheEntryAdded(arg) {
        console.log("endpoint getPosts onCacheEntryAdded", arg);
        // Optional handling of cache entry
      },
    }),
    getPost: builder.query<GetPostResponse, GetPostArg>({
      queryFn: ({ id }, { getState, dispatch }) => {
        const { data } = (getState() as RootState).posts.queries[
          "getPosts(undefined)"
        ] as { data: Post[] };
        const post = data.find((e) => e.id === id);

        const newValuefromFakeFetch = Date.now();
        if (post && post.value !== newValuefromFakeFetch) {
          dispatch(
            postsApi.util.updateQueryData(
              "getPosts",
              undefined,
              (cacheArray: Post[]) => {
                const postToUpdate = cacheArray.find((e) => e.id === id);
                if (postToUpdate) {
                  postToUpdate.value = newValuefromFakeFetch;
                }
              }
            )
          );
        }

        console.log(
          "endpoint getPost queryFn:",
          "prev:",
          data.find((e) => e.id === id),
          "new:",
          post
        );
        return { data: post };
      },
      onCacheEntryAdded(arg) {
        console.log("endpoint getPost onCacheEntryAdded", arg);
        // Optional handling of cache entry
      },
    }),
    addPost: builder.mutation<AddPostResponse, AddPostArg>({
      queryFn: (_, { dispatch }) => {
        const newPost = { id: counter++, value: Date.now() };
        dispatch(
          postsApi.util.updateQueryData(
            "getPosts",
            undefined,
            (cacheArray: Post[]) => {
              cacheArray.push(newPost);
            }
          )
        );
        return { data: newPost };
      },
      onCacheEntryAdded(arg) {
        console.log("endpoint addPost onCacheEntryAdded", arg);
        // Optional handling of cache entry
      },
    }),
    updatePost: builder.mutation<UpdatePostResponse, UpdatePostArg>({
      queryFn: ({ id, value }, { dispatch }) => {
        dispatch(
          postsApi.util.updateQueryData(
            "getPosts",
            undefined,
            (cacheArray: Post[]) => {
              const indx = cacheArray.findIndex((e) => e.id === id);
              if (indx !== -1) {
                cacheArray[indx].value = value;
              }
            }
          )
        );
        return { data: { id, value } };
      },
      onCacheEntryAdded(arg) {
        console.log("endpoint updatePost onCacheEntryAdded", arg);
        // Optional handling of cache entry
      },
    }),
    deletePost: builder.mutation<DeletePostResponse, DeletePostArg>({
      queryFn: ({ id }, { dispatch }) => {
        dispatch(
          postsApi.util.updateQueryData(
            "getPosts",
            undefined,
            (cacheArray: Post[]) => {
              const indx = cacheArray.findIndex((e) => e.id === id);
              if (indx !== -1) {
                cacheArray.splice(indx, 1);
              }
            }
          )
        );
        return { data: { id } };
      },
      onCacheEntryAdded(arg) {
        console.log("endpoint deletePost onCacheEntryAdded", arg);
        // Optional handling of cache entry
      },
    }),
  }),
});

export default postsApi;
