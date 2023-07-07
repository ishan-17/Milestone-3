import React, { useContext, useEffect, useState } from "react";
import styles from "../../css/productList.module.css";
import { getAllProducts } from "../../utilities/db";
import StarRatings from "react-star-ratings";
import CategoryContext from "../../context/CategoryContext";
import { Link } from "react-router-dom";
const accessToken = localStorage.getItem("accessToken") || ""

const ProductList = () => {
  const a = useContext(CategoryContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [token, setToken] = useState(null)
  if (category !== a.category) {
    setCategory(a.category);
  }

  useEffect(() => {
    console.log("Use effect re rendered")
    setToken(accessToken)
    if (category) {
      setProducts(a.products);
    } else {
      (async () => {
        try {
          const products = await getAllProducts();
          console.log(products);
          setProducts(products);
        } catch (error) {
          console.log("Error", error);
        }
      })();
    }
  }, [category, a.products, token]);

  return (
    <div className={`container mx-auto grid grid-cols-3 gap-6`}>
      {products.map((e) => (
        <div key={e?.id} className={`${styles.card} px-6 py-4 relative`}>
          <Link to={`/product/${e?.id}`}>
            <img className="mb-6" src={e?.image} alt="Broken" />
          </Link>
          <div className={`${styles["card-body"]} p-6`}>
            <div className={styles.row}>
              <Link to={`/product/${e?.id}`}>
                {" "}
                <div className={styles["card-title"]}>
                  <h4 className="py-2">{e?.title.slice(0, 45)}</h4>
                  <div className="flex items-center justify-between pb-2">
                    <h3>${e?.price}</h3>
                    <StarRatings
                      rating={e?.rating?.rate}
                      starRatedColor="orange"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <hr />
            <p className="pt-2 pb-2">{e?.description.slice(0, 131)}</p>
            {token ? (
              <Link to={`/edit-your-product/${e?.id}`}>
                <span style={{ bottom: 5, right: "15px" }} className="absolute">
                  Edit
                </span>
              </Link>
            ) : (
              ""
            )}

            {token ? (
              <Link>
                <span style={{ bottom: 5, right: "50px" }} className="absolute">
                  Delete
                </span>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
