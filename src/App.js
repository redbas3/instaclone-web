import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

function App() {
  const isLoggedIn = false;
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route
            path="/nomad-coders"
            element={
              <>
                <div>test</div>
                {!isLoggedIn ? "Plz. login" : ""}
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
