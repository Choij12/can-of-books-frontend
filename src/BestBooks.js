import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import DeleteButton from './DeleteButton';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      formModal: false
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
    this.setState({ books: gottenBooks.data});
    // try {
    //   const response = await axios.get(serverURL);
    //   this.setState({ books: response.data });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  showModal = () => {
    this.setState({ formModal: true })
  }

  closeModal = () => {
    this.setState({ formModal: false })
  }

postBooks = async (bookObj) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/books?email=${this.props.user.email}`,
    bookObj);
    this.setState({ books: [...this.state.books, response.data ]})
  } catch (e) {
    console.error(e);
  }
}

deleteBook = async (id) => {
  try {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/books?email=${this.props.user.email}`);
    const updatedBooks = this.state.books.filter( book => book._id !== id);
    this.setState({ books: updatedBooks })
  } catch (e) {
    console.error(e);
  }
}


  // postBooks = async (bookObj) => {
  //   let serverURL = `${process.env.REACT_APP_SERVER_URL}/books?email=${this.props.user.email}`;
  //   console.log(serverURL);
  //   try {
  //       const response = await axios.post(serverURL, bookObj);
  //       this.setState({ books: [...this.state.books, response.data] });
  //   } catch (error) {
  //       console.log(error.toString);
  //   }
  // }

  

  // deleteBook = async (id) => {
  //   let serverURL = `${process.env.REACT_APP_SERVER_URL}/books/${id}?email=${this.props.user.email}`;
  //   try {
  //       const response = await axios.delete(serverURL);
  //       console.log(response.status);
  //       if (response.status === 204 ) {
  //         this.getBooks()
  //       } else {
  //         console.log(response.status)
  //       }
  //   } catch (error) {
  //       console.log(error.toString);
  //   }
  // }



  render() {
    /* render user's books in a Carousel */
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Button onClick={() => this.showModal()}>
          Add a Book
        </Button>

        {/* <BookFormModal postBooks={this.postBooks} formModal={this.state.formModal} closeModal={this.closeModal}/> */}
        <BookFormModal user={this.props.user} postBooks={this.postBooks} formModal={this.state.formModal} closeModal={this.closeModal}/>
        {this.state.books.length > 0 ? (
          <Carousel variant="dark">
            {this.state.books.map( (book) => (
              <Carousel.Item key={book._id}>
                <img className="d-block w-100" src="https://via.placeholder.com/3x1/999999/999999" alt="background"/>
                <Carousel.Caption> 
                  <h5>{book.title}</h5>
                  <h5>{book.status}</h5>
                  <p>{book.description}</p>
                  <DeleteButton book={book} deleteBook={this.deleteBook} />
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