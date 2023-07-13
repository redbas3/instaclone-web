import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
