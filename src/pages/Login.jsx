import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <form onSubmit={handleSubmit}>
          {err && <span>Something went wrong!</span>}
          <input type="email" placeholder="email id" />
          <input type="password" placeholder="password" />
          <button type="submit">Sign-In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
