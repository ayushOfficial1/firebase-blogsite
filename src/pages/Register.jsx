import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [err, seterr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (error) => {
          console.log(error);
          seterr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              email: email,
              name: displayName,
              photo: downloadURL,
            });
            await setDoc(doc(db, "userBlogs", res.user.uid), {blogs:[]});
            navigate("/login");
          });
        }
      );
    } catch (error) {
      seterr(true);
      console.log(error.message);
    }
  };
  return (
    <div className="regContainer">
      <div className="regWrapper">
        <form onSubmit={handleSubmit}>
          {err && <span>SOMETHING WENT WRONG</span>}
          <input type="text" placeholder="username" />
          <input type="email" placeholder="email id" />
          <input type="password" placeholder="password" />
          <input type="file" />
          <button type="submit">Sign-In</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
