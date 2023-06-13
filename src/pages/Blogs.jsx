import { doc, getDoc, onSnapshot } from "firebase/firestore";
import Blog from "../components/Blog";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../auth";

const Blogs = () => {
  const { currentUser } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  //   async function fetchData() {
  //     const docRef = doc(db, "userBlogs", currentUser.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setBlogs(docSnap.data().blog);
  //       console.log("Document data:", blogs);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   }
  useEffect(() => {
    // fetchData();
    const unsub = onSnapshot(doc(db, "userBlogs", currentUser.uid), (doc) => {
      setBlogs(doc.data().blog);
      console.log("Current data: ", doc.data());
    });
    return () => {
      unsub();
    };
  }, [currentUser]);
  return (
    <div className="blogsContainer">
      <div className="blogsWrapper">
        {blogs.map((info, index) => (
          <Blog
            key={index}
            title={info.title}
            blog={info.blog}
            email={info.email}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
