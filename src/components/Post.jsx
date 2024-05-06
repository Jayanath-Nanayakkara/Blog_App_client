import React, { useEffect, useState } from "react";
import Thumbnail from "../images/blog1.jpg";
import PostItem from "./PostItem";
import "../styles/Post.css";
import DUMMY_POST from "../Data";
import Loader from "./Loader";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added false as initial state

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        setPosts(response?.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error); // Improved error handling
        setIsLoading(false); // Ensure isLoading is set to false on error
      }
    };
    fetchPosts();
  }, []); // Removed empty dependency array if you want to fetch posts on every render, add dependencies if you want to fetch only when specific values change
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container post__container">
          {posts?.map(
            ({
              _id: id,
              thumbnail,
              category,
              title,
              description,
              creator,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postId={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No Posts found</h2>
      )}
    </section>
  );
};

export default Post;
