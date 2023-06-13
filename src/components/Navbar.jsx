import { signOut } from "firebase/auth";
import { auth } from "../auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Nav">
      <button className="logout" onClick={handleLogout}>
        SignOut
      </button>
    </div>
  );
};

export default Navbar;
