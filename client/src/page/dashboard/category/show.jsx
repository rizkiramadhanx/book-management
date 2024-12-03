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

function ShowCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axiosBaseUrl.get("/category");
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosBaseUrl.delete(`/category/${categoryToDelete.id}`);
      fetchCategories();
      setShowDeleteModal(false);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Gagal menghapus kategori.");
      setShowDeleteModal(false);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axiosBaseUrl.post("/category", { name: categoryName });
      fetchCategories();
      setShowAddModal(false);
      setCategoryName("");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Gagal menambahkan kategori.");
    }
  };

  const handleEditCategory = async () => {
    try {
      await axiosBaseUrl.put(`/category/${categoryToEdit.id}`, {
        name: categoryName,
      });
      fetchCategories();
      setShowEditModal(false);
      setCategoryName("");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Gagal mengedit kategori.");
    }
  };

  const handleShowDeleteModal = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowEditModal = (category) => {
    setCategoryToEdit(category);
    setCategoryName(category.name);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowAddModal(false);
    setShowEditModal(false);
    setCategoryName("");
    setCategoryToDelete(null);
    setCategoryToEdit(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container style={{ marginTop: "30px" }}>
      <Row>
        <Col>
          <h2>Daftar Kategori</h2>
          <Button
            variant="primary"
            style={{ marginBottom: "20px" }}
            onClick={handleShowAddModal}
          >
            Tambah Kategori
          </Button>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && categories.length === 0 && (
            <p>Tidak ada kategori yang ditemukan.</p>
          )}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>
                      <Button
                        variant="warning"
                        style={{ marginRight: "5px" }}
                        onClick={() => handleShowEditModal(category)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleShowDeleteModal(category)}
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
        centered
        show={showDeleteModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Kategori</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus kategori{" "}
          <strong>{categoryToDelete?.name}</strong>?
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
        centered
        show={showAddModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kategori</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="categoryName">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama kategori"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={handleCloseModal}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Kategori</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="categoryName">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama kategori"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleEditCategory}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ShowCategory;
