import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import styles from "../src/css/login.module.css";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const Login = () => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/product-listing");
        console.log("User successfull login", user);
        authContext.setAccessToken(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <div className={`${styles["signin-form"]}`}>
        <div className={styles["signin-form-container"]}>
          <div className={styles["signin-form-header"]}>
            <h2>Please Log In</h2>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
          <form>
            <div className={styles["input-box"]}>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles["input-box"]}>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={onLogin}>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
