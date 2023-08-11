import React, { useEffect, useState } from "react";
import axios from "axios";
const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getSimilarPost = async () => {
      try {
        const res = await axios.get(`/posts?cat=${cat}`);
        console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSimilarPost();
  }, [cat]);

  // create function that handles html tags from showing on the browser
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div>
      <h4>Other posts you may like</h4>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <img src={`../upload/${post.img}`} alt="img" width={200} />
            <h6>{getText(post.title)}</h6>
            <button>Read More</button>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
