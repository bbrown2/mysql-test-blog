import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import { StatusBarContext } from "../context/statusbarContext";

const Single = () => {
  const [post, setPost] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { handleMessage } = useContext(StatusBarContext);

  const postId = location.pathname.split("/")[2];
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/posts/${postId}`);
      setPost([]);
      console.log(res);
      handleMessage(res.data);
      navigate("/");
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
      {!post ? (
        <h1>Post Can't Be Found</h1>
      ) : (
        <div>
          <span>{post.username}</span>
          <img src={post.userImg} alt="user-img" />
          <p>Posted {moment(post.date).fromNow()}</p>
          <img src={`../upload/${post.img}`} alt="post-img" width={200} />
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post?.desc }}></div>
          {currentUser?.id === post?.uid ? (
            <div>
              <button>
                <Link to={`/write?edit=${postId}`} state={post}>
                  Edit
                </Link>
              </button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          ) : null}
        </div>
      )}
      k
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
