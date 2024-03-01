import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MainPage() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [productsData, setProductsData] = useState();

  useEffect(() => {
    async function getAdminData() {
      let { data } = await axios.get(`${apiKey}/admin`);
      setProductsData(data.products);
    }
    getAdminData();
  }, [apiKey]);

  return (
    <>
      <div className="bg-light">
        <h1 className="display-4 container-sm">Top deals</h1>
        <div className="mx-auto container-fluid">
          <div className="row my-4">
            {productsData
              ? productsData.map((item, key) => (
                  <Link
                    key={key}
                    className=" col-lg-4 col-md-6 col-sm-6 col-12"
                    style={{ textDecoration: "none" }}
                    to={`/productDetails/${item._id}`}
                  >
                    <div className="p-4" style={{ cursor: "pointer" }}>
                      <div className="card p-4">
                        <img
                          src={item.Image}
                          className="card-img-top border-bottom"
                          style={{ width: "100%", height: "100%" }}
                          alt=""
                        />
                        <div className="card-body">
                          <h4 className="card-text">{item.Details}</h4>
                          <p className="card-text display-4">
                            Price: {item.Price}
                          </p>
                          <p className="display-6">
                            Rating:{" "}
                            {item.Rating
                              ? item.Rating.actualRating
                              : "no rating yet"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;
