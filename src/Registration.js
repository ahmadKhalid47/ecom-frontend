import SignUp from "./SignUp";
import Login from "./Login";
import { useState } from "react";
import RegistrationContext from "./RegistrationContext";

function Registration() {
  const [showSignup, setShowSignup] = useState(false);
  const registrationContextSetter = {
    showSignup,
    setShowSignup,
  };
  return (
    <RegistrationContext.Provider value={registrationContextSetter}>
      <div
        className="d-flex justify-content-center align-items-center h5 m-0"
        style={{ height: "100vh" }}
      >
        {showSignup ? <SignUp /> : <Login />}
      </div>
    </RegistrationContext.Provider>
  );
}

export default Registration;
