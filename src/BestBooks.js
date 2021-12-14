import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */

getBooks = async () => {
    let serverURL = `${process.env.REACT_APP_SERVER_URL}/book`;
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

  componentDidMount() {
    this.getBooks();
  }



  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel variant="dark">
          {this.state.books.map( (book, idx) => (
            <Carousel.Item key={idx}>
              <img className="d-block w-100" src="https://via.placeholder.com/3x1/999999/999999" alt="temp"/>
              <Carousel.Caption>
                <h4>{book.title}</h4>
                <h5>{book.status}</h5>
                <p>{book.description}</p>
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