import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Cart from "./Cart";
import MainPage from "./MainPage";
import Notification from "./Notification";
import AdminPage from "./AdminPage";
import Registration from "./Registration";
import AppContext from "./AppContext";
import { useState } from "react";
import Details from "./Details";
import Address from "./Address";
import Success from "./Success";
function App() {
  
  const [id, setId] = useState(localStorage.getItem("id"));
  const appContextSetter = {
    id,
    setId,
  };

  return (
    <AppContext.Provider value={appContextSetter}>
      {id ? (
        <Router>
          <>
            <Header />
            <Routes>
              <>
                <Route path="/" element={<MainPage />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/adminPage" element={<AdminPage />} />
                <Route
                  path="/productDetails/:productId"
                  element={<Details />}
                />
                <Route path="/buy/:productId" element={<Address />} />
                <Route path="/success/:demyId" element={<Success />} />
              </>
            </Routes>
          </>
        </Router>
      ) : (
        <Registration />
      )}
    </AppContext.Provider>
  );
}

export default App;
