import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosBaseUrl from "../../libs/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
    // Contoh validasi (ganti dengan logika autentikasi yang lebih baik)
    try {
      const response = await axiosBaseUrl.request({
        method: "POST",
        url: "/auth/login",
        data: {
          email,
          password,
        },
      });

      localStorage.setItem("token", response.data.token);

      if (response.status === 200) {
        navigate("/protected");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <h2 className="text-center mb-4">Login</h2>

          {/* Tampilkan pesan error jika ada */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-100" // Menambahkan lebar penuh
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-100" // Menambahkan lebar penuh
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
