import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="bg-warning d-flex justify-content-center h6 pt-3">
        <Navbar
          expand="sm"
          className="navbar navbar-expand-lg navbar-light"
          style={{ width: "90%" }}
        >
          <Link to="/" className="navbar-brand pe-4">
            <h5 className="fw-bolder">E-commerce</h5>
          </Link>
          <Navbar.Toggle
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse
            className="collapse navbar-collapse"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <input
                id="hidden"
                type="hidden"
                // value="<%=info_obj._id%>"
              ></input>
              <Link to="/home" className="nav-item nav-link">
                <h5>Home</h5>
              </Link>
              <Link to="/cart" className="nav-item nav-link">
                <h5>Cart</h5>
              </Link>
              <Link to="/notification" className="nav-item nav-link">
                <h5>Notification</h5>
              </Link>
              <Link
                to="/adminPage"
                id="admin_page"
                className="nav-item nav-link"
              >
                <h5>Admin Page</h5>
              </Link>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}
export default Header;
