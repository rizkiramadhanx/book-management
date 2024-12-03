import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/protected-route";
import Login from "./page/auth/login";
import ShowAuthor from "./page/dashboard/author/show";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/author"
            element={<ProtectedRoute element={<ShowAuthor />} />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
