import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import AdminContext from "./AdminPageContext";

function Delivered(p) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [deliverConform, setDeliverConform] = useState(false);
  const { refresher, setRefresher } = useContext(AdminContext);

  async function delivered() {
    await axios.post(`${apiKey}/delivered/${p.orderId}`);
    setRefresher(refresher + 1);
  }

  return (
    <>
      {deliverConform ? (
        <div className="container-fluid flex-column d-flex">
          <h5>are you sure ?</h5>
          <Button
            variant="outline-danger"
            size="lg"
            className="rounded-0"
            onClick={() => setDeliverConform(false)}
          >
            no
          </Button>
          <Button
            variant="outline-success"
            size="lg"
            className="rounded-0"
            onClick={delivered}
          >
            yes
          </Button>
        </div>
      ) : (
        <Button
          variant="outline-primary"
          size="lg"
          className="rounded-0"
          onClick={() => setDeliverConform(true)}
        >
          delivered
        </Button>
      )}
    </>
  );
}
export default Delivered;
