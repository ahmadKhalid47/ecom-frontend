import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const userId = localStorage.getItem("id");
  const [cartData, setCartData] = useState();
  const [removeFromCartButton, setRemoveFromCartButton] = useState(0);

  useEffect(() => {
    async function getDetailData() {
      let { data } = await axios.get(`${apiKey}/carts/${userId}`);
      setCartData(data.carts ? data.carts : null);
    }
    getDetailData();
  }, [apiKey, userId, removeFromCartButton]);

  async function removeFromCart(cartId) {
    await axios.delete(`${apiKey}/removeCart/${cartId}/${userId}`);
    setRemoveFromCartButton(removeFromCart + 1);
  }

  return (
    <div style={{ backgroundColor: "tomato" }}>
      <div className="container-fluid">
        <h1 className="container display-1 fw-bold">cart</h1>
        <div className="row my-4">
          {cartData
            ? cartData.map((item, key) => (
                <div
                  className="p-4 col-lg-3 col-md-4 col-sm-6 col-12"
                  key={key}
                >
                  <div className="card p-4">
                    <img
                      src={item.Image}
                      className="card-img-top"
                      style={{ width: "100%", height: "100%" }}
                      alt=""
                    />
                    <div className="card-body">
                      <h4 className="card-text">{item.Details}</h4>
                    </div>
                    <div className="my-1">
                      <div className="">
                        <Link
                          to={`/buy/${item._id}`}
                          className="container btn btn-lg btn-warning mt-1"
                        >
                          Buy now
                        </Link>
                      </div>
                      <div>
                        <button
                          className="container btn btn-lg btn-danger my-1"
                          onClick={() => removeFromCart(item._id)}
                        >
                          remove from cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
export default Cart;
