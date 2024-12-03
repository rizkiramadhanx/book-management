import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="none">
        <Navbar.Brand href="/">My App</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            <Button variant="outline-light">Logout</Button>
          </Nav.Item>
        </Nav>
      </Navbar>
      <div style={sidebarStyle}>
        <Nav className="flex-column">
          <Nav.Item>
            <Link to="/" className="nav-link" style={navLinkStyle}>
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/category" className="nav-link" style={navLinkStyle}>
              Categories
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/books" className="nav-link" style={navLinkStyle}>
              Books
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/authors" className="nav-link" style={navLinkStyle}>
              Authors
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/genres" className="nav-link" style={navLinkStyle}>
              Genres
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    </>
  );
}

const sidebarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "250px",
  height: "100%",
  backgroundColor: "#2d6a4f", // Green background
  padding: "20px",
  zIndex: 1000,
};

const navLinkStyle = {
  color: "#f0f8f7", // Light color for the text
  textDecoration: "none",
  marginBottom: "15px",
  display: "block",
  fontWeight: "500", // Slightly bold links
};

export default Sidebar;
