import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/protected-route";
import Login from "./page/auth/login";
import ShowCategory from "./page/dashboard/category/show";
import ShowAuthor from "./page/dashboard/author/show";
import ShowGenre from "./page/dashboard/genre/show";
import ShowBook from "./page/dashboard/book/show";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/category"
            element={<ProtectedRoute element={<ShowCategory />} />}
          />
          <Route
            path="/dashboard/author"
            element={<ProtectedRoute element={<ShowAuthor />} />}
          />
          <Route
            path="/dashboard/genre"
            element={<ProtectedRoute element={<ShowGenre />} />}
          />

          <Route
            path="/dashboard/book"
            element={<ProtectedRoute element={<ShowBook />} />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
