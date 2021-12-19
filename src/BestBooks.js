import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
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
    // let apiURL = `${process.env.REACT_APP_SERVER_URL}/book`;
    if (this.props.auth0.isAuthenticated) {
      try {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/book`
        }
        const response = await axios(config);
        if (response.status === 200) {
          this.setState({ books: response.data });
        } else {
          alert(response.status);
        }
      }
      catch (error) {
        alert(error.toString());
      }
    }
  }

  // getBooks = async () => {
  //   let serverURL = `${process.env.REACT_APP_SERVER_URL}/books`;
  //   console.log(serverURL);
  //   if (this.props.user) {
  //     console.log(this.props.user)
  //     serverURL = `${process.env.REACT_APP_SERVER_URL}/books?email=${this.props.user}`
  //   }
  //   let gottenBooks = await axios.get(serverURL);
  //   this.setState({ books: gottenBooks.data });
  // }

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


  // postBooks = async (bookObj) => {
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/books?email=${this.props.user}`,
  //       bookObj);
  //     this.setState({ books: [...this.state.books, response.data] })
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  postBooks = async (bookObj) => {
    if (this.props.auth0.isAuthenticated) {
      try {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/book`,
          data: bookObj
        }
        const response = await axios(config);
        if (response.status === 201) {
          this.getBooks();
        } else {
          alert(response.status);
        }
      }
      catch (error) {
        alert(error.toString());
      }
    }
  }

  putBooks = async (bookObj) => {
    if (this.props.auth0.isAuthenticated) {
      try {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'put',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/book/${bookObj.id}`,
          data: bookObj
        }
        const response = await axios(config);
        if (response.status === 200) {
          this.getBooks();
        } else {
          alert(response.status);
        }
      }
      catch (error) {
        alert(error.toString());
      }
    }

    // putBooks = async (bookObj) => {
    //   let serverURL = `${process.env.REACT_APP_SERVER_URL}/books/${bookObj._id}`;
    //   console.log(this.props.user)
    //   try {
    //     const response = await axios.put(serverURL, bookObj);
    //     if (response.status === 200) {
    //       this.getBooks();
    //     } else {
    //       console.log(response.status);
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }

    deleteBook = async (bookObj) => {
      if (this.props.auth0.isAuthenticated) {
        try {
          const res = await this.props.auth0.getIdTokenClaims();
          const jwt = res.__raw;
          const config = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'delete',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: `/book/${bookObj._id}`,
            data: bookObj
          }
          const response = await axios(config);
          if (response.status === 204) {
            this.getBooks();
          } else {
            alert(response.status);
          }
        }
        catch (error) {
          alert(error.toString());
        }
      }
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
              {/* {this.state.books.map((book) => ( */}
              {this.state.books.filter(book => book.email === this.props.auth0.user.email).map( (book) => (
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

export default withAuth0(BestBooks);
