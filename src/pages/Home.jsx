import React from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Home = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleInput = e.target[0];
    const blogInput = e.target[1];
    const title = titleInput.value;
    const blog = blogInput.value;
    const email = auth.currentUser.email;
    // console.log({ title, blog });
    const userBlogsref = doc(db, "userBlogs", auth.currentUser.uid);
    await updateDoc(userBlogsref, {
      blog: arrayUnion({ title, blog, email }),
    });
    alert("New Blog Created!");

    // Clear the input fields
    titleInput.value = "";
    blogInput.value = "";
  };

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="blogContainer">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="title" />
            {/* <input type="text" placeholder="blog" /> */}
            <textarea id="" cols="30" rows="10" placeholder="blog"></textarea>
            <button type="submit">post</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
