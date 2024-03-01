import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Rating from "./Rating";
function Notification() {
  const userId = localStorage.getItem("id");
  const apiKey = process.env.REACT_APP_API_KEY;
  const [notificationData, setNotificationData] = useState();

  useEffect(
    () => async () => {
      let { data } = await axios.get(`${apiKey}/notification/${userId}`);
      setNotificationData(data.notificationData);
    },
    [apiKey, userId]
  );

  return (
    <>
      <div className="py-5">
        <div
          className="d-flex mx-2 my-1 align-items-center justify-content-evenly"
          style={{ height: "10vh" }}
        >
          {notificationData ? (
            notificationData.lenght > 0 ? (
              notificationData.map((item, key) => (
                <div key={key}>
                  <div
                    className="me-2 h-100 d-flex align-items-center"
                    style={{ width: "40%" }}
                  >
                    <img
                      style={{ height: "10vh", width: "10vh" }}
                      src={item.image}
                      alt=""
                    />
                    <h6 className="ms-3">{item.detail}</h6>
                  </div>
                  <h6>your order has been placed to your location</h6>

                  <h6>{item.date}</h6>
                  <Rating detail={item.detail} />
                </div>
              ))
            ) : (
              <h4>no notification yet</h4>
            )
          ) : null}
        </div>
      </div>
    </>
  );
}
export default Notification;
