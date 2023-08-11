import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { StatusBarContext } from "../context/statusbarContext";
import StatusBar from "../components/StatusBar";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const { message } = useContext(StatusBarContext);

  // get the url location
  const location = useLocation();

  // get the url string string with "?"
  const query = location.search;
  // console.log(query);

  useEffect(() => {
    getAllPosts();
  }, [query]);

  // create function to get all post data using api request
  const getAllPosts = async () => {
    try {
      const res = await axios.get(`/posts${query}`);
      setPosts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // create function that handles html tags from showing on the browser
  // const getText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, "text/html");
  //   return doc.body.textContent;
  // };

  return (
    <div>
      {message && <StatusBar messageStatus={message} />}
      {posts.length ? (
        posts.map((post, id) => {
          return (
            <div key={id}>
              <img src={`../upload/${post.img}`} alt="post-img" width={200} />
              <h4>
                <Link to={`/post/${post.id}`}>{post?.title}</Link>
              </h4>
              <div dangerouslySetInnerHTML={{ __html: post?.desc }}></div>
              <button>Read More</button>
            </div>
          );
        })
      ) : (
        <h6>NO POST EXIST YET</h6>
      )}
    </div>
  );
};

export default Home;
