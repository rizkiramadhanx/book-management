/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axiosBaseUrl from "../../../libs/axios";

function ShowBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axiosBaseUrl.get("/book");
      setBooks(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const response = await axiosBaseUrl.get("/category");
    setCategories(response.data.data);
  };

  const fetchAuthors = async () => {
    const response = await axiosBaseUrl.get("/author");
    setAuthors(response.data.data);
  };

  const fetchGenres = async () => {
    const response = await axiosBaseUrl.get("/genre");
    setGenres(response.data.data);
  };

  const handleAddBook = async () => {
    console.log(bookTitle, categoryId, authorId, genreId);
    try {
      await axiosBaseUrl.post("/book", {
        title: bookTitle,
        categoryId,
        authorId,
        genreId,
      });
      fetchBooks();
      setShowAddModal(false);
      setBookTitle("");
      setCategoryId("");
      setAuthorId("");
      setGenreId("");
    } catch (error) {
      setError("Gagal menambahkan buku.");
    }
  };

  const handleEditBook = async () => {
    try {
      await axiosBaseUrl.put(`/book/${bookToEdit.id}`, {
        title: bookTitle,
        categoryId,
        authorId,
        genreId,
      });
      fetchBooks();
      setShowEditModal(false);
      setBookTitle("");
      setCategoryId("");
      setAuthorId("");
      setGenreId("");
    } catch (error) {
      setError("Gagal mengedit buku.");
    }
  };

  const handleDeleteBook = async () => {
    try {
      await axiosBaseUrl.delete(`/book/${bookToDelete.id}`);
      fetchBooks();
      setShowDeleteModal(false);
    } catch (error) {
      setError("Gagal menghapus buku.");
      setShowDeleteModal(false);
    }
  };

  const handleShowAddModal = () => {
    fetchCategories();
    fetchAuthors();
    fetchGenres();
    setShowAddModal(true);
  };

  const handleShowEditModal = (book) => {
    setBookToEdit(book);
    setBookTitle(book.title);
    setCategoryId(book.categoryId);
    setAuthorId(book.authorId);
    setGenreId(book.genreId);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowAddModal(false);
    setShowEditModal(false);
    setBookTitle("");
    setCategoryId("");
    setAuthorId("");
    setGenreId("");
    setBookToDelete(null);
    setBookToEdit(null);
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchAuthors();
    fetchGenres();
  }, []);

  const token = localStorage.getItem("token");
  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <h2>Daftar Buku</h2>
          <Button
            variant="primary"
            onClick={handleShowAddModal}
            className="mb-3"
          >
            Tambah Buku
          </Button>

          {loading && <p>Memuat...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Penulis</th>
                <th>Genre</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.category.name}</td>
                  <td>{book.author.name}</td>
                  <td>{book.genre.name}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShowEditModal(book)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowDeleteModal(book)}
                      className="ml-2"
                      style={{ marginLeft: "10px" }}
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

      <Modal show={showAddModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="bookTitle">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Masukkan judul buku"
              />
            </Form.Group>

            <Form.Group controlId="categoryId">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                as="select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="authorId">
              <Form.Label>Penulis</Form.Label>
              <Form.Control
                as="select"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option value="">Pilih Penulis</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="genreId">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                value={genreId}
                onChange={(e) => setGenreId(e.target.value)}
              >
                <option value="">Pilih Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleAddBook}>
            Tambah Buku
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="bookTitle">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Masukkan judul buku"
              />
            </Form.Group>

            <Form.Group controlId="categoryId">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                as="select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="authorId">
              <Form.Label>Penulis</Form.Label>
              <Form.Control
                as="select"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option value="">Pilih Penulis</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="genreId">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                value={genreId}
                onChange={(e) => setGenreId(e.target.value)}
              >
                <option value="">Pilih Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleEditBook}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus buku ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeleteBook}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ShowBook;
