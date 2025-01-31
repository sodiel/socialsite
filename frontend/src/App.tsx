import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Registration } from "./pages/registration";
import { Login } from "./pages/login";
import { Feed } from "./pages/feed";
import "./App.css";
import RootLayout from "./layout";

function App() {
  return (
    <RootLayout>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </Router>
    </RootLayout>
  );
}

export default App;
