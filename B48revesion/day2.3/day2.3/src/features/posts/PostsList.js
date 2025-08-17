import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";

const PostsList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = items.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      <h2>Posts</h2>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {status === "succeeded" && (
        <>
          <ul>
            {currentItems.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "10px" }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>

            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostsList;
