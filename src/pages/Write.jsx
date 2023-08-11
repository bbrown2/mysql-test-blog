import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  // accessing state props in <Link/> on Single.jsx page
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");

  useEffect(() => {
    setTitle(location.state?.title || "");
    setValue(location.state?.desc || "");
    setCat(location.state?.cat || "");
    setFile(null);
  }, [location.state]);

  const uploadImg = async () => {
    try {
      // FormData method to easily send key/value pairs from form data
      const formData = new FormData();
      // attach file selected
      formData.append("file", file);

      const res = await axios.post("/upload", formData);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgURL = await uploadImg();

    try {
      location.state
        ? await axios.put(`/posts/${location.state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgURL : "",
          })
        : await axios.post(`/posts`, {
            title,
            desc: value,
            cat,
            img: file ? imgURL : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });

      // redirect to home page
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(value);

  return (
    <div>
      <div>
        <input
          type="text"
          value={title}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{ width: 500 }}>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div>
        <div>
          <h1>Publish</h1>
          <span>
            <b>Status</b>: Draft
          </span>
          <br />
          <span>
            <b>Visibility</b>: Public
          </span>
          <br />

          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label style={{ textDecoration: "underline" }} htmlFor="file">
            Upload Image
          </label>
          <div>
            <button>Save as draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div>
          <h1>Category</h1>
          <div>
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Design</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
