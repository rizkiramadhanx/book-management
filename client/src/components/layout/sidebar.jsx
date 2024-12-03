import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ children }) {
  const location = useLocation(); // Mengetahui path saat ini

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "active" : ""; // Menyorot menu aktif
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="none">
        <Container>
          <Nav>
            <Nav.Link
              as={Link}
              to="/dashboard/book"
              className={getNavLinkClass("/dashboard/book")}
            >
              Book
            </Nav.Link>
          </Nav>

          <Nav className="ms-3">
            <Nav.Link
              as={Link}
              to="/dashboard/category"
              className={getNavLinkClass("/dashboard/category")}
            >
              Category
            </Nav.Link>
          </Nav>

          <Nav className="ms-3">
            <Nav.Link
              as={Link}
              to="/dashboard/author"
              className={getNavLinkClass("/dashboard/author")}
            >
              Author
            </Nav.Link>
          </Nav>

          <Nav className="ms-3">
            <Nav.Link
              as={Link}
              to="/dashboard/genre"
              className={getNavLinkClass("/dashboard/genre")}
            >
              Genre
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <Button
              as={Link}
              onClick={handleLogout}
              to="/login"
              variant="light"
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
      {children}
    </>
  );
}

export default Sidebar;
