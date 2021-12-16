import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import UpdateFormModal from './UpdateFormModal';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      formModal: false,
      book: null,
      updateModal: false
    }
  }
  componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    let serverURL = `${process.env.REACT_APP_SERVER_URL}/books`;
    console.log(serverURL);
    if (this.props.user) {
      console.log(this.props.user)
      serverURL = `${process.env.REACT_APP_SERVER_URL}/books?email=${this.props.user}`
    }
    let gottenBooks = await axios.get(serverURL);
    this.setState({ books: gottenBooks.data });
  }

  showModal = () => {
    this.setState({ formModal: true })
  }

  closeModal = () => {
    this.setState({ formModal: false })
  }

  showUpdateModal = (book) => {
    this.setState({ updateModal: true, book: book })
  }

  closeUpdateModal = () => {
    this.setState({ updateModal: false })
  }


  postBooks = async (bookObj) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/books?email=${this.props.user}`,
        bookObj);
      this.setState({ books: [...this.state.books, response.data] })
    } catch (e) {
      console.error(e);
    }
  }

  putBooks = async (bookObj) => {
    let serverURL = `${process.env.REACT_APP_SERVER_URL}/books/${bookObj._id}`;
    console.log(this.props.user)
    try {
      const response = await axios.put(serverURL, bookObj);
      if (response.status === 200) {
        this.getBooks();
      } else {
        console.log(response.status);
      }
    } catch (e) {
      console.error(e);
    }
  }

  deleteBook = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/books/${id}?email=${this.props.user}`);
      const updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({ books: updatedBooks })
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    /* render user's books in a Carousel */
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Button onClick={() => this.showModal()}>
          Add a Book
        </Button>

        <BookFormModal user={this.props.user} postBooks={this.postBooks} formModal={this.state.formModal} closeModal={this.closeModal} />
        <UpdateFormModal putBooks={this.putBooks} book={this.state.book} updateModal={this.state.updateModal} closeUpdateModal={this.closeUpdateModal} />

        {this.state.books.length > 0 ? (
          <Carousel variant="dark">
            {this.state.books.map((book) => (
              <Carousel.Item key={book._id}>
                <img className="d-block w-100" src="https://via.placeholder.com/3x1/999999/999999" alt="background" />
                <Carousel.Caption>
                  <h5>{book.title}</h5>
                  <h5>{book.status}</h5>
                  <p>{book.description}</p>
                  <DeleteButton book={book} deleteBook={this.deleteBook} />
                  <EditButton book={book} showUpdateModal={this.showUpdateModal} />
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;