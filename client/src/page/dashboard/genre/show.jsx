/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import axiosBaseUrl from "../../../libs/axios";

function ShowGenre() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);
  const [genreToEdit, setGenreToEdit] = useState(null);
  const [genreName, setGenreName] = useState("");

  const fetchGenres = async () => {
    try {
      const response = await axiosBaseUrl.get("/genre");
      setGenres(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosBaseUrl.delete(`/genre/${genreToDelete.id}`);
      fetchGenres();
      setShowDeleteModal(false);
    } catch (error) {
      setError("Gagal menghapus genre.");
      setShowDeleteModal(false);
    }
  };

  const handleAddGenre = async () => {
    try {
      await axiosBaseUrl.post("/genre", { name: genreName });
      fetchGenres();
      setShowAddModal(false);
      setGenreName("");
    } catch (error) {
      setError("Gagal menambahkan genre.");
    }
  };

  const handleEditGenre = async () => {
    try {
      await axiosBaseUrl.put(`/genre/${genreToEdit.id}`, { name: genreName });
      fetchGenres();
      setShowEditModal(false);
      setGenreName("");
    } catch (error) {
      setError("Gagal mengedit genre.");
    }
  };

  const handleShowDeleteModal = (genre) => {
    setGenreToDelete(genre);
    setShowDeleteModal(true);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowEditModal = (genre) => {
    setGenreToEdit(genre);
    setGenreName(genre.name);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowAddModal(false);
    setShowEditModal(false);
    setGenreName("");
    setGenreToDelete(null);
    setGenreToEdit(null);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <Container style={{ marginTop: "30px" }}>
      <Row>
        <Col>
          <h2>Daftar Genre</h2>
          <Button
            variant="primary"
            style={{ marginBottom: "20px" }}
            onClick={handleShowAddModal}
          >
            Tambah Genre
          </Button>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && genres.length === 0 && (
            <p>Tidak ada genre yang ditemukan.</p>
          )}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Genre</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {genres.length > 0 &&
                genres.map((genre, index) => (
                  <tr key={genre.id}>
                    <td>{index + 1}</td>
                    <td>{genre.name}</td>
                    <td>
                      <Button
                        variant="warning"
                        style={{ marginRight: "5px" }}
                        onClick={() => handleShowEditModal(genre)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleShowDeleteModal(genre)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal
        show={showDeleteModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Genre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus genre{" "}
          <strong>{genreToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Genre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="genreName">
              <Form.Label>Nama Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama genre"
                value={genreName}
                onChange={(e) => setGenreName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleAddGenre}>
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Genre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="genreName">
              <Form.Label>Nama Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama genre"
                value={genreName}
                onChange={(e) => setGenreName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleEditGenre}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ShowGenre;
