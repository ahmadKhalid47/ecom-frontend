import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Delivered from "./Delivered";
import Delete from "./Delete";
import AdminContext from "./AdminPageContext";

function AdminPage() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [productsData, setProductsData] = useState();
  const [ordersData, setOrdersData] = useState();
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [refresher, setRefresher] = useState(0);

  const AdminContextSetter = {
    refresher,
    setRefresher,
  };

  async function adminSubmit() {
    if (image && details && quantity && price && brand && color) {
      let formData = new FormData();
      formData.append("image", image);
      formData.append("details", details);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("color", color);
      try {
        await axios.post(`${apiKey}/admin`, formData);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("fill all inputs");
    }
  }

  useEffect(() => {
    async function getAdminData() {
      let { data } = await axios.get(`${apiKey}/admin`);
      setProductsData(data.products);
      setOrdersData(data.orders);
    }
    getAdminData();
  }, [apiKey, refresher]);
  return (
    <AdminContext.Provider value={AdminContextSetter}>
      <div className="bg-dark">
        <div className="container-fluid bg-primary">
          <h1 className="p-5 pb-3">Upload Products:</h1>
          <Form className="row justify-content-center">
            <div className="col-lg-3 col-10 mx-5 mb-3">
              <Form.Label className="h2 mb-3">Upload image</Form.Label>
              <Form.Control
                className="mb-3"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="col-lg-3 col-10 mx-5 mb-3">
              <Form.Label className="h2 mb-3">Details</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                required
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-10 mx-5 mb-3">
              <Form.Label className="h2 mb-3">Quantity</Form.Label>
              <Form.Control
                className="mb-3"
                type="number"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-10 mx-5 mb-3">
              <Form.Label className="h2 mb-3">Price</Form.Label>
              <Form.Control
                className="mb-3"
                type="number"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-10 mx-5 mb-3">
              <Form.Label className="h2 mb-3">Brand</Form.Label>
              <Form.Control
                className="form-control mb-3"
                type="text"
                required
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-10 mx-5 mb-3">
              <Form.Label className="h2 mb-3">Color</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                required
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="btn-lg btn-success rounded-0"
              onClick={adminSubmit}
            >
              submit
            </Button>
          </Form>
        </div>

        <div className="container-fluid uplaoded">
          <h1 className="px-5 pt-5 text-light">uploaded: </h1>
          <div className="row my-4">
            {productsData
              ? productsData.map((item, key) => (
                  <div
                    className="p-3 col-lg-3 col-md-4 col-sm-6 col-12"
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
                      <h3 className="my-3">
                        Quantity availble: <span>{item.Quantity}</span>{" "}
                      </h3>
                      <Delete orderId={item._id} />
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="container-fluid">
          <h1 className="px-5 pt-5 text-light">Orders: </h1>
          <div className="row my-4">
            {ordersData
              ? ordersData.map((item, key) => (
                  <div
                    className="p-3 col-lg-3 col-md-4 col-sm-6 col-12"
                    key={key}
                  >
                    <div className="card p-4">
                      <img
                        src={item.product_Image}
                        className="card-img-top"
                        style={{ width: "100%", height: "100%" }}
                        alt=""
                      />
                      <div className="card-body">
                        <h3 className="card-text">
                          Product details: {item.product_Detail}
                        </h3>
                        <h3 className="card-text">Customer details:</h3>
                        <h6 className="card-text">Name: {item.name}</h6>
                        <h6 className="card-text">Phone: {item.phone}</h6>
                        <h6 className="card-text">Phone: {item.phone}</h6>
                        <h6 className="card-text">Address: {item.address}</h6>
                      </div>
                      <Delivered orderId={item._id} />
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  );
}
export default AdminPage;
