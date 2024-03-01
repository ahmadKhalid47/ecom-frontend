import { useContext, useState } from "react";
import RegistrationContext from "./RegistrationContext";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import AppContext from "./AppContext";

function SignUp() {
  const { setShowSignup } = useContext(RegistrationContext);
  const { setId } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;

  async function SignUpSubmit() {
    if (email.trim() && password.trim() && password2.trim()) {
      if (password === password2) {
        const formData = { password, password2, email };
        const { data } = await axios.post(`${apiKey}/signUp`, formData);
        data.error ? alert(data.error) : localStorage.setItem("id", data.data);
        setId(localStorage.getItem("id"));
      } else {
        alert("password did not matched");
      }
    } else {
      alert("fill the imputs");
    }
  }

  function keyPress(e) {
    if (e.key === "Enter") {
      SignUpSubmit();
    }
  }
  return (
    <>
      <div
        className="bg-warning p-4 rounded"
        style={{ width: "min(50vh, 90vw)" }}
      >
        <h1 className="mb-4 display-1">sign up</h1>
        <Form>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            className="mb-3"
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={keyPress}
          />
          <Form.Label className="form-label">create Password</Form.Label>
          <Form.Control
            type="password"
            className="mb-3"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={keyPress}
          />
          <Form.Label className="form-label">re-write Password</Form.Label>
          <Form.Control
            type="password"
            className="mb-3"
            onChange={(e) => setPassword2(e.target.value)}
            onKeyPress={keyPress}
          />
          <Button
            type="button"
            className="float-end btn btn-primary"
            onClick={SignUpSubmit}
          >
            Submit
          </Button>
          <Button variant="link" size="lg" onClick={() => setShowSignup(false)}>
            login
          </Button>
        </Form>
      </div>
    </>
  );
}
export default SignUp;
