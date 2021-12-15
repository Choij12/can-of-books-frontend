import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import BookForModal from './BookFormModal';
import DeleteButton from './DeleteButton';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      formModal: false,
    }
  }


deleteBook = async (bookObj) => {
  let serverURL = `${process.env.REACT_APP_SERVER_URL}/books/${bookObj._id}?email=${bookObj.email}`;
  console.log(serverURL);
  try {
      const response = await axios.delete(serverURL);
      console.log(response.status);
      if (response.status === 204) {
        this.getBooks()
      } else {
        console.log(response)
      }
  } catch (error) {
      console.log(error);
  }
}

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */

postBooks = async (bookObj) => {
  let serverURL = `${process.env.REACT_APP_SERVER_URL}/books`;
  console.log(serverURL);
  try {
    const response = await axios.post(serverURL, bookObj);
    this.setState({ books: [...this.state.books, response.data] });
  
  } catch (error) {
    console.log(error);
  }
}


getBooks = async () => {
    let serverURL = `${process.env.REACT_APP_SERVER_URL}/books`;
    console.log(serverURL);
    if (this.props.user) {
      serverURL += `?email=${this.props.user}`
    }

    try {
      const response = await axios.get(serverURL);
      this.setState({ books: response.data });

    } catch (error) {
      console.log(error);
    }
  }

  showModal = () => {
    this.setState({ formModal: true });

  }

  closeModal = () => {
    this.setState({ formModal: false });
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button onClick={() => this.showModal()}>
          Create Book
        </Button>
        <BookForModal postBooks={this.postBooks} formModal={this.state.formModal} closeModal={this.closeModal}/>

        {this.state.books.length ? (
          <Carousel variant="dark">
          {this.state.books.filter(books => books.email === this.props.user ).map( (books, idx) => (
            <Carousel.Item key={books._id}>
              <img className="d-block w-100" src="https://via.placeholder.com/3x1/999999/999999" alt="temp"/>
              <Carousel.Caption>
                <h4>{books.title}</h4>
                <h5>{books.status}</h5>
                <p>{books.description}</p>
                <DeleteButton books={books} deleteBook={this.deleteBook}/>
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