import React from "react";
import { postsApi } from "./api";
import { useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
const reducer = ((api) => {
  const dispatcher = {
    add: api.endpoints.addPost.initiate,
    update: api.endpoints.updatePost.initiate,
    delete: api.endpoints.deletePost.initiate,
    get: api.endpoints.getPost.initiate,
  };

  return (
    {
      type,
      payload,
    }: { type: string; payload?: { id: string; value?: number } },
    dispatch: Dispatch
  ) => {
    try {
      dispatch(dispatcher[type](payload, { forceRefetch: true }));
    } catch (error) {
      console.log(error.message);
    }
  };
})(postsApi);

const Post = ({ id, value }) => {
  const [inputVal, setinputVal] = React.useState(value);
  const dispatch = useDispatch();
  const updatePost = (payload) => {
    reducer({ type: "update", payload }, dispatch);
  };
  const deletePost = (payload) => {
    reducer({ type: "delete", payload }, dispatch);
  };
  const getPost = (payload) => {
    reducer({ type: "get", payload }, dispatch);
  };
  return (
    <div>
      {id}: <button onClick={() => deletePost({ id })}>Delete</button>
      value: {value} new value:{" "}
      <input
        type="text"
        value={inputVal}
        onChange={(e) => {
          setinputVal(e.target.value);
        }}
      />
      <button onClick={() => updatePost({ id, value: inputVal })}>
        Update
      </button>
      <button onClick={() => getPost({ id })}>Get</button>
    </div>
  );
};

const Component = () => {
  const posts = postsApi.useGetPostsQuery();
  const dispatch = useDispatch();
  const addNewPost = () => {
    reducer({ type: "add" }, dispatch);
  };
  return (
    <>
      <div>
        <button
          onClick={() => {
            addNewPost();
          }}
        >
          Add post
        </button>
      </div>
      <div>
        {posts.data &&
          !posts.isLoading &&
          posts.data instanceof Array &&
          posts.data.map(({ id, value }) => {
            return <Post key={id} {...{ id, value }} />;
          })}
      </div>
    </>
  );
};

const App = () => {
  const [show, setShow] = React.useState(true);
  return (
    <>
      <div>
        <button onClick={() => setShow((prev) => !prev)}>
          {show ? "Hide" : "Show"}
        </button>
      </div>
      <div>{show ? <Component /> : <></>}</div>
    </>
  );
};
export default App;
