import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import axios from "axios";

function Rating(p) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [ratingValue, setRatingValue] = useState(null);
  let starsArray = [1, 2, 3, 4, 5];
  async function ratingValueSubmit(_id) {
    await axios.post(`${apiKey}/rating/${_id}`, {
      ratingValue,
    });
  }

  return (
    <div className="ratingValues m-4 d-flex justify-content-between h3">
      <div className="d-flex allign-items-center">
        <h4>please rate our product </h4>

        <div className="d-flex ps-4">
          {starsArray.map((StarKey) => (
            <div
              key={StarKey}
              onClick={() => {
                setRatingValue(ratingValue === StarKey ? null : StarKey);
              }}
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                icon={ratingValue >= StarKey ? solidStar : regularStar}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        id="button"
        disabled={ratingValue ? false : true}
        className="btn btn-success btn-sm px-4"
        onClick={() => {
          ratingValueSubmit(p.detail);
        }}
      >
        submit
      </button>
    </div>
  );
}

export default Rating;
