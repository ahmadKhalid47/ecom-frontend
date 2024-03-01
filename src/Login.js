import { useContext, useState } from "react";
import RegistrationContext from "./RegistrationContext";
import { Button } from "react-bootstrap";
import axios from "axios";
import AppContext from "./AppContext";
import { Form } from "react-bootstrap";
function Login() {
  const { setShowSignup } = useContext(RegistrationContext);
  const { setId } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;

  async function loginSubmit() {
    if (email.trim() && password.trim()) {
      const formData = { password, email };
      const { data } = await axios.post(`${apiKey}/login`, formData);
      data.error ? alert(data.error) : localStorage.setItem("id", data.data);
      setId(localStorage.getItem("id"));
    } else {
      alert("fill the imputs");
    }
  }

  function keyPress(e) {
    if (e.key === "Enter") {
      loginSubmit();
    }
  }

  return (
    <>
      <div
        className="bg-warning p-4 rounded"
        style={{ width: "min(50vh,90vw)" }}
      >
        <h1 className="mb-4 display-1">Log in</h1>
        <Form>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            className="mb-3"
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={keyPress}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            className="mb-3"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={keyPress}
          />
          <button
            type="button"
            className="float-end btn btn-primary"
            onClick={loginSubmit}
          >
            Submit
          </button>
          <Button variant="link" size="lg" onClick={() => setShowSignup(true)}>
            sign-up
          </Button>
        </Form>
      </div>
    </>
  );
}
export default Login;
