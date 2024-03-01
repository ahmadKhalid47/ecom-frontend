import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Success() {
  const navigate = useNavigate();
  const { demyId } = useParams();
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(demyId);
  console.log(apiKey);
  useEffect(
    () => async () => {
      await axios.get(`${apiKey}/success/${demyId}`);
    },
    [apiKey, demyId]
  );

  return (
    <>
      <h1 className="p-5">
        Your Payment was made, your order will be placed in few days
      </h1>
      <button
        id="button"
        className="btn btn-primary btn-lg m-5"
        onClick={() => navigate(-4)}
      >
        go back
      </button>
    </>
  );
}
export default Success;
