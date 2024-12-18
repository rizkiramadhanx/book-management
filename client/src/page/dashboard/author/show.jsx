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

function ShowAuthor() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);
  const [authorToEdit, setAuthorToEdit] = useState(null);
  const [authorName, setAuthorName] = useState("");

  const fetchAuthors = async () => {
    try {
      const response = await axiosBaseUrl.get("/author");
      setAuthors(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosBaseUrl.delete(`/author/${authorToDelete.id}`);
      fetchAuthors();
      setShowDeleteModal(false);
    } catch (error) {
      setError("Gagal menghapus author.");
      setShowDeleteModal(false);
    }
  };

  const handleAddAuthor = async () => {
    try {
      await axiosBaseUrl.post("/author", { name: authorName });
      fetchAuthors();
      setShowAddModal(false);
      setAuthorName("");
    } catch (error) {
      setError("Gagal menambahkan author.");
    }
  };

  const handleEditAuthor = async () => {
    try {
      await axiosBaseUrl.put(`/author/${authorToEdit.id}`, {
        name: authorName,
      });
      fetchAuthors();
      setShowEditModal(false);
      setAuthorName("");
    } catch (error) {
      setError("Gagal mengedit author.");
    }
  };

  const handleShowDeleteModal = (author) => {
    setAuthorToDelete(author);
    setShowDeleteModal(true);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowEditModal = (author) => {
    setAuthorToEdit(author);
    setAuthorName(author.name);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowAddModal(false);
    setShowEditModal(false);
    setAuthorName("");
    setAuthorToDelete(null);
    setAuthorToEdit(null);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <Container style={{ marginTop: "30px" }}>
      <Row>
        <Col>
          <h2>Daftar Author</h2>
          <Button
            variant="primary"
            style={{ marginBottom: "20px" }}
            onClick={handleShowAddModal}
          >
            Tambah Author
          </Button>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && authors.length === 0 && (
            <p>Tidak ada author yang ditemukan.</p>
          )}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Author</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 &&
                authors.map((author, index) => (
                  <tr key={author.id}>
                    <td>{index + 1}</td>
                    <td>{author.name}</td>
                    <td>
                      <Button
                        variant="warning"
                        style={{ marginRight: "5px" }}
                        onClick={() => handleShowEditModal(author)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleShowDeleteModal(author)}
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
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus author{" "}
          <strong>{authorToDelete?.name}</strong>?
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
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="authorName">
              <Form.Label>Nama Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleAddAuthor}>
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        centered
        show={showEditModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="authorName">
              <Form.Label>Nama Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleEditAuthor}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ShowAuthor;
