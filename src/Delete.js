import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";
import AdminContext from "./AdminPageContext";

function Delete(p) {
  const { refresher, setRefresher } = useContext(AdminContext);
  const apiKey = process.env.REACT_APP_API_KEY;
  const [deleteConform, setDeleteConform] = useState(false);

  async function toDelete() {
    await axios.delete(`${apiKey}/toDelete/${p.orderId}`);
    setRefresher(refresher + 1);
  }

  return (
    <>
      {deleteConform ? (
        <div className="sure container-fluid flex-column d-flex">
          <h5>are you sure ?</h5>
          <Button
            variant="outline-danger"
            size="lg"
            className="rounded-0"
            onClick={() => setDeleteConform(false)}
          >
            no
          </Button>
          <Button
            variant="outline-success"
            size="lg"
            className="rounded-0"
            onClick={toDelete}
          >
            yes
          </Button>
        </div>
      ) : (
        <Button
          variant="outline-danger"
          size="lg"
          className="rounded-0"
          onClick={() => setDeleteConform(true)}
        >
          delete
        </Button>
      )}
    </>
  );
}
export default Delete;
