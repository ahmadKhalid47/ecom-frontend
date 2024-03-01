import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function Details() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [product, setProduct] = useState();
  const [cartCheck, setCartCheck] = useState();
  const [addToCartButton, setAddToCartButton] = useState(0);
  const { productId } = useParams();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    async function getDetailData() {
      let { data } = await axios.get(
        `${apiKey}/productDetails/${productId}/${userId}`
      );
      setProduct(data.product ? data.product : null);
      setCartCheck(data.cartCheck);
    }
    getDetailData();
  }, [apiKey, productId, userId, addToCartButton]);

  async function addToCart() {
    await axios.post(`${apiKey}/addToCart/${productId}/${userId}`);
    setAddToCartButton(addToCart + 1);
  }

  return (
    <>
      <div
        className="bg-dark container-fluid"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="container-sm py-5">
          <div className="row justify-content-center">
            {product ? (
              <>
                <div className="col-sm-12 col-lg-6 bg-light p-0">
                  <img
                    src={product.Image}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-lg-6 bg-light pt-2 p-5 d-flex flex-column justify-content-between">
                  <div>
                    <h2 className="my-3">{product.Details}</h2>
                    <h2 className="my-3 display-3">
                      Price: <span>{product.Price}$</span>
                    </h2>
                    <h5 className="my-3">
                      Color: <span className="fw-light">{product.Color}</span>
                    </h5>
                    <h5 className="my-3">
                      Brand: <span className="fw-light">{product.Brand}</span>
                    </h5>
                    <h5 className="my-3">
                      available pieces:{" "}
                      <span className="fw-light">{product.Quantity}</span>
                    </h5>
                  </div>
                  <div className="my-1">
                    <form>
                      <Button
                        className="container btn btn-lg btn-success my-1"
                        onClick={addToCart}
                        disabled={cartCheck ? true : false}
                      >
                        {cartCheck ? "added to cart" : "add to cart"}
                      </Button>
                    </form>
                    <Link
                      to={`/buy/${productId}`}
                      className="container btn btn-lg btn-warning mt-1"
                    >
                      Buy now
                    </Link>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default Details;
