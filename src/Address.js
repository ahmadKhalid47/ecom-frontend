import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Address() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const userId = localStorage.getItem("id");
  const [buyPageData, setBuyPageData] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const { productId } = useParams();
  const [disabled, setDisabled] = useState(false);

  async function buyDataSubmit() {
    try {
      setDisabled(true);
      var { data } = await axios.post(`${apiKey}/buy/${productId}/${userId}`, {
        name,
        phone,
        address,
      });
      var { url } = await data;
      if (url) {
        setBuyPageData(url);
        window.open(buyPageData, "_self");
      } else {
        console.log("none");
      }
    } finally {
      setDisabled(false);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center py-5">
        <Form className="col col-lg-6 col-md-7 col-sm-10 col-11">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            className="mb-3"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Label>phone</Form.Label>
          <Form.Control
            type="number"
            className="mb-3"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Form.Label>address</Form.Label>
          <Form.Control
            type="text"
            className="mb-3"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            variant="primary"
            className="float-end"
            onClick={() => buyDataSubmit()}
            disabled={disabled}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Address;
