import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../css/navbar.module.css";
import { getAllCategories } from "../../utilities/db";
import CategoryContext from "../../context/CategoryContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const context = useContext(CategoryContext);
  const token = localStorage.getItem("accessToken");
  const userEmail = localStorage.getItem("userEmail");

  const callButtonClick = async (e) => {
    setCategory(e);
    context.updateCategory(e);
  };

  useEffect(() => {
    (async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories.data);
      } catch (error) {
        console.log("Error in fetching categories", error);
      }
    })();
  }, [category]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };


  return (
    <>
      <nav className={`${styles.header} sticky top-0 z-50`}>
        <div className={styles["header-left"]}>
          <h1>
            <Link to="/">Branding</Link>
          </h1>
        </div>
        <div className={styles["header-right"]}>
          <input type="checkbox" id={styles.check} />
          <ul className={styles["header-list"]}>
            <li>
              <Link to="/product-listing">Products</Link>
            </li>

            {token ? <li>
              <Link to="/create-product">Create new product</Link>
            </li>:  "" } 

            {!token ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              ""
            )}
            {!token ? (
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            ) : (
              ""
            )}

             
              {token ?<li>
                <span onClick={() => logout()}>Logout</span>
              </li> : "" }
             

            {token && userEmail ? (
              <li className="flex items-center ml-6">
                <img className="h-10 w-10" src="../dummy.png" alt="" />
                <p className="ml-3">{userEmail}</p>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>
      <nav className="bg-white leading-10 mb-10">
        <div className="flex justify-between items-center container mx-auto">
          {categories.map((e, idx) => (
            <ul key={idx}>
              <li onClick={() => callButtonClick(e)} className="cursor-pointer">
                {e.toUpperCase()}
              </li>
            </ul>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
